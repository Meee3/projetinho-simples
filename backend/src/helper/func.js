import inquirer from "inquirer";
import fs from "fs";
import figlet from "figlet";
import produtos from "../Models/Produtos.js";

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
        case "Adicionar Produto":
          produtos.adicionarProduto();
          break;
        case "Listar Produto":
          produtos.listarProduto();
          break;
        case "Atualizar Produto":
          console.log("Atualizar Produto");
          produtos.atualizarProduto();
          break;
        case "Excluir Produto":
          console.log("Excluir Produto");
          produtos.excluirProduto();
          break;
        case "Buscar Produto":
          console.log("Buscar Produto");
          produtos.buscarProduto();
          break;
        case "Sair":
          console.log("Tenha um excelente dia!");
          process.exit(0);
          break;
      }
    });
}

function criarJSON() {
  const filePath = "./src/db/produtos.json";

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync("./src/db", { recursive: true });
    fs.writeFileSync(filePath, "{}");
    // console.log("Arquivo JSON criado com sucesso!");
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

export default { apresentacaoEmpresa, criarJSON, chamarMenu };
