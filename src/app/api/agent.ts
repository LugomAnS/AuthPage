import axios, { AxiosResponse } from "axios";
import MockAdapter from 'axios-mock-adapter';
import { User, UserLoginValues } from "../models/user";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
}

const Account = {
  login: (user: UserLoginValues) => request.post<User>('/login', user)
}

const agent = {
  Account
}

const mock = new MockAdapter(axios, {delayResponse: 1000});

mock.onPost('/login').reply((config) => {
  const user = JSON.parse(config.data);

  if(user.email === "test@test.com" && user.password === "Test123")
    return [200]

  return [401];
})

export default agent;


