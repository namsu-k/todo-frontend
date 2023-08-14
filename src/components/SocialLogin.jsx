import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub, FaGoogle } from "react-icons/fa6";

export default function SocialLogin() {
  return (
    <Box mb={4}>
      <HStack my={4} spacing={2}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize={"xs"}
          as={"b"}
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button w="100%" leftIcon={<FaGoogle />}>
          Continue with Google
        </Button>
        <Button w="100%" leftIcon={<FaGithub />} colorScheme="blackAlpha">
          Continue with Github
        </Button>
        <Button w="100%" leftIcon={<FaComment />} colorScheme="yellow">
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
