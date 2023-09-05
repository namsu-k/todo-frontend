import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack justifyContent={"center"} minH={"80vh"}>
      <Heading>Todo not found</Heading>
      <Text>todo not found. please check your url.</Text>
      <Link to="/">
        <Button colorScheme="green" mt={4} variant={"link"}>
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
