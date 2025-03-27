import { Produto } from '../model/Produto';
import { CategoriaService } from './CategoriaService';
import { AppDataSource } from '../index';
import { Like } from 'typeorm';

export class ProdutoService {
  private produtoRepository = AppDataSource.getRepository(Produto);
  private categoriaService: CategoriaService;

  constructor(categoriaService: CategoriaService) {
    this.categoriaService = categoriaService;
  }

  async criar(nome: string, descricao: string, preco: number, quantidade: number, categoriaId: number): Promise<Produto> {
    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome do produto não pode estar vazio');
    }
    if (!descricao || descricao.trim().length === 0) {
      throw new Error('Descrição do produto não pode estar vazia');
    }

    const categoria = await this.categoriaService.buscar(categoriaId);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }

    const produto = new Produto();
    produto.nome = nome;
    produto.descricao = descricao;
    produto.preco = preco;
    produto.quantidade = quantidade;
    produto.categoria = categoria;
    produto.dataCriacao = new Date();
    produto.dataAtualizacao = new Date();

    // Persiste o produto no banco de dados
    await this.produtoRepository.save(produto);
    return produto;
  }

  async listar(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  async buscar(id: number): Promise<Produto | null> {
    return this.produtoRepository.findOneBy({ id });  // Mudado para Produto | null
  }

  async buscarPorNome(nome: string): Promise<Produto[]> {
    return this.produtoRepository
      .createQueryBuilder('produto')
      .where('LOWER(produto.nome) LIKE LOWER(:nome)', { nome: `%${nome}%` }) // Usando LOWER para garantir a busca insensível ao caso
      .getMany();
  }

  async atualizar(id: number, nome: string, descricao: string, preco: number, quantidade: number): Promise<Produto | undefined> {
    const produto = await this.buscar(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    produto.nome = nome;
    produto.descricao = descricao;
    produto.preco = preco;
    produto.quantidade = quantidade;
    produto.dataAtualizacao = new Date();

    await this.produtoRepository.save(produto);
    return produto;
  }

  async remover(id: number): Promise<boolean> {
    const produto = await this.buscar(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    // Remover produto
    await this.produtoRepository.remove(produto);
    return true;
  }
}
