import { Box, Button, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FaCheckToSlot } from "react-icons/fa6";

export default function Root() {
  return (
    <Box>
      <HStack
        py={5}
        px={10}
        borderBottomWidth={1}
        justifyContent={"space-between"}
      >
        <Box color={"green.500"}>
          <FaCheckToSlot size={48} />
        </Box>
        <HStack spacing={"2"}>
          <Button>Log in</Button>
          <Button colorScheme="green">Sign up</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}
