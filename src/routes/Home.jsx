import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <VStack w="100%" h="90vh">
      <Outlet />
    </VStack>
  );
}
