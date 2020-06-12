import nav from './pages/nav.js';
import  startup from './pages/startup.js';
import  setup from './pages/setup.js';
import main from './pages/main-view.js';
import expenses from './pages/expenses-view.js';

let root = document.getElementById('app');

// ---------------------- Model(data) ----------------------
class Model {
  constructor() {
    // store all the data for transaction and the basic statement
    this.data = {
      statement: {
        balance: 0,
        debt: 0,
        budget: 0
      },
      transactions: [
        // {
        //   description: 'test1',
        //   category: 'grocery',
        //   amount: 100,
        //   type: 'income',
        // },
        // {
        //   description: 'test2',
        //   category: 'rent',
        //   amount: 100,
        //   type: 'expense',
        // },
        // {
        //   description: 'test3',
        //   category: 'transport',
        //   amount: 100,
        //   type: 'expense',
        // },
      ]
    }
  }

  navbar() {
    return document.querySelector('.navbar-wrapper')
  }

  startupBtn() {
    return document.getElementById('start-btn');
  }
  
  nextBtn() {
    return document.getElementById('next');
  }

  mainViewElements() {
    const balance = document.querySelector('.cash-display');
    const debt = document.querySelector('.debt-display');
    const budget = document.querySelector('#bar');
    const incomeBar = document.querySelector('#income-bar');
    const expenseBar = document.querySelector('#expenses-bar');
    const income = document.querySelector('#income');
    const expenses = document.querySelector('#expenses');
    const net = document.querySelector('#net-profit');
    const alert = document.querySelector('#alert');
    return [balance, debt, budget, incomeBar, expenseBar, income, expenses, net, alert]
  }

  totalIncome() {
    return this.getTotal(this.data, 'income');
  }

  totalExpenses() {
    return this.getTotal(this.data, 'expense');
  }

  getbudget(budget) {
    return (this.totalExpenses() / parseFloat((budget)) * 100); 
  }

  getTotal(data, type) {
    const total = data['transactions']
    .filter(log => log['type'] === type)
    .reduce((a, b) => a += b['amount'], 0);
    return total
  }

  chartOptions() {
    let options = {
      series: [this.getCategoryTotalPercent('rent'), 
      this.getCategoryTotalPercent('transport'), 
      this.getCategoryTotalPercent('groceries'), 
      this.getCategoryTotalPercent('other')],
      chart: {
      width: 300,
      type: 'pie',
    },
    labels: ['Rent', 'Transport', 'Groceries', 'Other'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
    };
    return options;
  }

  getCategoryTotalPercent(category) {
    const total = this.data['transactions']
    .filter(transaction => transaction['type'] === 'expense' && transaction['category'] === category)
    .reduce((a, b) => a + b['amount'], 0);
    if(isNaN(((total / this.totalExpenses()) * 100))) {
      return 0
    } else {
      return ((total / this.totalExpenses()) * 100);
    }
  }

  getCategoryTotalAmount(category) {
    const total = this.data['transactions']
    .filter(transaction => transaction['type'] === 'expense' && transaction['category'] === category)
    .reduce((a, b) => a + b['amount'], 0);
    return total;
  }

  updateAlerts() {
    const totalExpenseItems = this.data['transactions']
    .filter(transaction => transaction['type'] === 'expense')
    .length
    const averageExpense = parseFloat(this.totalExpenses()) / parseFloat(totalExpenseItems);
    const alerts = this.data['transactions']
    .filter(transaction => transaction['type'] === 'expense' && transaction['amount'] > averageExpense).length;
    return alerts
  }
  
  setupViewData() {
    let savings = document.getElementById('savings').value;
    let debt = document.getElementById('debt').value;
    let budget = document.getElementById('budget').value;
    this.data['statement']['balance'] = savings.length < 1 ? savings = 0 : parseFloat(savings)
    this.data['statement']['debt'] = debt.length < 1 ? debt = 0 : parseFloat(debt)
    this.data['statement']['budget'] = budget.length < 1 ? budget = 0 : parseFloat(budget)
  }
  
  page() {
    return document.getElementById('page');
  }

  recordViewData() {
    let description = document.getElementById('description').value;
    let category = this.getCategory();
    let amount = parseFloat(document.getElementById('amount').value);
    let type = document.getElementById('income-box').checked ? 'income' : 'expense';
    if(!isNaN(amount)) {
      let obj = {
        description,
        category,
        amount,
        type
      }
      this.data['transactions'].push(obj);
      this.updateSavings(obj);
    }
  }

  updateSavings(obj) {
    if(obj['type'] === 'income') {
      this.data['statement']['balance'] += obj['amount'];
   } if(obj['type'] === 'expense') {
     this.data['statement']['balance'] -= obj['amount'];
    }
    document.getElementById('form').reset();
  }

  getCategory() {
    const categories = Array.from(document.getElementById('categories').children);
    const checked = categories.filter(category => {
      if(category.firstElementChild.checked) {
        return category;
      }
    })
    return checked[0].firstElementChild.value;
  }

  expensesViewElements() {
    const rentPerc = document.getElementById('rent-percent');
    const transportPerc = document.getElementById('transport-percent');
    const groceriesPerc = document.getElementById('groceries-percent');
    const otherPerc = document.getElementById('other-percent');
    const rentTotal = document.getElementById('rent-spent');
    const transportTotal = document.getElementById('transport-spent');
    const groceriesTotal = document.getElementById('groceries-spent');
    const otherTotal = document.getElementById('other-spent');
    const totalSpend = document.getElementById('total-spend');
    return [rentPerc, transportPerc, groceriesPerc, otherPerc,
      rentTotal, transportTotal, groceriesTotal, otherTotal, totalSpend];
  }

  cashFlowRatio() {
    if(!isNaN(app.model.totalExpenses() / (app.model.totalExpenses() + app.model.totalIncome()) * 100)) {
      return (app.model.totalExpenses() / (app.model.totalExpenses() + app.model.totalIncome()) * 100);
    } else {
      return 0;
    }
  }
}

// ---------------------- View(UI) ------------------------- 
class View {
  // render the navbar statically, to don't have event problems
  navbarRender() {
    const navbar = document.createElement('div');
    navbar.className = 'navbar-wrapper';
    navbar.innerHTML = nav;
    const pageContainer = document.createElement('div');
    pageContainer.className = 'page-container';
    pageContainer.id = 'page';
    if(root.children.length <= 2){
      root.appendChild(navbar);
      root.appendChild(pageContainer);
    }
  }

