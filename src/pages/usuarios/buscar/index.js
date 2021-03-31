import React, { useState } from 'react';
import { useAuth } from '../../../context/auth';
import { getTodosUsuarios,
  getUsuarioPorId,
  getUsuariosPorUsername,
  postAtribuirRole } from '../../../services/apiUsuarioService';
import NaoAutorizado from '../../naoAutorizado';
 
const BuscarUsuario = () => {
  const { roles } = useAuth();
  const isAdmin = roles.includes('administrador');
  
  const [ username, setUsername ] = useState('');
  const [ id, setId ] = useState('');
  const [ usuarios, setUsuarios ] = useState([]);
  const [ mensagem, setMensagem ] = useState('');
  
  const [ mostrarTabela, setMostrarTabela ] = useState('');
  const [ funcao, setFuncao ] = useState('');
  const [ mensagemTabela, setMensagemTabela ] = useState('');

  function buscar(event) {
    setMensagem('');
    setMensagemTabela('');
    event.preventDefault();
    if(username !== ''){
      getUsuariosPorUsername(username)
        .then(response => {
          setUsuarios(response.data);
          if (response.data.length > 0) {
            setMostrarTabela(true);
          } else {
            setMensagem('Nenhum usuário encontrado com os dados informados!')
          }
        }).catch (error => {
          setMensagem('Erro ao tentar buscar usuários por nome de usuário!')
        });
    } else if(id !== ''){
      getUsuarioPorId(id)
        .then(response => {
          setUsuarios([response.data]);
          if (response.data) {
            setMostrarTabela(true);
          } else {
            setMensagem('Nenhum usuário encontrado com os dados informados!')
          }
        }).catch (error => {
          if(error.toString().includes('code 404')){
            setMensagem('Nenhum usuário encontrado com o id informado!')
          } else {
            setMensagem('Erro ao tentar buscar usuários por id!')
          }
        });
    } else {
      getTodosUsuarios()
        .then(response => {
          setUsuarios(response.data);
          if (response.data.length > 0) {
            setMostrarTabela(true);
          } else {
            setMensagem('Nenhum usuário encontrado com os dados informados!')
          }
        }).catch (error => {
          setMensagem('Erro ao tentar buscar usuários!')
        });
    }
  }

  function adicionarFuncao(event, idUsuario) {
    setMensagemTabela('');
    event.preventDefault();
    postAtribuirRole(idUsuario, funcao)
      .then(response => {
        setMensagemTabela('Função atribuida com sucesso.');
      }).catch(error =>{
        setMensagemTabela('Erro ao tentar atribuir a função!')
      });
  }

  return (
    <> { isAdmin
        ?
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
              <p>{mensagem}</p>
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
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.username}</td>
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
              <p>{mensagemTabela}</p>
            </div>
          }
        </div>
        : 
        <NaoAutorizado admin />
      }
    </>
  );
}

export default BuscarUsuario;
