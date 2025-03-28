import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Categoria } from './model/Categoria';
import { Produto } from './model/Produto';
import { CategoriaService } from './service/CategoriaService';
import { ProdutoService } from './service/ProdutoService';
import { promptMenu } from './interface/cli';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,  
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,  
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