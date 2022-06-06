import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Avatar,
  Flex,
  Box,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, deleteUser } from "../../api/user-api";
import { useHistory } from "react-router-dom";
import { usersActions } from "../../redux/action";
const ModalEditUser = ({ isOpen, onClose }) => {
  const loggedUser = useSelector((st) => st.loggedUser);
  const [inputState, setInputState] = useState({ username: "", email: "" });
  const toast = useToast();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEditUser = async () => {
    let body = {};
    body["username"] = inputState.username ? inputState.username : undefined;
    body["email"] = inputState.email ? inputState.email : undefined;

    const response = await editUser(body);

    if (response.status === "success") {
      dispatch(usersActions.getLoggedUser());
      toast({
        title: "Account Edited.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      onClose();
    } else {
      toast({
        title: "Error",
        description: response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleDeleteUser = async () => {
    let response = await deleteUser();

    if (response.status === "success") {
      history.push("/");
      toast({
        title: "Bye :)",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      onClose();
    } else {
      toast({
        title: "Error",
        description: response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            justifyContent={"center"}
            flexDirection="column"
            alignItems={"center"}
            gap="2"
          >
            <Avatar
              name="YN"
              bg="cyan.500"
              color="white"
              src={loggedUser?.avatar}
            ></Avatar>
            <Editable defaultValue={loggedUser?.username}>
              <EditablePreview />
              <EditableInput
                onChange={(ev) =>
                  setInputState({ ...inputState, username: ev.target.value })
                }
              />
            </Editable>
            <Editable defaultValue={loggedUser?.email} color={"gray.500"}>
              <EditablePreview />
              <EditableInput
                onChange={(ev) =>
                  setInputState({ ...inputState, email: ev.target.value })
                }
              />
            </Editable>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="pink"
            variant={"ghost"}
            color="red"
            rounded={"full"}
            marginRight="2"
            onClick={handleDeleteUser}
          >
            Hapus Akun
          </Button>
          <Button
            colorScheme="cyan"
            color="white"
            rounded={"full"}
            onClick={handleEditUser}
          >
            Ubah
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditUser;
