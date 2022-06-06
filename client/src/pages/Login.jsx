import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  Button,
  Image,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { login } from "../api/auth";
import { useHistory } from "react-router-dom";
import camp404Logo from "../assets/camp404_logo.png";

const Login = () => {
  const history = useHistory();
  const toast = useToast();
  const [inputState, setInputState] = useState({ email: "", password: "" });

  const goToRegisterPage = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    let body = {};
    body["email"] = inputState.email;
    body["password"] = inputState.password;

    let response = await login(body);

    if (response.status === "success") {
      localStorage.setItem("access_token", response.data.access_token);
      toast({
        title: "Welcome :)",
        description: "Meet your colleagues here in longue 404",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      history.push("/chat");
    } else {
      toast({
        title: "Error occured",
        description: response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bgColor="cyan.100"
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <Box
        borderRadius={"xl"}
        bgColor="white"
        shadow={"md"}
        padding="4"
        width={{ base: "70vw", md: "50vw", xl: "35vw" }}
      >
        <Flex alignItems={"center"} justifyContent="center">
          <Image src={camp404Logo} boxSize="12" alt="" />
        </Flex>
        <Text fontSize="md" marginBottom="2" marginTop="2">
          Selamat Datang di Longue 404 !
        </Text>
        <Text fontSize="2xl" fontWeight={"bold"} color="cyan.500">
          Login
        </Text>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            onChange={(ev) =>
              setInputState({ ...inputState, email: ev.target.value })
            }
          />
          <FormLabel htmlFor="password" marginTop={2}>
            Password
          </FormLabel>
          <Input
            id="password"
            type="password"
            onChange={(ev) =>
              setInputState({ ...inputState, password: ev.target.value })
            }
          />
          <Button
            colorScheme="cyan"
            color="white"
            width="100%"
            rounded={"full"}
            marginTop="4"
            onClick={handleLogin}
          >
            Masuk
          </Button>
          <Text fontSize="sm" color="gray.500" marginTop="4">
            Tidak punya akun ?
            <Text
              marginLeft="2"
              display={"inline-block"}
              color="cyan.500"
              cursor="pointer"
              onClick={goToRegisterPage}
            >
              {" "}
              Register disini
            </Text>
          </Text>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Login;
