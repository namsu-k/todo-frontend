import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function TodoOutlet() {
  return (
    <Stack w={"100vw"} justifyContent={"center"} alignItems={"center"}>
      <Outlet />
    </Stack>
  );
}
