import { Button, Flex, Image, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NotificationsDrawer from "../../Drawers/NotificationsDrawer";
import AuthModel from "../../Model/Auth/AuthModel";
import AuthModelButtons from "./AuthModelButtons";
import { auth, firestore } from "../../firebase/clientApp";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { currentUserState } from "../../../atoms/currentUserState";
import { currentUserProfileState } from "../../../atoms/currentUserProfileState";
import { useNavigate } from "react-router-dom";

import Parrot from "../../../images/parrot.png";

import "../../homepage.css";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { userStatusModelState } from "../../../atoms/userStatusModelState";
import { currentUserLogoutState } from "../../../atoms/currentUserLogoutState";
import StatusModel from "../../Model/Status/StatusModel";
import { loaderModelState } from "../../../atoms/loaderModelState";
import LoaderModel from "../../Loader/Loader";

const RightContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const [currentUserProfile, setCurrentUserProfileState] = useRecoilState(
    currentUserProfileState
  );
  const [userLogout, setCurrentUserLogoutState] = useRecoilState(
    currentUserLogoutState
  );
  const messageCol = collection(firestore, "messages");
  const navigate = useNavigate();
  const setUserStatusModelState = useSetRecoilState(userStatusModelState);
  const [loaderModel, setLoaderModelState] = useRecoilState(loaderModelState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserLogoutState((prev) => ({
          ...prev,
          currentUserLoggedOut: false,
        }));
      } else {
        setCurrentUserLogoutState((prev) => ({
          ...prev,
          currentUserLoggedOut: true,
        }));
      }
    });
  }, [auth, firestore]);

  const handleLogout = async () => {
    setLoading(true);
    setLoaderModelState({ open: true });
    await deleteDoc(doc(firestore, "vs-users", `userId-${currentUser.id}`));
    setCurrentUserState((prev) => ({
      ...prev,
      id: "",
      status: "",
      online: "",
      email: "",
    }));
    setCurrentUserProfileState((prev) => ({
      ...prev,
      id: "",
      name: "",
      status: "",
      profileImage: "",
      companyName: "",
      companyProfile: "",
      workProfile: "",
      pr: "",
      pet: "",
      hobbies: "",
    }));
    setCurrentUserLogoutState((prev) => ({
      ...prev,
      currentUserLoggedOut: true,
    }));

    // delete all the messages here
    const mq = query(messageCol, where("to.id", "==", `${currentUser.id}`));
    const querySnapshot = await getDocs(mq);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    setLoading(false);
    signOut(auth);
    localStorage.removeItem("recoil-persist");
    setLoaderModelState({ open: false });
  };

  const handleUserNameClick = () => {
    navigate(`/profile/${currentUser.id}`);
  };

  return (
    <>
      <AuthModel />
      <StatusModel />
      <LoaderModel />
      <Flex justify="center" align="center">
        {!userLogout.currentUserLoggedOut ? (
          <Tooltip label="トークステータスの変更" placement="bottom">
            <Image
              h={10}
              w={10}
              src={Parrot}
              cursor="pointer"
              mr={2}
              onClick={() => setUserStatusModelState({ open: true })}
            />
          </Tooltip>
        ) : null}

        {!userLogout.currentUserLoggedOut ? <NotificationsDrawer /> : null}

        {!userLogout.currentUserLoggedOut ? (
          <>
            {/* <Menu>
              <MenuButton
                bg="red.500"
                border="1px solid"
                color="white"
                borderColor="white"
                size={{ base: "xs" }}
                mr={1}
                as={Button}
                _hover={{
                  bg: "white",
                  border: "1px solid",
                  borderColor: "red.500",
                  color: "red.500",
                }}
                fontSize={{ base: "8pt", sm: "8pt" }}
                fontWeight={700}
                className="my__button"
                style={{ outline: "none" }}
              >
                {currentUserProfile.name}
              </MenuButton>
              <MenuList p={2}>
                <MenuItem
                  size="xs"
                  mt={2}
                  fontSize="8pt"
                  fontWeight={700}
                  onClick={handleUserNameClick}
                  as={Button}
                  className="my__button"
                  style={{ outline: "none" }}
                >
                  プロフィールへ
                </MenuItem>
                <MenuItem
                  size="xs"
                  mt={2}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "red.500",
                    color: "red.500",
                  }}
                  fontSize="8pt"
                  fontWeight={700}
                  bg="red.500"
                  color="white"
                  onClick={() => navigate(`/dashboard/${currentUser.spaceId}`)}
                  as={Button}
                  className="my__button"
                >
                  バーチャルスペース
                </MenuItem>
                <MenuItem
                  size="xs"
                  mt={2}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "red.500",
                    color: "red.500",
                  }}
                  fontSize="8pt"
                  fontWeight={700}
                  bg="red.500"
                  color="white"
                  onClick={handleLogout}
                  as={Button}
                  className="my__button"
                >
                  {loading ? "ログアウト中" : "ログアウト"}
                </MenuItem>
              </MenuList>
            </Menu> */}
          </>
        ) : (
          <AuthModelButtons />
        )}
      </Flex>
    </>
  );
};
export default RightContent;
