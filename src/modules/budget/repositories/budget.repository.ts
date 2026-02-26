import { Inject, Injectable } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DB_CONNECTION } from "src/core/database/database.module";
import * as schema from "src/core/database/schema";
import { UpdateBudgetDto, CreateBudgetDto } from "../dto/budget.dto";
import { eq } from "drizzle-orm";

@Injectable()
export class BudgetRepository {
    constructor(
        @Inject(DB_CONNECTION) private readonly db: MySql2Database<typeof schema>) 
    { }

    async createBudget(budget: CreateBudgetDto) {
        await this.db.insert(schema.orcamentos).values({
            pacienteCpf: budget.pacienteCpf,
            valor: budget.valor?.toString(),
            descricao: budget.descricao,
            dataCriacao: new Date(),
        });
    }

    async findBudgetsByPatientCpf(cpf: string) {
        return await this.db.select()
            .from(schema.orcamentos)
            .where(eq(schema.orcamentos.pacienteCpf, cpf));
    }

    async findById(id: number) {
        return await this.db.query.orcamentos.findFirst({
            where: eq(schema.orcamentos.id, id)
        });
    }

    async updateBudget(id: number, budget: UpdateBudgetDto) {
        return await this.db.update(schema.orcamentos)
            .set({
                descricao: budget.descricao,
                valor: budget.valor?.toString(),
            })
            .where(eq(schema.orcamentos.id, id));
    }

    async updateStatus(id: number, status: 'pendente' | 'aprovado' | 'declinado' | 'cancelado') {
        return await this.db.update(schema.orcamentos)
            .set({ status })
            .where(eq(schema.orcamentos.id, id));
    }

    async deleteBudget(id: number) {
        await this.db.delete(schema.orcamentos).where(eq(schema.orcamentos.id, id));
    }
}
