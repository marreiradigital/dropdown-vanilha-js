   # Dropdown em Vanilha js

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
3.1 Configurando o <select>
Para transformar um <select> nativo em um dropdown customizado, você deve adicionar a classe dropdown ao elemento <select>. O script dropdown.js detecta automaticamente todos os <select> com essa classe ao carregar a página (DOMContentLoaded) e os converte em dropdowns interativos.
Exemplo Básico (Modo Single)
html
<select id="meu-select" class="dropdown">
    <option value="">Selecione...</option>
    <option value="opcao1">Opção 1</option>
    <option value="opcao2">Opção 2</option>
</select>
Classe obrigatória: dropdown — ativa o comportamento customizado.
Comportamento: Substitui o <select> por um campo de busca com lista de opções filtráveis.
Modo Múltiplo (Tags)
Para permitir seleção múltipla com exibição de tags:
html
<select id="meu-select-multi" class="dropdown" multiple>
    <option value="">Selecione...</option>
    <option value="opcao1">Opção 1</option>
    <option value="opcao2">Opção 2</option>
</select>
Atributo multiple: Habilita o modo de múltipla seleção.
Resultado: Opções selecionadas aparecem como tags removíveis.
Pré-selecionar Opções (data-valor)
Use o atributo data-valor para definir uma opção pré-selecionada ao carregar:
html
<select id="meu-select" class="dropdown" data-valor="opcao2">
    <option value="">Selecione...</option>
    <option value="opcao1">Opção 1</option>
    <option value="opcao2">Opção 2</option>
</select>
Atributo data-valor: Pode ser o value ou o texto (textContent) da opção.
No modo múltiplo: Use valores separados por vírgula, ex.: data-valor="opcao1,opcao2".
Adicionar Novas Opções Dinamicamente
Permita que usuários criem novas opções com o atributo add-new:
html
<select id="meu-select" class="dropdown" add-new="true">
    <option value="">Selecione...</option>
    <option value="opcao1">Opção 1</option>
</select>
Atributo add-new="true": Exibe a opção "Adicionar '<valor>'" ao digitar algo não existente.
Comportamento: Pressionar Enter ou clicar na sugestão adiciona a nova opção ao <select>.
Suporte a Optgroups
Organize opções em grupos usando <optgroup>:
html
<select id="meu-select" class="dropdown">
    <option value="">Selecione...</option>
    <optgroup label="Grupo 1">
        <option value="opcao1">Opção 1</option>
        <option value="opcao2">Opção 2</option>
    </optgroup>
    <optgroup label="Grupo 2">
        <option value="opcao3">Opção 3</option>
    </optgroup>
</select>
Compatibilidade: Os rótulos dos <optgroup> aparecem na lista e são filtrados dinamicamente.
Identificação por ID ou Name
O dropdown customizado recebe uma classe adicional baseada no id ou name do <select>:
Prioridade: id (ex.: <select id="meu-select" class="dropdown"> gera .custom-dropdown.meu-select).
Fallback: name (se id não estiver presente).
Uso: Facilita estilização específica via CSS.
3.2 Inicialização Automática
O script inicializa todos os <select class="dropdown"> automaticamente ao carregar a página. Não é necessário chamar funções manualmente, a menos que você precise atualizar dinamicamente.
3.3 Atualização Programática
Para atualizar um dropdown já carregado:
javascript
updateCustomDropdown('meu-select', 'opcao2');
Parâmetros:
'meu-select': O id do <select>.
'opcao2': O value ou texto da opção a ser selecionada.
No modo múltiplo: Use uma string com vírgulas, ex.: 'opcao1,opcao2'.
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
# Logs e arquivos temporários
*.log
*.tmp
*.DS_Store
Thumbs.db

# Pastas de build
node_modules/
dist/
build/
.cache/

# WordPress
wp-content/uploads/

# Configurações de IDE
.vscode/
.idea/
*.sublime-*
.env
Contribuindo
Faça um fork do projeto.
Crie uma branch:
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

### Explicação dos ajustes na seção "Uso":
1. **Classe `.dropdown`**: Expliquei que é obrigatória para ativar o comportamento customizado.
2. **Modo Single e Múltiplo**: Detalhei como configurar cada um, incluindo o atributo `multiple`.
3. **Atributo `data-valor`**: Incluí instruções para pré-seleção, com suporte a múltiplos valores.
4. **Atributo `add-new`**: Descrevi como habilitar a criação dinâmica de opções.
5. **Suporte a `<optgroup>`**: Mostrei como usar grupos de opções.
6. **Identificação por `id` ou `name`**: Expliquei como o script adiciona classes para estilização.
7. **Exemplos práticos**: Forneci trechos de código HTML claros para cada caso.

Essas instruções refletem diretamente o comportamento do código JavaScript fornecido, tornando o README um guia completo e funcional para usuários. Se precisar de mais ajustes ou exemplos, é só avisar!
