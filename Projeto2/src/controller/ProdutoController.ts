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
    { type: 'input', name: 'categoriaNome', message: 'Nome da categoria:' }, 
  ]);
  try {
    const produto = await produtoService.criar(
      dados.nome,
      dados.descricao,
      parseFloat(dados.preco),
      parseInt(dados.quantidade),
      dados.categoriaNome // Passando o nome da categoria
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
  const produtos = await produtoService.listar();  
  if (produtos.length === 0) {
    console.log('Nenhum produto encontrado.');
  } else {
    console.table(produtos.map(produto => ({
      ...produto,
      categoria: produto.categoria ? produto.categoria.nome : 'Categoria não associada'
    })));
  }
}
  
async function buscarProduto(produtoService: ProdutoService) {
  const { nome } = await inquirer.prompt([
    { type: 'input', name: 'nome', message: 'Nome do produto a buscar:' },
  ]);
  const produtos = await produtoService.buscarPorNome(nome);
  console.table(produtos.map(produto => ({
    ...produto,
    categoria: produto.categoria ? produto.categoria.nome : 'Categoria não associada'
  })));
}

async function atualizarProduto(produtoService: ProdutoService) {
  const dados = await inquirer.prompt([
    { type: 'input', name: 'nomeProduto', message: 'Nome do produto a atualizar:' },  
    { type: 'input', name: 'nome', message: 'Novo nome:' },
    { type: 'input', name: 'descricao', message: 'Nova descrição:' },
    { type: 'input', name: 'preco', message: 'Novo preço:' },
    { type: 'input', name: 'quantidade', message: 'Nova quantidade:' },
    { type: 'input', name: 'categoriaNome', message: 'Nome da nova categoria (opcional):' },
  ]);

  try {
    const produto = await produtoService.atualizar(
      dados.nomeProduto,  
      dados.nome,
      dados.descricao,
      parseFloat(dados.preco),
      parseInt(dados.quantidade),
      dados.categoriaNome ? dados.categoriaNome : null  
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
  const { nomeProduto } = await inquirer.prompt([
    { type: 'input', name: 'nomeProduto', message: 'Nome do produto a remover:' },  
  ]);

  try {
    
    const sucesso = await produtoService.remover(nomeProduto);  
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