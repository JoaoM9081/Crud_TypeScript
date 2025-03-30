import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produto } from './Produto';  

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  descricao!: string;

  @Column()
  dataCriacao!: Date;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos!: Produto[];  
}