  // render method - gets the target element and render dynamicaly the related page
  render(page) {
    if(page === startup) {
      this.navbarRender();
      root.children[0].style.display = 'none';
      root.children[1].innerHTML = startup;
    } 
    else {
      root.children[0].style.display = 'flex';
      root.children[1].innerHTML = page;
    }
  }

  // update the main view element values
  mainViewUpdate(data, element, getbudget, cashFlowRatio,totalIncome, totalExpenses, updateNet, updateAlerts) {
    element[0].textContent = `£${data['statement']['balance']}`;
    element[1].textContent = `£${data['statement']['debt']}`;
    element[2].style.width = `${getbudget}%`;
    // call the budget control method to check the color of the bar
    this.budgetControl(getbudget, element[2]);
    element[3].style.width = `${100 - cashFlowRatio}%`;
    element[4].style.width = `${cashFlowRatio}%`;
    element[5].textContent = `£${totalIncome}`;
    element[6].textContent = `£${totalExpenses}`;
    element[7].textContent = `£${updateNet}`;
    element[8].textContent = updateAlerts;
  }

  // change color of the budget bar when reach limit
  budgetControl(getbudget, bar) {
    if(getbudget  > 100) {
      bar.style.background = '#FF4C40';
      bar.style.width = '100%';
    } else {
      bar.style.background = '#1253FC';
    }
  }

  recordViewControl(control) {
    if(control === 'show') {
      document.querySelector('.record-view-container').style.display = 'grid';
    } else {
      document.querySelector('.record-view-container').style.display = 'none';
    }
  }

  expensesViewUpdate(element, total) {
    // category total percent
    element[0].textContent = `${app.model.getCategoryTotalPercent('rent').toFixed(1)}%`;
    element[1].textContent = `${app.model.getCategoryTotalPercent('transport').toFixed(1)}%`;
    element[2].textContent = `${app.model.getCategoryTotalPercent('groceries').toFixed(1)}%`;
    element[3].textContent = `${app.model.getCategoryTotalPercent('other').toFixed(1)}%`;
    // total category expense
    element[4].textContent = `£${app.model.getCategoryTotalAmount('rent').toFixed(1)}`;
    element[5].textContent = `£${app.model.getCategoryTotalAmount('transport').toFixed(1)}`;
    element[6].textContent = `£${app.model.getCategoryTotalAmount('groceries').toFixed(1)}`;
    element[7].textContent = `£${app.model.getCategoryTotalAmount('other').toFixed(1)}`;
    // display total spend
    element[8].textContent = `£${total}`;
  }
}

class Controler {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  // create an init method to give a starting order
  init() {
    this.startupView();
  }

  navigation(links) {
    links.addEventListener('click', e => {
      this.navigationActiveLink(e.target)
      if(e.target.textContent === 'Overview') {
        this.mainView();
      } if(e.target.textContent === 'Expenses'){
        this.expensesView();
      } if(e.target.textContent === 'Setup') {
        this.setupview();
      }
    })
  }

