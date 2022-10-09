//https://www.javascripttutorial.net/es6/javascript-yield/
//1)Javascript usa un modelo asíncrono y no bloqueante, con un loop de eventos implementado en un 
//sólo hilo, (single thread) para operaciones de entrada y salida (input/output).

//Type thread
//*) Synchronous: The response happens in the present, a synchronous operation will wait for the result.
//*) Asynchronous: The response happens in the future, an asynchronous operation will not wait for the result.

//----------------------------------------------------------------
// *) JavaScript Closures: In JavaScript, a closure is a function that references 
//variables in the outer scope from its inner scope. The closure preserves the outer scope inside its inner scope.
// *) In ES6, you can use the let keyword to declare a variable that is block-scoped.

function greeting() {
    let message = 'Hi';
    function sayHi() {
        console.log(message);
    }
    sayHi();
}
greeting();



//----------------------------------------------------------------
// 3) Async / Await: Las funciones asíncronas (async / await) surgen para simplificar el manejo de las promesas.
// 3.1) La palabra async declara una función como asíncrona e indica que una promesa será automáticamente devuelta.
// 3.2) La palabra await debe ser usado siempre dentro de una función declarada como async y esperará 
//de forma asíncrona y no bloqueante a que una promesa se resuelva o rechace.

function cuadradoPromise(value) {
    if (typeof value !== "number") {
      return Promise.reject(
        `Error, el valor " ${value} " ingresado no es un número`
      );
    }
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          value,
          result: value * value,
        });
      }, 0 | (Math.random() * 1000));
    });
}

async function funcionAsincronaDeclarada() {
    try {
      console.log("Inicio Async Function");
      let obj = await cuadradoPromise(0);
      console.log(`Async Function: ${obj.value}, ${obj.result}`);

    } catch (err) {
      console.error(err);
    }
  }




//----------------------------------------------------------------
// *) Función bind: Al pasar métodos de objeto como devoluciones de llamada, por ejemplo a 
//setTimeout, se genera un problema conocido: la "pérdida de this".
// *.1) Las funciones proporcionan un método incorporado bind que permite fijar a this.

let user = {
    firstName: "John"
  };
  
  function func() {
    alert(this.firstName);
  }
  
  let funcUser = func.bind(user);
  funcUser();



//----------------------------------------------------------------
//*) JavaScript rest parameters
//*.1) ES6 provides a new kind of parameter so-called rest parameter that has a prefix of three dots (...). 
//A rest parameter allows you to represent an indefinite number of arguments as an array. 
//See the following syntax:

function sum(...args) {
  let total = 0;
  for (const a of args) {
      total += a;
  }
  return total;
}

sum(1, 2, 3);

// Arrow functions
const combine = (...args) => {
  return args.reduce(function (prev, curr) {
    return prev + ' ' + curr;
  });
};

let message = combine('JavaScript', 'Rest', 'Parameters'); // =>
console.log(message); // JavaScript Rest Parameters




//----------------------------------------------------------------
//Promises:  a promise is an object that encapsulates the result of an asynchronous operation.
//A promise object has a state that can be one of the following: Pending, Fulfilled with a value, 
//Rejected for a reason
// Consuming a Promise: then, catch, finally
// Consuming a Promise:  await es usado para esperar a una Promise y async function.
// You can catch the error by using the try...catch statement, the same way as a regular throw statement:

//example 1
async function f3() {
  try {
    var z = await Promise.reject(30);
  } catch(e) {
    console.log(e); // 30
  }
}
f3();

//example 2
function getUsers() {
  return new Promises((resolve, reject)=>{
    let users = [];
    setTimeout(() => {
      users = [
        { username: 'john', email: 'john@test.com' },
        { username: 'jane', email: 'jane@test.com' },
      ];
      resolve(users);
    }, 1000);
  })

}

async function findUser(username) {
  const users = await getUsers(); 
  const user = users.find((user) => user.username === username); // B
  return user;
}

console.log(findUser('john'));



//----------------------------------------------------------------
//JavaScript promise chaining: JavaScript promise chaining pattern that chains the 
//promises to execute asynchronous operations in sequence.
//Sometimes, you want to execute two or more related asynchronous operations, 
//where the next operation starts with the result from the previous step

//example 1
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve(10);
  }, 3 * 100);
});

//Chaining result accumulative
p.then((result) => {
  console.log(result); // 10
  return result * 2;
}).then((result) => {
  console.log(result); // 20
  return result * 3;
}).then((result) => {
  console.log(result); // 60
  return result * 4;
});

//Separate results 
p.then((result) => {
  console.log(result); // 10
  return result * 2;
})

p.then((result) => {
  console.log(result); // 10
  return result * 3;
})

p.then((result) => {
  console.log(result); // 10
  return result * 4;
});


