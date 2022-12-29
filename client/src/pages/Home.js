import {
  Box,
  Text,
  FormLabel,
  Input,
  Button,
  Flex,
  Heading,
  Link,

} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
let action = "";

function Home() {
  let [amt, setAmt] = useState(0);
  let [userBalance, setUserBalance] = useState(0);
  const { logout } = useAuth();
  let { userId } = useParams();
  let [deposit, setDeposit] = useState(false);
  let [withdraw, setWithdraw] = useState(false);

  const getData = async () => {
    const balance = await axios.get(`http://localhost:3000/transact/${userId}`);
    setUserBalance(balance.data.data);
    window.localStorage.setItem("balance", balance.data.data);
  };

  const handleTransact = async (amount) => {

    const result = await axios.put(`http://localhost:3000/transact/${userId}`, {
      amount: amount,
      action: action,
    });
    setDeposit(false);
    setWithdraw(false);
    getData();

    if (/negative/g.test(result.data.message)) {
        alert("Not enough balance");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Flex
        bgColor="black"
        gap="70px"
        px="40px"
        pt="10px"
        alignItems="center"
        h="80px"
        justifyContent="flex-end"
      >
        <Link textColor="orange" ml="20px">
          Dashboard
        </Link>
        <Link textColor="orange">Wallet</Link>
        <Link textColor="orange">Activity</Link>
        <Link textColor="orange">Help</Link>
        <Button
          onClick={() => {
            logout();
          }}
        >
          log out
        </Button>
      </Flex>

      {/* Main Section */}
      <Box
        bgColor="black"
        h="100vh"
        p="40px"
        bgImage="../../assets/bg2.png"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        <Flex flexDirection="column" w="30%" p="20px" gap="40px">
          <Heading variant="headline3">Your Balance</Heading>
          <Heading variant="headline1">
            $ {window.localStorage.getItem("balance")}
          </Heading>
          <Flex gap="15px">
            <Button
              w="40%"
              colorScheme="green"
              disabled={action == "withdraw" ? true : false}
              onClick={() => {
                setDeposit(true);
                action = "deposit";
              }}
            >
              Deposit
            </Button>
            <Button
              w="40%"
              colorScheme="orange"
              disabled={action == "deposit" ? true : false}
              onClick={() => {
                setWithdraw(true);
                action = "withdraw";
              }}
            >
              Withdraw
            </Button>
          </Flex>
          <Flex
            flexDirection="column"
            gap="20px"
            visibility={deposit || withdraw ? "visible" : "hidden"}
          >
            <FormLabel textColor="white">
              Amount to {action == "deposit" ? "deposit" : "withdraw"}
            </FormLabel>
            <Input
              textColor="white"
              type="number"
              min="0"
              onChange={(e) => setAmt(e.target.value)}
              isRequired
            ></Input>
            <Button
              onClick={() => {
                handleTransact(amt);
                action = "";
                
              }}
            >
              Confirm
            </Button>
            <Button
              onClick={() => {
                setDeposit(false);
                setWithdraw(false);
                action = "";
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Home;
