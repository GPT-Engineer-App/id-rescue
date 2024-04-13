import React, { useState } from "react";
import { Box, Heading, Input, Button, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" padding="4">
      <Heading as="h1" size="xl" textAlign="center" marginBottom="8">
        Login
      </Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing="4">
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" colorScheme="blue" width="100%">
            Login
          </Button>
        </VStack>
      </form>
      <Text textAlign="center" marginTop="4">
        Don't have an account?{" "}
        <Button variant="link" onClick={() => navigate("/signup")}>
          Sign up
        </Button>
      </Text>
    </Box>
  );
};

export default Login;
