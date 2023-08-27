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
  
export const GenPicture = () => {  
    const [isLoading, setIsLoading] = useState(true);
    const [taskId, setTaskId] = useState('');
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // const imageUrl = 'https://suifrens.com/fren/0x6705efcd35083fc8826bd4bbb8516060a394796b2d771c95a04aa4425dedd4da';

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
      } = useChain(chainName);

    useEffect(() => {
        if (address) {
          setIsLoading(true);
          console.log(" isLoading ", isLoading)
          return;
        }
    }, [address]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(event.target.value);
    }

    const handleTaskIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTaskId(event.target.value);
    }

    
    const handleTaskClick = async (prompt : string) => {
      const uri = "/api/v1/prompt?prompt=" + prompt
      ApiRequest.get(uri)
        .then((data) => {
          // setPosts(data);
          console.log("data: ", data);
          console.log("data.task_id: ", data.data.task_id);
          setTaskId(data.data.task_id);
          console.log("taskId: ", taskId);
        })
        .catch((err) => {
          // setIsError(true);
          console.log("err: ", err);
        });
    }

    const handleQueryClick = async (taskId :string) => {
      const uri = "/api/v1/task_id?task_id=" + taskId
      ApiRequest.get(uri)
        .then((data) => {
          // setPosts(data);
          console.log("data: ", data);
          console.log("data.task_id: ", data.data.image_url);
          setImageUrl(data.data.image_url);
        })
        .catch((err) => {
          // setIsError(true);
          console.log("err: ", err);
        });
    }

    const imageTaskId = "";

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
            <FormControl id="TaskId">
              <FormLabel>TaskId</FormLabel>
              <Input placeholder='TaskId'
                  value={taskId}
                  onChange={handleTaskIdChange}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
                  <Button
                  onClick={async (e) => {
                    console.log("taskId: ", taskId);
                    await handleQueryClick(taskId);
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
              {/* <Stack spacing={10} pt={2}>
                <Text  color='tomato'>
                  ImageUrl: {imageUrl}
                </Text>
              </Stack> */}
          </Stack>
        </Box>
        <Box>
          <Card maxW='sm'  mx={'auto'} py={12} px={6}>
            <CardBody>
              <Image
                // src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                src={imageUrl}
                alt='imagw'
                borderRadius='lg'
              />
            </CardBody>
          </Card>
          <Stack spacing={10} pt={2}>
                <Text  color='tomato'>
                  ImageUrl: {imageUrl}
                </Text>
              </Stack>
        </Box>
      </Flex>
    );
}
  