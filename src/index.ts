import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Categoria } from './model/Categoria';
import { Produto } from './model/Produto';
import { CategoriaService } from './service/CategoriaService';
import { ProdutoService } from './service/ProdutoService';
import { promptMenu } from './interface';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'inventory',
  synchronize: true,   // Certifique-se de que isso está habilitado
  logging: false,
  entities: [Categoria, Produto],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados');
    const categoriaService = new CategoriaService();
    const produtoService = new ProdutoService(categoriaService);
    promptMenu(categoriaService, produtoService);
  })
  .catch((error) => {
    console.error('Erro na conexão com o banco de dados:', error);
  });
