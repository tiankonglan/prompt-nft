import Head from 'next/head';
import {
  Box,
  Divider,
  Grid,
  Heading,
  Text,
  Stack,
  Container,
  Link,
  Button,
  Flex,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

import { useChain } from '@cosmos-kit/react';
import { WalletStatus } from '@cosmos-kit/core';

import {
  chainName,
  cw20ContractAddress,
  dependencies,
  products,
} from '../config';
import {
  Product,
  Dependency,
  WalletSection,
  handleChangeColorModeValue,
  HackCw20,
} from '../components';
// import { useHackCw20Balance } from '../hooks/use-hack-cw20-balance';
import { useHackCw721Base } from '../hooks/use-hack-cw721';
import { MintNfts } from '../components/mint_nft';
import { GenPicture } from '../components/gen_picture';
import { UploadImage } from '../components/upload_image';

const library = {
  title: 'OsmoJS',
  text: 'OsmoJS',
  href: 'https://github.com/osmosis-labs/osmojs',
};

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { status } = useChain(chainName);
  const { balance } = useHackCw721Base(cw20ContractAddress);

  return (
    <Container maxW="5xl" py={10}>
      <Head>
        <title>Create Cosmos App</title>
        <meta name="description" content="Generated by create cosmos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justifyContent="end" mb={4}>
        <Button variant="outline" px={0} onClick={toggleColorMode}>
          <Icon
            as={colorMode === 'light' ? BsFillMoonStarsFill : BsFillSunFill}
          />
        </Button>
      </Flex>
      <Box textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          fontWeight="extrabold"
          mb={3}
        >
          Create Cosmos App
        </Heading>
        <Heading
          as="h1"
          fontWeight="bold"
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          <Text as="span">Welcome to&nbsp;</Text>
          <Text
            as="span"
            color={handleChangeColorModeValue(
              colorMode,
              'primary.500',
              'primary.200'
            )}
          >
            CosmosKit + Next.js +{' '}
            <a href={library.href} target="_blank" rel="noreferrer">
              {library.title}
            </a>
          </Text>
        </Heading>
      </Box>

      <WalletSection />
      <GenPicture/>
      <UploadImage/>
      <MintNfts/>

      {/* <Box w="full" maxW="md" mx="auto">
        <HackCw20
          balance={balance}
          isConnectWallet={status !== WalletStatus.Disconnected}
        />
      </Box>

      <Box w="full" maxW="md" mx="auto">
              <MintNfts/>
      </Box> */}

  





      {/* <Box my={20}>
        <Divider />
      </Box>
      <Grid
        templateColumns={{
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={8}
        mb={14}
      >
        {products.map((product) => (
          <Product key={product.title} {...product}></Product>
        ))}
      </Grid>
      <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={8} mb={20}>
        <Dependency {...library} />
        {dependencies.map((dependency) => (
          <Dependency key={dependency.title} {...dependency}></Dependency>
        ))}
      </Grid> */}

      {/* <Box mb={3}>
        <Divider />
      </Box> */}
      {/* <Stack
        isInline={true}
        spacing={1}
        justifyContent="center"
        opacity={0.5}
        fontSize="sm"
      >
        <Text>Built with</Text>
        <Link
          href="https://cosmology.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cosmology
        </Link>
      </Stack> */}
    </Container>
  );
}
