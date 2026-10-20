
## Understand the concepts
- ◼ Responding to Events
- ◼ State: A Component’s Memory
- ◼ Render and Commit
- ◼ State as a Snapshot
- ◼ Queueing a Series of State Updates
- ◼ Updating Objects in State
- ◼ Updating Arrays in State
- ◼ Sharing State Between Components

## Responding to events
An event is something that happens in the interface, such as clicking a button, typing into an input, or submitting a form.
An event handler is a function that runs when that event happens.
Example:
function LikeButton() {
  return <button>Like</button>;
}

## State
State lets a component remember information between renders, such as the number of times you clicked a button.
React provides a function called useState for this:
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

## Render and commit
When React updates the screen, there are three steps: trigger → render → commit.
Using our counter:
function handleClick() {
  setCount(count + 1);
}

1. Trigger: request an update
Clicking the button calls setCount. This tells React it needs to render again.
2. Render: calculate the interface
React calls your component function again with the updated state.
return <button onClick={handleClick}>Clicked {count} times</button>;

If count is now 1, React calculates that the button should display “Clicked 1 times.”
Rendering means calculating what should appear. It doesn’t yet mean changing the page.
3. Commit: update the page
React applies the necessary changes to the browser’s DOM—the browser’s representation of the page.

## State as a snapshot
A snapshot is the state value React gives your component for one particular render.

Queueing a series of state updates
Queueing means putting updates in a line for React to process.
Suppose you want one click to increase the count by 3:
function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
If count starts at 0, all three lines use the same snapshot. Each requests “set count to 1”, so the result is 1, not 3.
To fix this, use the updater function form of setState:
function handleClick() {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
}
Now each update uses the latest count, and you get the expected result of 3.

## Updating Objects in State

An object groups related information:
const [task, setTask] = useState({
  title: "Learn React",
  done: false
});

Here, task has two properties: title and done.
Treat objects in state as read-only. To change one, create a new object and pass it to the setter.
Avoid changing the existing object directly:
task.done = true;

This changes the object without asking React to render again.
Instead, write:
function markDone() {
  setTask(previousTask => ({
    ...previousTask,
    done: true
  }));
}

## Updating arrays in state
An array holds a list of items. In your app, it will hold task objects:
const [tasks, setTasks] = useState([
  { id: 1, title: "Learn React", done: false },
  { id: 2, title: "Practice JavaScript", done: false }
]);

- tasks holds the whole array.
- setTasks updates it and requests a render.
- Each task has an id so we can identify it.


**React Hooks** let function components manage state, run effects, and use other React features.

| Hook | What it does | Why it is used | Example |
|---|---|---|---|
| **`useState`** | Stores state and triggers a render when updated. | To display changing data, such as a counter, input, or open menu. | `const [count, setCount] = useState(0);` |
| **`useEffect`** | Synchronizes a component with an external system. | To manage timers, subscriptions, or browser APIs. | `useEffect(() => { document.title = String(count); }, [count]);` |
| **`useContext`** | Reads data from a context. | To access shared values, such as a theme, without passing props through every component. | `const theme = useContext(ThemeContext);` |
| **`useRef`** | Keeps a reference or value between renders without triggering a render. | To access a DOM element or remember something like a timer ID. | `const inputRef = useRef(null);` |
| **`useReducer`** | Updates state through a reducer function. | To organize complex state changes, such as shopping cart actions. | `const [cart, dispatch] = useReducer(cartReducer, []);` |
| **`useMemo`** | Caches the result of a calculation. | To avoid repeating an expensive calculation when its dependencies have not changed. | `const total = useMemo(() => calculateTotal(items), [items]);` |
| **`useCallback`** | Caches a function reference. | To help a memoized child avoid unnecessary renders when receiving a function prop. | `const onSave = useCallback(() => save(id), [id]);` |
| **`useLayoutEffect`** | Runs an effect before the browser paints. | To measure or adjust layout before the user sees it. | `useLayoutEffect(() => { setWidth(ref.current.offsetWidth); }, []);` |
| **Custom Hook** | Packages reusable logic using Hooks. | To share behavior across components, such as tracking online status. | `const online = useOnlineStatus();` |

**Start with `useState`, `useEffect`, `useContext`, and `useRef`.** Custom Hooks are functions you write yourself; the other entries above are built into React.