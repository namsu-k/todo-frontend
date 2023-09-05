import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function Users() {
  return (
    <Stack
      w={"100vw"}
      h={"90vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Outlet />
    </Stack>
  );
}
