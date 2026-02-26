import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto } from './dto/budget.dto';

@Controller('budgets')
export class BudgetsController {
    constructor(private readonly budgetService: BudgetService) { }

    @Get('patient/:cpfPaciente')
    async getBudgetsForPatient(@Param('cpfPaciente') cpfPaciente: string) {
        return await this.budgetService.getBudgetsForPatient(cpfPaciente);
    }

    // ----- Acoes da equipe TheAligner -----
    @Post()
    async createBudget(@Body() budget: CreateBudgetDto) {
        return await this.budgetService.createBudget(budget);
    }

    @Patch(':id/update')
    async updateBudget(@Param('id', ParseIntPipe) id: number, @Body() budget: UpdateBudgetDto) {
        return await this.budgetService.updateBudget(id, budget);
    }

    @Post(':id/cancel')
    async cancel(@Param('id', ParseIntPipe) id: number) {
        return await this.budgetService.cancelBudget(id);
    }

    // ----- Acoes do dentista -----
    @Post(':id/approve')
    async approve(@Param('id') id: number) {
        return await this.budgetService.approveBudget(id);
    }

    @Post(':id/decline')
    async decline(@Param('id') id: number) {
        return await this.budgetService.declineBudget(id);
    }
}
