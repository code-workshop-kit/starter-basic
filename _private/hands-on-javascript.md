# Hands-on Javascript

## Topics

We will discuss and practice with the following JavaScript concepts:

- Functions
  - Arrow Functions
  - Callbacks
  - Closures
  - ? Call, Apply, Bind
- Inheritance in JavaScript
  - ES6 Classes
  - this
  - getter / setter
  - instanceof & typeof
- Array methods
  - Push & unshift / Pop & shift
  - Splice
  - ForEach
  - Map
  - Filter
  - ? Find
  - ? Every & some
  - ? Reduce
- Object
  - entries, keys, values
  - iterate by keys
  - Map (show iterate is way easier, order = order of insertion, has size property)
  - Set (= Map with unique values)
  - ? WeakMap/WeakSet (= Use this for better garbage collection/performance, unless you want to have a list of keys, then you should use normal Map/Set)

## Functions

A function, when called, runs a piece of code. Usually it accepts an input and an output, where both the input and output can be empty.

```js
function getBanana() {
  return 'banana';
}

getBanana(); // 'banana'
```

```js
function getBanana(amount) {
  let str = amount;
  str += ' banana';
  if (amount > 1) {
    str += 's';
  }
  return str;  
}
getBanana(3); // '3 bananas'
```

You can also create anonymous functions and store them inside a variable.

```js
const getBanana = function() {
  return 'banana';
}
getBanana(); // 'banana'
```

Which allows you to pass the function to other functions. The passed function can then be called inside the other function. This passed function is now called a "callback function".

```js
const getBanana = function() {
  return 'banana';
}

const getApple = function() {
  return 'apple';
}

const fillFruitBowl = function(bananaCallback, appleCallback) {
  return [bananaCallback(), appleCallback()];
}

fillFruitBowl(getBanana, getApple); // ['banana', 'apple']
```

A more modern syntax for anonymous functions are "arrow functions". Remove `function` keyword and add `=>` between the parameter parentheses `()` and opening bracket `{` of the function body.

```js
const getBanana = () => {
  return 'banana';
}

const getApple = () => {
  return 'apple';
}

const fillFruitBowl = (bananaCallback, appleCallback) => {
  return [bananaCallback(), appleCallback()];
}

fillFruitBowl(getBanana, getApple); // ['banana', 'apple']
```

Something special about functions is that they can access variables 1 scope higher than their own function body, because this scope that is 1 level higher is its `lexical environment`.
The combination of the function scope & the references to its `lexical environment` is a closure.

```js
const closure = (someVar) => {
  // <-- we can use someVar here inside 'closure' function body

  function someFunction() {
    return someVar; // <-- we have access to someVar here because of closure
  }

  return {
    someMethod() {
      // <-- we have access to someVar here as well because of closure
      return {
        someVar, // <-- that means we can return it here too
        someNestedMethod() {
          return someVar; // <-- And here as well, because these closures keep nesting infinitely!!
        },
        someNestedArrowFunction: () => {
          return someVar; // <-- And it works with anonymous functions stored as a variable too, and arrow functions as well
        }
      };
    },
  }
}

closure('hello').someMethod().someVar; // 'hello'
closure('hello').someMethod().someNestedMethod(); // 'hello'
closure('hello').someMethod().someNestedArrowFunction(); // 'hello'
```

### Functions Exercise

Create a zoo!

- Make a function `createZoo()`
- Accepts callback methods which allow to fetch some animal species, feel free to play around with the order of how you call these callbacks in the createZoo function, and if there's conditions for calling them
- Use anonymous arrow functions everywhere
- Be creative with console logs so that when you call `createZoo()`, you see a nice story in the console output about how the zoo being built and filled with animals :)
- Bonus: introduce a closure where a callback has access to an argument passed to `createZoo`, because for example your gorillas callback responds with 10 gorillas, but only if your zoo perimeter is large enough

## Inheritance

