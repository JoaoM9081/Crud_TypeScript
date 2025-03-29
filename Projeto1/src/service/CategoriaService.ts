import { Categoria } from '../model/Categoria';

export class CategoriaService {
  private categorias: Categoria[] = [];
  private proximoId = 1;

  criar(nome: string, descricao: string): Categoria {
    if (!nome.trim() || !descricao.trim()) throw new Error('Nome e descrição são obrigatórios');

    const novaCategoria: Categoria = {
      id: this.proximoId++,
      nome,
      descricao,
      dataCriacao: new Date(),
    };
    this.categorias.push(novaCategoria);
    return novaCategoria;
  }

  listar(): Categoria[] {
    return this.categorias;
  }

  buscarPorNome(nome: string): Categoria[] {
    return this.categorias.filter(c => c.nome.toLowerCase().includes(nome.toLowerCase()));
  }

  atualizar(nomeCategoria: string, nome: string, descricao: string): Categoria {
    const categorias = this.buscarPorNome(nomeCategoria);
    if (categorias.length === 0) throw new Error('Categoria não encontrada');

    const categoria = categorias[0];
    categoria.nome = nome;
    categoria.descricao = descricao;
    categoria.dataCriacao = new Date();
    return categoria;
  }

  remover(nomeCategoria: string, produtosVinculados: number): boolean {
    const categorias = this.buscarPorNome(nomeCategoria);
    if (categorias.length === 0) throw new Error('Categoria não encontrada');
    if (produtosVinculados > 0) throw new Error('Não é possível remover categoria com produtos vinculados');

    const index = this.categorias.indexOf(categorias[0]);
    this.categorias.splice(index, 1);
    return true;
  }
}