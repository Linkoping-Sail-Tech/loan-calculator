import { describe, it, expect, beforeEach } from "vitest";
import { Account, type Transaction } from "../lib/account";

// Testpaket
describe("Account Balance Calculator", () => {
  let account: Account;

  beforeEach(() => {
    account = new Account(1000);
  });

  describe("getBalance", () => {
    it("should return initial balance when no transaction", () => {
      expect(account.getBalance()).toBe(1000);
    });

    it("should return 0 when no initial balance", () => {
      const emptyAccount = new Account();
      expect(emptyAccount.getBalance()).toBe(0);
    });

    it("should add to current balance after deposit", () => {
      //arrange
      const deposit: Transaction = {
        id: "1",
        amount: 500,
        type: "deposit",
        date: new Date(0),
      };

      //act
      account.addTransaction(deposit);

      //assert
      expect(account.getBalance()).toBe(1500);
    });

    it("should remove from balance on withdrawal", () => {
      const withdrawal: Transaction = {
        id: '1',
        amount: 500,
        type: 'withdrawal',
        date: new Date()
      }

      account.addTransaction(withdrawal);
      expect(account.getBalance()).toBe(500);
    });

    //We should test the types withdrawal or deposit.
  });
});
