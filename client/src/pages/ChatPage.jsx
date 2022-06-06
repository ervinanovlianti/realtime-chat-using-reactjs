import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  GridItem,
  Avatar,
  Text,
  Button,
  AvatarBadge,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "../redux/action";
import socket from "../service/socket";

// modals
import ModalInfoUser from "../components/modalInfoUser";

// icons
import camp404Logo from "../assets/camp404_logo.png";
import { FiEdit, FiUser } from "react-icons/fi";
import { HiPaperAirplane } from "react-icons/hi";
import { IoExitOutline } from "react-icons/io5";
import ModalEditUser from "../components/modalEditUser";
import ModalBrowseUsers from "../components/modalBrowseUsers";

const ChatPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedUser = useSelector((st) => st.loggedUser);
  const [chatMessage, setChatMessage] = useState("");
  const [chats, setChats] = useState([]);
  let chatRef = useRef(null);
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    dispatch(usersActions.getUsers());
    dispatch(usersActions.getLoggedUser());
  }, []);

  useEffect(() => {
    socket.on("send chat", (payload) => {
      if (payload.sender) {
        setChats([...chats, senderChat(payload)]);
      } else {
        setChats([...chats, recieverChat(payload)]);
      }
      chatRef?.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [chats]);

  const senderChat = (el) => {
    return (
      <Box
        bg="cyan.500"
        color="white"
        rounded="lg"
        width="75%"
        marginLeft={"auto"}
        marginBottom="2"
        padding={"1"}
        paddingRight="2"
      >
        <Flex alignItems={"center"} marginBottom="2">
          <Text fontSize={"xs"} marginLeft="auto">
            {el?.username}
          </Text>
          <Avatar name="saha we" size="xs" marginLeft={"2"} src={el?.avatar} />
        </Flex>
        <Text textAlign={"end"}>{el?.message}</Text>
      </Box>
    );
  };

  const recieverChat = (el) => {
    return (
      <Box
        border="1px"
        borderColor={"gray.300"}
        rounded="lg"
        width="75%"
        marginBottom="2"
        padding={"1"}
        paddingLeft="2"
      >
        <Flex alignItems={"center"} marginBottom="2">
          <Avatar name="saha we" size="xs" marginRight={"2"} src={el.avatar} />
          <Text fontSize={"xs"}>{el.username}</Text>
        </Flex>
        <Text textAlign={"start"}>{el.message}</Text>
      </Box>
    );
  };

  // state open & close untuk modal (lihat lebih lengkap di docs chakra ui)
  const {
    isOpen: isOpenInfoUser,
    onOpen: onOpenInfoUser,
    onClose: onCloseInfoUser,
  } = useDisclosure();

  const {
    isOpen: isOpenEditUser,
    onOpen: onOpenEditUser,
    onClose: onCloseEditUser,
  } = useDisclosure();

  const {
    isOpen: isOpenBrowseUsers,
    onOpen: onOpenBrowseUsers,
    onClose: onCloseBrowseUsers,
  } = useDisclosure();

  const handleSendMessage = () => {
    if (chatMessage) {
      socket.emit("send chat", {
        id: loggedUser._id,
        avatar: loggedUser.avatar,
        username: loggedUser.username,
        message: chatMessage,
      });
      setChatMessage("");
    }
  };

  const logout = () => {
    history.push("/");
    localStorage.clear();
    toast({
      title: "Bye :)",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <>
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
          width={{ base: "70vw", md: "60vw", xl: "50vw" }}
          height={"75vh"}
          position="relative"
        >
          <Avatar
            hidden={!isMobile}
            marginLeft={3}
            name={loggedUser.username}
            bg="cyan.500"
            color="white"
            size={"sm"}
            onClick={onOpenEditUser}
            src={loggedUser.avatar}
            position={"absolute"}
            left="4"
            top="4"
          ></Avatar>
          <Button
            hidden={!isMobile}
            onClick={onOpenBrowseUsers}
            bg="gray.50"
            size="xs"
            marginTop={4}
            position={"absolute"}
            rounded={"full"}
            fontSize="10px"
            left="2"
            top="10"
          >
            <Icon as={FiUser} marginRight="2" />
            Cari User
          </Button>
          <Button
            position={"absolute"}
            variant="ghost"
            colorScheme={"red"}
            size="sm"
            right="4"
            top="4"
            rounded="full"
            onClick={logout}
          >
            <Text hidden={isMobile}>Keluar</Text>
            <Icon marginLeft="2" as={IoExitOutline} />
          </Button>
          <Grid templateColumns="repeat(4, 1fr)" height={"100%"}>
            <GridItem
              hidden={isMobile}
              rounded="lg"
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
              flexDirection="column"
              // borderRightWidth={1}
              bg="gray.100"
              height="100%"
            >
              <Flex>
                <Avatar
                  marginLeft={3}
                  name="YN"
                  bg="cyan.500"
                  color="white"
                  src={loggedUser.avatar}
                ></Avatar>
                <Icon
                  onClick={onOpenEditUser}
                  fontSize={12}
                  as={FiEdit}
                  color="gray.500"
                  cursor={"pointer"}
                  alignSelf="end"
                />
              </Flex>
              <Text marginTop="2">{loggedUser.username}</Text>
              <Button
                onClick={onOpenBrowseUsers}
                bg="gray.50"
                marginTop={4}
                rounded={"full"}
                fontSize="14px"
              >
                <Icon as={FiUser} marginRight="2" />
                Cari User
              </Button>
            </GridItem>
            <GridItem colSpan={isMobile ? 4 : 3}>
              <Flex
                alignItems={"center"}
                justifyContent="center"
                marginTop={2}
                marginBottom="4"
              >
                <Image src={camp404Logo} boxSize="12" alt="" />
              </Flex>
              <Box padding="4" height={"57vh"} overflowY="scroll">
                {[...chats]}
                <div className="" ref={chatRef}></div>
              </Box>
              <InputGroup>
                <Input
                  value={chatMessage}
                  marginLeft={2}
                  onChange={(ev) => setChatMessage(ev.target.value)}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <InputRightElement
                  children={
                    <Icon
                      as={HiPaperAirplane}
                      color="cyan.500"
                      onClick={handleSendMessage}
                    />
                  }
                />
              </InputGroup>
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <ModalInfoUser isOpen={isOpenInfoUser} onClose={onCloseInfoUser} />
      <ModalEditUser isOpen={isOpenEditUser} onClose={onCloseEditUser} />
      <ModalBrowseUsers
        isOpen={isOpenBrowseUsers}
        onClose={onCloseBrowseUsers}
        onOpenInfoUser={onOpenInfoUser}
      />
    </>
  );
};

export default ChatPage;