In JavaScript we do not have classical inheritance fundamentally, like in languages such as Java. In JavaScript, we have something called prototypal inheritance.

However, with ES6 (modern JavaScript), we have syntax sugar called ES6 Classes, that very much makes the developer experience feel like classical inheritance.
This is what we will use, but be aware that there may be some fundamental differences when you're used to languages with classical inheritance though!

```js
class FruitBowl {
  static brand() {
    return 'FruityBowl';
  }

  addBanana() {
    this.fruits.push('banana');
  }

  constructor(size) {
    this.fruits = [];
    this.size = size;
  }
}

const fruitbowl = new FruitBowl(10);
fruitbowl.brand(); // undefined
FruitBowl.brand(); // 'FruityBowl'
```

Inside a class, `this` refers to the class instance. Inside static methods, it refers to the class itself.

### Getters and Setters

An often used way to get and set property values on an instance or class, is by using getters and setters.

They have two main benefits:

- Allow a public interface to class/instance properties
- Do logic before getting / setting, like filtering or sorting

```js
class FruitBowl {
  static get brand() {
    return 'FruityBowl';
  }

  get amountOfBananas() {
    return this.__amountOfBananas;
  }

  set amountOfBananas(value) {
    // Check if there's space enough in the fruitbowl, otherwise don't set
    if (value <= size) {
      this.__amountOfBananas = value;
    }
  }

  constructor(size) {
    this.size = size;
    this.__amountOfBananas = 0;
  }
}

const fruitbowl = new FruitBowl(10);

FruitBowl.brand = 'FruityBowl';

fruitbowl.amountOfBananas = 6;
fruitbowl.amountOfBananas; // 6
fruitbowl.amountOfBananas = 12;
fruitbowl.amountOfBananas; // 6
```

> Note that we use a double __ for the internal private amountOfBananas variable. In JavaScript, there are no access modifiers for class methods and fields.
> Often, _ is used for implied `protected` access, and __ for `private` access. So at least your developer users know to expect breaking changes if they ignore these access conventions.

### Extending / Inheritance

It is possible to extend from a parent class.

```js
class Bowl {
  static get shape() {
    return 'round';
  }
}

class FruitBowl extends Bowl {
  static get shape() {
    return super.shape + ' or oval';
  }

  static get brand() {
    return 'FruityBowl';
  }
  
  constructor(size) {
    super();
    this.size = size;
  }
}

FruitBowl.shape; // 'round or oval'
```

You can call parent properties or methods through `super` keyword. Constructors of classes that extend, **always** have to call `super()` first.
You can override methods from the parent by simply defining them as the same name. There is no method overloading in JavaScript, as method/function signatures and types are not strict in JavaScript.

### Important caveats

When calling static (`foo`) or instance (`bar`) methods indirectly through reference, make sure to pass `this` properly, by using `.bind()` with the class / instance, otherwise `this` will be undefined.

```js
class FruitBowl {
  foo() {
    return this;
  }
};

const foo = FruitBowl.foo.bind(FruitBowl);
foo();


const bar = fruitbowl.bar.bind(fruitbowl);
bar();
```

If you want to reference the static content inside the class itself, you can access them through the constructor. Outside the class you can do Class.staticMethod

```js
class FruitBowl {
  static foo() {
    console.log('hello world');
  }

  bar() {
    this.constructor.foo();
  }
}
const fruitbowl = new FruitBowl();
fruitbowl.bar(); // 'hello world'
FruitBowl.foo(); // 'hello world'
```

### Inheritance Exercise

- Turn your zoo into a class based interface with methods to introduce new animals, new species, employ workers, etc.
- Create classes for species that extend from an animal base class like "mammal" or simply "animal".

## Arrays & Objects

Let's create a FruitBowl which has an array of fruits property, guarded by a getter/setter.

```js
class FruitBowl {
  get fruits() {
    return this._fruits;
  }

  set fruits(value) {
    this._fruits = value;
  }
}
const fruitbowl = new FruitBowl();
```

