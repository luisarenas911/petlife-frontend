import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import { auth } from "firebase";
import { selectUser } from "../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { selectVets } from "../store/vet/selectors";
import { selectUsers } from "../store/user/selectors";
import { fetchUsers } from "../store/user/actions";
//import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const ChatPage = () => {
  const history = useHistory();
  //  const { user } = useAuth();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("j@j.com");
  const users = useSelector(selectUsers);
  const vets = useSelector(selectVets);
  const dispatch = useDispatch();
  console.log("USERS: ", users);
  console.log("user-EMAIL::", user.email);
  dispatch(fetchUsers);
  //   const handleLogout = async () => {
  //     await auth.signOut();
  //     history.push("/");
  //   };
  useEffect(() => {
    dispatch(fetchUsers);
  }, [dispatch, users, vets]);
  // const getFile = async (url) => {
  //   const response = await fetch(url);
  //   const data = await response.blob();

  //   return new File([data], "userFoto.jpg", { type: "image/jpg" });
  // };

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: ["j@j.com"] },
      () => setUsername("")
    );
  }

  function renderChatForm(creds) {
    console.log("CREDS", creds);
    return (
      <div>
        <select onChange={(e) => setContact(e.target.value)}>
          <option value="Hola">Hola</option>;
          {/* {user.isVet
            ? users.map((user) => {
                <option value={user.email} key={user.id}>
                  {user.name}
                </option>;
              })
            : null}
          {user && !user.isVet && vets
            ? {
                user: vets.map((vet) => {
                  <option value={vet.email} key={vet.id}>
                    {vet.name}
                  </option>;
                }),
              }
            : null} */}
        </select>
        <button onClick={() => createDirectChat(creds)}>Create</button>
      </div>
    );
  }
  if (!user.id || loading) return "loading...";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        {/* <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div> */}
      </div>
      <ChatEngine
        height="calc(100vh -  66px)"
        projectID="2cae913f-86db-4651-a880-bce8904b75f0"
        userName={user.email}
        userSecret={"123"}
        renderNewChatForm={(creds) => renderChatForm(creds)}
        onConnect={(creds) => {
          //renderChatForm(creds);
          //console.log("connected", some);
        }}
        // renderNewChatForm={(creds) =>
      />
    </div>
  );
};

export default ChatPage;
