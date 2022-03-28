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
