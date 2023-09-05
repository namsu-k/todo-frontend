import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaLock, FaUserAstronaut } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function LoginForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      queryClient.resetQueries(["me"]);
      queryClient.refetchQueries(["me"]);
      queryClient.refetchQueries(["todos"]);
      navigate("/todos");
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setError("password", {
        type: "manual",
        message: "Invalid username or password",
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <VStack w="100%" justify="center" align="center" mt={40}>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="40%"
        borderWidth={1}
        borderColor="gray.200"
        borderRadius="md"
        boxShadow="md"
        p={8}
      >
        <Heading mb={4}>로그인</Heading>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Box color="gray.300" as={FaUserAstronaut} />}
          />
          <Input
            {...register("username", {
              required: "Username을 입력해주세요.",
            })}
            placeholder="Username"
            variant="filled"
          />
        </InputGroup>
        {errors.username && (
          <Box color="red" mt={1} fontSize="sm">
            {errors.username.message}
          </Box>
        )}

        <InputGroup mt={2}>
          <InputLeftElement
            pointerEvents="none"
            children={<Box color="gray.300" as={FaLock} />}
          />
          <Input
            {...register("password", {
              required: "Password를 입력해주세요.",
            })}
            placeholder="Password"
            variant="filled"
            type="password"
          />
        </InputGroup>
        {errors.password && (
          <Box color="red" mt={1} fontSize="sm">
            {errors.password.message}
          </Box>
        )}

        <Button
          type="submit"
          mt={4}
          w="100%"
          colorScheme="green"
          isLoading={mutation.isLoading}
        >
          로그인
        </Button>
      </Box>
    </VStack>
  );
}
