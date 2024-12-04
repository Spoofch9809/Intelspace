import React from "react";
import { Button, createStandaloneToast } from "@chakra-ui/react";

const ToastTest = () => {
  const toast = createStandaloneToast();

  const showToast = () => {
    toast({
      title: "Test Toast",
      description: "This is a test toast message",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Button onClick={showToast}>Show Toast</Button>
    </div>
  );
};

export default ToastTest;
