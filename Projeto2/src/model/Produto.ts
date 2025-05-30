import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from './Categoria';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  descricao!: string;

  @Column('decimal')
  preco!: number;

  @Column()
  quantidade!: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
  @JoinColumn({ name: 'id_categoria' }) 
  categoria!: Categoria;

  @Column()
  dataCriacao!: Date;

  @Column()
  dataAtualizacao!: Date;
}