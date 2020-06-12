let expenses = `
<!-- Expenses View -->
<div class="expenses-view-container">
  <div class="total-spend-wrapper">
    <p>Spent until today</p>
    <p id="total-spend">£0</p>
  </div>
  <!-- Expenses per category -->
  <div class="category-expenses-wrapper">
    <div class="row">
      <div class="icon">
        <i class="fas fa-home"></i>
      </div>
      <div class="percentage">
        <p>Rent</p>
        <p id="rent-percent">50%</p>
      </div>
      <div class="spending">
        <p id="rent-spent">£0</p>
      </div>
    </div>
  </div>
  <div class="category-expenses-wrapper">
    <div class="row">
      <div class="icon">
        <i class="fas fa-car"></i>
      </div>
      <div class="percentage">
        <p>Transport</p>
        <p id="transport-percent">50%</p>
      </div>
      <div class="spending">
        <p id="transport-spent">£0</p>
      </div>
    </div>
  </div>
  <div class="category-expenses-wrapper">
    <div class="row">
      <div class="icon">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <div class="percentage">
        <p>Groceries</p>
        <p id="groceries-percent">50%</p>
      </div>
      <div class="spending">
        <p id="groceries-spent">£0</p>
      </div>
    </div>
  </div>
  <div class="category-expenses-wrapper">
    <div class="row">
      <div class="icon">
      <i class="fas fa-money-bill-wave"></i>
      </div>
      <div class="percentage">
        <p>Other</p>
        <p id="other-percent">50%</p>
      </div>
      <div class="spending">
        <p id="other-spent">£0</p>
      </div>
    </div>
  </div>
</div>`

export default expenses;