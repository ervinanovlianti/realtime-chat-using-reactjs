import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Text,
  Button,
  Flex,
  Image,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import camp404Logo from "../assets/camp404_logo.png";

import { register } from "../api/auth";

const Register = () => {
  const history = useHistory();
  const toast = useToast();
  const [inputState, setInputState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const goToLoginPage = () => {
    history.push("/");
  };

  const handleOnSubmitRegister = async () => {
    let body = {};
    body["username"] = inputState.username;
    body["email"] = inputState.email;
    body["password"] = inputState.password;

    let response = await register(body);
    if (response.status === "success") {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      history.push("/");
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
        <Text fontSize="md" marginBottom="2">
          Selamat Datang di Longue 404 !
        </Text>
        <Text fontSize="2xl" fontWeight={"bold"} color="cyan.500">
          Register
        </Text>
        <FormControl onSubmit={handleOnSubmitRegister}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            type="text"
            onChange={(ev) =>
              setInputState({ ...inputState, username: ev.target.value })
            }
          />
          <FormLabel htmlFor="email" marginTop={2}>
            Email
          </FormLabel>
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
            onClick={handleOnSubmitRegister}
            type="submit"
            colorScheme="cyan"
            color="white"
            width="100%"
            rounded={"full"}
            marginTop="4"
          >
            Daftar
          </Button>
          <Text fontSize="sm" color="gray.500" marginTop="4">
            Sudah punya akun ?
            <Text
              marginLeft="2"
              display={"inline-block"}
              color="cyan.500"
              cursor="pointer"
              onClick={goToLoginPage}
            >
              {" "}
              Login
            </Text>
          </Text>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Register;
