import { IBudgetState } from "./budget-state.interface";

export class BudgetContext {
    private state: IBudgetState;
 
    constructor(state: IBudgetState) {
        this.state = state;
    }

    setState(state: IBudgetState) {
        this.state = state;
    }

    getStateString() {
        return this.state.getStatusString();
    }

    approve() {
        this.state.approve(this);
    }

    decline() {
        this.state.decline(this);
    }

    cancel() {
        this.state.cancel(this);
    }

    modify() {
        this.state.modify(this);
    }
}