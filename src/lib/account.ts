export interface Transaction {
  id: string;
  amount: number;
  type: "deposit" | "withdrawal";
  date: Date;
}

export class Account {
  constructor(private initialBalance: number = 0) {}

  // TODO: Implement these methods using TDD
  getBalance(): number {
    throw new Error("Not implemented");
  }

  addTransaction(transaction: Transaction): void {
    throw new Error("Not implemented");
  }

  getTransactionHistory(): Transaction[] {
    throw new Error("Not implemented");
  }
}
