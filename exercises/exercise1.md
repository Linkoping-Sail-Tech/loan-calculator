# Exercise 1: Account Balance Calculator

## Starter Code

`src/lib/account.ts`:
```typescript
export interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  date: Date;
}

export class Account {
  constructor(private initialBalance: number = 0) {}
}
```

## Test File (Your TDD Guide)

`src/tests/account.test.ts`:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { Account, type Transaction } from '../lib/account';

describe('Account Balance Calculator', () => {
  let account: Account;
});
```

## Exercise Instructions

### TDD Cycle - Follow Red-Green-Refactor:

1. Run the tests first - it should fail complaining that there are no tests.
   ```bash
   npm run test account
   ```

2. Create the first test, describing the smallest possible step.
3. Implement just enough to make the first test pass (Green)
	- Start with `getBalance()` for initial balance
	- Don't overthink it - make it work!
4. Refactor if needed - improve the code without breaking tests
5. Repeat for each failing test:
	- `addTransaction()` method
	- Update `getBalance()` to consider transactions
	- `getTransactionHistory()` method
	- Handle edge cases

### Key TDD Principles to Remember:

- Write the minimal code to make each test pass
- Don't implement features until you have a failing test for them
- Refactor after green - improve code structure while keeping tests green
- One test at a time - focus on making one test pass before moving to the next

### Hints for Implementation:

- You'll need to store transactions somewhere (consider using an array)
- Think about how to handle deposits vs withdrawals in balance calculation
- Remember to return copies of data when appropriate (immutability)

### Expected Outcome:

By the end, you should have a fully functional `Account` class that:
- Tracks an initial balance
- Handles deposits and withdrawals
- Maintains transaction history
- Calculates current balance correctly

Time Estimate: 30-40 minutes

Ready to start? Run `npm run test account` and begin with the first failing test!