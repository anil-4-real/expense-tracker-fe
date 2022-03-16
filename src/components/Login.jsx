import React from "react";
import LoginButton from "./LoginButton";
import SignUpButton from "./SignUpButton";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="button-group">
      <LoginButton />
      <SignUpButton />
    </div>
  );
};

export default Login;
