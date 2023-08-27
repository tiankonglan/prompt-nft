import {
    Flex,
    useColorModeValue,
    Stack,
    Button,
    FormControl,
    FormLabel,
    Text,
    Box,
    Textarea,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useChain } from '@cosmos-kit/react';
import {
  chainName,
} from '../config';
import {
  ApiRequest
} from '../api';
  
export const GenTask = () => {  
    const [isLoading, setIsLoading] = useState(true);
    const [taskId, setTaskId] = useState('');
    const [prompt, setPrompt] = useState('');

    const lightBorderColor = useColorModeValue('#FFF', '#434B55');

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

    return (
      <Flex
        w="1024px"
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
              <FormControl id="Prompt">
                  <FormLabel>Prompt</FormLabel>
                  <Textarea 
                    placeholder="Enter text here..."
                    size="md" 
                    rows={10}
                    value={prompt}
                    onChange={handleChange}
                  />
              </FormControl>
              <Stack spacing={10} pt={2}>
                  <Button
                  onClick={async (e) => {
                    await handleTaskClick(prompt);
                  }}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                      bg: 'blue.500',
                  }}>
                  Create
                  </Button>
              </Stack>
              <Stack spacing={10} pt={2}>
                <Text  color='tomato'>
                  TaskId: {taskId}
                </Text>
              </Stack>
          </Stack>
        </Box>
      </Flex>
    );
}
  