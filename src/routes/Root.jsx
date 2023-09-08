import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import LoginForm from "../components/LoginForm";
import useUser from "../lib/useUser";

export default function Root() {
  const { isLoading, isLoggedIn } = useUser();

  return (
    <Box w={"100vw"} h={"100vh"}>
      <Header />
      {isLoading ? <Loading /> : <Outlet />}
    </Box>
  );
}
