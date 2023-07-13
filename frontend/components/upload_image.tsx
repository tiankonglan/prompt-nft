import {
    Flex,
    useColorModeValue,
    Stack,
    Input,
    Button,
    FormControl,
    FormLabel,
    Text,
    Box,
    Textarea,
    Card,
    CardBody,
    Image,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useChain } from '@cosmos-kit/react';
import {
  chainName,
} from '../config';
import {
  ApiRequest
} from '../api';  

export const UploadImage = () => {  
    const [imageUrl, setImageUrl] = useState('');
    const [ipfsUrl, setIpfsUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const lightBorderColor = useColorModeValue('#FFF', '#434B55');

    const mintBoxRef = useRef<HTMLDivElement>(null);

    const {
        address,
      } = useChain(chainName);

    useEffect(() => {
        if (address) {
          setIsLoading(true);
          console.log(" isLoading ", isLoading)
          return;
        }
    }, [address]);

    const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setImageUrl(event.target.value);
    }

    const handleUploadClick = async (imageUrl :string) => {
      const uri = "/api/v1/nft?image_url=" + imageUrl
      ApiRequest.get(uri)
        .then((data) => {
          console.log("data: ", data);
          console.log("data.image_url: ", data.data.image_url);
          setIpfsUrl(data.data.image_url);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }

    return (
      <Flex
        w="816px"
        minH="595px"
        border="1px solid"
        borderColor={lightBorderColor}
        boxShadow="0px 15px 35px rgba(0, 0, 0, 0.2)"
        borderRadius="12px"
        flexDir="column"
        p="22px"
        mb="60px"
        mx="auto"
        ref={mintBoxRef}
      >
        <Box>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <FormControl id="ImageUrl">
                  <FormLabel>Imageurl</FormLabel>
                  <Input placeholder='Imageurl'
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                  />
              </FormControl>
              <Stack spacing={10} pt={2}>
                  <Button
                  onClick={async (e) => {
                    console.log("taskId: ", imageUrl);
                    await handleUploadClick(imageUrl);
                  }}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                      bg: 'blue.500',
                  }}>
                  Upload
                  </Button>
              </Stack>
              <Stack spacing={10} pt={2}>
                <Text  color='tomato'>
                  IpfsUrl: {ipfsUrl}
                </Text>
              </Stack>
          </Stack>
        </Box>
      </Flex>
    );
}
  