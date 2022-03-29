// Juan y Marta están haciendo un  estudio sobre perros. Cada uno le pregunta a 5 propietarios de perros sobre la edad de sus perros  y lo almacenan en una matriz (una cada  uno).
// De momento solo están interesados en saber si son perros adultos o cachorros. un perro se considera adulto si tiene al  menos 3 años, y cachorro si tiene menos de 3 años.
// Crea una función *comprobarPerros* que acepte dos arrays de edades de perros y  haga las siguientes cosas:
// 1. Juan se ha dado cuenta de que el primer y los dos últimos perros que apuntó, ¡realmente eran gatos  y no perros! Así que crea una copia del array y elimina las edades de los gatos (es mala  práctica mutar los datos de los  parámetros de las funciones).
// 2. Crea un único array con los datos de edades corregidos, de ambos.
// 3. Para cada uno  de los perros muestra un texto  por consola que informe si el perro es adulto o cachorro con su  edad.
// 4. Ejecuta la función para los dos conjuntos de datos siguientes.
// TEST DATA 1: Juan [3, 5, 2, 12, 7], Marta [4, 1, 15, 8, 3]
// TEST DATA 2: Juan [9, 16, 6, 8, 3], Marta [10, 5, 6, 1, 4]

const perrosDeJuan = [3, 5, 2, 12, 7];
const perrosDeMarta = [4, 1, 15, 8, 3];
console.log(perrosDeJuan, `Perros de Juan antes`);
console.log(perrosDeMarta, `Perros de Marta antes`);

const comprobarPerros = (arr1, arr2) => {
  const perrosDeJuanCorregido = arr1.slice(0, 3);
  const perros = perrosDeJuanCorregido.concat(arr2);
  perros.forEach((perro, i) => {
    if (perro >= 3)
      console.log(`El perro nº ${i + 1} es adulto y tiene ${perro} años`);
    else console.log(`El perro nº ${i + 1} es cachorro y tiene ${perro} años`);
  });
  return perrosDeJuanCorregido;
};

const perrosDeJuanCorregido = comprobarPerros(perrosDeJuan, perrosDeMarta);
console.log(perrosDeJuanCorregido, `Perros de Juan después`);

const perrosDeJuanCorregido2 = comprobarPerros(
  [9, 16, 6, 8, 3],
  [10, 5, 6, 1, 4]
);
console.log(perrosDeJuanCorregido2, `Perros de Juan después de depués`);

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

// función que recibe movimientos y los devuelve en otra moneda
const eurToUSD = 1.09;

const movementsUSDDoble = account1.movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUSD)
  .map((mov, _, arr) => {
    console.log(arr, `array recibido en segundo map`);
    return mov * 2;
  })
  .map(mov => '$ ' + mov.toFixed(2));
console.log(movementsUSDDoble);

const deposits = account1.movements.filter(mov => mov > 0);
console.log(account1.movements, `Movimientos de account1`);
console.log(deposits, `Movimientos filtrados en deposits`);

// let totalDeposit = 0;
// deposits.forEach(item => (totalDeposit += item));

const totalDeposit = account1.movements
  .filter(mov => mov > 0)
  .reduce((acc, curVal, i, arr) => acc + curVal, 0);

// Método reduce recibe dos prámetros: una función de callback y el valor de inicio del primer prámetro
console.log(totalDeposit, `Total en depósito`);

const maxDeposit = account1.movements.reduce(
  (initialValue, newValue) =>
    newValue > initialValue ? newValue : initialValue,
  Number.NEGATIVE_INFINITY
);
console.log(maxDeposit, `Depósito de mayor valor`);

const maxDeposit2 = Math.max(...account1.movements);
console.log(maxDeposit2, `Depósito2 de mayor valor`);

const totalWithdrawal = account1.movements
  .filter(mov => mov < 0)
  .reduce((acc, curr) => acc + curr, 0);
console.log(totalWithdrawal, `Total Withdrawal`);

// ejercicio
// origen: [2,6,-10,8,30,2]
// resultado: {min: -10, max:30}

const origen = [2, 6, -10, 8, 30, 2];

const resultado = { min: Math.min(...origen), max: Math.max(...origen) };
console.log(resultado, `array convertido a objeto`);

const origen2 = [2, 6, -10, 8, 30, 2];

const resultado2 = {
  min: origen.reduce(
    (initialValue, newValue) =>
      newValue < initialValue ? newValue : initialValue,
    Number.POSITIVE_INFINITY
  ),
  max: origen.reduce(
    (initialValue, newValue) =>
      newValue > initialValue ? newValue : initialValue,
    Number.NEGATIVE_INFINITY
  ),
};
console.log(resultado2, `array2 convertido a objeto`);

// const origen3 = [2, 6, -10, 8, 30, 2];

// const resultado3 = origen3.reduce(
//   (acc, curr) => {
//     return {
//       min: Math.min(acc.min, curr),
//       max: Math.max(acc.max, curr),
//     };
//   },
//   {
//     min: Number.POSITIVE_INFINITY,
//     max: Number.NEGATIVE_INFINITY,
//   }
// );
// console.log(resultado3, `array3 convertido a objeto`);

const origen3 = [2, 6, -10, 8, 30, 2];

const resultado3 = origen3.reduce(
  (acc, curr) => ({
    min: Math.min(acc.min, curr),
    max: Math.max(acc.max, curr),
  }),
  {
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY,
  }
);
console.log(resultado3, `array3 convertido a objeto`);

console.log(origen, `array de origen`);
console.log(
  [...origen].sort((a, b) => a - b),
  `Ordenados`
);
console.log(origen, `array de origen de nuevo`);
