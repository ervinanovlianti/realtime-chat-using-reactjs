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
const ModalInfoUser = ({ isOpen, onClose }) => {
  const userDetail = useSelector((st) => st.userDetail);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Info User</ModalHeader>
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
              src={userDetail?.avatar}
            ></Avatar>
            <Text>{userDetail?.username}</Text>
            <Text size="md" color="gray.500">
              {userDetail.email}
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button variant={"ghost"} rounded="full" onClick={onClose}>
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalInfoUser;
