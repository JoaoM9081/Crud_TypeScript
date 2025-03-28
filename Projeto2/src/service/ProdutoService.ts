import { Produto } from '../model/Produto';
import { CategoriaService } from './CategoriaService';
import { AppDataSource } from '../index';

export class ProdutoService {
  private produtoRepository = AppDataSource.getRepository(Produto);
  private categoriaService: CategoriaService;

  constructor(categoriaService: CategoriaService) {
    this.categoriaService = categoriaService;
  }

  async criar(
    nome: string,
    descricao: string,
    preco: number,
    quantidade: number,
    categoriaNome: string 
  ): Promise<Produto> {
    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome do produto não pode estar vazio');
    }
    if (!descricao || descricao.trim().length === 0) {
      throw new Error('Descrição do produto não pode estar vazia');
    }
  
    // Buscar a categoria pelo nome
    const categoria = await this.categoriaService.buscarPorNome(categoriaNome);
    if (!categoria || categoria.length === 0) {
      throw new Error('Categoria não encontrada');
    }
  
    const produto = new Produto();
    produto.nome = nome;
    produto.descricao = descricao;
    produto.preco = preco;
    produto.quantidade = quantidade;
    produto.categoria = categoria[0]; 
    produto.dataCriacao = new Date();
    produto.dataAtualizacao = new Date();
  
    await this.produtoRepository.save(produto);
    return produto;
  }

  async listar(): Promise<Produto[]> {
    return this.produtoRepository.find({ relations: ['categoria'] });
  }
  
  async buscarPorNome(nome: string): Promise<Produto[]> {
    return this.produtoRepository
      .createQueryBuilder('produto')
      .leftJoinAndSelect('produto.categoria', 'categoria') 
      .where('LOWER(produto.nome) LIKE LOWER(:nome)', { nome: `%${nome}%` })
      .getMany();
  }

  async atualizar(
    nomeProduto: string, 
    nome: string,
    descricao: string,
    preco: number,
    quantidade: number,
    categoriaNome: string | null = null  
  ): Promise<Produto | undefined> {
    // Busca o produto pelo nome
    const produto = await this.buscarPorNome(nomeProduto); 
    if (!produto || produto.length === 0) {
      throw new Error('Produto não encontrado');
    }
    
    const produtoEncontrado = produto[0]; 
  
    produtoEncontrado.nome = nome;
    produtoEncontrado.descricao = descricao;
    produtoEncontrado.preco = preco;
    produtoEncontrado.quantidade = quantidade;
    produtoEncontrado.dataAtualizacao = new Date();
  
    if (categoriaNome) {
      const categoria = await this.categoriaService.buscarPorNome(categoriaNome);
      if (!categoria || categoria.length === 0) {
        throw new Error('Categoria não encontrada');
      }
      produtoEncontrado.categoria = categoria[0];  
    }
  
    await this.produtoRepository.save(produtoEncontrado);  
    return produtoEncontrado;
  }
  
  async remover(nomeProduto: string): Promise<boolean> {
    const produto = await this.buscarPorNome(nomeProduto); 
    if (!produto || produto.length === 0) {
      throw new Error('Produto não encontrado');
    }
  
    const produtoEncontrado = produto[0];  
  
    await this.produtoRepository.remove(produtoEncontrado);
    return true;
  }
}