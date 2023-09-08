import {
  Avatar,
  Button,
  Divider,
  HStack,
  Heading,
  Stack,
  VStack,
} from "@chakra-ui/react";
import useUser from "../lib/useUser";
import Loading from "./Loading";

export default function MyProfile() {
  const { userLoading, user, isLoggedIn } = useUser();

  return (
    <VStack
      w={"100%"}
      maxW={"55%"}
      minW={400}
      mt={4}
      p={4}
      spacing={4}
      borderWidth={1}
      alignItems={"flex-start"}
    >
      {userLoading ? (
        <Loading />
      ) : (
        <>
          <Heading ml={2}>나의 정보</Heading>
          <HStack w={"100%"}>
            <Stack p={4} w={"100%"}>
              <Avatar
                size={{ base: "md", md: "lg", lg: "xl" }}
                name={user.username}
              ></Avatar>
            </Stack>
            <Stack p={4} w={"100%"} alignItems={"flex-end"}>
              <Heading>{user.name}</Heading>
              <Heading>{user.email}</Heading>
            </Stack>
          </HStack>
          <Divider />
          <Stack p={4} w={"100%"}>
            <HStack justifyContent={"flex-end"} spacing={4}>
              <Button isDisabled>수정</Button>
              <Button isDisabled colorScheme="red">
                삭제
              </Button>
            </HStack>
          </Stack>
        </>
      )}
    </VStack>
  );
}
