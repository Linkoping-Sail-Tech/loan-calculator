# Exercise 2: Loan Calculator

## Starter Code

**`src/lib/loan.ts`:**
```typescript
export interface LoanRequest {
  principal: number;      // Loan amount
  annualRate: number;     // Annual interest rate (as decimal, e.g., 0.05 for 5%)
  termInMonths: number;   // Loan term in months
}

export interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

export class LoanCalculator {
  // TODO: Implement these methods using TDD
  
  calculateMonthlyPayment(loan: LoanRequest): number {
    throw new Error('Not implemented');
  }
  
  calculateLoanResult(loan: LoanRequest): LoanResult {
    throw new Error('Not implemented');
  }
  
  isAffordable(loan: LoanRequest, monthlyIncome: number, maxDebtRatio: number = 0.28): boolean {
    throw new Error('Not implemented');
  }
  
  validateLoanRequest(loan: LoanRequest): string[] {
    throw new Error('Not implemented');
  }
}
```

## Empty Test File

**`src/tests/loan.test.ts`:**
```typescript
import { describe, it, expect } from 'vitest';
import { LoanCalculator, type LoanRequest } from '../lib/loan';

describe('LoanCalculator', () => {
  // TODO: Write your tests here using TDD approach
  // Start with one test, make it pass, then add the next test
});
```

## Exercise Instructions

### Your Mission 🎯
Build a loan calculator that can:
1. **Calculate monthly payments** using the standard loan formula
2. **Calculate total interest and amount** paid over the loan term
3. **Validate loan requests** (check for reasonable values)
4. **Determine affordability** based on income and debt-to-income ratio

### TDD Approach - One Test at a Time:

#### Step 1: Start with the Simplest Test
Think about what's the most basic thing your loan calculator should do. Maybe:
- Calculate monthly payment for a simple loan?
- Validate that principal is positive?
- Handle a basic loan scenario?

#### Step 2: The Red-Green-Refactor Cycle
1. **Write ONE failing test**
2. **Write minimal code to make it pass**
3. **Refactor if needed**
4. **Repeat**

### Helpful Formulas & Business Rules:

#### Monthly Payment Formula:
```
M = P × [r(1 + r)^n] / [(1 + r)^n - 1]

Where:
M = Monthly payment
P = Principal (loan amount)
r = Monthly interest rate (annual rate / 12)
n = Total number of payments (months)
```

#### Validation Rules (Banking Standards):
- Principal: Must be > 0, typically max $10,000,000
- Annual rate: Must be > 0, typically between 0.01 (1%) and 0.30 (30%)
- Term: Must be > 0, typically between 1 and 360 months (30 years)

#### Affordability Rule:
- Monthly payment shouldn't exceed 28% of monthly income (conservative)
- Some banks use up to 36% for total debt-to-income ratio

### Sample Test Ideas (Don't peek until you've tried!):

<details>
<summary>Click to see test inspiration if you're stuck</summary>

```typescript
// Example test structure - try writing your own first!
it('should calculate monthly payment for a 30-year mortgage', () => {
  const calculator = new LoanCalculator();
  const loan: LoanRequest = {
    principal: 300000,
    annualRate: 0.05,
    termInMonths: 360
  };
  
  const payment = calculator.calculateMonthlyPayment(loan);
  expect(payment).toBeCloseTo(1610.46, 2);
});
```

</details>

### Real-World Context 🏦
Think about these scenarios while building:
- **Mortgages:** $300,000 at 5% for 30 years
- **Car loans:** $25,000 at 4% for 5 years  
- **Personal loans:** $10,000 at 12% for 3 years
- **Invalid inputs:** What happens with negative rates or zero principal?

### Getting Started:
1. **Run the empty test** to see it pass (no tests = green)
   ```bash
   npm run test loan
   ```

2. **Write your first test** - pick the simplest thing to test

3. **Watch it fail** (Red) - this is good!

4. **Write minimal code** to make it pass (Green)

5. **Refactor** if needed, then repeat

### Time Estimate: 45-60 minutes

**Remember:** The goal isn't to write perfect code immediately. It's to practice the TDD rhythm and build confidence through small, working steps.

**Discussion point:** As you work, think about:
- Which tests were easy to write vs. hard?
- When did you feel like "cheating" and writing more code than needed?
- How did the tests help you think about edge cases?

Ready to start? Write your first test! 🚀