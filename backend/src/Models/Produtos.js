import fs from "fs";
import inquirer from "inquirer";
import func from "../../src/helper/func.js";
import figlet from "figlet";
class Produtos {
  constructor() {
    this.produtos = [];
    this.loadfromFile();
  }

  loadfromFile() {
    const filePath = "./src/db/produtos.json";

    try {
      if (fs.existsSync(filePath)) {
        const jsonData = fs.readFileSync(filePath, "utf8");
        this.produtos = JSON.parse(jsonData);
      }
    } catch (error) {
      this.produtos = [];
    }
  }

  saveToFile() {
    const filePath = "./src/db/produtos.json";
    const jsonData = JSON.stringify(this.produtos, null, 2);
    fs.writeFileSync(filePath, jsonData);
  }

  getNextId() {
    return this.produtos.length > 0
      ? Math.max(...this.produtos.map((produto) => produto.id)) + 1
      : 1;
  }

  adicionarProduto() {
    const proxId = this.getNextId();

    inquirer
      .prompt([
        {
          type: "input",
          name: "nome",
          message: "Digite o nome do Produto",
        },
        {
          type: "input",
          name: "preco",
          message: "Digite o Preço do Produto",
        },
        {
          type: "input",
          name: "quantidade",
          message: "Digite a quantidade",
        },
      ])
      .then((answers) => {
        const produto = {
          id: proxId,
          nome: answers.nome,
          preco: answers.preco,
          quantidade: answers.quantidade,
        };

        if (!Array.isArray(this.produtos)) {
          this.produtos = [];
        }
        this.produtos.push(produto);
        this.saveToFile();
        console.log("Adicionado com Sucesso!");
        func.chamarMenu();
      });
  }

  listarProduto() {
    console.log(this.produtos);
    func.chamarMenu();
    return "Listado com Sucesso!";
  }

  atualizarProduto() {
    if (this.produtos.length === 0) {
      console.log("Não há produtos cadastrados.");
      func.chamarMenu();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "nome",
          message: "Selecione o Produto para atualizar",
          choices: this.produtos.map((produto) => produto.nome),
        },
      ])
      .then((selecao) => {
        const produtoSelecionado = this.produtos.find(
          (produto) => produto.nome === selecao.nome
        );

        inquirer
          .prompt([
            {
              type: "input",
              name: "nome",
              message: "Novo nome do Produto",
              default: produtoSelecionado.nome,
            },
            {
              type: "input",
              name: "preco",
              message: "Novo preço do Produto",
              default: produtoSelecionado.preco,
            },
            {
              type: "input",
              name: "quantidade",
              message: "Nova quantidade",
              default: produtoSelecionado.quantidade,
            },
          ])
          .then((updates) => {
            const index = this.produtos.findIndex(
              (p) => p.id === produtoSelecionado.id
            );
            this.produtos[index] = {
              ...produtoSelecionado,
              ...updates,
            };
            this.saveToFile();
            console.log("Produto atualizado com sucesso!");
            func.chamarMenu();
          });
      });
  }

  excluirProduto() {
    if (this.produtos.length === 0) {
      console.log("Não há produtos cadastrados.");
      func.chamarMenu();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "nome",
          message: "Selecione o Produto",
          choices: this.produtos.map((produto) => produto.nome),
        },
      ])
      .then((answers) => {
        const produtoSelecionado = this.produtos.find(
          (produto) => produto.nome === answers.nome
        );

        if (produtoSelecionado) {
          this.produtos = this.produtos.filter(
            (produto) => produto.nome !== produtoSelecionado.nome
          );
          this.saveToFile();
          console.log("Produto excluído com sucesso!");
        } else {
          console.log("Produto não encontrado.");
        }
        func.chamarMenu();
      });
  }

  buscarProduto() {
    if (this.produtos.length === 0) {
      console.log("Não há produtos cadastrados.");
      func.chamarMenu();
      return;
    }

    inquirer
      .prompt([
        {
          type: "input",
          name: "termo",
          message: "Digite o nome do produto que deseja buscar:",
        },
      ])
      .then((answer) => {
        const resultados = this.produtos.filter((produto) =>
          produto.nome.toLowerCase().includes(answer.termo.toLowerCase())
        );

        if (resultados.length > 0) {
          console.log("\nProdutos encontrados:");
          resultados.forEach((produto) => {
            console.log(`\nID: ${produto.id}`);
            console.log(`Nome: ${produto.nome}`);
            console.log(`Preço: ${produto.preco}`);
            console.log(`Quantidade: ${produto.quantidade}`);
          });
        } else {
          console.log("Nenhum produto encontrado.");
        }
        func.chamarMenu();
      });
  }
}
export default new Produtos();
