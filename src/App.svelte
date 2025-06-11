<script lang="ts">
  import AccountManager from "./lib/AccountManager.svelte";
</script>

<main>
  <div class="container">
    <header>
      <h1>Loan Calculator</h1>
    </header>
    <AccountManager />
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f5f6fa;
    color: #2c3e50;
  }

  main {
    min-height: 100vh;
    padding: 2rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    margin: 0;
  }
</style>
