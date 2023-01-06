import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModelState } from "../../../atoms/authModelState";
import { currentUserState } from "../../../atoms/currentUserState";
import { auth, firestore } from "../../../firebase/clientApp";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { currentUserProfileState } from "../../../atoms/currentUserProfileState";
import "../../homepage.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setAuthModelState = useSetRecoilState(authModelState);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [currentUserProfile, setCurrentUserProfileState] = useRecoilState(
    currentUserProfileState
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userC) => {
        // here check for this user email address in profile collection
        const docRef = doc(
          firestore,
          "userProfiles",
          `userProfileId-${userC.user.uid}`
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // setting global state for current user name
          setCurrentUserProfileState((prev) => ({
            ...prev,
            name: docSnap.data().name,
          }));

          // here add user in vs-user's collection
          try {
            await setDoc(doc(firestore, `vs-users/userId-${userC.user.uid}`), {
              companyName: docSnap.data().companyName,
              id: userC.user.uid,
              name: docSnap.data().name,
              online: true,
              status: "do_not_want_to_talk",
              userPosX: 100,
              userPosY: 100,
              profileImage: docSnap.data().profileImage,
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          // redirect user to create profile page
          navigate(`/create-profile`);
        }
        setCurrentUserState((prev) => ({
          ...prev,
          id: userC.user.uid,
          email: userC.user.email!,
        }));
        setLoading(false);
        setAuthModelState((prev) => ({
          ...prev,
          open: false,
        }));
        toast({
          title: "Login success",
          description: "Logged in successfully.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          toast({
            title: "Server Error",
            description: "You have entered wrong password.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }

        if ((error.message = "Firebase: Error (auth/user-not-found).")) {
          toast({
            title: "Server Error",
            description: "This email does not exists at our server.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="email"
        placeholder="Email"
        type="email"
        mb={2}
        mt={2}
        onChange={(e) => setEmail(e.target.value)}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />

      <Input
        name="password"
        placeholder="Password"
        mb={2}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Button
        isLoading={loading}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "red.500",
          color: "red.500",
        }}
        type="submit"
        fontSize="10pt"
        fontWeight={700}
        bg="red.500"
        color="white"
        variant="solid"
        height="36px"
        width="100%"
        mt={2}
        mb={2}
        className="my__button"
      >
        ログイン
      </Button>
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          パスワードを忘れた方はこちら
        </Text>
        <Text
          fontSize="9pt"
          color="red.500"
          cursor="pointer"
          onClick={() =>
            setAuthModelState((prev) => ({
              ...prev,
              view: "resetPassword",
            }))
          }
        >
          パスワードのリセット
        </Text>
      </Flex>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text
          onClick={() =>
            setAuthModelState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
          color="red.500"
          fontWeight={700}
          cursor="pointer"
        >
          ユーザー登録
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
