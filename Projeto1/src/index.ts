import { CategoriaService } from './service/CategoriaService';
import { ProdutoService } from './service/ProdutoService';
import { promptMenu } from './interface/cli';

const categoriaService = new CategoriaService();
const produtoService = new ProdutoService(categoriaService);

promptMenu(categoriaService, produtoService);