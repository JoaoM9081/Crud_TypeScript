## Projeto 1 - Persistência em Memória

Sistema de gerenciamento de inventário com **persistência em memória** usando TypeScript.

## Integrantes
- João Marcos Azevedo Cruz
- João Pedro Tavares
- João Victor Martins

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
- **Interfaces** (`interface Produto`) para contratos entre módulos
- **Funções tipadas** com parâmetros e retornos explícitos
- **Classes** com modificadores (`private`, `public`)
- **Validações de entrada** e tratamento de erros com `try/catch`
- **Union types**: `string | null`
- **Generics** (em funções auxiliares, ex: `function imprimir<T>()`)
- **Enum e Tipos condicionais** (quando aplicável)

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
> Comentário: ativa checagens de tipo estritas, suporte ESModules e saída separada compilada.

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
- **Entidades com Decorators** (`@Entity`, `@Column`, `@ManyToOne`, etc.)
- **Repositórios do TypeORM** com `AppDataSource.getRepository()`
- **Relacionamentos entre entidades** (1:N, N:1)
- **async/await** com `Promise<T>` em todos os métodos
- **Dotenv** para segurança de variáveis de conexão
- **Modularização e reutilização** de serviços e controllers
- **Validação e tratamento de exceções**

### Observações
- `synchronize: true` recria tabelas automaticamente a cada inicialização.
- O TypeORM abstrai as queries SQL, mantendo foco em objetos.

---

## Notas Gerais (Aplicadas em ambos projetos)

### Tipos e Tipagens
- Tipos básicos: `string`, `number`, `boolean`, `null`, `undefined`, `void`, `any`
- Tipos complexos: `Produto[]`, `Promise<Categoria>`
- Union e Intersection Types: `string | null`, `Produto & Categoria`

### Interfaces e Tipos Personalizados
```ts
interface Produto {
  id: number;
  nome: string;
  categoria?: Categoria; // opcional
}
```

### Funções em TypeScript
```ts
function atualizar(nome: string, preco?: number): Produto {
  // corpo
}
```

### Classes, Herança e Acesso
```ts
class BaseService {
  protected log(): void {}
}

class ProdutoService extends BaseService {
  private produtos: Produto[] = [];
}
```

### Generics
```ts
function buscarPorId<T>(lista: T[], id: number): T | undefined {
  return lista.find(item => item['id'] === id);
}
```

### Enum e Mapeamento de Valores
```ts
enum Status {
  Ativo = 'ativo',
  Inativo = 'inativo'
}
```

---

## Conclusão

- **Projeto 1**: ótimo para estudo de lógica, tipagem e organização de código.
- **Projeto 2**: simula aplicação real com banco de dados e ORM.
- Ambos demonstram boas práticas de programação orientada a objetos com TypeScript.