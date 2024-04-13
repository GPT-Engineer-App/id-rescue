import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, Divider, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import SearchResultModal from "../components/SearchResultModal";
import { useNavigate } from "react-router-dom";

let mockDatabase = [];

const Index = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("mockDatabase");
    if (storedData) {
      mockDatabase = JSON.parse(storedData);
    }
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("mockDatabase", JSON.stringify(mockDatabase));
  }, [mockDatabase]);

  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [location, setLocation] = useState("");
  const [searchIdNumber, setSearchIdNumber] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    mockDatabase.push({ name, idNumber, location });
    toast({
      title: "ID details uploaded.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setName("");
    setIdNumber("");
    setLocation("");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const foundId = mockDatabase.find((item) => item.idNumber === searchIdNumber);
    if (foundId) {
      setSearchResult({ found: true, location: foundId.location });
      onOpen();
    } else {
      toast({
        title: "ID not found",
        description: "Sorry, the ID was not found. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="600px" margin="auto" padding="4">
      <Heading as="h1" size="xl" textAlign="center" marginBottom="8">
        Lost ID Recovery
      </Heading>

      <VStack spacing="6" align="stretch">
        {currentUser?.accountType === "admin" && (
          <Box>
            <Heading as="h2" size="lg" marginBottom="4">
              Upload Lost ID Details
            </Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing="4">
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input placeholder="ID Number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
                <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <Button type="submit" colorScheme="blue">
                  Upload
                </Button>
              </VStack>
            </form>
          </Box>
        )}

        <Divider />

        <Box>
          <Heading as="h2" size="lg" marginBottom="4">
            Search for Lost ID
          </Heading>
          <form onSubmit={handleSearch}>
            <HStack spacing="4">
              <Input placeholder="ID Number" value={searchIdNumber} onChange={(e) => setSearchIdNumber(e.target.value)} required />
              <Button type="submit" colorScheme="blue">
                Search
              </Button>
            </HStack>
          </form>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Search Result</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SearchResultModal location={searchResult?.location} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
