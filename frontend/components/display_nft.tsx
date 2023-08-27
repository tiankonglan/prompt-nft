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
    Card,
    CardBody,
    SimpleGrid,
    Image,
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
  import { Cw721BaseQueryClient} from '../codegen/Cw721Base.client';
  import { TokensResponse } from '../codegen/Cw721Base.types';
  import {Empty} from  '../codegen/Cw721Base.types';
  import { StdFee } from '@cosmjs/stargate';
  import BigNumber from 'bignumber.js';

  
  
export const DisplayNfts = () => {  
    const [isLoading, setIsLoading] = useState(true);
    const [nftName, setNftName] = useState('');
    const [nftUrl, setNftUrl] = useState('');
    const [nftDescription, setNftDescription] = useState('');
    const [cw721BaseQueryClient, setCw721BaseQueryClient] = useState<Cw721BaseQueryClient | null>(
      null
    )
    const [flag, setFlag] = useState(false);
    const [nfts, setNfts] = useState<string[] | null>(
      null
    )
    const [imageUrls, setImageUrls] = useState<string[] | null>(
      null
    )

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

    // let flag : boolean = false;

    useEffect(() => {
        if (!address) {
          setIsLoading(true);
          console.log(" isLoading ", isLoading)
          return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps

        setIsLoading(false);
        // let ignore = false;
   
        // setFlag(true);
        // if (address && !flag && !ignore) {
        //   console.log(" check ---- flag: ", flag);
        //   handleClick();
        // }
        
    }, [address]);

    // const [cw721BaseClient, setCw721BaseClient] = useState<Cw721BaseClient | null>(
    //   null
    // );

   
    const handleClick = () => {
      console.log(" handclick too !!!")
      getSigningCosmWasmClient().then((cosmwasmClient) => {
        console.log(" callback too !!!")
        if (!cosmwasmClient || !address) {
          console.error('cosmwasmClient undefined or address undefined.');
          return;
        }
    
        

        console.log(" wasm client set");
        const client = new Cw721BaseQueryClient(cosmwasmClient, contractAddress)
        // setCw721BaseQueryClient(client);

        console.log("client: ", client)
        client?.tokens({owner:address}).then((TokenResponse) => {
          if (!TokenResponse) {
            console.error('query tokens failed');
            return;
          }

          console.log(TokenResponse.tokens);
          setNfts(TokenResponse.tokens);

          // console.log("nfts --- ", nfts);
          let images: string[] = []; 
          if (TokenResponse.tokens) {
            for (const nft of TokenResponse.tokens) {
              client?.allNftInfo({tokenId:nft}).then((infos) => {
                if (!infos) {
                  console.error('query info failed');
                  return;
                }
                if (infos.info.token_uri) {
                  images.push(infos.info.token_uri);
                }
              })   
            }

            setImageUrls(images);
            console.log("imageUrls: ", imageUrls);
            // setIsLoading(false);
            // this.forceUpdate();
          }
        })
      })
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
            <Stack spacing={10} pt={2}>
                  <Button
                  onClick={async (e) => {
                    await handleClick();
                  }}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                      bg: 'blue.500',
                  }}>
                  Query
                  </Button>
              </Stack>
          </Stack>
        </Box>

        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {
        imageUrls?.map(url => {
          return (
            <Card maxW='sm'  mx={'auto'} py={12} px={6}>
              <CardBody>
              <Image  src={url}
                alt='imagw'
                borderRadius='lg'
              />
                </CardBody>
            </Card>
            );
          })
        }
        </SimpleGrid>
      </Flex>
    );
}
  