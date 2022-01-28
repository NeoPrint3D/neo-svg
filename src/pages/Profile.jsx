import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../context/userContext";

function Profile(props) {
  const { username } = useParams();
  const { users } = props;
  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    console.log(currentUser);
  }, [users, currentUser, username]);

  //querys the data by username
  return <main>{currentUser.username}</main>;
}
export default Profile;
