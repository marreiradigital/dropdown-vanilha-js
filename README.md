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
4. [Exemplos de Estilização](#exemplos-de-estilização)
5. [Estrutura do Código](#estrutura-do-código)
6. [Exemplo de .gitignore](#exemplo-de-gitignore)
7. [Contribuindo](#contribuindo)
8. [Licença](#licença)

---

## Pré-requisitos

- Conhecimentos básicos de HTML/CSS
- Ambiente para incluir o CSS e JS (ex.: tema/plug-in WordPress ou qualquer página web)

---

## Instalação

### Opção 1: Baixar o Repositório

1. Clone ou baixe este repositório:

   ```bash
   git clone https://github.com/marreiradigital/dropdown-vanilha-js.git
Inclua os arquivos dropdown.css e dropdown.js no seu projeto.
Referencie-os no HTML:
html
<link rel="stylesheet" href="seu-caminho/dropdown.css">
<script src="seu-caminho/dropdown.js"></script>
Opção 2: Usar CDN
Adicione os arquivos diretamente via CDN:
CSS (no <head>):
html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/marreiradigital/dropdown-vanilha-js@refs/heads/main/style-minify.css">
JS (no final do <body>):
html
<script src="https://cdn.jsdelivr.net/gh/marreiradigital/dropdown-vanilha-js@main/dropdown-minify.js"></script>
Uso
3.1 Configurando o <select>
Para usar o dropdown customizado, adicione a classe dropdown ao <select>. O script detecta automaticamente todos os <select class="dropdown"> ao carregar a página e os transforma em dropdowns interativos.
Modo Single (Seleção Única)
Um dropdown básico com busca:
html
<select id="meu-select" class="dropdown">
  <option value="">Selecione...</option>
  <option value="opcao1">Opção 1</option>
  <option value="opcao2">Opção 2</option>
</select>
Classe obrigatória: dropdown
Funcionalidades: Busca filtrada com destaque no texto
Modo Múltiplo (Seleção Múltipla com Tags)
Para múltiplas seleções exibidas como tags:
html
<select id="meu-select-multi" class="dropdown" multiple>
  <option value="">Selecione...</option>
  <option value="opcao1">Opção 1</option>
  <option value="opcao2">Opção 2</option>
</select>
Atributo multiple: Ativa o modo de múltipla seleção
Visual: Opções selecionadas aparecem como tags com botão de remoção ("x")
Pré-selecionar Opções
Defina opções iniciais com o atributo data-valor:
html
<select id="meu-select" class="dropdown" data-valor="opcao2">
  <option value="">Selecione...</option>
  <option value="opcao1">Opção 1</option>
  <option value="opcao2">Opção 2</option>
</select>
Modo single: Use o value ou texto de uma opção (ex.: "opcao2")
Modo múltiplo: Use valores separados por vírgula (ex.: data-valor="opcao1,opcao2")
Criar Novas Opções Dinamicamente
Permita adicionar opções com add-new:
html
<select id="meu-select" class="dropdown" add-new="true">
  <option value="">Selecione...</option>
  <option value="opcao1">Opção 1</option>
</select>
Atributo add-new="true": Mostra "Adicionar '<valor>'" ao digitar algo novo
Ação: Clique ou pressione Enter para adicionar ao <select>
Usar Grupos (Optgroups)
Organize opções em grupos:
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
Suporte nativo: <optgroup> é renderizado como rótulos
Filtro: Grupos aparecem apenas se houver opções visíveis
Identificação para Estilização
O container do dropdown recebe uma classe extra baseada em:
id (prioridade): Ex.: <select id="meu-select"> → .custom-dropdown.meu-select
name (fallback): Se id não estiver presente
Uso: Permite aplicar CSS específico (ex.: .meu-select { width: 300px; })
3.2 Inicialização
O script roda automaticamente no evento DOMContentLoaded. Não é necessário chamar funções manualmente, exceto para atualizações.
3.3 Atualização Programática
Atualize um dropdown existente com:
javascript
updateCustomDropdown('meu-select', 'opcao2');
Parâmetros:
'meu-select': ID do <select>
'opcao2': Valor ou texto da opção (para múltiplo, use 'opcao1,opcao2')
Exemplos de Estilização
Personalize o dropdown sobrescrevendo as classes geradas. Aqui estão alguns exemplos:
Alterar Largura e Cor
css
.meu-select {
  width: 300px;
}

.meu-select .dropdown-selected {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.meu-select .dropdown-list {
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
Estilizar Tags (Modo Múltiplo)
css
.meu-select-multi .tag {
  background-color: #007bff;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  margin: 2px;
}

.meu-select-multi .tag-remove {
  cursor: pointer;
  margin-left: 5px;
  font-weight: bold;
}
Highlight na Busca
css
.meu-select .highlight {
  background-color: #ffeb3b;
  font-weight: bold;
}
Adicionar Estilo ao "Adicionar"
css
.meu-select .dropdown-add-new {
  color: #28a745;
  font-style: italic;
}

.meu-select .dropdown-add-new:hover {
  background-color: #e6ffe6;
}
Dica: Use o id ou name do <select> para estilizar dropdowns específicos sem afetar outros.
Estrutura do Código
dropdown.css: Estiliza o container, itens, tags, etc.
dropdown.js:
Funções utilitárias (removeDiacritics, highlightMatch, etc.)
Criação do dropdown (single e múltiplo)
Eventos de clique, digitação e manipulação
Principais funções:
createCustomDropdown: Inicia cada <select.dropdown>
updateCustomDropdown: Atualiza um dropdown existente
Exemplo de .gitignore
# Logs e temporários
*.log
*.tmp
*.DS_Store
Thumbs.db

# Builds
node_modules/
dist/
build/
.cache/

# WordPress
wp-content/uploads/

# IDEs e configs
.vscode/
.idea/
*.sublime-*
.env
Contribuindo
Faça um fork do projeto.
Crie uma branch:
bash
git checkout -b minha-feature
Commit:
bash
git commit -m "Minha nova feature"
Push:
bash
git push origin minha-feature
Abra um Pull Request.
Licença
Este projeto está licenciado sob a MIT License (LICENSE).

### Melhorias realizadas:

1. **Quebras de linha**: Adicionei espaçamento entre seções, itens de lista e blocos de código para evitar o aspecto "tudo na mesma linha".
2. **Formatação clara**: Usei cabeçalhos, listas com bullets (`-`) e blocos de código bem delimitados.
3. **Exemplos de estilização**: Incluí uma nova seção com exemplos práticos de CSS para personalizar largura, cores, tags, highlights e a opção "Adicionar".
4. **CDN mantido**: Os links CDN estão na seção "Instalação" com posicionamento claro.
5. **Estrutura simplificada**: Mantive o conteúdo simples, mas organizado, evitando sobrecarga visual.
