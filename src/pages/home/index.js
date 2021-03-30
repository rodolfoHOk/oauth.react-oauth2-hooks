import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { getTesteAdministrador, getTesteTodosUsuarios, getTesteUsuario } from '../../services/apiTestesService';

const Home = () => {
  const { user, roles, Logout } = useAuth();
  const [respostas, setRespostas] = useState({
    respostaUsuario: '',
    respostaAdmin: '',
    respostaTodos: ''
  });

  const isAdmin = roles.includes('administrador');
  
  function handleLogout(){
    Logout();
  }

  async function testeUsuario(){
    getTesteUsuario().then(response => {
      setRespostas({ respostaUsuario: response.data });
    }).catch(error => {
      if(error.response.data.status === 403 || error.response.data.status === 401){
        setRespostas({ respostaUsuario: "Acesso não Autorizado!" });
      } else {
        setRespostas({ respostaUsuario: "Error: " + error.response.data.status +
                        " " + error.response.data.message});
      }
    });
  }

  async function testeAdminstrador(){
    getTesteAdministrador().then(response => {
      setRespostas({ respostaAdmin: response.data });
    }).catch(error => {
      if(error.response.data.status === 403 || error.response.data.status === 401){
        setRespostas({ respostaAdmin: "Acesso não Autorizado!" });
      } else {
        setRespostas({ respostaAdmin: "Error: " + error.response.data.status +
                        " " + error.response.data.message});
      }
    });
  }

  async function testeTodosUsuarios(){
    getTesteTodosUsuarios().then(response => {
      setRespostas({ respostaTodos: response.data });
    }).catch(error => {
      if(error.response.data.status === 403 || error.response.data.status === 401){
        setRespostas({ respostaTodos: "Acesso não Autorizado!" });
      } else {
        setRespostas({ respostaTodos: "Error: " + error.response.data.status +
                        " " + error.response.data.message});
      }
    });
  }

  return(
    <div>
      <h1>Home</h1>
      <div>
        <h2>Perfil</h2>
        <p>Logado como: {user}</p>
        <p>Funções: {roles.toString()}</p>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      <div>
        <h2>Testes Api</h2>
        <div>
          <p>Teste como usuário</p>
          <button onClick={() => testeUsuario()}>Teste 1</button>
          <span>{respostas.respostaUsuario}</span>
        </div>
        <div>
          <p>Teste como administrador</p>
          <button onClick={() => testeAdminstrador()}>Teste 2</button>
          <span>{respostas.respostaAdmin}</span>
        </div>
        <div>
          <p>Teste com quaisquer funções</p>
          <button onClick={() => testeTodosUsuarios()}>Teste 3</button>
          <span>{respostas.respostaTodos}</span>
        </div>
      </div>
      { isAdmin &&
        <>
          <br /> 
          <Link to="/usuarios/buscar">Pesquisa de usuários</Link>
          <br />
          <Link to="/usuarios/cadastrar">Cadastrar Usuário</Link>
        </>
      }
    </div>
  );
}

export default Home;