  // make the active link bold while navigating
  navigationActiveLink(clickTarget, customTarget='') {
    Array.from(this.model.navbar().firstElementChild.children).forEach(link => {
      if (clickTarget.className === 'link') {
        link.className = 'link';
        if(link === clickTarget) {
          link.className = 'link active';
        } else {
          link.className = 'link';
        }
      }
      if(clickTarget === 'custom') {
        link.className = 'link';
        if(link.textContent === customTarget) {
          link.className = 'link active'
        } else {
          link.className = 'link';
        }
      }
    })
  }

  startupView() {
    // start with the +++ start up page +++ by call the startup method
    this.view.render(startup);
    // add an event listener to #start-btn
    this.model.startupBtn().addEventListener('click', () => {
      // if clicked call the setup method
      this.setupview();
    })
  }
  
  setupview() {
    // call render method an pass in the setup page as a parameter
    this.view.render(setup);
    // call navigation method
    this.navigation(this.model.navbar());
    // reset the transactions
    this.model.data['transactions'] = [];
    // add an event listener to #next
    this.model.nextBtn().addEventListener('click', e => {
      e.preventDefault();
      // call the setupViewData method
      this.model.setupViewData();
      //  call the mainView method
      this.mainView();
    })
    // call active link method
    this.navigationActiveLink('custom', 'Setup');
  }
  
  mainView() {
    // render the main view
    this.view.render(main);
    // call active link method
    this.navigationActiveLink('custom', 'Overview');
    // render the chart
    // this.model.chartData().render();
    var chart = new ApexCharts(document.querySelector("#chart"), this.model.chartOptions());
    this.model.data['transactions'].length > 1 ? chart.render() : '';
    // call mainViewUpdate method
    this.view.mainViewUpdate(this.model.data, this.model.mainViewElements(), this.model.getbudget(parseFloat(this.model.data['statement']['budget'])), this.model.cashFlowRatio(),this.model.totalIncome(), this.model.totalExpenses(), this.updateNet(), this.model.updateAlerts());
    // add an event listener to page
    this.model.page().addEventListener('click', e => {
      if(e.target.id === 'record') {
        // call the recordViewControl(event)
        this.view.recordViewControl('show');
      } else if (e.target.id === 'submit') {
        e.preventDefault();
        this.model.recordViewData();
        // render the page again
        this.view.render(main);
        // call mainViewUpdate method
        this.view.mainViewUpdate(this.model.data, this.model.mainViewElements(), this.model.getbudget(parseFloat(this.model.data['statement']['budget'])), this.model.cashFlowRatio(),this.model.totalIncome(), this.model.totalExpenses(), this.updateNet(), this.model.updateAlerts());
        // call the recordViewControl(event) and hide the record view
        this.view.recordViewControl('hide');
        // render the chart
        var chart = new ApexCharts(document.querySelector("#chart"), this.model.chartOptions());
        this.model.data['transactions'].length > 1 ? chart.render() : '';
      }
    })
  }

  updateNet() {
    return this.model.data['statement']['balance'] - 
            this.model.data['statement']['debt'];
  }

  expensesView() {
    // render the expenses view
    this.view.render(expenses);
    // call active link method
    this.navigationActiveLink('custom', 'Expenses');
    // call the expensesViewUpdate
    this.view.expensesViewUpdate(this.model.expensesViewElements(), this.model.totalExpenses());
  }

