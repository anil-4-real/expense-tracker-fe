import React, { useEffect } from "react";
import Login from "./Login";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      checkIfUserExists(user.sub);
    }
  }, [isAuthenticated]);

  const createUser = async (sub) => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/new", {
        sub: sub,
        uid: uuidv4(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const checkIfUserExists = async (sub) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/${sub}`);
      if (res.data.user) {
        if (Object.keys(res.data.user).length === 0) {
          createUser(user.sub);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div className="hero-wrapper">
        <div className="hero-text-container">
          <p className="hero-text">
            Welcome to <span className="brand-title expense">eXpense</span>
            &nbsp;
            <span className="brand-title-span">tracker</span>, a free to use
            expense management website. Manage all your expenses with many
            categories to select from. This site can be used to track your
            expenses for free. Just signup/login and start managing your
            expenses in dashboard
          </p>
        </div>
        <div className="login-container">{!isAuthenticated && <Login />}</div>
      </div>
    </div>
  );
};

export default Home;
