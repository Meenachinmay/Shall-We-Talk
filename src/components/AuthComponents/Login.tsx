import React, { useEffect, useState } from "react";
import {
  Flex,
  VStack,
  Center,
  Text,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../firebase/clientApp";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUserState } from "../../atoms/currentUserState";
import { currentUserProfileState } from "../../atoms/currentUserProfileState";
import { currentUserLogoutState } from "../../atoms/currentUserLogoutState";
import { myMessagesModelState } from "../../atoms/myMessagesModelState";
import { signInWithEmailAndPassword } from "firebase/auth";
import { generateRandomPositions } from "../../utilservices/ExternalMethods";
import { authModelState } from "../../atoms/authModelState";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const toast = useToast();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [key, setAccessKey] = useState<string>("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [currentUserProfile, setCurrentUserProfileState] = useRecoilState(
    currentUserProfileState
  );
  const setAuthModelState = useSetRecoilState(authModelState);
  const [userLogout, setCurrentUserLogoutState] = useRecoilState(
    currentUserLogoutState
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMyMessages] = useRecoilState(myMessagesModelState);

  const [email, setEmail] = useState<string>("");
  const [fetchingSpace, setFetchingSpace] = useState<boolean>(false);
  const [test, setTest] = useState<boolean>(false);

  // this method handle login logic
  async function handleLogin() {
    // set login logic here. if login success then
    setLoading(true);
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async (userC) => {
        // here check for this user email address in profile collection
        const docRef = doc(
          firestore,
          "userProfiles",
          `userProfileId-${userC.user.uid}`
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // here add user in vs-user's collection
          const a = generateRandomPositions(100, 500).x;
          const b = generateRandomPositions(100, 500).y;
          try {
            await setDoc(doc(firestore, `vs-users/userId-${userC.user.uid}`), {
              companyName: docSnap.data().companyName,
              id: userC.user.uid,
              spaceId: email,
              name: docSnap.data().name,
              online: true,
              status: "do_not_want_to_talk",
              userPosX: a,
              userPosY: b,
              profileImage: docSnap.data().profileImage,
            });
          } catch (error) {
            console.log(error);
          }

          // setting current user state (id, email, online, status)
          setCurrentUserState((prev) => ({
            ...prev,
            id: userC.user.uid,
            email: userC.user.email!,
            online: "true",
            status: "do_not_want_to_talk",
            userPosX: a,
            userPosY: b,
            spaceId: email,
          }));

          // setting current user profile (id, name, companyName, companyProfile, workProfile, profileImage, hobbies, pet, pr)
          setCurrentUserProfileState((prev) => ({
            ...prev,
            id: userC.user.uid,
            name: docSnap.data().name,
            companyName: docSnap.data().companyName,
            companyProfile: docSnap.data().companyProfile,
            profileImage: docSnap.data().profileImage,
            pet: docSnap.data().pet,
            pr: docSnap.data().pr,
            status: docSnap.data().status,
            hobbies: docSnap.data().hobbies,
            workProfile: docSnap.data().workProfile,
          }));
        } else {
          // redirect user to create profile page
          navigate(`/create-profile/${email}/${key}`);
        }

        setCurrentUserLogoutState((prev) => ({
          ...prev,
          currentUserLoggedOut: false,
        }));

        setMyMessages((prev) => ({
          ...prev,
          messages: [],
          open: false,
        }));

        setLoading(false);
        navigate(`/dashboard/${email}`);

        toast({
          title: "ログイン成功！",
          description: "SWTでの体験をお楽しみください",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setLoading(false);
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          toast({
            title: "サーバーエラー",
            description: "wrong password.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }

        if ((error.message = "Firebase: Error (auth/user-not-found).")) {
          toast({
            title: "サーバーエラー",
            description: "このメールアドレスは登録されていません",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      });
  }

  // get space id with the access-key provided by the user
  useEffect(() => {
    async function _fetch() {
      setFetchingSpace(true);
      const q = query(
        collection(firestore, "access-keys"),
        where("accessKey", "==", `${key}`),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          setEmail(doc.data().spaceId);
          setTest(true);
          setFetchingSpace(false);
        }
      });
    }
    _fetch();
    setFetchingSpace(false);
    setTest(false);

    return () => {};
  }, [key]);

  const onSubmit = () => {};

  return (
    <Center width={"full"} height={"full"}>
      <Flex
        flexDir={"column"}
        style={{ minHeight: "100vh" }}
        width={"lg"}
        alignItems="center"
        p={5}
      >
        <Text mt={5} mb={5} fontSize={"3xl"}>
          ログイン
        </Text>
        <VStack width={"full"}>
          <Input
            required
            autoComplete="none"
            width={"full"}
            onChange={(e) => setUserEmail(e.target.value)}
            type="email"
            placeholder="Eメール"
            bg={"white"}
            fontSize="10pt"
          />
          <Input
            required
            autoComplete="none"
            width={"full"}
            onChange={(e) => setUserPassword(e.target.value)}
            type="password"
            mb={5}
            placeholder="パスワード"
            bg={"white"}
            fontSize="10pt"
          />
          <Input
            required
            type="password"
            autoComplete="none"
            onChange={(e) => setAccessKey(e.target.value)}
            mb={3}
            placeholder="バーチャルスペースのアクセスキーを入力してください"
            bg={"white"}
            fontSize="10pt"
          />
          <Text color={"red.500"} fontSize={"8px"}>
            正しいアクセスキーを入力するとボタンがアクティブになります
          </Text>
          <Button
            _hover={{
              bg: "white",
              border: "1px solid",
              borderColor: "red.500",
              color: "red.500",
            }}
            loadingText={
              loading
                ? "Signing in..."
                : fetchingSpace
                ? "fetching space..."
                : ""
            }
            isLoading={loading || fetchingSpace}
            size={"sm"}
            width={"xs"}
            onClick={handleLogin}
            disabled={!test}
            fontSize="10pt"
            fontWeight={700}
            bg="red.500"
            color="white"
            variant="solid"
            height="36px"
          >
            Login to Dashboard
          </Button>
        </VStack>
      </Flex>
    </Center>
  );
};

export default Login;
