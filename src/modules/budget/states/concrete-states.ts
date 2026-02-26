// src/modules/budget/states/concrete-states.ts
import { BadRequestException } from '@nestjs/common';
import { IBudgetState } from './budget-state.interface';
import { BudgetContext } from './budget.context';

export class ApprovedState implements IBudgetState {
  approve() { throw new BadRequestException('Orçamento já está aprovado.'); }
  decline() { throw new BadRequestException('Não é possível declinar um orçamento aprovado.'); }
  cancel() { throw new BadRequestException('Não é possível cancelar um orçamento aprovado.'); }
  modify() { throw new BadRequestException('Não é possível modificar um orçamento aprovado.'); }
  getStatusString() { return 'aprovado' as const; }
}

export class DeclinedState implements IBudgetState {
  approve() { throw new BadRequestException('Orçamento já foi declinado.'); }
  decline() { throw new BadRequestException('Orçamento já está declinado.'); }
  cancel() { throw new BadRequestException('Não é possível cancelar um orçamento declinado.'); }
  modify() { throw new BadRequestException('Não é possível modificar um orçamento declinado.'); }
  getStatusString() { return 'declinado' as const; }
}

export class CancelledState implements IBudgetState {
  approve() { throw new BadRequestException('Orçamento foi cancelado.'); }
  decline() { throw new BadRequestException('Orçamento foi cancelado.'); }
  cancel() { throw new BadRequestException('Orçamento já está cancelado.'); }
  modify() { throw new BadRequestException('Não é possível modificar um orçamento cancelado.'); }
  getStatusString() { return 'cancelado' as const; }
}

export class PendingState implements IBudgetState {
  approve(context: BudgetContext) {
    context.setState(new ApprovedState());
  }
  decline(context: BudgetContext) {
    context.setState(new DeclinedState());
  }
  cancel(context: BudgetContext) {
    context.setState(new CancelledState());
  }
  modify(context: BudgetContext) {
    // É permitido modificar, então o estado continua sendo pendente
    // Não alteramos o state.
  }
  getStatusString() { return 'pendente' as const; }
}

// Uma fábrica (Factory) para facilitar a montagem do estado inicial vindo do banco
export class BudgetStateFactory {
  static getState(status: string): IBudgetState {
    switch (status) {
      case 'pendente': return new PendingState();
      case 'aprovado': return new ApprovedState();
      case 'declinado': return new DeclinedState();
      case 'cancelado': return new CancelledState();
      default: throw new BadRequestException('Status de orçamento inválido.');
    }
  }
}