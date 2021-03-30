import React, { useState } from 'react';
import { useAuth } from '../../context/auth';

const Login = () => {
  const { Login } = useAuth();
  const [ usuario, setUsuario ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ mensagem, setMensagem ] = useState('');

  const [ carregando, setCarregando ] = useState(false);

  function handleLogin(event) {
    event.preventDefault();
    setMensagem('');
    setCarregando(true);
    Login(usuario, senha).then(response => {
      if(carregando){
        setMensagem('Logado com sucesso');
      }
    }).catch(error => {
      setMensagem('Nome de usuário ou senha incorreta(o)!');
    });
    setCarregando(false);
  }

  return(
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={(event) => handleLogin(event)}>
          <div>
            <label>Nome de usuario</label><br />
            <input type="text" id="inputUsuario" placeholder="Digite o nome de usuário"
                  value={usuario} onChange={(event) => setUsuario(event.target.value)} required/>
          </div>
          <br />
          <div>
            <label>Senha</label><br />
            <input type="password" id="inputSenha" placeholder="Digite a senha"
                  value={senha} onChange={(event) => setSenha(event.target.value)} required />
          </div>
          <br />
          <div>
            <input type="submit" value="Logar" />
          </div>
          <p>{mensagem}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
