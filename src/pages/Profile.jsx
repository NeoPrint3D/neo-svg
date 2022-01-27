import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentUserContext, } from "../context/userContext";

function Profile(props) {
  const { username } = useParams();
  const { users } = props;
  const [owns, setOwns] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  //querys the data by username
  return <main>{currentUser.username}</main>;
}
export default Profile;
