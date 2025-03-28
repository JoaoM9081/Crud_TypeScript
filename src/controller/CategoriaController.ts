import inquirer from 'inquirer';
import { CategoriaService } from '../service/CategoriaService';

export async function menuCategorias(categoriaService: CategoriaService) {
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
        await removerCategoria(categoriaService);
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
      const categoria = await categoriaService.criar(dados.nome, dados.descricao);
      console.log('Categoria criada com sucesso:', categoria);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao criar categoria:', error.message);
      } else {
        console.error('Erro desconhecido ao criar categoria');
      }
    }
  }

  async function listarCategorias(categoriaService: CategoriaService) {
    const categorias = await categoriaService.listar();  
    if (categorias.length === 0) {
      console.log('Nenhuma categoria encontrada.');
    } else {
      console.table(categorias);
    }
  }

  async function buscarCategoria(categoriaService: CategoriaService) {
    const { nome } = await inquirer.prompt([
      { type: 'input', name: 'nome', message: 'Nome da categoria a buscar:' },
    ]);
    const categorias = await categoriaService.buscarPorNome(nome);
    console.table(categorias);
  }
  
  async function atualizarCategoria(categoriaService: CategoriaService) {
    const dados = await inquirer.prompt([
      { type: 'input', name: 'nomeCategoria', message: 'Nome da categoria a atualizar:' }, 
      { type: 'input', name: 'nome', message: 'Novo nome:' },
      { type: 'input', name: 'descricao', message: 'Nova descrição:' },
    ]);
  
    try {
      const categoria = await categoriaService.atualizar(
        dados.nomeCategoria,  
        dados.nome,
        dados.descricao
      );
      console.log('Categoria atualizada com sucesso:', categoria);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao atualizar categoria:', error.message);
      } else {
        console.error('Erro desconhecido ao atualizar categoria');
      }
    }
  }

  async function removerCategoria(categoriaService: CategoriaService) {
    const { nomeCategoria } = await inquirer.prompt([
      { type: 'input', name: 'nomeCategoria', message: 'Nome da categoria a remover:' },  
    ]);
  
    try {
      const sucesso = await categoriaService.remover(nomeCategoria);  
      if (sucesso) {
        console.log('Categoria removida com sucesso!');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao remover categoria:', error.message);
      } else {
        console.error('Erro desconhecido ao remover categoria');
      }
    }
  }