import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import * as authAction from "../actions/auth";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authAction.Logout());
  }, [dispatch]);
  return <Redirect to="/login" />;
};

export default Logout;
