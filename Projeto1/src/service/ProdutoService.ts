import { Produto } from '../model/Produto';
import { CategoriaService } from './CategoriaService';

export class ProdutoService {
  private produtos: Produto[] = [];
  private proximoId = 1;
  private categoriaService: CategoriaService;

  constructor(categoriaService: CategoriaService) {
    this.categoriaService = categoriaService;
  }

  criar(nome: string, descricao: string, preco: number, quantidade: number, categoriaNome: string): Produto {
    const categorias = this.categoriaService.buscarPorNome(categoriaNome);
    if (categorias.length === 0) throw new Error('Categoria não encontrada');

    const produto: Produto = {
      id: this.proximoId++,
      nome,
      descricao,
      preco,
      quantidade,
      categoria: categorias[0],
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
    };

    this.produtos.push(produto);
    return produto;
  }

  listar(): Produto[] {
    return this.produtos;
  }

  buscarPorNome(nome: string): Produto[] {
    return this.produtos.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));
  }

  atualizar(nomeProduto: string, nome: string, descricao: string, preco: number, quantidade: number, categoriaNome?: string): Produto {
    const produtos = this.buscarPorNome(nomeProduto);
    if (produtos.length === 0) throw new Error('Produto não encontrado');

    const produto = produtos[0];
    produto.nome = nome;
    produto.descricao = descricao;
    produto.preco = preco;
    produto.quantidade = quantidade;
    produto.dataAtualizacao = new Date();

    if (categoriaNome) {
      const categorias = this.categoriaService.buscarPorNome(categoriaNome);
      if (categorias.length === 0) throw new Error('Categoria não encontrada');
      produto.categoria = categorias[0];
    }

    return produto;
  }

  remover(nomeProduto: string): boolean {
    const produtos = this.buscarPorNome(nomeProduto);
    if (produtos.length === 0) throw new Error('Produto não encontrado');

    const index = this.produtos.indexOf(produtos[0]);
    this.produtos.splice(index, 1);
    return true;
  }

  contarPorCategoriaId(categoriaId: number): number {
    return this.produtos.filter(p => p.categoria.id === categoriaId).length;
  }
}