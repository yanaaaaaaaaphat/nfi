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
import { Formik, Form, Field } from "formik";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { login } = useAuth();
  const handleSubmit = async (values, props) => {
    const result = await login(values);
  };

  return (
    <>
      <Box
        bgColor="gray"
        w="100vw"
        h="100vh"
        bgImage="../../assets/bg.png"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        {/* Navbar */}
        <Flex
          mb="100px"
          justifyContent="space-between"
          alignItems="center"
          px="40px"
          pt="10px"
        >
          <Heading textColor="white" size="lg" ml="20px">
            SendAnywhere
          </Heading>
          <Flex gap="30px">
            <Text textColor="white">Home</Text>
            <Text textColor="white">About us</Text>
          </Flex>
        </Flex>

        {/* Header */}
        <Flex>
          <Flex flexDirection="column">
            <Flex flexDirection="column" mb="20px" p="20px" w="600px" ml="40px">
              <Heading variant="headline1" textColor="white" size="2xl">
                Send money anywhere
              </Heading>
              <Flex
                alignContent="center"
                alignItems="center"
                gap="10px"
                mt="20px"
              >
                <Heading size="md" textColor="white">
                  Don't have an account?
                </Heading>
                <span>
                  <Link textColor="orange" href="/">
                    Register
                  </Link>
                </span>
              </Flex>
            </Flex>

            {/* Log-in form */}
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Flex
                  w="500px"
                  flexDirection="column"
                  justifyContent="flex-start"
                  p="20px"
                  ml="40px"
                >
                  <Form>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel textColor="white">Email</FormLabel>
                          <Input
                            {...field}
                            placeholder="your email"
                            mb="8px"
                            textColor="orange"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel textColor="white">Password</FormLabel>
                          <Input
                            {...field}
                            placeholder="your password"
                            mb="8px"
                            textColor="orange"
                            type="password"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      mt={4}
                      colorScheme="red"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Log in
                    </Button>
                  </Form>
                </Flex>
              )}
            </Formik>
          </Flex>
          {/* image here */}
        </Flex>
      </Box>
    </>
  );
}

export default Login;
