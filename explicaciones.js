// Pruebas
// INMUTABILITY
// Inmutabilidad. -> los métodos son inmutables o mutables
//                -> las variables son inmutables o mutables

const edades = [3, 8, 2, 10, 23, 4];
console.log(edades);

// const funcionOrdenacion = function (a, b) {
//   return a - b;
// };

const funcionOrdenacion = (a, b) => a - b;
// El método sort NO ES INMUTABLE: cambia el array original
const edadesOrdenadas = edades.sort(funcionOrdenacion).sort((a, b) => b - a);
console.log(edadesOrdenadas);
console.log(edades);

// Inmutabilidad de variables
const estudiante = { nombre: 'Lola', edad: 23 };
console.log(estudiante, `estudiante antes de operar`);
const changeEstudiante = (obj1, obj2) => ({ ...obj1, ...obj2 });

const estudiante2 = changeEstudiante(estudiante, { nombre: 'pepita' });
console.log(estudiante2, `estudiante antes de operar`);
// changeEstudiante es inmutable

let nombre, edad;

// ({nombre,edad})= estudiante;

const letras = ['a', 'b', 'c', 'd', 'e'];
console.log(letras.slice(2), `Un slice(2) de letras`);
console.log(letras.slice(2, 4), `Un slice(2,4) de letras`);
console.log(letras, `Letras original`);

// slice() es un método inmutable

let copyLetras = [...letras];
// es lo mismo que
copyLetras = letras.slice();
console.log(copyLetras, `copyLetras`);

// splice() es un método mutable

// método reverse()

console.log(letras.reverse(), `CL de letras.reverse`);
console.log(letras, `reverse ha mutado letras`);

const letras2 = ['f', 'g', 'h'];
const alfabetoExtendido = letras.concat(letras2);
console.log(alfabetoExtendido, `Extendido`);
console.log(alfabetoExtendido.at(-1), `El último elemento del array`);

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const { movements } = account1;
console.log(movements, `movements extraido de account1`);
// movements.keys(object)
// movements.values(object)
for (const [key, value] of movements.entries()) {
  console.log(key + 1, value, ``);
}

movements.forEach((movement, index) => {
  if (movement > 0)
    console.log(`Movimiento ${index + 1}: Depósito de ${movement}`);
  else console.log(`Movimiento ${index + 1}: Retirada de ${movement}`);
});

console.log([1, 3, 7, 8].map(value => value * 2));

// filter vs find
// - FILTER:
//    --opera sobre todo el array
//    --devuelve otro array con los elementos que cumplen la condición
// - FIND:
//    --opera sobre parte/todo el array
//    --devuelve el primer elemento que cumple la condición
const boletos = [2, 5, 6, 12, 3, 7];
const boletoPremiado = 6;

const resultadoFind = boletos.find(boleto => boleto === boletoPremiado);
console.log(resultadoFind);
const resultadoFilter = boletos.filter(boleto => boleto === boletoPremiado);
console.log(resultadoFilter);

// buscar movimientos con find
const firstWithdrawal = account1.movements.find(mov => mov < 0);
console.log(firstWithdrawal, `firstWithdrawal`);

// buscar movimientos con filter
const firstWithdrawal2 = account1.movements.filter(mov => mov < 0)[0];
console.log(firstWithdrawal2, `firstWithdrawal2`);
