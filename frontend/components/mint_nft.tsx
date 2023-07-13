import {
    Box,
    Flex,
    Text,
    useColorModeValue,
    Stack,
    Input,
    Button,
    FormControl,
    FormLabel,
  } from '@chakra-ui/react';
  import React, { useEffect, useRef, useState } from 'react';
  import { useChain } from '@cosmos-kit/react';
  import {
    chainName,
  } from '../config';
  import {
    ApiRequest
  } from '../api';  

  
export const MintNfts = () => {  
    const [isLoading, setIsLoading] = useState(true);
    const [nftName, setNftName] = useState('');
    const [nftUrl, setNftUrl] = useState('');
    const [nftDescription, setNftDescription] = useState('');

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    const handleNftNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNftName(event.target.value);
    }

    const handleNftDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNftName(event.target.value);
    }

    const handleNftUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNftName(event.target.value);
    }

    const handleMintClick = async (nftName :string, nftDescription: string, nftUrl: string) => {
      const uri = "/api/v1/nft?image_url=" + nftUrl
      ApiRequest.get(uri)
        .then((data) => {
          // setPosts(data);
          console.log("data: ", data);
          console.log("data.image_url: ", data.data.image_url);
          // setIpfsUrl(data.data.image_url);
        })
        .catch((err) => {
          // setIsError(true);
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
              <FormControl id="NftName">
                  <FormLabel>Nft Name: </FormLabel>
                  <Input placeholder='Nft Name'
                      value={nftName}
                      onChange={handleNftNameChange}
                  />
              </FormControl>
              <FormControl id="NftDescription">
                  <FormLabel>Nft Name: </FormLabel>
                  <Input placeholder='Nft Description'
                      value={nftDescription}
                      onChange={handleNftDescriptionChange}
                  />
              </FormControl>
              <FormControl id="NftUrl">
                  <FormLabel>Nft Name: </FormLabel>
                  <Input placeholder='Nft Url'
                      value={nftUrl}
                      onChange={handleNftUrlChange}
                  />
              </FormControl>
              <Stack spacing={10} pt={2}>
                  <Button
                  onClick={async (e) => {
                    // console.log("taskId: ", );
                    await handleMintClick(nftName, nftDescription, nftUrl);
                  }}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                      bg: 'blue.500',
                  }}>
                  Mint
                  </Button>
              </Stack>
              {/* <Stack spacing={10} pt={2}>
                <Text  color='tomato'>
                  IpfsUrl: {ipfsUrl}
                </Text>
              </Stack> */}
          </Stack>
        </Box>
      </Flex>
    );
}
  