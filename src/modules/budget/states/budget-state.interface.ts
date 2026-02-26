import { BudgetContext } from "./budget.context";

export interface IBudgetState {
    approve(context: BudgetContext): void;
    decline(context: BudgetContext): void;
    cancel(context: BudgetContext): void;
    modify(context: BudgetContext): void;
    getStatusString(): 'pendente' | 'aprovado' | 'declinado' | 'cancelado'   
}
