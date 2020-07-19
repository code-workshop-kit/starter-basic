# Hands-on Javascript

## Topics

We will discuss and practice with the following JavaScript concepts:

- String Literals
- Promises
- Async Await
- Fetch API
- Destructuring
- Spread operator
- Default parameters
  
## String Literals

There are three ways to create a string in JavaScript.

- 'string' single quote
- "string" double quote
- `string` backticks

Backticks have two main benefits:

- String is multiline
- You can easily inline JavaScript references

```js
const fruit = 'apple';
const eatFruit = 'yummie ' + fruit;
```

```js
const fruit = 'apple';
const eatFruit = `yummie ${fruit}`;
```

Create a small demo, include multiple variables into a multi-line story, and also use a function call instead of just a normal variable.

## Promises

JavaScript is mostly asynchronous. Quite often you cannot assume that your next line of code gets executed in order.

```js
setTimeout(() => console.log('hi'), 0);
new Promise(resolve => resolve('goodbye')).then(result => console.log(result));
console.log('hello');
```

Gets executed in the reverse order.
This is because synchronous code is ran first (console.log), and the other two statements are asynchronous and therefore queued.

The Promise is special, it gets put in the microtask queue, which happens before the regular async queue. setTimeout queues the task in the regular async queue.

```js
const morning = () => {
  new Promise(resolve => setTimeout(resolve, 500)).then(() => {
    console.log('woke up and got out of bed');
  })

  new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
    console.log('ate breakfast');
    // ... etc.
  })
}

morning();
```

You can also reject promises, in that case you have to use `.catch()` to get the result.

Lastly, you can add a `.finally()` which always gets ran in the end no matter whether it resolved or rejected.

```js
const morning = () => {
  new Promise(resolve => setTimeout(resolve, 500)).then(() => {
    console.log('woke up and got out of bed');
  });

  new Promise((resolve, reject) => setTimeout(reject, 1000)).then(() => {
    console.log('ate breakfast');
  }).catch(() => {
    console.log('went back to bed :(');
  }).finally(() => console.log('morning routine done'))
}

morning();
```

### Exercise 1

- Create your own routine, this can be anything
- Make it asynchronous, where the tasks in the routine take different amounts of time
- Differentiate between running tasks in parallel, versus running them sequentially, where one task needs to wait on another task's completion

## Async Await

As you might have seen from the exercise, sequential asynchronous tasks make your code look like an infinite nested callback structure, something we refer to as 'callback hell'.

To make your async code look sync, we can use a modern JavaScript feature called asynchronous functions, where we can use the `await` keyword to wait for a promise to resolve.

```js
const morning = () => {
  new Promise(resolve => setTimeout(resolve, 500)).then(() => {
    console.log('woke up and got out of bed');
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      console.log('ate breakfast');
      new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        console.log('showered');
      })
    });
  });
}

morning();
```

Becomes

```js
const morning = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('woke up and got out of bed');

  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('ate breakfast');

  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('showered');
}

morning();
```

### Exercise 2

Turn exercise 1 into async/await!

## Fetch API

Let's do something concrete with async await, like fetching data from somewhere.

```js
const fetchData = async () => {
  const response = await fetch('https://reqres.in/api/users/2');
  const result = await response.json();
  const data = result.data;
  console.log(data);
}
fetchData();
```

You can also do other requests, like a POST request to create something.

```js
const fetchData = async () => {
  const response = await fetch('https://reqres.in/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const result = await response.json();
  console.log(result);
}
fetchData();
```

### Exercise 3

Test out Fetch by doing at least one GET request, and one request with a different method. See [reqres](https://reqres.in/)

## Destructuring

One cool feature in ES6 JavaScript is that you can now destructure objects and arrays.

In our Fetch example:

```js
const fetchData = async () => {
  const response = await fetch('https://reqres.in/api/users/2');
  const result = await response.json();
  const { data } = result;
  console.log(data);
}
fetchData();
```

This becomes especially handy when you need to destructure multiple things

```js
const fetchData = async () => {
  const response = await fetch('https://reqres.in/api/users/2');
  const result = await response.json();
  const { data } = result;
  const { id, email, avatar, first_name, last_name } = data;
  console.log(id, email, avatar, first_name, last_name);
}
fetchData();
```

For arrays, very similar:

```js
const arr = ['Apple', 'Banana', 'Orange', 'Kiwi'];
const [, banana] = arr;
console.log(banana);
```

## Spread operator

Sometimes you want to destructure only a small part, and put the rest of the properties or items inside a variable. You can use the rest operator.

```js
const arr = ['Apple', 'Banana', 'Orange', 'Kiwi'];
const [, banana, ...rest] = arr;
console.log(banana, rest);
```

This is especially useful in objects. For example if you have a configuration object that the user is passing to you, but you have a ton of default settings. You want to merge the default settings with the options from the user, and override the defaults if the user passes an options for which there is a default value.

```js
const getConfig = (userOpts) => {
  return {
    port: 8000,
    open: true,
    watch: false,
    ...userOpts, // if it has a port, open or watch options, it will override the defaults above
  };
}
getConfig({ port: 8001 });
```

Old JS equivalent

```js
const getConfig = (userOpts) => {
  return Object.assign({}, {
      port: 8000,
      open: true,
      watch: false,
    },
    userOpts,
  );
}
getConfig({ port: 8001 });
```

## Default parameters

It is also possible in ES6 JavaScript to set default parameters.

```js
const getFruit = (type = 'Banana') => {
  return type;
}
getFruit(); // 'Banana'
getFruit('Apple'); // 'Apple'
```

This also extends itself to objects, where you can both assign a default object, as well as the default object properties it contains.

```js
const getConfig = ({
  port = 8000,
  open = true,
  watch = false,
  ...others // <-- be careful, don't put a dangling comma here, rest operator in this scenario is always the last element and your browser will throw an error if you put the comma...
} = {}) => {
  return {
    port,
    open,
    watch,
    ...others, // If user supplies other properties, we pass them on
  };
}
getConfig({ port: 8001, something: true });
```

### Exercise 4

Change your zoo to use all of the topics discussed.

- String Literals (e.g. your console logs of your zoo)
- Promises (use fetch, or schedule tasks for animals/zookeepers)
- Async Await
- Fetch API (you can use list of users as your employees/zookeepers)
- Destructuring (e.g. the data from your fetch)
- Spread operator
- Default parameters
