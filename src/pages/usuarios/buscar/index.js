import React, { useState } from 'react';
import { useAuth } from '../../../context/auth';

const BuscarUsuario = () => {
  const { roles } = useAuth();
  const isAdmin = roles.includes('administrador');
  
  const [ username, setUsername ] = useState('');
  const [ id, setId ] = useState('');
  
  const [ mostrarTabela, setMostrarTabela ] = useState('');

  const [ funcao, setFuncao ] = useState('');

  const [ usuarios, setUsuarios ] = useState([]);

  function buscar(event){
    event.preventDefault();
    setUsuarios([
      {
        id: "001-002-003",
        username: "fulano",
        roles: ["usuario"]
      },
      {
        id: "001-003-005",
        username: "beltrano",
        roles: ["usuario","adminstrador"]
      }
    ]);
    setMostrarTabela(true);
  }

  function adicionarFuncao(event, idUsuario){
    event.preventDefault();
    console.log(funcao, idUsuario);
  }

  return (
    <> { isAdmin ?
      <div>
        <h1>Pesquisar Usuários</h1>
        <form onSubmit={(event) => buscar(event)}>
          <div>
            <label>por Nome de Usuário</label>
            <br />
            <input type="text" id="inputNome" placeholder="Digite o nome de usuário"
              value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <br />
          <div>
            <label>por ID de Usuário</label>
            <br />
            <input type="text" id="inputId" placeholder="Digite o id do usuário"
              value={id} onChange={(event) => setId(event.target.value)} />
          </div>
          <br />
          <div>
            <button type="submit">Pesquisar</button>
          </div>
        </form>
        { mostrarTabela &&
          <div>
            <br/>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome de Usuário</th>
                  <th>Funções</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.roles.toString()}</td>
                    <td>
                      <select id={"selectFuncao" + usuario.id} onChange={(event) => setFuncao(event.target.value)} value={funcao}>
                        <option value="">Selecione a função</option>
                        <option value="app-user">Usuário</option>
                        <option value="app-admin">Administrador</option>
                      </select>
                      <button type="button" onClick={(event) => adicionarFuncao(event, usuario.id)}>
                        adicionar Função
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
      : 
      <div>
        <h3>Não Autorizado!</h3>
      </div>
      }
    </>
  );
}

export default BuscarUsuario;
