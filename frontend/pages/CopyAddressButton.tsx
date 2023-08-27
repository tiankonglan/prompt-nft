import React, { useEffect, useState } from "react";
import {
  Text,
  useColorMode,
  Button,
  Icon,
  useClipboard,
} from "@chakra-ui/react";
import { FiCopy } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

type CopyAddressType = {
  address?: string;
  isLoading?: boolean;
  maxDisplayLength?: number;
  isRound?: boolean;
};

function handleChangeColorModeValue(
  colorMode: string,
  light: string,
  dark: string
) {
  if (colorMode === "light") return light;
  if (colorMode === "dark") return dark;
}

function stringTruncateFromCenter(str: string, maxLength: number) {
  const midChar = "…"; // character to insert into the center of the result
  let left: number;
  let right: number;

  if (str.length <= maxLength) return str;

  // length of beginning part
  left = Math.ceil(maxLength / 2);

  // start index of ending part
  right = str.length - Math.floor(maxLength / 2) + 1;

  return str.substring(0, left) + midChar + str.substring(right);
}

const CopyAddressButton = ({
  address,
  isLoading,
  isRound,
  maxDisplayLength,
}: CopyAddressType) => {
  const { hasCopied, onCopy } = useClipboard(address ? address : "");
  const [displayAddress, setDisplayAddress] = useState("");
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!address) setDisplayAddress("address not identified yet");
    if (address && maxDisplayLength)
      setDisplayAddress(stringTruncateFromCenter(address, maxDisplayLength));
    if (address && !maxDisplayLength)
      setDisplayAddress(stringTruncateFromCenter(address, 16));
  }, [address]);

  return (
    <Button
      title={address}
      variant="unstyled"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={isRound ? "full" : "lg"}
      border="1px solid"
      borderColor={handleChangeColorModeValue(
        colorMode,
        "gray.200",
        "whiteAlpha.300"
      )}
      w="full"
      h={12}
      minH="fit-content"
      color={handleChangeColorModeValue(
        colorMode,
        "gray.700",
        "whiteAlpha.600"
      )}
      transition="all .3s ease-in-out"
      isDisabled={!address && true}
      isLoading={isLoading}
      _hover={{
        bg: "rgba(142, 142, 142, 0.05)",
      }}
      _focus={{
        outline: "none",
      }}
      _disabled={{
        opacity: 0.6,
        cursor: "not-allowed",
        borderColor: "rgba(142, 142, 142, 0.1)",
        _hover: {
          bg: "transparent",
        },
        _active: {
          outline: "none",
        },
        _focus: {
          outline: "none",
        },
      }}
      onClick={onCopy}
    >
      <Text
        fontSize="sm"
        fontWeight="normal"
        letterSpacing="0.4px"
        opacity={0.75}
      >
        {displayAddress}
      </Text>
      {address && (
        <Icon
          as={hasCopied ? FaCheckCircle : FiCopy}
          w={4}
          h={4}
          ml={2}
          opacity={0.9}
          color={
            hasCopied
              ? "green.400"
              : handleChangeColorModeValue(
                  colorMode,
                  "gray.500",
                  "whiteAlpha.400"
                )
          }
        />
      )}
    </Button>
  );
};

export default function () {
  return (
    <CopyAddressButton address="osmo152c57FcA7d6854AA178e7a183DdBE4eF322B904B1d719fc485f6FFBC" />
  );
}