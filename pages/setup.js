let setup = `
<!-- setup view -->
<form class="setup-wrapper">
  <label for="savings">Savings</label>
  <input type="number" name="savings" id="savings" required>
  <label for="debt">Debt</label>
  <input type="number" name="debt" id="debt" required>
  <label for="budget">Budget</label>
  <input type="number" name="budget" id="budget" required>
  <input type="submit" value="Next" id="next">
</form>`

export default setup;