We can now add some fruits

```js
fruitbowl.fruits = ['Apple', 'Banana', 'Apple', 'Orange', 'Banana', 'Banana'];

// add another banana at the end
fruitbowl.fruits = fruitbowl.fruits.push('Banana');

// or at the start
fruitbowl.fruits = fruitbowl.fruits.unshift('banana');

// or remove them again
// mind that .pop() and .shift() change the array, but return the item that is removed, so here we make a local copy first
const fruits = fruitbowl.fruits;
fruits.pop();
fruits.shift();
fruitbowl.fruits = fruits;
```

It is also possible to remove items at a certain index, using `splice()` for example. Which can also be used to add items

```js
// remove 1 item starting at index 3
fruitbowl.fruits = fruitbowl.fruits.splice(3, 1);

// remove 0 items starting at index 3, and add 'Orange' item
fruitbowl.fruits = fruitbowl.fruits.splice(3, 0, 'Orange');
```

### Iterating over Arrays

We can simply iterate over an array's items, but we can also return a mutated version of the array at the same time by filtering or mapping.

```js
fruitbowl.fruits.forEach(fruit => {
  console.log(fruit);
});

fruitbowl.fruits = fruitbowl.fruits.map(fruit => {
  return 'yummie ' + fruit;
});

fruitbowl.fruits = fruitbowl.fruits.filter(fruit => {
  if (fruit === 'Apple') {
    return false;
  }
  return true;
});

// returns the first item that meets the criterium (value = 'orange')
const orange = fruitbowl.fruits.find(fruit => {
  if (fruit === 'Orange') {
    return true;
  }
  return false;
});

// written shortly
const orange = fruitbowl.fruits.find(fruit => fruit === 'Orange');

// true if any item exists of value 'Orange'
const hasBanana = fruitbowl.fruits.some(fruit => fruit === 'Orange');

// true if all items are value 'Banana'
const onlyBananas = fruitbowl.fruits.every(fruit => fruit === 'Banana');

const concatenatedFruits = fruitbowl.fruits..reduce((acc, curr) => acc + ' ' + curr, 'Fruits:');
// Fruits: Apple Banana Apple Orange Banana Banana
```

### Iterating over Objects

For objects, it is somewhat similar, let's say we only have a single fruit per type of fruit

```js
fruitbowl.fruits = {
  apple: true,
  banana: false,
  orange: true,
  kiwi: true, // dangling commas are okay :) in fact, they are great! because it makes it easier to add stuff underneath
  'grape-fruit': false,
};
```

Let's grab one

```js
// by default
fruitbowl.fruits.apple;

// through array syntax
fruitbowl.fruits['grape-fruit'];
```

Or edit it:

```js
fruitbowl.fruits.apple = false;
```

And now let's iterate with for of loop, using Object.keys/values/entries

```js
for (fruit of Object.keys(fruitbowl.fruits)) {
  console.log(fruit); // object property key
}

for (fruit of Object.values(fruitbowl.fruits)) {
  console.log(fruit); // object property value
}

for ([fruit, value] of Object.entries(fruitbowl.fruits)) {
  console.log(fruit); // object property key
  console.log(value) // object property value
}
```

You can also use a Map!

- It remembers the order of insertion of properties
- Key can be any primitive type!
- .size() to get the amount of props
- Directly iterate

```js
const fruits = new Map();
fruits.set('apple', true);
fruits.set('banana', false);
fruits.set('orange', true);
fruits.set('kiwi', true);

for (fruit of fruits.keys()) {
  console.log(fruit); // object property key
}

for (fruit of fruits.values()) {
  console.log(fruit); // object property value
}

for ([fruit, value] of fruits.entries()) {
  console.log(fruit); // object property key
  console.log(value) // object property value
}
```

Use Set if you need a Map with unique values as well as keys.

Use WeakMap or WeakSet for better garbage collection/performance, unless you want to have a list of keys, then you should use normal Map/Set!