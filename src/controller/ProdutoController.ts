import inquirer from 'inquirer';
import { ProdutoService } from '../service/ProdutoService';

export async function menuProdutos(produtoService: ProdutoService) {
  let continuar = true;

  do {
    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcao',
        message: 'Escolha uma operação para produtos:',
        choices: ['Criar', 'Listar', 'Buscar', 'Atualizar', 'Remover', 'Voltar'],
      },
    ]);

    switch (resposta.opcao) {
      case 'Criar':
        await criarProduto(produtoService);
        break;
      case 'Listar':
        listarProdutos(produtoService);
        break;
      case 'Buscar':
        await buscarProduto(produtoService);
        break;
      case 'Atualizar':
        await atualizarProduto(produtoService);
        break;
      case 'Remover':
        await removerProduto(produtoService);
        break;
      default:
        continuar = false;
        break;
    }
  } while (continuar);
}

async function criarProduto(produtoService: ProdutoService) {
  const dados = await inquirer.prompt([
    { type: 'input', name: 'nome', message: 'Nome do produto:' },
    { type: 'input', name: 'descricao', message: 'Descrição do produto:' },
    { type: 'input', name: 'preco', message: 'Preço do produto:' },
    { type: 'input', name: 'quantidade', message: 'Quantidade do produto:' },
    { type: 'input', name: 'categoriaId', message: 'ID da categoria:' },
  ]);
  try {
    const produto = await produtoService.criar(
      dados.nome,
      dados.descricao,
      parseFloat(dados.preco),
      parseInt(dados.quantidade),
      parseInt(dados.categoriaId)
    );
    console.log('Produto criado com sucesso:', produto);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao criar produto:', error.message);
    } else {
      console.error('Erro desconhecido ao criar produto');
    }
  }
}

async function listarProdutos(produtoService: ProdutoService) {
    const produtos = await produtoService.listar(); // Adicionando `await` para esperar os dados
    if (produtos.length === 0) {
      console.log('Nenhum produto encontrado.');

        
    }else {
      console.table(produtos); // Exibindo os produtos em formato de tabela
    }
  }
  
async function buscarProduto(produtoService: ProdutoService) {
  const { nome } = await inquirer.prompt([
    { type: 'input', name: 'nome', message: 'Nome do produto a buscar:' },
  ]);
  const produtos = await produtoService.buscarPorNome(nome);
  console.table(produtos);
}

async function atualizarProduto(produtoService: ProdutoService) {
  const dados = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'ID do produto a atualizar:' },
    { type: 'input', name: 'nome', message: 'Novo nome:' },
    { type: 'input', name: 'descricao', message: 'Nova descrição:' },
    { type: 'input', name: 'preco', message: 'Novo preço:' },
    { type: 'input', name: 'quantidade', message: 'Nova quantidade:' },
  ]);
  try {
    const produto = await produtoService.atualizar(
      Number(dados.id),
      dados.nome,
      dados.descricao,
      parseFloat(dados.preco),
      parseInt(dados.quantidade)
    );
    console.log('Produto atualizado com sucesso:', produto);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao atualizar produto:', error.message);
    } else {
      console.error('Erro desconhecido ao atualizar produto');
    }
  }
}

async function removerProduto(produtoService: ProdutoService) {
    const { id } = await inquirer.prompt([
      { type: 'input', name: 'id', message: 'ID do produto a remover:' },
    ]);
    try {
      // Adicionando o `await` para aguardar a Promise
      const sucesso = await produtoService.remover(Number(id));
      if (sucesso) {
        console.log('Produto removido com sucesso!');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao remover produto:', error.message);
      } else {
        console.error('Erro desconhecido ao remover produto');
      }
    }
  }
  