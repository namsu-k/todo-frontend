import {
  Avatar,
  Button,
  Divider,
  HStack,
  Heading,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTodo, getTodo, updateTodo } from "../api";
import Loading from "../components/Loading";
import TodoNotFound from "../components/TodoNotFound";
import deadlineFormatter from "../deadlineFormatter";

export default function TodoDetail() {
  const { todoId } = useParams();
  const { isLoading, data, isError } = useQuery(["todos", todoId], getTodo);
  const queryClient = useQueryClient();
  const fDeadline = deadlineFormatter(data?.deadline);
  const navigate = useNavigate();

  const onCompleted = (todo) => {
    todo.completed = !todo.completed;
    updateTodo(todo);
    navigate("/todos");
    queryClient.resetQueries(["todos"]);
    queryClient.refetchQueries(["todos"]);
  };
  const onDelete = (todo) => {
    deleteTodo(todo);
    queryClient.resetQueries(["todos"]);
    navigate("/todos");
  };

  return (
    <VStack
      w={"100%"}
      h={"100%"}
      maxW={"55%"}
      minW={400}
      mt={4}
      p={4}
      spacing={4}
      borderWidth={1}
    >
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <TodoNotFound />
      ) : (
        <>
          <Stack p={4} w={"100%"}>
            <Heading>할 일</Heading>
            <Text>{data.title}</Text>
          </Stack>
          <Stack p={4} w={"100%"}>
            <Heading>완료 여부</Heading>
            <Text>{data.completed ? "완료" : "미완료"}</Text>
          </Stack>
          <Stack p={4} w={"100%"}>
            <Heading>설명</Heading>
            <Textarea isReadOnly value={data.description} />
          </Stack>
          <Stack p={4} w={"100%"}>
            <Heading>마감기한</Heading>
            <Text>{fDeadline}</Text>
          </Stack>
          <Stack p={4} w={"100%"}>
            <Heading>작성자</Heading>
            <HStack>
              <Avatar name={data.username} size={"sm"} />
              <Text>{data.username}</Text>
            </HStack>
          </Stack>
          <Divider />
          <Stack p={4} w={"100%"}>
            <HStack justifyContent={"flex-end"} spacing={4}>
              <Button onClick={() => onCompleted(data)}>완료</Button>
              {/* <Link to={`/todos/${todoId}/edit`}> */}
              <Button isDisabled>수정</Button>
              {/* </Link> */}
              <Button
                onClick={() => {
                  onDelete(data);
                }}
              >
                삭제
              </Button>
            </HStack>
          </Stack>
        </>
      )}
    </VStack>
  );
}
