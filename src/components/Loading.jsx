import { Heading, Spinner, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <VStack h={"80vh"} justifyContent={"center"}>
      <Spinner />
      <Heading>Loading...</Heading>
    </VStack>
  );
}
