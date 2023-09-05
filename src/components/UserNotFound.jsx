import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack justifyContent={"center"} minH={"100vh"}>
      <Heading>User not found</Heading>
      <Text>user not found. please check your url.</Text>
      <Link to="/">
        <Button colorScheme="green" mt={4} variant={"link"}>
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
