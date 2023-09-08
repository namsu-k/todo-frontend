import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaCheckToSlot, FaMoon, FaSun } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

export default function Header() {
  const { userLoading, user, isLoggedIn } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("green.500", "green.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onLoginClick = () => {
    navigate("/login");
  };

  const onSignUpClick = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    queryClient.invalidateQueries(["me"]);
  };
  return (
    <HStack
      py={"2%"}
      px={"4%"}
      borderBottomWidth={1}
      justifyContent="space-between"
      w={"100%"}
      h={"10vh"}
    >
      <Box color={logoColor}>
        <Link to="/">
          <FaCheckToSlot size={48} />
        </Link>
      </Box>
      <HStack gap={2}>
        {isLoggedIn ? (
          <>
            <Link to={`/users/me`}>
              <Avatar name={user?.username} size={"sm"} />
            </Link>
            <Box>
              <Link to="/todos">
                <Button>My Todo</Button>
              </Link>
            </Box>
            <Button onClick={handleLogout}>Log out</Button>
          </>
        ) : (
          <>
            <Button onClick={onLoginClick}>Log in</Button>
            <Button onClick={onSignUpClick} colorScheme="green">
              Sign up
            </Button>
          </>
        )}
        <IconButton
          aria-label="Toggle dark mode"
          icon={<Icon />}
          onClick={toggleColorMode}
        />
      </HStack>
    </HStack>
  );
}
