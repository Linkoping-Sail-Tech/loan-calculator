<script lang="ts">
  import { Account, type Transaction } from '../lib/account';
  
  let account = new Account(1000); // Start with $1000
  let transactionAmount = 0;
  let transactionType: 'deposit' | 'withdrawal' = 'deposit';
  let errorMessage = '';
  
  function addTransaction() {
    if (transactionAmount <= 0) {
      errorMessage = 'Transaction amount must be greater than zero';
      return;
    }
    
    try {
      const transaction: Transaction = {
        id: `txn-${Date.now()}`,
        amount: transactionAmount,
        type: transactionType,
        date: new Date()
      };
      
      account.addTransaction(transaction);
      account = account; // Trigger reactivity
      
      // Reset form
      transactionAmount = 0;
      errorMessage = '';
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Transaction failed';
    }
  }
  
  $: balance = account.getBalance();
  $: history = account.getTransactionHistory();
</script>

<section class="account-manager">
  <h2 data-testid="account-title">Account Management</h2>
  
  <div class="balance-display" data-testid="balance-display">
    <h3>Current Balance</h3>
    <span class="balance" data-testid="account-balance" class:negative={balance < 0}>
      ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  </div>

  <form on:submit|preventDefault={addTransaction} data-testid="transaction-form">
    <div class="form-row">
      <div class="form-group">
        <label for="amount">Amount ($)</label>
        <input 
          id="amount"
          type="number" 
          bind:value={transactionAmount}
          data-testid="transaction-amount"
          min="0.01"
          step="0.01"
          placeholder="100.00"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="type">Type</label>
        <select 
          id="type"
          bind:value={transactionType}
          data-testid="transaction-type"
        >
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
      </div>
      
      <button 
        type="submit" 
        data-testid="add-transaction-button"
        disabled={transactionAmount <= 0}
      >
        Add Transaction
      </button>
    </div>
  </form>

  {#if errorMessage}
    <div class="error" data-testid="transaction-error">
      {errorMessage}
    </div>
  {/if}

  {#if history.length > 0}
    <div class="transaction-history" data-testid="transaction-history">
      <h3>Transaction History</h3>
      <div class="transactions">
        {#each history.slice(-10) as transaction, index}
          <div class="transaction" data-testid={`transaction-${index}`}>
            <span class="transaction-type" class:deposit={transaction.type === 'deposit'} class:withdrawal={transaction.type === 'withdrawal'}>
              {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </span>
            <span class="transaction-date">
              {transaction.date.toLocaleDateString()}
            </span>
            <span class="transaction-id">
              {transaction.id}
            </span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  .account-manager {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-top: 2rem;
  }

  .balance-display {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 4px;
  }

  .balance {
    font-size: 2rem;
    font-weight: bold;
    color: #27ae60;
  }

  .balance.negative {
    color: #e74c3c;
  }

  .form-row {
    display: flex;
    gap: 1rem;
    align-items: end;
    margin-bottom: 1rem;
  }

  .form-group {
    flex: 1;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    padding: 0.5rem 1rem;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
  }

  button:hover:not(:disabled) {
    background: #2980b9;
  }

  button:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }

  .error {
    background: #e74c3c;
    color: white;
    padding: 0.75rem;
    border-radius: 4px;
    margin-top: 1rem;
  }

  .transaction-history {
    margin-top: 2rem;
  }

  .transactions {
    max-height: 300px;
    overflow-y: auto;
  }

  .transaction {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border-bottom: 1px solid #eee;
  }

  .transaction:last-child {
    border-bottom: none;
  }

  .transaction-type {
    font-weight: bold;
    min-width: 80px;
  }

  .transaction-type.deposit {
    color: #27ae60;
  }

  .transaction-type.withdrawal {
    color: #e74c3c;
  }

  .transaction-date {
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .transaction-id {
    color: #bdc3c7;
    font-size: 0.8rem;
    font-family: monospace;
  }

  @media (max-width: 600px) {
    .form-row {
      flex-direction: column;
    }
  }
</style>