  // ONE expenseViewUpdate() 

}

const app = new Controler(new Model, new View);






















// class UI {
//   constructor(root){
//     this.root = root;
//   }

//   render(component){
//     this.root.innerHTML = component;
//   }

//   mainUI () {
//     this.savings = setupPage.data[0]['statement']['savings'];
//     this.debt = setupPage.data[0]['statement']['debt'];
//     this.budget = setupPage.data[0]['statement']['budget'];
//     document.querySelector('.main-view-container').addEventListener('click', e => {
//       if(e.target.id === 'record') {
//         document.querySelector('.record-view-container').style.display = 'grid';
//         document.querySelector('.record-view-container').addEventListener('click', e => { this.recordView(e) });
//       }  
//     })
//     this.setBudgetBar();
//     document.querySelector('.cash-display').textContent = `£${this.savings ? this.savings : '0'}`;
//     document.querySelector('.debt-display').textContent = `£${this.debt ? this.debt : '0'}`;
//     document.getElementById('net-profit').textContent = `£${this.savings ? this.savings - this.debt : '0'}`;
//     }

//     recordView(e) {
//       if(e.target.id === 'submit') {
//         document.querySelector('.record-view-container').style.display = 'none';
//         document.querySelectorAll('.category').forEach(element => {
//           if(element.firstElementChild.checked) {
//             this.categories = element.firstElementChild.value;
//           }
//         });
//         this.description = document.getElementById('description').value;
//         this.amount = document.getElementById('amount').value;
//         this.checkType = document.getElementById('income-box');
//         this.type = this.checkType.checked ? 'income' : 'expense';
//         let obj = {
//           'description': this.description,
//           'category': this.categories,
//           'amount': parseFloat(this.amount),
//           'type': this.type
//         }
//         if(obj['description'].length > 0 && obj['amount']){
//           setupPage.data[1]['logs'].push(obj);
//         }
//         // if(obj['type'] === 'expense') {
//         //   setupPage.data[0]['statement']['savings'] -= obj['amount'];
//         // }
//         this.getTotal(obj['type'], this.savings);
//         this.setBudgetBar();
//         document.getElementById('form').reset();
//       }
//     }

//     getTotal(transactionType) {
//       console.log(transactionType);
//       this.total = setupPage.data[1]['logs']
//       .filter(log => log['type'] === transactionType)
//       .reduce((a, b) => a + b['amount'], 0);
//       this.incomeList = setupPage.data[1]['logs']
//       .filter(log => log['type'] === transactionType)
//       this.lastIncome = this.incomeList[this.incomeList.length - 1]['amount'];
//       if(transactionType === 'income') {
//         setupPage.data[0]['statement']['savings'] += this.lastIncome;
//         document.getElementById('income').textContent = `£${this.total}`;
//       } else {
//         setupPage.data[0]['statement']['savings'] -= this.lastIncome;
//         document.getElementById('expenses').textContent = `£${this.total}`;
//       }
//     }
    
//     setBudgetBar() {
//       this.budgetBarPercentage = (this.totalExpenses / this.budget) * 100;
//       document.getElementById('bar').style.width = `${this.budgetBarPercentage}%`;
//       if(this.budgetBarPercentage > 100) {
//         document.getElementById('bar').style.background = '#FF4C40';
//         document.getElementById('bar').style.width = "100%";
//       }
//     }
// }

// class Router extends UI {
//   constructor() {
//     super();
//     const navLinks = document.querySelectorAll('.nav-links li');
//     const lsEmpty = true;
//     this.checkStartUp();
//     this.navigate();
//   }

//   navigate(){
//     app.addEventListener('click', e => {
//       if(e.target.tagName === 'A') {
//         if(e.target.textContent === 'Overview') {
//           ui.render([nav, main]);
//           document.querySelectorAll('.nav-links li')[0].classList.add('active');
//           ui.mainUI();
//         } else if (e.target.textContent === 'Expenses') {
//           ui.render([nav, expenses]);
//           document.querySelectorAll('.nav-links li')[1].classList.add('active');
//         } else if (e.target.textContent === 'Setup') {
//           ui.render([nav, setup]);
//           document.querySelectorAll('.nav-links li')[2].classList.add('active');
//           setupPage.getStatement();
//         }
//         this.current = e.target.parentElement;
//         this.current.classList.add('active');
//       }
//     })
//   }

//   checkStartUp() {
//     if(LocalStore.checkLocalStorage('data') === null) {
//       ui.render(startup);
//       document.getElementById('start-btn')
//         .addEventListener('click', e => {
//           ui.render([nav, setup]);
//           document.querySelectorAll('.nav-links li')[2].classList.add('active');
//           setupPage.getStatement();
//         })
//     } else {
//       ui.render([nav, main]);
//       ui.mainUI()
//       document.querySelectorAll('.nav-links li')[0].classList.add('active');
//     }
//   }
// }

// class LocalStore {
//   static checkLocalStorage(data) {
//     return localStorage.getItem(data);
//   }
// }

// class SetupView {
//   constructor() {
//     this.data = [{'statement':[]},{'logs':[]}];
//   }

//   getStatement() {
//     document.querySelector('.setup-wrapper').addEventListener('submit', e => {
//       e.preventDefault();
//       let savings = document.getElementById('savings').value; 
//       let debt = document.getElementById('debt').value; 
//       let budget = document.getElementById('budget').value; 
//       let obj = {
//         'savings': parseFloat(savings),
//         'debt': debt,
//         'budget': budget
//       }
//       this.data[0]['statement'] = obj;
//       ui.render([nav, main]);
//       ui.mainUI();
//       document.querySelectorAll('.nav-links li')[0].classList.add('active');
//     })
//   }
// }

// const ui = new UI(app);
// const navigate = new Router();
// const setupPage = new SetupView();




// localStorage.setItem('a', 'adad');
// localStorage.setItem('data', 'adad');