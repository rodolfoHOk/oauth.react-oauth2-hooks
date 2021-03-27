import axios from 'axios';

export const clientId = 'springboot-testes';

export const clientSecret = 'a9006e2f-2657-47ac-9b12-6b4b20391772';

export const realm = 'reinolocal-testes';

const httpAuthClient = axios.create({
  baseURL: 'http://localhost:8080/auth'
});

export default httpAuthClient;
