import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");

      updateUser(null);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>

          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            </span>

            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              Email: <b>{currentUser.email}</b>
            </span>

            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>

          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>

      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
