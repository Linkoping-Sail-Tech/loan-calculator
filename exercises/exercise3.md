# Exercise 3: Risk Assessment with Mocking

## Starter Code

`src/lib/risk.ts`:
```typescript
export interface Customer {
  id: string;
  annualIncome: number;
  existingDebt: number;
  employmentYears: number;
}

export interface CreditScore {
  score: number;
  source: string;
  date: Date;
}

export interface FraudCheck {
  riskLevel: 'low' | 'medium' | 'high';
  flags: string[];
}

export interface RiskResult {
  creditScore: number;
  debtToIncomeRatio: number;
  riskLevel: 'low' | 'medium' | 'high';
  approved: boolean;
  reasons: string[];
}

// External service interfaces (these will be mocked in tests)
export interface CreditBureauAPI {
  getCreditScore(customerId: string): Promise<CreditScore>;
}

export interface FraudDetectionAPI {
  checkFraud(customerId: string): Promise<FraudCheck>;
}

export class RiskAssessment {
  constructor(
    private creditAPI: CreditBureauAPI,
    private fraudAPI: FraudDetectionAPI
  ) {}

  // TODO: Implement these methods using TDD
  
  calculateDebtToIncome(customer: Customer): number {
    throw new Error('Not implemented');
  }
  
  async assessRisk(customer: Customer, loanAmount: number): Promise<RiskResult> {
    throw new Error('Not implemented');
  }
  
  private determineRiskLevel(creditScore: number, debtToIncomeRatio: number, fraudRisk: string): 'low' | 'medium' | 'high' {
    throw new Error('Not implemented');
  }
  
  private shouldApprove(riskLevel: string, creditScore: number): boolean {
    throw new Error('Not implemented');
  }
}
```

## Empty Test File

`src/tests/risk.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  RiskAssessment, 
  type Customer, 
  type CreditBureauAPI, 
  type FraudDetectionAPI 
} from '../lib/risk';

describe('RiskAssessment', () => {
  // TODO: Write your tests here using TDD approach
  // Remember to mock the external APIs but test the business logic for real
});
```

## Exercise Instructions

### Your Mission
Build a risk assessment system that evaluates loan applications by:
1. Calculating debt-to-income ratio (pure business logic - no mocking needed)
2. Fetching credit scores from external API (mock this)
3. Checking for fraud via external service (mock this) 
4. Making approval decisions based on combined risk factors
5. Handling API failures gracefully

### Key Mocking Strategy

Mock the external APIs:
- `CreditBureauAPI.getCreditScore()` - expensive external service
- `FraudDetectionAPI.checkFraud()` - third-party fraud detection

Test the business logic for real:
- Debt-to-income calculations
- Risk level determination
- Approval decision logic
- Error handling logic

### Business Rules for Risk Assessment

Debt-to-Income Ratio:
```
DTI = (existing debt + new loan payment) / annual income
```

Risk Levels:
- Low Risk: Credit score >= 750, DTI <= 0.28, no fraud flags
- Medium Risk: Credit score 650-749, DTI 0.28-0.36, low fraud risk
- High Risk: Credit score < 650, DTI > 0.36, medium/high fraud risk

Approval Rules:
- Approve: Low risk OR (Medium risk AND credit score >= 700)
- Deny: High risk OR any API failures

### TDD Approach - Start Simple

#### Suggested Test Progression:

1. Start with pure business logic (no mocks needed)
   - Test `calculateDebtToIncome()` with sample customer data

1. Add external API integration (introduce mocks)
   - Mock successful credit score API response
   - Test that business logic uses the mocked data correctly

1. Test different risk scenarios (various mock responses)
   - High credit score, low DTI = low risk
   - Low credit score, high DTI = high risk

1. Test error handling (mock API failures)
   - What happens when credit API throws an error?
   - What happens when fraud API is unreachable?

### Sample Test Setup Pattern

```typescript
describe('RiskAssessment', () => {
  let riskAssessment: RiskAssessment;
  let mockCreditAPI: CreditBureauAPI;
  let mockFraudAPI: FraudDetectionAPI;

  beforeEach(() => {
    // Create mock objects
    mockCreditAPI = {
      getCreditScore: vi.fn()
    };
    
    mockFraudAPI = {
      checkFraud: vi.fn()
    };
    
    // Inject mocks into the class under test
    riskAssessment = new RiskAssessment(mockCreditAPI, mockFraudAPI);
  });

  // Your tests go here...
});
```

### Common Mocking Patterns You'll Need

Mock successful API response:
```typescript
vi.mocked(mockCreditAPI.getCreditScore).mockResolvedValue({
  score: 750,
  source: 'Equifax',
  date: new Date()
});
```

Mock API failure:
```typescript
vi.mocked(mockCreditAPI.getCreditScore).mockRejectedValue(
  new Error('API temporarily unavailable')
);
```

Verify API was called correctly:
```typescript
expect(mockCreditAPI.getCreditScore).toHaveBeenCalledWith(customer.id);
```

### Sample Customer Data

```typescript
const sampleCustomer: Customer = {
  id: 'cust-123',
  annualIncome: 60000,
  existingDebt: 1200, // monthly debt payments
  employmentYears: 3
};
```

### Things to Consider While Testing

What to Mock:
- External API calls that cost money or are slow
- Services that might be unreachable
- Responses that are hard to reproduce (like fraud alerts)

What NOT to Mock:
- Your own business logic (debt-to-income calculations)
- Decision-making algorithms
- Data transformation logic

Error Scenarios to Test:
- Credit bureau API timeout
- Fraud detection service returns malformed data
- Network failures during API calls
- Customer ID not found in external systems

### Expected Outcome

By the end, you should have:
- A working risk assessment system
- Tests that use mocks appropriately for external dependencies
- Tests that verify business logic without over-mocking
- Confidence that your system handles API failures gracefully
- Understanding of when mocking helps vs hurts your tests

### Time Estimate: 60-75 minutes

### Getting Started

1. Run the empty test to confirm setup
   ```bash
   npm run test risk
   ```

2. Write your first test for the simplest business logic (debt-to-income calculation)

3. Make it pass with minimal implementation

4. Gradually add complexity with mocked external APIs

5. Test error scenarios by mocking API failures

Remember: Start with what you can test without mocks, then add the external dependencies. The goal is to practice healthy mocking patterns that make your tests more reliable, not more complex.
