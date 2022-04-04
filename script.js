'use strict';

/// //////////////////////////////////////////////
/// //////////////////////////////////////////////
// BANKIST APP
const cargasPagina = localStorage.getItem('cargasPagina') || 0;
localStorage.setItem('cargasPagina', Number(cargasPagina) + 1);
console.log(cargasPagina, `Número de veces página cargada`);
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// const { movements } = account1;

const displayMovements = function (movements) {
  // calcular y mostrar depósitos
  containerMovements.innerHTML = '';
  movements.forEach((value, i) => {
    const type = value > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class='movements__row'>
          <div class='movements__type movements__type--${type}'>${
      i + 1
    } ${type}</div>
          <div class='movements__value'>${value}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('beforeend', html);
    // console.log(value, i, `dentro bucle x`);
  });
};

// función que inserta un campo nuevo, llamado username que tenga las iniciales
const createUserNames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word.at(0))
      .join('');
  });
};
createUserNames(accounts);

function calcDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${acc.balance}€`;
}
function displaySummary(acc) {
  // calcular y mostrar depósitos
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur, i, arr) => acc + cur, 0);

  labelSumIn.textContent = `${incomes}€`;

  // calcular y mostrar retiradas de dinero
  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur, i, arr) => acc + cur, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  // calcular y mostrar intereses
  // const interest = (incomes *acc.interestRate) / 100
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest > 1)
    .reduce((acc, cur, i, arr) => acc + cur, 0);
  labelSumInterest.textContent = `${interest}€`;
}
const currentAccount = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(currentAccount, `Usuario del currentAccount`);
let selectedAccount;
btnLogin.addEventListener('click', function (e) {
  // la función del EventListener envía por defecto el parámetro con el evento
  console.log(`Me han pulsado login`);
  e.preventDefault();
  // Obtener la cuenta que nos interesa
  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);
  selectedAccount = accounts.find(acc => acc.username === username);
  console.log(selectedAccount, `cuenta asociada a usuario tecleado`);
  if (selectedAccount?.pin === pin) {
    // interroga primero si existe el objeto, caso que exista sigue ejecutando de lo contrario devuelve undefined (que se evalua como false) y no da un error de ejecución
    labelWelcome.textContent = `Bienvenido ${
      selectedAccount.owner.split(' ')[0]
    }`;
    calcDisplayBalance(selectedAccount);
    displayMovements(selectedAccount.movements);
    displaySummary(selectedAccount);
    containerApp.style.opacity = 1;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // quita el foco del pin si lo tiene
  } else {
    console.log(`Datos de entrada incorrectos`);
  }
});

btnTransfer.addEventListener('click', function (e) {
  console.log(`Me han pulsado login`);
  e.preventDefault();
  const transferValue = Number(inputTransferAmount.value);
  if (selectedAccount.balance >= transferValue)
    console.log(`El importe a transferir es correcto`);
});

// displayMovements(movements);
// calcDisplayBalance(account1);

// displayMovements(account1.movements);

// displaySummary(account1);
console.log(accounts);

db.