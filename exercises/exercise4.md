# Afternoon Exercise: E2E Testing with Cypress

## Your Mission

You've built a banking application with loan calculations, account management, and risk assessment throughout the morning. Now it's time to test these features from the user's perspective using Cypress.

Goal: Write E2E tests that verify complete user workflows work correctly, testing the integration between your TDD'd business logic and the user interface.

## Setup

### Install Cypress
```bash
npm install --save-dev cypress
```

### Basic Cypress Configuration

`cypress.config.ts`:
```typescript
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e//*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: false
  }
})
```

### Directory Structure to Create
```
cypress/
├── e2e/
│   └── banking-app.cy.ts    # Your main test file
├── fixtures/
│   └── test-data.json       # Sample test data
└── support/
    ├── commands.ts          # Custom commands
    └── e2e.ts              # Support file
```

## Exercise Structure

### Part 1: Basic UI Integration Tests (30 minutes)

Test that your business logic integrates correctly with the Svelte UI. Focus on the core workflows:

Suggested Test Scenarios:
1. Loan Calculator Flow
   - User enters loan amount, rate, and term
   - System displays correct monthly payment
   - User sees total interest calculation

1. Account Balance Management
   - User can add deposits and withdrawals
   - Balance updates correctly
   - Transaction history displays

1. Risk Assessment Integration
   - User enters customer details
   - System evaluates risk level
   - Appropriate approval/denial message shows

### Part 2: Error Handling & Edge Cases (20 minutes)

Test how your application handles unexpected user behavior:

Ideas to Explore:
- What happens with invalid input (negative loan amounts, etc.)?
- How does the UI respond to calculation errors?
- Are validation messages clear and helpful?

### Part 3: Complete User Journey (25 minutes)

Create a comprehensive test that walks through a realistic banking scenario:

Example Journey:
1. Customer checks their account balance
2. Customer applies for a loan
3. System assesses risk and provides decision
4. Customer sees the results and next steps

## Getting Started

### 1. Create Your First Test File

`cypress/e2e/banking-app.cy.ts`:
```typescript
describe('Banking Application', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // Start with something simple
  it('should load the homepage', () => {
    // Write your first test here
    // What should users see when they visit your app?
  })

  // Add more tests as you go...
})
```

### 2. Run Cypress

```bash
# Start your Svelte app
npm run dev

# In another terminal, open Cypress
npx cypress open
```

### 3. Build Your UI First (If Needed)

If you don't have UI components yet, create simple Svelte pages that use your TDD'd classes:

Example: Simple loan calculator page
```svelte
<script lang="ts">
  import { LoanCalculator } from '$lib/loan';
  
  let principal = 0;
  let rate = 0;
  let term = 0;
  let monthlyPayment = 0;
  
  const calculator = new LoanCalculator();
  
  function calculate() {
    try {
      monthlyPayment = calculator.calculateMonthlyPayment({
        principal,
        annualRate: rate / 100,
        termInMonths: term * 12
      });
    } catch (error) {
      console.error(error);
    }
  }
</script>

<h1>Loan Calculator</h1>

<!-- Add your form inputs and results display here -->
<!-- Don't forget data-testid attributes for Cypress! -->
```

## Key Testing Guidelines

### Focus on User Experience
- Test what users actually do, not internal implementation
- Use realistic data and scenarios
- Think about the complete user journey

### Make Tests Reliable
- Use `data-testid` attributes for element selection
- Avoid testing CSS classes or internal DOM structure
- Let Cypress handle waiting automatically

### Keep Tests Maintainable
- Give tests descriptive names
- Group related tests in `describe` blocks
- Use custom commands for repeated actions

## Sample Test Ideas

### Loan Calculator Tests
```typescript
it('should calculate monthly payment for a 30-year mortgage', () => {
  // Fill out loan form
  // Verify calculation appears
  // Check that numbers make sense
})

it('should show error message for invalid input', () => {
  // Enter negative loan amount
  // Verify error handling
})
```

### Account Management Tests
```typescript
it('should update balance after adding transactions', () => {
  // Add a deposit
  // Add a withdrawal  
  // Verify balance is correct
  // Check transaction history
})
```

### Risk Assessment Tests
```typescript
it('should approve low-risk customers', () => {
  // Enter customer with high credit score
  // Apply for reasonable loan amount
  // Verify approval message
})

it('should deny high-risk applications', () => {
  // Enter customer with low credit score
  // Apply for large loan amount
  // Verify denial message and reasons
})
```

## Advanced Challenges (If You Finish Early)

### 1. Custom Commands
Create reusable Cypress commands for common actions:

```typescript
// cypress/support/commands.ts
Cypress.Commands.add('fillLoanApplication', (loanData) => {
  cy.get('[data-testid="loan-amount"]').type(loanData.amount.toString())
  cy.get('[data-testid="interest-rate"]').type(loanData.rate.toString())
  // ... etc
})

// Use in tests:
cy.fillLoanApplication({ amount: 250000, rate: 5.5, term: 30 })
```

### 2. Test Data Management
Use fixtures for consistent test data:

```json
// cypress/fixtures/customers.json
{
  "goodCredit": {
    "id": "good-customer",
    "creditScore": 780,
    "annualIncome": 75000,
    "existingDebt": 1200
  },
  "poorCredit": {
    "id": "risky-customer", 
    "creditScore": 580,
    "annualIncome": 35000,
    "existingDebt": 2800
  }
}
```

### 3. API Mocking
If your app makes external API calls, practice mocking them:

```typescript
cy.intercept('GET', '/api/credit-score/*', { fixture: 'credit-score.json' })
```

## Discussion Points to Consider

As you work, think about:

- What's the difference between testing your TDD'd business logic vs testing the complete user experience?
- When do E2E tests give you confidence that unit tests can't?
- What kinds of bugs would only be caught by E2E tests?
- How would you structure these tests in a real team environment?

## Time Allocation

- 30 minutes: Basic UI integration tests
- 20 minutes: Error handling and edge cases  
- 25 minutes: Complete user journey tests
- 15 minutes: Discussion and comparison of approaches

## Getting Help

Stuck on Cypress syntax? Check the Cypress documentation or ask for help.

Need UI components? Focus on simple, functional interfaces that demonstrate your business logic.

Not sure what to test? Think about what you'd manually click through to verify your app works.

## Expected Outcomes

By the end of this exercise, you should have:
- Working E2E tests that verify your morning's TDD work
- Experience with Cypress commands and best practices
- Understanding of when E2E tests add value beyond unit tests
- Confidence testing complete user workflows

Ready to test like your users? Start your development server and open Cypress!