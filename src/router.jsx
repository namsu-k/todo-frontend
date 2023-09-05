import { createBrowserRouter } from "react-router-dom";
import EditTodo from "./components/EditTodo";
import LoginForm from "./components/LoginForm";
import MyProfile from "./components/MyProfile";
import SignUpForm from "./components/SignUpForm";
import TodoNotFound from "./components/TodoNotFound";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Root from "./routes/Root";
import Todo from "./routes/Todo";
import TodoDetail from "./routes/TodoDetail";
import TodoOutlet from "./routes/TodoOutlet";
import Users from "./routes/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <SignUpForm />,
      },
      {
        path: "todos",
        element: <TodoOutlet />,
        errorElement: <TodoNotFound />,
        children: [
          {
            path: "",
            element: <Todo />,
          },
          {
            path: ":todoId",
            element: <TodoDetail />,
          },
          {
            path: ":todoId/edit",
            element: <EditTodo />,
          },
        ],
      },
      {
        path: "users",
        element: <Users />,
        children: [
          {
            path: "me",
            element: <MyProfile />,
          },
        ],
      },
    ],
  },
]);

export default router;