//----------------------------------------------------------------
//Returning a Promise: When you return a value in the then() method, the then() 
//method returns a new Promise that immediately resolves to the return value.
//example 1
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve(10);
  }, 3 * 100);
});

p.then((result) => {
  console.log(result);
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(result * 2);
      }, 3 * 1000);
  });
}).then((result) => {
  console.log(result);
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(result * 3);
      }, 3 * 1000);
  });
}).then(result => console.log(result));

//example 2
getUser(100)
    .then(getServices)
    .then(getServiceCost)
    .then(console.log);



//----------------------------------------------------------------
//promises all:  is useful to aggregate the results from multiple asynchronous operations.
// The Promise.all() returns a Promise that is rejected if any of the input promises are rejected

const p1 = new Promise((resolve, reject) => {
setTimeout(() => { console.log('The first promise has resolved'); resolve(10); }, 1 * 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => { console.log('The second promise has resolved'); resolve(20); }, 2 * 1000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => { console.log('The third promise has resolved'); resolve(30); }, 3 * 1000);
});

Promise.all([p1, p2, p3]).then((results) => {
  const total = results.reduce((p, c) => p + c);
  console.log(`Results: ${results}`);
  console.log(`Total: ${total}`);
});

//Promise.any() method accepts a list of Promise objects as an iterable object:
//In practice, you use the Promise.any() to return the first fulfilled promise. 
//Once a promise is fulfilled, the Promise.any() method does not wait for other promises to be complete. 
//In other words, the Promise.any() short-circuits after a promise is fulfilled.

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Promise 1 rejected');
    reject('error1');
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Promise 2 rejected');
    reject('error2');
  }, 2000);
});

const p = Promise.any([p1, p2]);
p.catch((e) => {
  console.log('Returned Promise');
  console.log(e, e.errors);
});

//The finally() method is always executed whether the promise is fulfilled or rejected. 
//In other words, the finally() method is executed when the promise is settled.
promise
    .then(result => {
        // process the result
    })
    .catch(error => {
        // handle the error
    })
    .finally(() => {
        // clean up the resources
    });



//Generator:
//Generators are created by the generator function function* f(){}.
//Generators do not execute its body immediately when they are invoked.
//Generators can pause midway and resumes their executions where they were paused. 
//The yield statement pauses the execution of a generator and returns a value.
//Generators are iterable so you can use them with the for...of loop.

function* forever() {
  let index = 0;
  while (true) {
      yield index++;
  }
}

let f = forever();
console.log(f.next()); // 0
console.log(f.next()); // 1
console.log(f.next()); // 2


//----------------------------------------------------------------
//What is currying in JavaScript?
//Currying simply means evaluating functions with multiple arguments 
//and decomposing them into a sequence of functions with a single argument.
//Currying is a checking method to make sure that you get everything you need before you proceed
//It helps you to avoid passing the same variable again and again
//It divides your function into multiple smaller functions that can handle one responsibility. 
//This makes your function pure and less prone to errors and side effects
//It is used in functional programming to create a higher-order function

//EXAMPLE 1
//Noncurried version
const add = (a, b, c)=>{
    return a+ b + c
}
console.log(add(2, 3, 5)) // 10

//Curried version//
const addCurry =(a) => {
    return (b)=>{
        return (c)=>{
            return a+b+c
        }
    }
}
console.log(addCurry(2)(3)(5)) // 10

//EXAMPLE 2
function sendRequest(greet){
  return function(name){
      return function(message){
          return `${greet} ${name}, ${message}`
      }
  }
}
sendRequest('Hello')('John')('Please can you add me to your Linkedin network?')

//EXAMPLE 3
  function send(name){
    
    function myName (name){
      return 'Name:' + name;
    }

    return function a(lastName){
      return myName(name) + lastName;
    }
  }

  send("angel")("Ruiz")


//----------------------------------------------------------------
//Las funciones flecha o arrow functions son funciones con una sintaxis 
//más compacta que aparecieron en ECMAScript 6.
//Las arrow functions fueron creadas para simplificar el scope de las funciones y 
//hacer uso de la palabra reservada this de una manera más clara.
//Heredan el contexto superior, mientras las functions regulares se mantienen en el contexto

//Example 1
const persona = {
	nombre: 'Agustin',
	
	decirNombre: function() {
		console.log(1, this.nombre); //Se mantiene en el contexto
	},
	
	decirNombreFuncionFlecha: () => {
		console.log(2, this.nombre) //Heredan el contexto superior: Windows
	},

  decirNombreFuncionFlechaTime: function() {
    const question = () =>{
      console.log(3, this.nombre); //Heredan el contexto superior: Persona
    }
    question();
  }
 
}
 
