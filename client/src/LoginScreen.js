import { useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import colors from './colors/login';
import axios from "./axios";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function LoginScreen({showSignUp}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    function onLogin(){
        window.localStorage.setItem('clickchat-user', 110001);
        axios.get('getAll')
            .then(res=>res.data)
            .then(res=>console.log(res));
    }

    return (
      <div style={{flex: 1, border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Flex
              flexDirection="column"
              width="100wh"
              padding={10}
              borderRadius={20}
              backgroundColor={colors.background}
              justifyContent="center"
              alignItems="center"
          >
              <Stack
                  flexDir="column"
                  mb="2"
                  justifyContent="center"
                  alignItems="center"
              >
                  <Avatar bg={colors.base} />
                  <Heading color={colors.base}>Welcome to ClickChat</Heading>
                  <Box minW={{ base: "90%", md: "468px" }}>
                      <>
                          <Stack
                              spacing={4}
                              p="1rem"
                          >
                              <FormControl>
                                  <InputGroup>
                                      <InputLeftElement
                                          pointerEvents="none"
                                          children={<CFaUserAlt color={colors.gray} />}
                                      />
                                      <Input type="username" placeholder="Username" />
                                  </InputGroup>
                              </FormControl>
                              <FormControl>
                                  <InputGroup>
                                      <InputLeftElement
                                          pointerEvents="none"
                                          color={colors.background}
                                          children={<CFaLock color={colors.gray} />}
                                      />
                                      <Input
                                          type={showPassword ? "text" : "password"}
                                          placeholder="Password"
                                      />
                                      <InputRightElement width="4.5rem">
                                          <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                              {showPassword ? "Hide" : "Show"}
                                          </Button>
                                      </InputRightElement>
                                  </InputGroup>
                                  <FormHelperText textAlign="right">
                                      <Link>forgot password?</Link>
                                  </FormHelperText>
                              </FormControl>
                              <Button
                                  borderRadius={0}
                                  variant="solid"
                                  colorScheme={'blackAlpha'}
                                  width="full"
                                  onClick={onLogin}
                              >
                                  Login
                              </Button>
                          </Stack>
                      </>
                  </Box>
              </Stack>
              <Box>
                  New to us?{" "}
                  <Link color={colors.base} href="#" onClick={showSignUp}>
                      Sign Up
                  </Link>
              </Box>
          </Flex>
      </div>
  );
}
