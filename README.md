Aqui está o README ajustado para o formato de estilização típico do GitHub, usando Markdown conforme padrões comuns encontrados em repositórios:
markdown
# Custom Dropdown

Este repositório contém um recurso de dropdown customizado em JavaScript e CSS, substituindo elementos `<select>` nativos com:
- Filtro de busca
- Destaque do texto buscado
- Múltipla seleção (tags)
- Criação de opções dinâmicas (add-new)
- Compatibilidade com optgroups

---

## Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Uso](#uso)
4. [Estrutura do Código](#estrutura-do-código)
5. [Exemplo de .gitignore](#exemplo-de-gitignore)
6. [Contribuindo](#contribuindo)
7. [Licença](#licença)

---

## Pré-requisitos
- Conhecimentos básicos de HTML/CSS
- Ambiente para incluir o CSS e JS (ex.: tema/plug-in WordPress ou qualquer página web)

---

## Instalação
1. Clone ou baixe este repositório:
   ```bash
   git clone https://github.com/marreiradigital/dropdown-vanilha-js.git
Inclua os arquivos dropdown.css e dropdown.js no seu projeto.
Referencie-os no HTML, por exemplo:
html
<link rel="stylesheet" href="seu-caminho/dropdown.css">
<script src="seu-caminho/dropdown.js"></script>
Uso
3.1 Configuração Básica
Marque seu <select> com a classe dropdown:
html
<select id="meu-select" class="dropdown" data-valor="Opção Pré-Selecionada">
    <option value="">Selecione...</option>
    <option value="Opção 1">Opção 1</option>
    <option value="Opção 2">Opção 2</option>
</select>
Para múltipla seleção, adicione o atributo multiple:
html
<select multiple ...>
Para permitir adicionar novas opções dinamicamente, inclua:
html
add-new="true"
3.2 Inicialização
Ao carregar a página (evento DOMContentLoaded), o script dropdown.js converte automaticamente todos os <select class="dropdown">.
3.3 Atualização Programática
Para atualizar o valor de um dropdown já montado:
javascript
updateCustomDropdown('meu-select', 'Opção 2');
Estrutura do Código
dropdown.css
Estiliza o container principal, itens, tags, placeholders, etc.
dropdown.js  
Funções utilitárias (removeDiacritics, highlightMatch, etc.)  
Criação do dropdown custom (modo single e múltiplo)  
Eventos de clique, digitação, fechamento automático e manipulação de opções  
Funções principais:  
createCustomDropdown: Invocada automaticamente para cada <select.dropdown>  
updateCustomDropdown: Atualiza o valor de um dropdown já montado
Exemplo de .gitignore
Segue um exemplo de .gitignore básico para projetos web/WordPress:
# Logs e arquivos temporários do sistema
*.log
*.tmp
*.DS_Store
Thumbs.db
ehthumbs.db

# Pastas comuns em builds front-end
node_modules/
dist/
build/
.cache/

# Se for um tema ou plugin WordPress, ignore:
wp-content/uploads/

# Configurações de IDE
.vscode/
.idea/
*.sublime-workspace
*.sublime-project

# Configurações de sistema
.env
Adicione ou remova conforme suas necessidades.
Contribuindo
Faça um fork do projeto.
Crie uma branch para sua feature:
bash
git checkout -b minha-feature
Commit suas mudanças:
bash
git commit -m "Minha nova feature"
Push para a branch:
bash
git push origin minha-feature
Abra um Pull Request.
Licença
Este projeto está licenciado sob a MIT License (LICENSE).

### Principais ajustes realizados:
1. **Formato Markdown**: Usei `#` para títulos principais, `##` para subtítulos e `###` para subseções, seguindo convenções do GitHub.
2. **Código destacado**: Blocos de código foram envoltos em ``` para melhor legibilidade, com linguagem especificada (ex.: `bash`, `html`, `javascript`).
3. **Links no índice**: Adicionados links âncora para navegação rápida.
4. **Estilização leve**: Mantive o conteúdo claro e conciso, com separadores (`---`) para dividir seções.
5. **Licença referenciada**: Adicionei um link implícito para o arquivo `LICENSE`, comum em READMEs do GitHub.

Esse formato é bem aceito e visualmente agradável no GitHub! Se precisar de mais ajustes, é só avisar.
