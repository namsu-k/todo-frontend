import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import { createTodo } from "../api";

export default function AddTodo() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  const createTodoMutation = useMutation(createTodo, {
    onSuccess: (data) => {
      toast({
        title: "할 일 추가 완료",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      reset();
      queryClient.refetchQueries(["todos"]);
      redirect("/todos");
    },
    onError: (error) => {
      toast({
        title: "할 일 추가 실패",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      redirect("/todos");
    },
  });
  const onSubmit = (data) => {
    createTodoMutation.mutate(data);
  };
  return (
    <HStack
      w="100vw"
      h="20%"
      m={4}
      justifyContent={"center"}
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("title", { required: true })}
        type="text"
        placeholder="Add Todo"
        size={"lg"}
        w={"50%"}
      />
      <Button type="submit" colorScheme="green" size={"lg"}>
        추가
      </Button>
    </HStack>
  );
}
