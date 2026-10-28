– React Effects and Data Fetching

## 1. Synchronizing with Effects (useEffect)

### What is useEffect?

`useEffect` is a React Hook that lets a component synchronize with systems outside React.

Examples:
- Fetching data from an API.
- Connecting to a WebSocket.
- Synchronizing with browser events.
- Controlling an external library.

### Real-Life Example

Imagine you open a restaurant website.

1. React displays the restaurant page.
2. After React updates the screen, useEffect can request the menu from an API.
3. The API returns the menu.
4. React updates the screen with the menu items.


## Topic 3: Lifecycle of Reactive Effects

### Chunk 1: Effect Lifecycle

Lifecycle of Reactive Effects is not a different function. It is a concept that explains how useEffect works in React.
Simple difference
Term	Meaning
useEffect	A React Hook used to synchronize with external systems.
Lifecycle of Reactive Effects	Explains when an Effect starts, stops, and starts again.

Lifecycle means the stages something goes through.

A React Effect has two main stages:

1. Setup: Start synchronization.
2. Cleanup: Stop synchronization.

### Real-Life Example
Phone call:
- Start call = Setup
- End call = Cleanup

### Example
```jsx
useEffect(() => {
  console.log("Call Connected");

  return () => {
    console.log("Call Disconnected");
  };
}, []);
```

### Key Point
Setup starts synchronization.
Cleanup stops synchronization.

Cleanup: You disconnect the call with Ali.
Unmounting: You close the entire calling screen.