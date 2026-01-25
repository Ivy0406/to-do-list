import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import TodoListPage from "./components/todo-list";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todos" element={<TodoListPage />} />
      </Routes>
    </>
  );
}

export default App;
