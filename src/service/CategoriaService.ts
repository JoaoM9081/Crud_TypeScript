import { Categoria } from '../model/Categoria';
import { AppDataSource } from '../index';
import { Like } from 'typeorm'; // Importando o Like

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

    // Persiste a categoria no banco de dados
    await this.categoriaRepository.save(categoria);
    return categoria;
  }

  async listar(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async buscar(id: number): Promise<Categoria | null> {
    return this.categoriaRepository.findOneBy({ id });
  }

  async buscarPorNome(nome: string): Promise<Categoria[]> {
    return this.categoriaRepository
      .createQueryBuilder('categoria')
      .where('LOWER(categoria.nome) LIKE LOWER(:nome)', { nome: `%${nome}%` })  // Usando LOWER para comparar de forma insensível ao caso
      .getMany();
  }
  
  async atualizar(id: number, nome: string, descricao: string): Promise<Categoria | null> {
    const categoria = await this.buscar(id);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }
    categoria.nome = nome;
    categoria.descricao = descricao;
    categoria.dataCriacao = new Date();

    await this.categoriaRepository.save(categoria);
    return categoria;
  }

  async remover(id: number): Promise<boolean> {
    const categoria = await this.buscar(id);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }

    // Remover categoria
    await this.categoriaRepository.remove(categoria);
    return true;
  }
}