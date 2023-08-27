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
    cw20ContractAddress
  } from '../config';
  import {
    ApiRequest
  } from '../api';  
  import { Cw721BaseQueryClient, Cw721BaseClient } from '../codegen/Cw721Base.client';
  import {Empty} from  '../codegen/Cw721Base.types';
  import { StdFee } from '@cosmjs/stargate';
  import BigNumber from 'bignumber.js';

  
  
export const MintNfts = () => {  
    const [isLoading, setIsLoading] = useState(true);
    const [nftName, setNftName] = useState('');
    const [nftUrl, setNftUrl] = useState('');
    const [nftDescription, setNftDescription] = useState('');
    const [txHash, setTxHash] = useState('');

    const lightBorderColor = useColorModeValue('#FFF', '#434B55');
    const mintBoxRef = useRef<HTMLDivElement>(null);

    const contractAddress = cw20ContractAddress;

    const {
      address,
      getRpcEndpoint,
      getCosmWasmClient,
      getSigningCosmWasmClient,
    } = useChain(chainName);
    // console.log("chainName ", chainName)

    useEffect(() => {
        if (address) {
          setIsLoading(true);
          console.log(" isLoading ", isLoading)
          return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    const [cw721BaseClient, setCw721BaseClient] = useState<Cw721BaseClient | null>(
      null
    );

    const handleNftNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNftName(event.target.value);
    }

    const handleNftDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNftDescription(event.target.value);
    }

    const handleNftUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNftUrl(event.target.value);
    }

    const handleMintClick = async (nftName :string, nftDescription: string, nftUrl: string) => {
      let rpcEndpoint = await getRpcEndpoint();
      console.log("rpcEndPoint: ", rpcEndpoint);
      
      await getSigningCosmWasmClient().then((cosmwasmClient) => {
        if (!cosmwasmClient || !address) {
          console.error('cosmwasmClient undefined or address undefined.');
          return;
        }
        console.log(" wasm client set");
        const client = new Cw721BaseClient(cosmwasmClient, address, contractAddress)
        setCw721BaseClient(client);

        
        console.log("client ", cw721BaseClient);

        const tokenId = "123";
        const obj: Empty = {
        } as Empty;
  
        const objParam = {
          extension: {
            "description":nftDescription,
            "name":nftName,
          }, 
          owner: address || "osmo15rvn0l8th4rnpmefmej7lvlw9ucvk7k6tsmy5d",
          tokenId: nftName,
          tokenUri: nftUrl 
        };

        console.log("----- address ---------", address);
        console.log(" base client ", client);

        const fee: StdFee = {
          amount: [
            {
              denom: 'uosmo',
              amount: '0',
            },
          ],
          gas: new BigNumber('200000').toString(),
        };

        client?.mint(objParam, fee).then((ExecuteResult) => {
          if (!ExecuteResult) {
            console.error('mint failed');
            return;
          }
          // console.log("mint result : ", ExecuteResult);
          console.log("mint txHash: ", ExecuteResult.transactionHash);
          setTxHash(ExecuteResult.transactionHash);
        })
        
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
                  <FormLabel>Nft Description: </FormLabel>
                  <Input placeholder='Nft Description'
                      value={nftDescription}
                      onChange={handleNftDescriptionChange}
                  />
              </FormControl>
              <FormControl id="NftUrl">
                  <FormLabel>Nft Url: </FormLabel>
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
              <Stack spacing={10} pt={2}>
                <Text  color='tomato'>
                  TxHash: {txHash}
                </Text>
              </Stack>
          </Stack>
        </Box>
      </Flex>
    );
}
  