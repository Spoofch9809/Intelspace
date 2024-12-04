import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // Email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast(); // Chakra UI toast for notifications

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("email", data.email); // Store email
        localStorage.setItem("username", data.username); // Store username
        toast({
          title: "Login successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/home"); // Redirect to home page
      } else {
        const errorData = await response.json(); // Parse error details
        setError(errorData.detail || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Unable to connect to the server. Please try again later.");
    }
  }

  return (
    <Box
      bg="gray.50"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        maxW="400px"
        w="full"
        textAlign="center"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Log in to your account
        </Text>
        <VStack as="form" spacing={4} onSubmit={handleLogin}>
          <FormControl id="identifier" isRequired>
            <FormLabel>Email or Username</FormLabel>
            <Input
              placeholder="Enter your email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {error && <Text color="red.500">{error}</Text>}
          <Button
            type="submit"
            colorScheme="orange"
            w="full"
            size="lg"
          >
            Sign In
          </Button>
        </VStack>
        <Text mt={4}>
          Don't have an account?{" "}
          <Link to="/signup-page" style={{ color: "#FF7643" }}>
            Create one
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default LoginPage;
