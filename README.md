# Projeto - Imobiliária Tiffany

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

## Documentação do Projeto Angular - Imobiliária Tiffany

### Visão Geral

O projeto "Imobiliária Tiffany" é uma aplicação Angular voltada para a gestão de imóveis. Ele permite aos usuários cadastrar, listar, visualizar detalhes e filtrar imóveis. A aplicação está integrada com um backend via HTTP (REST API) para persistência dos dados.

### Estrutura de Componentes

#### AppComponent
- **Localização**: `app.component.ts`
- **Função**: Componente raiz. Controla a busca de imóveis e integra a lista com o filtro.
- **Responsabilidades**:
  - Exibe a barra de busca
  - Botão de limpar filtro
  - Componente de listagem e botão de adicionar imóvel

#### ButtonImovelComponent
- **Localização**: `button-imovel.component.ts`
- **Função**: Exibe um botão flutuante para abrir o formulário de cadastro.
- **Responsabilidades**:
  - Controlar visibilidade do `FormularioCadastroComponent`

#### FormularioCadastroComponent
- **Localização**: `formulario-cadastro.component.ts`
- **Função**: Formulário para cadastrar novos imóveis
- **Campos**:
  - Endereço
  - Tipo de negociação (venda, locação, ambos)
  - Valor
  - Número
  - Proprietário
  - Descrição
  - Imagem (com visualização de nome)

#### ListaImoveisComponent
- **Localização**: `lista-imoveis.component.ts`
- **Função**: Listar imóveis cadastrados com paginação e filtro
- **Funcionalidades**:
  - Paginação (4 imóveis por página)
  - Filtro por endereço
  - Navegação para detalhes do imóvel

#### DetalheImovelComponent (a definir/corrigir)
- **Função esperada**: Exibir detalhes de um imóvel selecionado.
- **Nota**: Mostre mais detalhes dos imóveis que não estão sendo exibidos na listagem.

### Serviço - `ImovelService`
- **Localização**: `imovel.service.ts`
- **Funções**:
  - `listarImoveis()`: GET todos os imóveis
  - `cadastrarImovel(imovel)`: POST para cadastrar novo imóvel
  - `atualizarImovel(id, dados)`: PATCH para atualizar imóvel
  - `deletarImovel(id)`: DELETE para remover imóvel

### Funcionalidades Implementadas
- [x] Cadastro de imóveis
- [x] Listagem paginada
- [x] Filtro de busca por endereço
- [x] Upload de imagem
- [x] Visualização de detalhes via rota (em andamento)

### Roteamento (`routes.ts`)
- Rota principal carrega `AppComponent` com `RouterOutlet`
- Navegação para detalhes com `router.navigate(['/detalhes'], { state: { imovel } })`


### Conclusão
O projeto Imobiliária Tiffany apresenta uma boa estrutura modular utilizando Angular standalone components, integração com API REST, e funcionalidades como cadastro, listagem e filtro. A documentação serve como guia para entendimento geral e manutenção futura da aplicação.

