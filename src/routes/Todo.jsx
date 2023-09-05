import { Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { getTodos } from "../api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";

export default function Todo({ pk, title, completed, description, deadline }) {
  const { isLoading, data } = useQuery(["todos"], getTodos);
  return (
    <Stack w={"100vw"} alignItems={"center"}>
      <AddTodo />
      {isLoading ? (
        <Loading />
      ) : (
        data?.map((todo) => (
          <TodoList
            key={todo.id}
            pk={todo.id}
            title={todo.title}
            completed={todo.completed}
            description={todo.description}
            deadline={todo.deadline}
            userId={todo.userId}
            username={todo.username}
          />
        ))
      )}
    </Stack>
  );
}
