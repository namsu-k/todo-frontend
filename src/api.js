import axios from "axios";

export const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

export const setAuthToken = (token) =>
  localStorage.setItem("auth_token", token);

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
    const response = axios.post("http://localhost:8080/api/v1/auth/signup", {
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
