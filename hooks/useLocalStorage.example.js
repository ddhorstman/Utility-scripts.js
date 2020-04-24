import React from "react";
import useLocalStorage from "./useLocalStorage";

export default function App() {
  //Initialize a set of values with a key
  const [values, setValues] = useLocalStorage("values");

  //Initialize a set of values with a key and an initial value
  const [myName, setMyName] = useLocalStorage("name", "David");

  //The initialValue can be almost any valid JS construct
  //Values are stringified, so things like objects with methods aren't supported
  //See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  const initialState = { count: 0, people: ["George", "Sam"] };
  const [state, setState] = useLocalStorage("state", initialState);

  return <div />;
}
