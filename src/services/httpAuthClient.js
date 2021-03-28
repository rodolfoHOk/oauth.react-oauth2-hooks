import axios from 'axios';

export const clientId = 'springboot-testes';

export const clientSecret = 'd170ea84-2318-4de0-b094-092b738736e9';

export const realm = 'reinolocal-testes';

const httpAuthClient = axios.create({
  baseURL: 'http://localhost:8080/auth'
});

export default httpAuthClient;
