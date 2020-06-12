let main =
`<!-- Main app container -->
<div class="main-view-container">
  <!-- wrapped cash and debt totals -->
  <p>Account</p>
  <div class="cash-debt-wrapper">
    <!-- cash -->
    <div class="column">
      <p class="cash">Balance</p>
      <p class="debt">Debt</p>
    </div>
    <!-- debt -->
    <div class="column">
      <p class="cash-display"> £0 </p>
      <p class="debt-display">£0</p>
    </div>
  </div>
  <hr>
  <!-- Budget -->
  <div class="budget-wrapper">
    <p>Budget</p>
    <div class="bar-wrapper">
      <div id="bar"></div>
    </div>
  </div>
  <hr>
  <!-- Cash Flow -->
  <div class="cash-flow-wrapper">
    <div class="column">
      <p>Cash Flow</p>
      <div class="flow-bar-wrapper">
        <div id="income-bar"></div>
        <p id="income">£0</p>
      </div>
      <div class="flow-bar-wrapper">
        <div id="expenses-bar"></div>
        <p id="expenses">£0</p>
      </div>        
    </div>
    <div class="column">
      <br>
      <div class="net-wrapper">
        <p id="net-profit">£0</p>
      </div>
    </div>
  </div>
  <hr>
  <!-- Spending Chart -->
  <div class="spending-chart-wrapper">
    <p>Spending Chart</p>
    <div id="chart"></div>
    <!-- <div class="column">
    </div> -->
    <!-- <div class="column">
      <div class="circle rent"></div>
      <p>Rent</p>
      <div class="circle transport"></div>
      <p>Transport</p>
      <div class="circle groceries"></div>
      <p>Groceries</p>
    </div> -->
  </div>
  <hr>
  <!-- High Spending Alerts -->
  <div class="alerts-wrapper">
    <div class="column">
      <p>Alerts</p>
      <p>
      High Spendings
      <br>
      (Above the average)
      </p>
    </div>
    <div class="column">
      <div class="box">
        <p id="alert">0</p>
      </div>
    </div>
  </div>
  <!-- Add a new record -->
  <div class="record-wrapper">
    <div id="record">+</div>
  </div>
  <!-- Record View -->
  <form class="record-view-container" id="form">
    <div class="description-wrapper">
      <label for="description">Description</label>
      <textarea name="description" id="description" cols="13" rows="5" required></textarea>
    </div>
    <div class="amount-wrapper">
      <label for="amount">Amount</label>
      <input type="number" name="amount" id="amount" required>
    </div>
    <div class="categories-wrapper">
      <label for="categories">Categories</label>
      <div class="box" id="categories">
        <div class="category">
          <input type="radio" name="categories" id="rent-check" value="rent" checked>
          <label for="rent-check">Rent</label>
        </div>
        <div class="category">
          <input type="radio" name="categories" id="transport-check" value="transport">
          <label for="transport-check">Transport</label>
        </div>
        <div class="category">
          <input type="radio" name="categories" id="groceries-check" value="groceries">
          <label for="groceries-check">Groceries</label>
        </div>
        <div class="category">
          <input type="radio" name="categories" id="other-check" value="other">
          <label for="other-check">Other</label>
        </div>
      </div>
    </div>
    <div class="buttons-wrapper">
      <div class="column">
        <p>Income</p>
        <input type="radio" name="type" id="income-box" value="income" checked>
        <label for="income-box" class="income box">+</label>
      </div>
      <div class="column">
        <p>Expense</p>
        <input type="radio" name="type" id="expense-box" value="expense">
        <label for="expense-box" class="expense box">-</label>
        
      </div>
    </div>
    <div class="sent-button-wrapper">
      <input type="button" id="submit" value="Add!">
    </div>
  </form>
</div>`

export default main;