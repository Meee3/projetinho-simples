import inquirer from "inquirer";
import fs from "fs";
import figlet from "figlet";

function first() {
  inquirer
    .prompt([
      {
        name: "fileName",
        message: "Qual o nome do arquivo?",
      },
    ])
    .then((answers) => {
      fs.writeFileSync(answers.fileName + ".json", "Conteudo do arquivo");
    });
}
function adicionarProduto() {
  return "Adicionado com Sucesso!";
}

function listarProduto() {
  return "Listado com Sucesso!";
}

function atualizarProduto() {
  return "Atualizado com Sucesso!";
}
function excluirProduto() {
  return "Excluido com Sucesso!";
}
function buscarProduto() {
  return "Buscado com Sucesso!";
}
function chamarMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "O que deseja fazer?",
        choices: [
          "Adicionar Produto",
          "Listar Produto",
          "Atualizar Produto",
          "Excluir Produto",
          "Buscar Produto",
          "Sair",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.menu) {
        case "Cadastrar Produto":
          console.log("Cadastrar Produto");
          break;
        case "Cadastrar Cliente":
          console.log("Cadastrar Cliente");
          break;
        case "Cadastrar Fornecedor":
          console.log("Cadastrar Fornecedor");
          break;
        case "Cadastrar Funcionario":
          console.log("Cadastrar Funcionario");
          break;
        case "Cadastrar Venda":
          console.log("Cadastrar Venda");
          break;
        case "Sair":
          cmd.exit;
      }
    });
}

function criarJSON() {
  const filePath = "./src/assets/db/produtos.json";

  if (!fs.existsSync(filePath)) {
    // Create the directory structure first
    fs.mkdirSync("./src/assets/db", { recursive: true });
    // Then create the file
    fs.writeFileSync(filePath, "{}");
    console.log("Arquivo JSON criado com sucesso!");
  } else {
    // console.log("Arquivo já existe");
  }
}

function apresentacaoEmpresa() {
  const textoEmpresa = " AgilStore " + "\n";
  figlet.text(textoEmpresa, function (erro, data) {
    if (erro) {
      console.log("Algo deu errado");
      console.dir(erro);
    }
    console.log(data);
  });
  criarJSON();
  setTimeout(() => {
    chamarMenu();
  }, 2000);
}

export default { first, apresentacaoEmpresa, criarJSON, chamarMenu };