persona.decirNombre(); // OUTPUT: Agustin
persona.decirNombreFuncionFlecha(); // OUTPUT : undefined
persona.decirNombreFuncionFlechaTime(); // OUTPUT: Agustin




//----------------------------------------------------------------
//Javascript has two types of values: primitive values and reference values.
//*) You can add, change, or delete properties to a reference value, whereas you cannot do 
//it with a primitive value.
//*) Copying a primitive value from one variable to another creates a separate value copy. 
//It means that changing the value in one variable does not affect the other.
//*) Copying a reference from one variable to another creates a reference so that two variables refer to the same object. 
//This means that changing the object via one variable reflects in another variable.
//*) Variables no declaradas: son las que no existen en un programa, y no se declaran. 
//Si el programa trata de leer su valor entonces va a arrojar un error.
//*) Variables no definidas: son aquellas declaradas en el programa, pero no tienen asignado ningún valor. 
//*) Si el programa quiere leer el valor de  variable no definida, se devuelve un valor no definido.
//*) Los tipos de datos JavaScript son: String, booleano, Objeto, Número, Indefinido.




//----------------------------------------------------------------
//Class JavaScript
//ES6 classes are just special functions. A JavaScript class is a blueprint for creating objects. 
//*) A class encapsulates data and functions that manipulate data.
//*) constructor() is where you can initialize the properties of an instance.

//Example 1
class Person {
  constructor(name) {
      this.name = name;
  }
  getName() {
      return this.name;
  }
}
let john = new Person("John Doe");
console.log(john instanceof Person); // true
console.log(john instanceof Object); // true


//----------------------------------------------------------------
//Class JavaScript Getters and Setters
//Use the get and set keywords to define the JavaScript getters and setters for a class or an object.
//The get keyword binds an object property to a method that will be invoked when that property is looked up.
//The set keyword binds an object property to a method that will be invoked when that property is assigned.

class Person {
  constructor(name) {
      this.name = name;
  }
  get name() {
      return this._name + "is get";
  }
  set name(newName) {
      newName = newName.trim();
      if (newName === '') {
          throw 'The name cannot be empty';
      }
      this._name = newName;
  }
}

let person = new Person("Jane Doe");
console.log(person.name);

// attempt to change the name
person.name = 'Jane Smith';
console.log(person.name); // Jane Doe

// throw error
person.name = '';
console.log(person.name); // Jane Doe



//----------------------------------------------------------------
//Computed Property
//ES6 allows you to use an expression in brackets []. 
//It’ll then use the result of the expression as the property name of an object. For example:

let name = 'fullName'; //assigned Computed Property
let propName = 'c'; //assigned Computed Property

class Person {

  rank = {
    a: 1,
    b: 2,
    [propName]: 3, //Used Computed Property
  };

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get [name]() { //Used Computed Property
    return `${this.firstName} ${this.lastName}`;
  }
}

let person = new Person('John', 'Doe');
console.log(person.fullName);
console.log(person.rank.c); // 3



//----------------------------------------------------------------
//JavaScript inheritance using extends and super
//Prior to ES6, implementing a proper inheritance required multiple steps. 
//One of the most commonly used strategies is prototypal inheritance. 
//ES6 simplified these steps by using the extends and super keywords.
//Use the extends keyword to implement the inheritance in ES6. 
//The class to be extended is called a base class or parent class. 
//The class that extends the base class or parent class is called the derived class or child class.
//Call the super(arguments) in the child class’s constructor to invoke the parent class’s constructor.

class Animal {
  constructor(legs) {
      this.legs = legs;
  }
  walk() {
      console.log('walking on ' + this.legs + ' legs');
  }
}

class Bird extends Animal {
  constructor(legs) {
      super(legs);
  }
  fly() {
      console.log('flying');
  }
  stopFly(){
    console.log('flying');
    this.walk();
    super.walk();
  }
}

let bird = new Bird(2);
bird.walk();
bird.fly();
bird.stopFly();


// 20) Functions
//*) isNan: devuelve verdadero si el argumento no es un número porque de lo contrario arrojaría un falso.
//*) Typeof': es un operador que se usa para regresar una descripción de cadena del tipo de una variable.
//*) Dividir varias lineas con una barra invertida (slash), '\', al terminar la primera línea
//*) La palabra clave 'this' se refiere al objeto desde donde fue llamado.
//*) ‘ViewState' es muy específico para la página de una sesión.
//*) ‘SessionState' es específico para los datos del usuario, a los que se entra en las páginas de la aplicación web.

//String
//*) string into an array of substrings: 
  string.split(separator, limit)
//*) string for a value or a regular expression: 
  string.replace(searchValue, newValue)
//*) extracts a part of a string: 
  string.slice(start, end)
//*) method returns true if a string contains a specified string.
  string.includes(searchvalue, start)
