import {
  Box,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Flex,
  Heading,
  Link,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useState } from "react";

function Home() {

    const [userBalance, setUserBalance] = useState(0);
    const { userState } = useAuth();
    const userId = userState.user.user_id;

    const getData = async (userId) => {
        const balance = await axios.get(`http://localhost:3000/${userId}`);
        setUserBalance(balance.data)
    }

    useEffect(()=>{
        getData();
    })
  return (
    <>
      {/* Navbar */}
      <Flex bgColor="black" gap="40px" px="40px" pt="10px" alignItems="center" h="80px">
        <Link textColor="orange" ml="20px">Dashboard</Link>
        <Link textColor="orange">Wallet</Link>
        <Link textColor="orange">Activity</Link>
        <Link textColor="orange">Help</Link>
      </Flex>

      {/* Main Section */}
      <Box bgColor="black" h="100vh" p="40px" bgImage="../../assets/bg2.png"
        backgroundSize="cover"
        backgroundRepeat="no-repeat">
        <Flex
          flexDirection="column"
        //   border="1px"
        //   borderRadius="16px"
          w="30%"
          p="20px"
          gap="40px"
        >
          <Heading variant="headline3">Your Balance</Heading>
          <Heading variant="headline1">$ {userBalance}</Heading>
          <Flex gap="15px"><Button w="40%" colorScheme="green">Deposit</Button><Button w="40%" colorScheme="orange">
            Withdraw
          </Button>
          </Flex>
          
        </Flex>
      </Box>
    </>
  );
}

export default Home;
