import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [userState, setUserState] = useState({
    isLoading: false,
    isError: false,
    user: null,
  });

  const navigate = useNavigate();

  const register = async (userData) => {
    const result = await axios.post(
      "http://localhost:3000/auth/register",
      userData
    );

    if (/success/g.test(result.data.message)) {
      navigate("/login");
      return true;
    } else {
      return result.data.message;
    }
  };

  const login = async (loginInfo) => {
    const result = await axios.post(
      "http://localhost:3000/auth/login",
      loginInfo
    );
    if (/success/g.test(result.data.message)) {
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setUserState({ ...userState, user: userDataFromToken });
      navigate(`/home/${userDataFromToken.user_id}`);

      return true;
    } else {
      return result.data.message;
    }
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ userState, setUserState, register, login, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
