import inquirer from 'inquirer';
import { CategoriaService } from '../service/CategoriaService';
import { ProdutoService } from '../service/ProdutoService';

export async function menuCategorias(categoriaService: CategoriaService, produtoService: ProdutoService) {
  let continuar = true;

  do {
    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcao',
        message: 'Escolha uma operação para categorias:',
        choices: ['Criar', 'Listar', 'Buscar', 'Atualizar', 'Remover', 'Voltar'],
      },
    ]);

    switch (resposta.opcao) {
      case 'Criar':
        await criarCategoria(categoriaService);
        break;
      case 'Listar':
        listarCategorias(categoriaService);
        break;
      case 'Buscar':
        await buscarCategoria(categoriaService);
        break;
      case 'Atualizar':
        await atualizarCategoria(categoriaService);
        break;
      case 'Remover':
        await removerCategoria(categoriaService, produtoService);
        break;
      default:
        continuar = false;
        break;
    }
  } while (continuar);
}

async function criarCategoria(categoriaService: CategoriaService) {
  const dados = await inquirer.prompt([
    { type: 'input', name: 'nome', message: 'Nome da categoria:' },
    { type: 'input', name: 'descricao', message: 'Descrição da categoria:' },
  ]);
  try {
    const categoria = categoriaService.criar(dados.nome, dados.descricao);
    console.log('Categoria criada com sucesso:', categoria);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao criar categoria:', error.message);
    }
  }
}

async function listarCategorias(categoriaService: CategoriaService) {
  const categorias = categoriaService.listar();
  console.table(categorias);
}

async function buscarCategoria(categoriaService: CategoriaService) {
  const { nome } = await inquirer.prompt([
    { type: 'input', name: 'nome', message: 'Nome da categoria a buscar:' },
  ]);
  const categorias = categoriaService.buscarPorNome(nome);
  console.table(categorias);
}

async function atualizarCategoria(categoriaService: CategoriaService) {
  const dados = await inquirer.prompt([
    { type: 'input', name: 'nomeCategoria', message: 'Nome da categoria a atualizar:' },
    { type: 'input', name: 'nome', message: 'Novo nome:' },
    { type: 'input', name: 'descricao', message: 'Nova descrição:' },
  ]);
  try {
    const categoria = categoriaService.atualizar(dados.nomeCategoria, dados.nome, dados.descricao);
    console.log('Categoria atualizada com sucesso:', categoria);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao atualizar categoria:', error.message);
    }
  }
}

async function removerCategoria(categoriaService: CategoriaService, produtoService: ProdutoService) {
  const { nomeCategoria } = await inquirer.prompt([
    { type: 'input', name: 'nomeCategoria', message: 'Nome da categoria a remover:' },
  ]);
  try {
    const categoria = categoriaService.buscarPorNome(nomeCategoria)[0];
    const produtosVinculados = produtoService.contarPorCategoriaId(categoria.id);
    const sucesso = categoriaService.remover(nomeCategoria, produtosVinculados);
    if (sucesso) console.log('Categoria removida com sucesso!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao remover categoria:', error.message);
    }
  }
}