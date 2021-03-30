import httpApiClient from './httpApiClient';

url = '/roles';

export function getTodos(){
  return httpApiClient.get(url);
}

export function postCriarRole(nomeRole){
  return httpApiClient.post(`${url}?nome=${nomeRole}`);
}
