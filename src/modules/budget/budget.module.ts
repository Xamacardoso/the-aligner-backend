import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetRepository } from './repositories/budget.repository';
import { BudgetsController } from './budget.controller';

@Module({
    controllers: [BudgetsController],
    providers: [BudgetService, BudgetRepository],
})
export class BudgetsModule { }
