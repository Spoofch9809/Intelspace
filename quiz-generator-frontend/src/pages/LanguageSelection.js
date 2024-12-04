// src/pages/LanguageSelection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, SimpleGrid} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constants";
import Header from "../components/Header";

const LanguageSelection = () => {
  return (
    <Box p={5}>
      <Header mb={4} />
      <Text fontSize="2xl" mb={4} pt={10} pb={6}>
        <b>Select a Language to Practice:</b>
      </Text>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
          <Link key={lang} to={`/code-editor?language=${lang}`}>
            <Box
              p={6}
              borderWidth={1}
              borderRadius="md"
              textAlign="center"
              backgroundImage = "solid black"
              transition="background-image 0.3s, opacity 0.3s"
            >
              <Text fontSize="lg" fontWeight="bold">
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </Text>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default LanguageSelection;