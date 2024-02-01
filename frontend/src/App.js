// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [modalAdicionarClienteIsOpen, setModalAdicionarClienteIsOpen] = useState(false);
  const [modalCalcularRotaIsOpen, setModalCalcularRotaIsOpen] = useState(false);
  const [ordemDeVisita, setOrdemDeVisita] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    coordenada_x: 0,
    coordenada_y: 0,
  });

  useEffect(() => {
    carregarClientes();
  }, []); // Chama apenas uma vez ao montar o componente

  const carregarClientes = () => {
    axios.get('http://localhost:3001/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => console.error('Erro ao carregar clientes:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoCliente({ ...novoCliente, [name]: value });
  };

  const adicionarCliente = () => {
    axios.post('http://localhost:3001/clientes', novoCliente)
      .then(response => {
        console.log('Cliente adicionado com sucesso:', response.data);
        carregarClientes();
        setModalAdicionarClienteIsOpen(false);
        setNovoCliente({
          nome: '',
          email: '',
          telefone: '',
          coordenada_x: 0,
          coordenada_y: 0,
        });
      })
      .catch(error => console.error('Erro ao adicionar cliente:', error));
  };

  const calcularRotaOptima = () => {
    axios.get('http://localhost:3001/rota')
      .then(response => {
        const ordemDeVisita = response.data;
        setOrdemDeVisita(ordemDeVisita);
        setModalCalcularRotaIsOpen(true);
      })
      .catch(error => console.error('Erro ao calcular rota ótima:', error));
  };

  const closeModalAdicionarCliente = () => {
    setModalAdicionarClienteIsOpen(false);
  };

  const closeModalCalcularRota = () => {
    setModalCalcularRotaIsOpen(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-3xl font-bold mb-4">Gerenciamento de Clientes</h1>

      <div className="mb-4">
        <Button variant="primary" className="mr-2" onClick={calcularRotaOptima}>
          Calcular Rota Ótima
        </Button>
        <Button variant="success" onClick={() => setModalAdicionarClienteIsOpen(true)}>
          Adicionar Cliente
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Coordenada X</th>
            <th>Coordenada Y</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.coordenada_x}</td>
              <td>{cliente.coordenada_y}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={modalAdicionarClienteIsOpen} onHide={closeModalAdicionarCliente}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do cliente"
                name="nome"
                value={novoCliente.nome}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite o email do cliente"
                name="email"
                value={novoCliente.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTelefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o telefone do cliente"
                name="telefone"
                value={novoCliente.telefone}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCoordenadaX">
              <Form.Label>Coordenada X</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite a coordenada X do cliente"
                name="coordenada_x"
                value={novoCliente.coordenada_x}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCoordenadaY">
              <Form.Label>Coordenada Y</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite a coordenada Y do cliente"
                name="coordenada_y"
                value={novoCliente.coordenada_y}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalAdicionarCliente}>
            Fechar
          </Button>
          <Button variant="primary" onClick={adicionarCliente}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalCalcularRotaIsOpen} onHide={closeModalCalcularRota}>
        <Modal.Header closeButton>
          <Modal.Title>Ordem de Visita dos Clientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {ordemDeVisita.map(clienteId => {
              const cliente = clientes.find(c => c.id === clienteId);
              return (
                <li key={clienteId} className="mb-2">
                  {`Cliente ${clienteId}: ${cliente.nome} - ${cliente.telefone}`}
                </li>
              );
            })}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalCalcularRota}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
