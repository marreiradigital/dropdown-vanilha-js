 README - Custom Dropdown

Este repositório contém um recurso de dropdown customizado em JavaScript e CSS, substituindo elementos <select> nativos com:
- Filtro de busca
- Destaque do texto buscado
- Múltipla seleção (tags)
- Criação de opções dinâmicas (add-new)
- Compatibilidade com optgroups

--------------------
  ÍNDICE
--------------------
1. Pré-requisitos
2. Instalação
3. Uso
4. Estrutura do Código
5. .gitignore (Exemplo)
6. Contribuindo
7. Licença

--------------------------------
 1. PRÉ-REQUISITOS
--------------------------------
- HTML/CSS básicos
- Ambiente para incluir o CSS e JS (por exemplo, em um tema/plug-in do WordPress ou em qualquer página web)

--------------------------------
 2. INSTALAÇÃO
--------------------------------
1) Clone ou baixe este repositório:
   git clone https://github.com/marreiradigital/dropdown-vanilha-js.git

2) Inclua o arquivo "dropdown.css" e o arquivo "dropdown.js" no seu projeto.

3) Referencie-os no HTML, por exemplo:
   <link rel="stylesheet" href="seu-caminho/dropdown.css">
   <script src="seu-caminho/dropdown.js"></script>

--------------------------------
 3. USO
--------------------------------
[3.1] Marque seu <select> com a classe "dropdown":
   <select id="meu-select" class="dropdown" data-valor="Opção Pré-Selecionada">
       <option value="">Selecione...</option>
       <option value="Opção 1">Opção 1</option>
       <option value="Opção 2">Opção 2</option>
   </select>

 - Se quiser múltipla seleção, use: 
   <select multiple ...>
 - Caso queira permitir adicionar novas opções dinamicamente, inclua:
   add-new="true"

[3.2] Quando a página carregar (DOMContentLoaded), o script "dropdown.js" converterá todos os <select class="dropdown">.

[3.3] Para atualizar programaticamente (depois de carregado):
   updateCustomDropdown('meu-select', 'Opção 2');
   
--------------------------------
 4. ESTRUTURA DO CÓDIGO
--------------------------------
- dropdown.css
  * Estiliza container principal, itens, tags, placeholders, etc.

- dropdown.js
  * Funções utilitárias (removeDiacritics, highlightMatch, etc.)
  * Criação do dropdown custom (modo single e múltiplo)
  * Eventos de clique, digitação, fechamento automático e manipulação de opções
  * Funções principais:
    - createCustomDropdown: Invocada automaticamente para cada <select.dropdown>
    - updateCustomDropdown: Atualiza o valor de um dropdown já montado

--------------------------------
 5. .GITIGNORE (EXEMPLO)
--------------------------------
Segue um exemplo de .gitignore básico para projetos web / WordPress:

----------------------------------------
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
----------------------------------------

Adicione ou remova conforme suas necessidades de projeto.

--------------------------------
 6. CONTRIBUINDO
--------------------------------
1) Faça um fork do projeto.
2) Crie uma branch para sua feature:
   git checkout -b minha-feature
3) Commit de suas mudanças:
   git commit -m "Minha nova feature"
4) Push para a branch:
   git push origin minha-feature
5) Abra um Pull Request

--------------------------------
 7. LICENÇA
--------------------------------
Este projeto está licenciado sob a MIT License.
