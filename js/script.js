const API_URL = 'http://leoproti.com.br:8004/alunos';

const form = document.getElementById('alunoForm');
const tabela = document.getElementById('tabelaAlunos');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const idInput = document.getElementById('id');

async function carregarAlunos() {
  const res = await fetch(API_URL);
  const alunos = await res.json();

  tabela.innerHTML = '';
  alunos.forEach(aluno => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${aluno.id}</td>
      <td>${aluno.nome}</td>
      <td>${aluno.email}</td>
      <td>
        <button onclick="editarAluno(${aluno.id}, '${aluno.nome}', '${aluno.email}')">Editar</button>
        <button onclick="excluirAluno(${aluno.id})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const aluno = {
    nome: nomeInput.value,
    email: emailInput.value
  };

  const id = idInput.value;
  const metodo = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno)
  });

  form.reset();
  idInput.value = '';
  carregarAlunos();
});

function editarAluno(id, nome, email) {
  idInput.value = id;
  nomeInput.value = nome;
  emailInput.value = email;
}

async function excluirAluno(id) {
  if (confirm('Deseja realmente excluir este aluno?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarAlunos();
  }
}

carregarAlunos();
