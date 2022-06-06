import { baseUrl } from "./config";
import axios from "axios";

export const getUsers = async () => {
  let result;
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/users`, {
      headers: { access_token: localStorage.access_token },
    });

    result = data;
  } catch (error) {
    console.log(error.response);
    result = error.response;
  }

  return result;
};

export const getUserById = async (id) => {
  let result;
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/users/${id}`, {
      headers: { access_token: localStorage.access_token },
    });

    result = data;
  } catch (error) {
    console.log(error.response);
    result = error.response;
  }

  return result;
};

export const getLoggedUser = async () => {
  let result;
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/user`, {
      headers: { access_token: localStorage.access_token },
    });

    result = data;
  } catch (error) {
    console.log(error.response);
    result = error.response;
  }

  return result;
};

export const editUser = async (body) => {
  let result;
  try {
    const { data } = await axios.put(
      `${baseUrl}/api/v1/user`,
      { ...body },
      {
        headers: { access_token: localStorage.access_token },
      }
    );

    result = data;
  } catch (error) {
    console.log(error.response);
    result = error.response;
  }

  return result;
};

export const deleteUser = async () => {
  let result;
  try {
    const { data } = await axios.delete(`${baseUrl}/api/v1/user`, {
      headers: { access_token: localStorage.access_token },
    });

    result = data;
  } catch (error) {
    console.log(error.response);
    result = error.response;
  }

  return result;
};
