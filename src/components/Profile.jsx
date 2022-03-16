import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isLoading } = useAuth0();
  if (isLoading) {
    return <div className="container">please wait</div>;
  }
  return (
    <div className="container">
      <div className="profile-container">
        <img src={user.picture} alt={user.name}></img>
        <p className="name">
          <span className="span-text">Name : </span>
          {user.name}
        </p>
        <p className="email">
          <span className="span-text">Email : </span>
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
