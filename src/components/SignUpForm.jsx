import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser, FaUserAstronaut } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api";

export default function SignUpForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  // const queryClient = useQueryClient();
  const toast = useToast();
  const signUpMutation = useMutation(signUp, {
    onSuccess: (data) => {
      toast({
        title: "회원 가입 완료",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // queryClient.refetchQueries(["me"]);
      navigate("/login");
    },
    onError: (error) => {
      toast({
        title: "회원 가입 오류",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = ({ name, email, username, password }) => {
    signUpMutation.mutate({
      name: name,
      email: email,
      username: username,
      password: password,
    });
  };
  return (
    <Stack w={"100%"} justifyContent={"center"} alignItems={"center"}>
      <VStack
        mt={40}
        justifyContent={"center"}
        minW={"40%"}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={8}
        py={10}
        px={16}
        borderWidth={1}
        borderColor={"gray.200"}
        borderRadius={"md"}
        boxShadow={"md"}
      >
        <Heading mb={4}>회원가입</Heading>
        <InputGroup>
          <InputLeftElement
            children={
              <Box color={"gray.500"}>
                <FaUser />
              </Box>
            }
          />
          <Input
            {...register("name", { required: true })}
            placeholder="Name"
            variant={"filled"}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            children={
              <Box color={"gray.500"}>
                <FaEnvelope />
              </Box>
            }
          />
          <Input
            {...register("email", {
              required: true,
            })}
            placeholder="Email"
            variant={"filled"}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            children={
              <Box color={"gray.500"}>
                <FaUserAstronaut />
              </Box>
            }
          />
          <Input
            {...register("username", { required: true })}
            placeholder="Username"
            variant={"filled"}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            children={
              <Box color={"gray.500"}>
                <FaLock />
              </Box>
            }
          />
          <Input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            variant={"filled"}
          />
        </InputGroup>
        <Button
          type="submit"
          my={4}
          w="100%"
          colorScheme="green"
          isLoading={false}
        >
          회원가입
        </Button>
      </VStack>
    </Stack>
  );
}
