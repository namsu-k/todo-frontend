// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080/api/v1/",
//   withCredentials: true,
// });

// export const getAuthToken = () => {
//   return localStorage.getItem("auth_token");
// };

// export const setAuthToken = (token) => {
//   localStorage.setItem("auth_token", token);
// };

// // const headers = {
// //   Authorization: `Bearer ${localStorage.getItem("token")}`,
// // };
// // axiosInstance.defaults.headers.common = headers;

// // export const login = (username, password) =>
// //   axiosInstance.post("auth/login", { username, password }).then((response) => {
// //     localStorage.setItem("token", response.data.token);
// //     return console.log(response.data);
// //   });

// // export const signUp = (username, password) =>
// //   axiosInstance.post("auth/signup", { username, password }).then((response) => {
// //     localStorage.setItem("token", response.data.token);
// //     return console.log(response.data);
// //   });

// // export async function getTodos() {
// //     // const response = await fetch(`${BASE_URL}/todos`);
// //     // const json = await response.json();

// //     const response = await axios.get(`todos`);
// //     return response.data;
// // }

// export const getTodo = async ({ queryKey }) => {
//   const [_, todoId] = queryKey;
//   const response = await axiosInstance.get(`todos/${todoId}`);
//   return response.data;
// };

// export const getMe = (headers) => {
//   axiosInstance.get("users/me", { headers }).then((response) => response.data);
// };

// export const usernameLogin = ({ username, password }) => {
//   axiosInstance.post(`auth/login`, { username, password });
// };

// // axios.defaults.baseURL = "http://localhost:8080";
// // axios.defaults.headers.post["Content-Type"] = "application/json";

// export const request = (method, url, data) => {
//   let headers = {};
//   if (getAuthToken() != null && getAuthToken() != "null") {
//     headers = { Authorization: `Bearer ${getAuthToken()}` };
//   }

//   return axios({
//     method: method,
//     headers: headers,
//     url: url,
//     data: data,
//   });
// };

// export const login = ({ username, password }) => {
//   axiosInstance
//     .post("auth/login", { username: username, password: password })
//     .then((response) => {
//       setAuthToken(response.data.token);
//     });
// };

// export const signUp = ({ name, email, username, password }) => {
//   axiosInstance
//     .post("auth/signup", {
//       name: name,
//       email: email,
//       username: username,
//       password: password,
//     })
//     .then((response) => {
//       setAuthToken(response.data.token);
//     });
// };

// // export const getTodos = () => {
// //   let headers = {};
// //   if (localStorage.getItem("auth_token").startsWith("Bearer ")) {
// //     headers = {
// //       Authorization: `Bearer ${getAuthToken()}`,
// //       // "Access-Control-Allow-Origin": "*",
// //     };
// //     axiosInstance
// //       .get("todos", { headers })
// //       .then((response) => console.log(response.data));
// //   }

// //   axiosInstance.get("todos").then((response) => console.log(response.data));
// // };

// // export const getTodos = () =>
// //   axiosInstance.get("todos").then((response) => response.data);

// axios.defaults.baseURL = "http://localhost:8080/api/v1/";
// axios.defaults.withCredentials = true;

// export const getTodos = async () => {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${getAuthToken()}`;
//   return await axios
//     .get("todos")
//     .then((response) => {
//       return response.data;
//     })
//     .catch((e) => {
//       console.log(e.response.data);
//       return "사용자 정보가 잘못되었습니다.";
//     });
// };
import axios from "axios";
import { get } from "react-hook-form";

export const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

export const setAuthToken = (token) =>
  localStorage.setItem("auth_token", token);

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080/api/v1/",
//   withCredentials: true,
// });

export const login = ({ username, password }) => {
  if (localStorage.getItem("auth_token")) {
    localStorage.removeItem("auth_token");
  }
  axios
    .post("http://localhost:8080/api/v1/auth/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      setAuthToken(response.data.token);
    });
};

export const signUp = ({ name, email, username, password }) => {
  try {
    const response = axios.post("auth/signup", {
      name,
      email,
      username,
      password,
    });
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {}
};

export const getTodo = ({ queryKey }) => {
  const [, todoId] = queryKey;

  if (getAuthToken() == null) {
    return;
  }
  const headers = {
    Authorization: `Bearer ${getAuthToken()}`,
  };

  return axios
    .get(`http://localhost:8080/api/v1/todos/${todoId}`, {
      headers,
      // withCredentials: true,
    })
    .then((response) => response.data);
};

export const getTodos = () => {
  if (getAuthToken == null) {
    return;
  }

  const authToken = getAuthToken();
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  return axios
    .get("http://localhost:8080/api/v1/todos", {
      headers,
      // withCredentials: true,
    })
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getMe = () => {
  if (getAuthToken() == null) {
    return;
  }
  const headers = {
    Authorization: `Bearer ${getAuthToken()}`,
  };

  return axios
    .get("http://localhost:8080/api/v1/users/me", { headers })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export const createTodo = (todo) => {
  if (getAuthToken() == null) {
    return;
  }
  const headers = {
    Authorization: `Bearer ${getAuthToken()}`,
  };

  return axios
    .post("http://localhost:8080/api/v1/todos", todo, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export const updateTodo = (todo) => {
  if (getAuthToken() == null) {
    return;
  }
  const headers = {
    Authorization: `Bearer ${getAuthToken()}`,
  };

  return axios
    .put(`http://localhost:8080/api/v1/todos/${todo.id}`, todo, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteTodo = (todo) => {
  if (getAuthToken() == null) {
    return;
  }
  const headers = {
    Authorization: `Bearer ${getAuthToken()}`,
  };

  return axios
    .delete(`http://localhost:8080/api/v1/todos/${todo.id}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};
