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
let myTime;
let timer;
let sortOrder = 'afterbegin';
let sortArrow = '↓ SORT';
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
    containerMovements.insertAdjacentHTML(sortOrder, html); // afterbegin para que se vean los movimientos últimos los primeros
  });
};
// const sortMovements = function (movements) {
//   console.log(movements, `movements antes del sort`);
//   movements.sort((a, b) => a - b);
//   console.log(movements, `movements después del sort`);
//   return movements;
// };
btnSort.addEventListener('click', function () {
  sortOrder = sortOrder === 'afterbegin' ? 'beforeend' : 'afterbegin';
  sortArrow = sortArrow === '↓ SORT' ? '↑ SORT' : '↓ SORT';
  btnSort.textContent = sortArrow;
  displayMovements(selectedAccount.movements);
  if (timer) clearInterval(timer);
  timer = startLogoutTimer();
});
const logout = function () {
  inputLoginUsername.value = inputLoginPin.value = '';
  if (timer) clearInterval(timer);
  if (myTime) clearTimeout(myTime);
  selectedAccount = null;
  containerApp.style.opacity = 0;
  // interroga primero si existe el objeto, caso que exista sigue ejecutando de lo contrario devuelve undefined (que se evalua como false) y no da un error de ejecución
  labelWelcome.textContent = `Log in to get started`;
  document.getElementById('hora').textContent = `Aquí debería estar la hora`;
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

function updateUI() {
  if (timer) clearInterval(timer);
  timer = startLogoutTimer();
  calcDisplayBalance(selectedAccount);
  displayMovements(selectedAccount.movements);
  displaySummary(selectedAccount);
}
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
    updateUI();
    if (myTime) clearTimeout(myTime);
    reloj();
    containerApp.style.opacity = 1;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // quita el foco del pin si lo tiene
  } else {
    console.log(`Datos de entrada incorrectos`);
  }
});

btnTransfer.addEventListener('click', function (e) {
  console.log(`Me han pulsado transferir`);
  e.preventDefault();
  const transferValue = Number(inputTransferAmount.value);
  const destinationUsername = inputTransferTo.value;
  if (selectedAccount.balance >= transferValue) {
    console.log(`El importe a transferir es correcto`);
    const destinationAccount = accounts.find(
      acc => acc.username === destinationUsername
    );
    console.log(transferValue, `transferValue`);
    console.log(destinationUsername, `destinationUsername`);
    console.log(destinationAccount, `destinationAccount`);
    if (
      destinationAccount &&
      destinationAccount.username !== selectedAccount.username
    ) {
      alert(
        `Vas a transferir ${transferValue} a la cuenta de ${destinationAccount.owner}`
      );
      destinationAccount.movements.push(Math.abs(transferValue));
      selectedAccount.movements.push(-Math.abs(transferValue));
      updateUI();
      inputTransferTo.value = inputTransferAmount.value = '';
      inputTransferAmount.blur(); // quita el foco del pin si lo tiene
    } else {
      console.log(`Cuenta de destino NO existe`);
    }
  } else {
    console.log(`No tienes fondos suficientes para transferir`);
  }
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const username = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  console.log(`Has pedido cerrar la cuenta de ${username} con pin ${pin}`);
  console.log(selectedAccount.username, `selectedAccount.username`);
  console.log(selectedAccount.pin, `selectedAccount.pin`);
  if (username === selectedAccount.username && pin === selectedAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === username);
    console.log(
      `elemento a eliminar del array accounts ${index},`,
      accounts[index]
    );
    accounts.splice(index, 1);
    console.log(accounts, `accounts después de borrar`);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  } else {
    console.log(`No se puede eliminar la cuenta`);
  }
});
// displayMovements(movements);
// calcDisplayBalance(account1);

// displayMovements(account1.movements);

// displaySummary(account1);
// selectedAccount = account2;
// console.log(selectedAccount.movements, `selectedAccount.movements`);
// console.log(selectedAccount.movements.includes(-150));

// MÉTODO SOME Y MÉTODO EVERY
// const isDeposit = mov => mov > 0;
// const anyDeposit = selectedAccount.movements.some(isDeposit);
// console.log(anyDeposit, `anyDeposit`);

// const allDeposit = selectedAccount.movements.every(isDeposit);
// console.log(allDeposit, `allDeposit`);
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.abs(Number(inputLoanAmount.value));
  console.log(amount, `Solicitado préstamo`);
  if (amount > 0 && selectedAccount.movements.some(mov => mov > amount * 0.1)) {
    console.log(`El importe solicitado está aprobado`);
    selectedAccount.movements.push(amount);
    console.log(selectedAccount.movements, `selectedAccount.movements`);
    updateUI();
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  } else {
    console.log(`No se aprueba esta cantidad de préstamo`);
  }
});
// const array1 = [1, 7, 4, 9, 0];
// const array2 = [[1, 6, 3], [9, 0], 3, [34, 45, 89]];

// console.log(array2.flat(2));

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur, i, arr) => acc + cur, 0);
console.log(overallBalance);
console.log(
  accounts.map(acc => acc.movements),
  `account.map`
);

const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur, i, arr) => acc + cur, 0);
console.log(overallBalance2, `overallBalance2`);

setTimeout(() => {
  console.log(`Función ejecutada de forma asíncrona`);
}, 3000);
console.log(`Esto se mostrará 3 segundos antes`);

// setInterval -> asíncrona y que no se para (o la paramos nosotros)
// let i = 0;
// setInterval(() => {
//   i++;
//   console.log(i, `contador`);
// }, 1000);

function reloj() {
  const fecha = new Date();
  const meses = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Dicember',
  ];
  const dia = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Satruday',
  ];
  let hora = '';
  let minuto = '';
  let segundo = '';
  // alert(fecha);
  // alert(typeof fecha.getHours());
  hora = String(fecha.getHours());
  minuto = String(fecha.getMinutes());
  segundo = String(fecha.getSeconds());
  if (fecha.getHours() < 10) {
    hora = '0' + hora;
  }
  if (fecha.getMinutes() < 10) {
    minuto = '0' + minuto;
  }
  if (fecha.getSeconds() < 10) {
    segundo = '0' + segundo;
  }
  document.getElementById('hora').textContent =
    hora +
    ':' +
    minuto +
    ':' +
    segundo +
    ' of the ' +
    dia[fecha.getDay()] +
    ' ' +
    fecha.getDate() +
    ' of ' +
    meses[fecha.getMonth()] +
    ' of ' +
    fecha.getFullYear();
  // esta línea de arriba obliga a actualizar la ventana.
  myTime = setTimeout('reloj()', 1000);
}

function startLogoutTimer() {
  let time = 300;
  const printTime = time => {
    // conseguir padding de un 0 para valores inferiores a 10
    // const min =
    //   Math.trunc(time / 60) < 10
    //     ? '0' + Math.trunc(time / 60)
    //     : Math.trunc(time / 60);
    // const sec = time % 60 < 10 ? '0' + (time % 60) : time % 60;
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = (time % 60).toString().padStart(2, '0');
    labelTimer.textContent = `${min}:${sec}`;
  };
  const tick = () => {
    time--;
    if (time === 0) {
      // eliminar timer y hacer logout del usuario
      logout();
      clearInterval(timer);
    }
    printTime(time);
  };
  const timer = setInterval(tick, 1000);
  printTime(time);
  return timer;
}
