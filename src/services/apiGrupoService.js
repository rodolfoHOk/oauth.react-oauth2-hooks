import httpApiClient from './httpApiClient';

url = '/grupos';

export function getTodos(){
  return httpApiClient.get(url);
}

export function postCriarGrupo(nomeGrupo){
  return httpApiClient.post(`${url}?nome=${nomeGrupo}`);
}
