1. Callback Function
Basic idea:
A callback is a function that is passed into another function and is called later when a task is finished.
Simple words:
"Do this work first, and when it finishes, call this function."

Real-life example:
Imagine you order food at a restaurant.
1. You place an order.
2. The waiter says:
   - "Your food will take 20 minutes."
   - "When it is ready, I will call your name."
Here:
- Preparing food = main task
- Calling your name after food is ready = callback



2. Promise
Basic idea:
A Promise is an object that represents a future result of an asynchronous task.
Simple words:
"I promise I will give you the result later — either success or failure."

A Promise has 3 states:
1. Pending → Work is still happening
2. Fulfilled (Resolved) → Work finished successfully
3. Rejected → Work failed
Real-life example:
Imagine ordering a pizza online.
When you place an order:
Step 1: Order placed
- Pizza shop says:
  "Your order is being prepared."
This is:
➡️ Promise = Pending
Step 2: Pizza arrives
"Your pizza is delivered."
This is:
➡️ Promise = Resolved
Step 3: Shop runs out of ingredients
"Sorry, we cannot make your pizza."
This is:
➡️ Promise = Rejected
The pizza shop gives you a promise:
"We will either deliver your pizza or tell you there is a problem."


3. Promise Chaining
Basic idea:
Promise chaining means connecting multiple asynchronous tasks together, where the output of one task becomes the input for the next task.
Simple words:
"First complete this task, then use its result to do the next task, then continue."

Real-life example:
Imagine you are ordering a laptop online.
The process has multiple steps:
1. Place order
   ↓
2. Payment successful
   ↓
3. Laptop shipped
   ↓
4. Laptop delivered
Each step depends on the previous step.
You cannot ship the laptop before payment is completed.
This is a chain.



4. Error Handling with Promises (.catch())
Error handling with Promises uses .catch() to handle failures when an asynchronous operation does not complete successfully.


5. Async/Await
Basic idea:
Async/await is a cleaner way to write Promise-based code.


6.try / catch:
Code that is outside the try/catch block can still run after the error is handled.
