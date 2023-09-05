import {
  Avatar,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo, updateTodo } from "../api";
import Loading from "../components/Loading";
import TodoNotFound from "../components/TodoNotFound";
import deadlineFormatter from "../deadlineFormatter";

export default function TodoDetail() {
  const { todoId } = useParams();
  const { isLoading, data, isError } = useQuery(["todos", todoId], getTodo);
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();
  const fDeadline = deadlineFormatter(data?.deadline);
  const navigate = useNavigate();

  const onUpdate = (todo) => {
    updateTodo(todo);
    queryClient.resetQueries(["todos"]);
    navigate("/todos");
  };

  const onSubmit = (formData) => {
    const todo = {
      ...data,
      ...formData,
    };
    onUpdate(todo);
    queryClient.resetQueries(["todos"]);
    navigate("/todos");
  };

  useEffect(() => {
    setValue("completed", data?.completed ? "true" : "false");
  }, [data, setValue]);
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
            <Input placeholder={data.title} {...register("title")} />
          </Stack>
          <Stack p={4} w={"100%"}>
            <Heading>완료 여부</Heading>
            <Text>{data.completed ? "완료" : "미완료"}</Text>
            <RadioGroup defaultValue="1" name="completed">
              <Stack spacing={5} direction="row">
                <Radio
                  colorScheme="red"
                  value="false"
                  {...register("completed")}
                >
                  미완료
                </Radio>
                <Radio
                  colorScheme="green"
                  value="true"
                  {...register("completed")}
                >
                  완료
                </Radio>
              </Stack>
            </RadioGroup>
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
              <Button
                onClick={(data) => {
                  console.log(data);
                  onUpdate(data);
                }}
              >
                완료
              </Button>
              <Button
                onClick={() => {
                  navigate(`todos/${data.id}`);
                }}
              >
                취소
              </Button>
            </HStack>
          </Stack>
        </>
      )}
    </VStack>
  );
}
