import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({});
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [lista, setLista] = useState([]);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [cadastroSelecionado, setCadastroSelecionado] = useState(null);

  function cadastrar(e) {
    e.preventDefault(); 

    if(!nome || !sobrenome || !cep){
      alert('Por favor, preenche todos os campos');
      return;
    
    }
  
    setLista([...lista, { nome: nome, sobrenome: sobrenome, endereco: endereco }]);
  }

  

  const excluirPessoa = (index) => {
    const novaLista=[...lista];
    novaLista.splice(index,1);
    setLista(novaLista);
  }

  const mostrarCadastroSelecionado = (index) => {
    setCadastroSelecionado(lista[index]);
    setMostrarCadastro(true);
  }

  const esconderCadastro = () => {
    setCadastroSelecionado(null);
    setMostrarCadastro(false);
  }

  const buscaEndereco = async () => {
    if (!cep) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dadosEndereco = await response.json();

      if (!dadosEndereco.erro) {
        setEndereco(dadosEndereco);
      } else {
        alert('CEP não encontrado.');
      }
    } catch (error) {
      console.error(error);
      alert('CEP não encontrado.');
    }
  };

  const limpar = () => {
    setCep('');
    setEndereco({});
    setNome('');
    setSobrenome('');
  };

  return (
    <div id='pagina'>
      <div className='formulario'>
        <h1>Cadastro</h1>
        <div>
          <label htmlFor="nome">Nome:</label>
          <br />
          <input
            placeholder='Nome'
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          /> <br />
          <label htmlFor="sobrenome">Sobrenome:</label>
          <br />
          <input
            placeholder='Sobrenome'
            type="text"
            id="sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
          <br />
          <label htmlFor="cep">CEP:</label>
          <br />
          <input
            placeholder='Cep'
            type="text"
            id="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          /> <br /> <br />
          <button onClick={buscaEndereco}>Consultar</button>
          <button onClick={limpar}>Limpar</button>
        </div>
        {endereco.cep && (
          <div>
            <p>Logradouro: {endereco.logradouro}</p>
            <p>Bairro: {endereco.bairro}</p>
            <p>Localidade: {endereco.localidade}</p>
            <p>UF: {endereco.uf}</p>
            <p>CEP: {endereco.cep}</p>
            <button onClick={cadastrar}>Cadastrar</button>
          </div>
        )}
      </div>
      <div className='cadastrados'>
        <h1>Pessoas Cadastradas</h1>
        <div className='lista-cadastrados'>
          <ul>
            {lista.map(
              (item, index) => (
                <li key={index}>
                  {item.nome} {item.sobrenome}
                  <button onClick={() => excluirPessoa(index)}>Excluir</button>
                  <button onClick={() => mostrarCadastroSelecionado(index)}>Mostrar</button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      {mostrarCadastro && (
        <div className='mostrar-cadastro'>
          <h2>Detalhes do Cadastro</h2>
          <p>Nome: {cadastroSelecionado.nome}</p>
          <p>Sobrenome: {cadastroSelecionado.sobrenome}</p>
          <p>CEP: {cadastroSelecionado.endereco.cep}</p>
          <p>Logradouro: {cadastroSelecionado.endereco.logradouro}</p>
          <p>Bairro: {cadastroSelecionado.endereco.bairro}</p>
          <p>Localidade: {cadastroSelecionado.endereco.localidade}</p>
          <p>UF: {cadastroSelecionado.endereco.uf}</p>
          <button onClick={esconderCadastro}>Esconder</button>
        </div>
      )}
    </div>
  );
}

export default App;



