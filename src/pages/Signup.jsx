import React, { useState } from "react";
import { Box, Heading, Input, Button, VStack, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("regular");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password, accountType });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  return (
    <Box maxWidth="400px" margin="auto" padding="4">
      <Heading as="h1" size="xl" textAlign="center" marginBottom="8">
        Sign Up
      </Heading>
      <form onSubmit={handleSignup}>
        <VStack spacing="4">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="regular">Regular Account</option>
            <option value="admin">Administrator Account</option>
          </Select>
          <Button type="submit" colorScheme="blue" width="100%">
            Sign Up
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;
