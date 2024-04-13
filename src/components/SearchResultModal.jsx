import React from "react";
import { Text } from "@chakra-ui/react";

const SearchResultModal = ({ location }) => {
  return (
    <Text>
      The ID is available and can be picked up at <strong>{location}</strong>.
    </Text>
  );
};

export default SearchResultModal;
