import {
    Box,
    Center,
    Flex,
    Icon,
    Image,
    NumberInput,
    NumberInputField,
    Spinner,
    Text,
    useColorModeValue,
    Stack,
    // FormControl,
    InputGroup,
    InputLeftAddon,
    Input,
    FormHelperText,
    InputRightAddon,
    Button,
    FormControl,
    Link,
    FormLabel,
    InputRightElement
  } from '@chakra-ui/react';
  import { FaUserAlt, FaLock, FaCheck } from "react-icons/fa";
  
  import BigNumber from 'bignumber.js';

  import React, { useEffect, useRef, useState } from 'react';
  import { HiOutlineClock } from 'react-icons/hi';
//   import { LargeButton } from 'components/base';
  // import { contracts, stargaze } from 'stargazejs';
  import { useChain } from '@cosmos-kit/react';
  import {
    chainName,
//     coin,
//     COLLECTION,
//     COLLECTIONS_MINT,
//     exponent,
  } from '../config';
//   import { getPrices } from 'api';
//   import dayjs from 'dayjs';
//   import relativeTime from 'dayjs/plugin/relativeTime';
  import { StdFee } from '@cosmjs/stargate';
//   import { useTransactionToast } from 'hooks/useTransactionToast';
//   import {
//     CollectionMint,
//     CollectionsMint,
//     ContractsAddress,
//     Minter,
//     SG721,
//     TxResult,
//     Whitelist,
//   } from './types';
//   import { useQuery, useLazyQuery } from '@apollo/client';
//   import { getHttpUrl, toDisplayAmount } from 'utils';
//   import { Hero } from './mint/hero';
  
//   dayjs.extend(relativeTime);
  
//   type TData = {
//     balanceAmount: string;
//     starsPrice: number;
//     collectionInfo: {
//       minter: Minter;
//       sg721: SG721;
//       whitelist?: Whitelist;
//     };
//   };



  
export const MintNfts = () => {  
    const [isLoading, setIsLoading] = useState(true);

    const imageUrl = 'https://suifrens.com/fren/0x6705efcd35083fc8826bd4bbb8516060a394796b2d771c95a04aa4425dedd4da';

    const titleColor = useColorModeValue('#697584', '#A7B4C2');
    const statColor = useColorModeValue('#2C3137', '#EEF2F8');
    const bgColor = useColorModeValue('#EEF2F8', '#1D2024');
    const borderColor = useColorModeValue('#D1D6DD', '#434B55');
    const lightBorderColor = useColorModeValue('#FFF', '#434B55');
    const symbolColor = useColorModeValue('#2C3137', '#A7B4C2');
    const tagTextColor = useColorModeValue('#FFF', '#1D2024');

    const mintBoxRef = useRef<HTMLDivElement>(null);

    const inputAmount = 0;

    const {
        address,
        getRpcEndpoint,
        getCosmWasmClient,
        getSigningCosmWasmClient,
      } = useChain(chainName);

    useEffect(() => {
        if (address) {
          setIsLoading(true);
          console.log(" isLoading ", isLoading)
          return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                </FormControl>
                    
                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                </FormControl>
                <Stack spacing={10} pt={2}>
                    <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                    Sign up
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}
  