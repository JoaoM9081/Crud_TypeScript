import inquirer from 'inquirer';
import { CategoriaService } from '../service/CategoriaService';
import { ProdutoService } from '../service/ProdutoService';
import { menuCategorias } from '../controller/CategoriaController';
import { menuProdutos } from '../controller/ProdutoController';

export async function promptMenu(categoriaService: CategoriaService, produtoService: ProdutoService) {
  let continuar = true;

  do {
    const resposta = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcao',
        message: 'Escolha uma opção:',
        choices: ['Gerenciar Categorias', 'Gerenciar Produtos', 'Sair'],
      },
    ]);

    switch (resposta.opcao) {
      case 'Gerenciar Categorias':
        await menuCategorias(categoriaService);
        break;
      case 'Gerenciar Produtos':
        await menuProdutos(produtoService);
        break;
      default:
        console.log('Saindo...');
        continuar = false;
        break;
    }
  } while (continuar);
}