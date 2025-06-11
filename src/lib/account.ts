export interface Transaction {
  id: string;
  amount: number;
  type: "deposit" | "withdrawal";
  date: Date;
}

export class Account {
  balance: number;

  constructor(private initialBalance: number = 0) {
    this.balance = initialBalance;
  }

  getBalance(): number {
    return this.balance;
  }

  addTransaction(transaction: Transaction): void {
    if (transaction.type == "deposit") {
      this.balance += transaction.amount;
    } else {
      this.balance -= transaction.amount;
    }
  }

  getTransactionHistory(): Transaction[] {
    throw new Error("Not implemented");
  }
}
