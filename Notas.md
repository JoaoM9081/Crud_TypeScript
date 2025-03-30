## Projeto 1 - Persistência em Memória

Sistema de gerenciamento de inventário com **persistência em memória** usando TypeScript.

## Integrantes
- João Marcos Azevedo Cruz (UC23100741)
- João Pedro Tavares (UC23100608)
- João Victor Martins ()

### Como executar
```bash
cd Crud_TypeScript/projeto1
npm run setup
npm start
```

### Estrutura
- Modularização com `controller/`, `service/`, `model/`
- CLI com `inquirer`
- Persistência em memória usando arrays

### Pontos Técnicos
- **TypeScript** com tipagem adequada (`string`, `number`, `Date`, etc.)
- **Interfaces** reais usadas:
```ts
export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoria: Categoria;
  dataCriacao: Date;
  dataAtualizacao: Date;
}
```
- **Funções tipadas reais** com validação:
```ts
criar(nome: string, descricao: string): Categoria {
  if (!nome.trim() || !descricao.trim()) throw new Error('Nome e descrição são obrigatórios');
  const novaCategoria = { ... };
  return novaCategoria;
}
```
- **Classes reais com encapsulamento e injeção de dependência**:
```ts
export class ProdutoService {
  private produtos: Produto[] = [];
  private proximoId = 1;
  private categoriaService: CategoriaService;

  constructor(categoriaService: CategoriaService) {
    this.categoriaService = categoriaService;
  }
}
```
- **Union types usados no código**:
```ts
categoriaNome?: string
```
- **Validações e tratamento de erros**:
```ts
if (!categoria || categoria.length === 0) {
  throw new Error('Categoria não encontrada');
}
```

- **Exemplo descontextualizado de função com tipo e retorno**:
```ts
function somar(a: number, b: number): number {
  return a + b;
}
```

- **Exemplo descontextualizado com parâmetros opcionais**:
```ts
function saudacao(nome: string, saudacao?: string): string {
  return `${saudacao ?? 'Olá'}, ${nome}`;
}
```

### tsconfig.json
```json
{
  "target": "es2020",
  "module": "commonjs",
  "rootDir": "./src",
  "outDir": "./dist",
  "strict": true,
  "esModuleInterop": true
}
```
> Ativa checagens de tipo estritas, suporte ESModules e saída separada compilada.

---

## Projeto 2 - Banco de Dados com PostgreSQL + TypeORM

Replica o Projeto 1, mas com persistência real em banco de dados relacional usando **TypeORM**.

### Como executar
```bash
cd Crud_TypeScript/projeto2
npm run setup
npm start
```

### Configuração do Banco
Crie um `.env` com:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=seu_banco
```

### Pontos Técnicos
- **Entidades reais com Decorators**:
```ts
@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @ManyToOne(() => Categoria, categoria => categoria.produtos)
  categoria!: Categoria;
}
```
- **Repositórios do TypeORM**:
```ts
private produtoRepository = AppDataSource.getRepository(Produto);
```
- **async/await com Promise**:
```ts
async listar(): Promise<Produto[]> {
  return this.produtoRepository.find({ relations: ['categoria'] });
}
```
- **Dotenv** usado para carregar variáveis de ambiente do banco
- **Tratamento de exceções** com `try/catch`

### Observações
- `synchronize: true` recria tabelas automaticamente a cada inicialização.
- O TypeORM abstrai SQL mantendo foco em objetos.

---

## Notas Gerais (Aplicadas em ambos projetos)

### Tipos e Tipagens
- Tipos básicos: `string`, `number`, `boolean`, `null`, `undefined`, `void`, `any`
- Tipos complexos: `Produto[]`, `Promise<Categoria>`
- Union e Intersection Types: `string | null`, `Produto & Categoria`

### Interfaces e Tipos Personalizados
Reais do projeto:
```ts
export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  dataCriacao: Date;
}
```

Exemplo descontextualizado:
```ts
type Resultado = { sucesso: boolean; mensagem?: string };
```

### Funções em TypeScript
Reais do projeto:
```ts
atualizar(nomeCategoria: string, nome: string, descricao: string): Categoria {
  const categoria = this.buscarPorNome(nomeCategoria)[0];
  categoria.nome = nome;
  return categoria;
}
```

Descontextualizada:
```ts
function calcularDesconto(valor: number, percentual: number = 10): number {
  return valor - (valor * percentual) / 100;
}
```

### Classes, Herança e Modificadores de Acesso
Usado no projeto:
```ts
export class CategoriaService {
  private categorias: Categoria[] = [];
}
```

Descontextualizado:
```ts
class Animal {
  protected emitirSom(): void {}
}

class Cachorro extends Animal {
  emitirSom(): void {
    console.log("Latido");
  }
}
```

### Generics
**Observação:** embora não usados no projeto, podem ser úteis em funções auxiliares.

Exemplo descontextualizado:
```ts
function exibirLista<T>(itens: T[]): void {
  itens.forEach(item => console.log(item));
}
```

### Enum e Mapeamento de Valores
**Não usado no projeto, mas aplicável.**

Exemplo descontextualizado:
```ts
enum Status {
  Ativo = 'ativo',
  Inativo = 'inativo'
}
```

Exemplo possível no sistema:
```ts
enum TipoCategoria {
  Comum = 'comum',
  Premium = 'premium'
}
```