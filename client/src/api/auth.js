import axios from "axios";
import { baseUrl } from "./config";

export const register = async (body) => {
  let result;
  try {
    const { data } = await axios.post(`${baseUrl}/api/v1/register`, {
      username: body.username,
      email: body.email,
      password: body.password,
    });

    result = data;
  } catch (error) {
    console.log(error.response);
    result = error.response;
  }
  return result;
};

export const login = async (body) => {
  let result;

  try {
    const { data } = await axios.post(`${baseUrl}/api/v1/login`, {
      username: body.username,
      email: body.email,
      password: body.password,
    });

    result = data;
  } catch (error) {
    console.log(error.response);
    result = error.response;
  }
  return result;
};
