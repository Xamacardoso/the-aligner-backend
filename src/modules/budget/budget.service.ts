import { Injectable, NotFoundException } from "@nestjs/common";
import { BudgetRepository } from "./repositories/budget.repository";
import { CreateBudgetDto, UpdateBudgetDto } from "./dto/budget.dto";
import { NotFound } from "@aws-sdk/client-s3";
import { BudgetStateFactory } from "./states/concrete-states";
import { BudgetContext } from "./states/budget.context";

@Injectable()
export class BudgetService {
    constructor(private readonly budgetRepository: BudgetRepository) { }

    async getBudgetsForPatient(cpf: string) {
        const budgets = await this.budgetRepository.findBudgetsByPatientCpf(cpf);

        if (!budgets) {
            throw new NotFoundException('Nenhum orçamento encontrado para o paciente');
        }

        return budgets;
    }

    private async getBudgetContext(id: number){
        const budget = await this.budgetRepository.findById(id);

        if (!budget) {
            throw new NotFoundException('Orçamento não encontrado');
        }

        const initialState = BudgetStateFactory.getState(budget.status!);
        return new BudgetContext(initialState);
    }

    async createBudget(budget: CreateBudgetDto) {
        // TODO: verificar se o paciente existe antes
        return await this.budgetRepository.createBudget(budget);
    }

    async approveBudget(id: number) {
        const context = await this.getBudgetContext(id);
        context.approve(); // Lanca erro se nao for pendente

        await this.budgetRepository.updateStatus(id, 'aprovado');
        return { message: 'Orçamento aprovado com sucesso!' };
    }

    async declineBudget(id: number) {
        const context = await this.getBudgetContext(id);
        context.decline(); // Lanca erro se nao for pendente

        await this.budgetRepository.updateStatus(id, 'declinado');
        return { message: 'Orçamento declinado pelo parceiro...' };
    }

    async cancelBudget(id: number) {
        const context = await this.getBudgetContext(id);
        context.cancel(); // Lanca erro se nao for pendente

        await this.budgetRepository.updateStatus(id, 'cancelado');
        return { message: 'Orçamento cancelado pela equipe TheAligner...' };
    }

    async updateBudget(id: number, budget: UpdateBudgetDto) {
        const context = await this.getBudgetContext(id);
        context.modify(); // Lanca erro se nao for pendente

        await this.budgetRepository.updateBudget(id, budget);
        return { message: 'Orçamento atualizado com sucesso!' };
    }

}