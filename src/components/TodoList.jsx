import { Avatar, HStack, Heading, IconButton, VStack } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function TodoList({ pk, title, completed, userId, username }) {
  return (
    <VStack w={"100vw"}>
      <Link to={`/todos/${pk}`}>
        <HStack
          w={"70vw"}
          p={2}
          borderRadius={8}
          borderWidth={1}
          justifyContent={"space-between"}
          _hover={{
            backgroundColor: "green.300",
            animation: "pulse 0.3s infinite",
          }}
        >
          {completed ? <IconButton icon={<FaCheck />} /> : <IconButton />}
          <HStack justifyContent={"center"}>
            <Heading noOfLines={1}>{title}</Heading>
          </HStack>
          <Link to={`/users/${userId}`}>
            <Avatar name={username} size={"sm"} />
          </Link>
        </HStack>
      </Link>
    </VStack>
  );
}
