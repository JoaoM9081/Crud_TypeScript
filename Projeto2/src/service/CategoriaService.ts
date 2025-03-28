import { Categoria } from '../model/Categoria';
import { AppDataSource } from '../index';

export class CategoriaService {
  private categoriaRepository = AppDataSource.getRepository(Categoria);

  async criar(nome: string, descricao: string): Promise<Categoria> {
    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome da categoria não pode estar vazio');
    }
    if (!descricao || descricao.trim().length === 0) {
      throw new Error('Descrição da categoria não pode estar vazia');
    }

    const categoria = new Categoria();
    categoria.nome = nome;
    categoria.descricao = descricao;
    categoria.dataCriacao = new Date();

    await this.categoriaRepository.save(categoria);
    return categoria;
  }

  async listar(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async buscarPorNome(nome: string): Promise<Categoria[]> {
    return this.categoriaRepository
      .createQueryBuilder('categoria')
      .where('LOWER(categoria.nome) LIKE LOWER(:nome)', { nome: `%${nome}%` }) 
      .getMany();
  }
  
  async atualizar(nomeCategoria: string, nome: string, descricao: string): Promise<Categoria | null> {
    const categoria = await this.buscarPorNome(nomeCategoria);  
    if (!categoria || categoria.length === 0) {
      throw new Error('Categoria não encontrada');
    }
  
    const categoriaEncontrada = categoria[0];  
  
    categoriaEncontrada.nome = nome;
    categoriaEncontrada.descricao = descricao;
    categoriaEncontrada.dataCriacao = new Date();
  
    await this.categoriaRepository.save(categoriaEncontrada);
    return categoriaEncontrada;
  }
  
  async remover(nomeCategoria: string): Promise<boolean> {
    const categoria = await this.buscarPorNome(nomeCategoria);  
    if (!categoria || categoria.length === 0) {
      throw new Error('Categoria não encontrada');
    }
  
    const categoriaEncontrada = categoria[0];  
  
    await this.categoriaRepository.remove(categoriaEncontrada);
    return true;
  }
}