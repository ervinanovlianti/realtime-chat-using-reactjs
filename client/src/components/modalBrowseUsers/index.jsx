import React from "react";
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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { usersActions } from "../../redux/action";
const ModalBrowseUsers = ({ isOpen, onClose, onOpenInfoUser }) => {
  const users = useSelector((st) => st.users);
  const dispatch = useDispatch();

  const handleOpenInfoUser = (id) => {
    dispatch(usersActions.getUserById(id));
    onOpenInfoUser();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cari User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {users?.map((el) => (
            <Flex alignItems={"center"} gap="4" marginBottom={4}>
              <Avatar
                name="YN"
                src={el.avatar}
                bg="cyan.500"
                color="white"
              ></Avatar>
              <Text>{el.username}</Text>
              <Button
                marginLeft={"auto"}
                size="xs"
                onClick={() => handleOpenInfoUser(el._id)}
              >
                Lihat
              </Button>
            </Flex>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button variant={"ghost"} rounded="full">
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalBrowseUsers;
