Claro, Marreira! Abaixo está o **README.md** formatado com as melhores práticas de Markdown do GitHub, mantendo tudo bem organizado, legível e estilizado:

---

```md
# 🔽 Dropdown em Vanilla JS

Este repositório contém um dropdown customizado em JavaScript puro (sem dependências) e CSS. Ele substitui o elemento `<select>` nativo com:

- 🔍 Filtro de busca com destaque
- 🏷️ Múltipla seleção (tags)
- ➕ Criação de opções dinâmicas (`add-new`)
- 📁 Suporte a `<optgroup>`
- ✨ Estilização fácil via CSS

---

## 📚 Índice

1. [Pré-requisitos](#pré-requisitos)  
2. [Instalação](#instalação)  
3. [Uso](#uso)  
4. [Exemplos de Estilização](#exemplos-de-estilização)  
5. [Estrutura do Código](#estrutura-do-código)  
6. [Exemplo de .gitignore](#exemplo-de-gitignore)  
7. [Contribuindo](#contribuindo)  
8. [Licença](#licença)

---

## ✅ Pré-requisitos

- Conhecimentos básicos de **HTML** e **CSS**
- Ambiente para inclusão dos arquivos `.js` e `.css` (página web, tema/plugin WordPress, etc.)

---

## 💾 Instalação

### 🔸 Opção 1: Baixar o Repositório

```bash
git clone https://github.com/marreiradigital/dropdown-vanilha-js.git
```

1. Inclua os arquivos no seu projeto:

```html
<link rel="stylesheet" href="seu-caminho/dropdown.css">
<script src="seu-caminho/dropdown.js"></script>
```

### 🔸 Opção 2: Usar CDN

**CSS** (no `<head>`):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/marreiradigital/dropdown-vanilha-js@refs/heads/main/style-minify.css">
```

**JS** (antes de fechar o `<body>`):

```html
<script src="https://cdn.jsdelivr.net/gh/marreiradigital/dropdown-vanilha-js@main/dropdown-minify.js"></script>
```

---

## 🚀 Uso

### 🔹 1. Configurando o `<select>`

#### ✅ Modo Single (Seleção Única)

```html
<select id="meu-select" class="dropdown">
  <option value="">Selecione...</option>
  <option value="opcao1">Opção 1</option>
  <option value="opcao2">Opção 2</option>
</select>
```

- Classe obrigatória: `dropdown`  
- Funcionalidade: Busca com destaque automático

#### ✅ Modo Múltiplo (Tags)

```html
<select id="meu-select-multi" class="dropdown" multiple>
  <option value="">Selecione...</option>
  <option value="opcao1">Opção 1</option>
  <option value="opcao2">Opção 2</option>
</select>
```

- Atributo `multiple` ativa o modo de múltiplas seleções
- Visual: opções aparecem como *tags* com botão de remoção

---

### 🔹 2. Pré-selecionar Opções

```html
<select id="meu-select" class="dropdown" data-valor="opcao2">
  <option value="">Selecione...</option>
  <option value="opcao1">Opção 1</option>
  <option value="opcao2">Opção 2</option>
</select>
```

- `data-valor="opcao2"` → seleciona a opção 2  
- Para múltiplas: `data-valor="opcao1,opcao2"`

---

### 🔹 3. Adicionar Novas Opções

```html
<select id="meu-select" class="dropdown" add-new="true">
  <option value="">Selecione...</option>
</select>
```

- Atributo `add-new="true"` ativa opção de adicionar dinamicamente
- O usuário pode digitar e pressionar `Enter` ou clicar para adicionar

---

### 🔹 4. Usar Grupos (`<optgroup>`)

```html
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
```

- Os grupos só aparecem se houver opções visíveis após o filtro

---

### 🔹 5. Identificação para Estilização

O `div` que envolve o dropdown receberá uma classe adicional:

- Por `id`: `.custom-dropdown.meu-select`
- Fallback por `name` se `id` não existir

📌 **Dica**: use isso para aplicar estilos específicos a cada dropdown.

---

### 🔹 6. Inicialização e Atualização

O script é ativado automaticamente ao carregar a página. Para atualizar dinamicamente:

```js
updateCustomDropdown('meu-select', 'opcao2');
```

- `'meu-select'`: ID do `<select>`
- `'opcao2'`: valor (ou valores, separados por vírgula) para selecionar

---

## 🎨 Exemplos de Estilização

### 📏 Alterar Largura e Cor

```css
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
```

---

### 🏷️ Estilizar Tags (Múltiplo)

```css
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
```

---

### ✨ Destaque de Busca

```css
.meu-select .highlight {
  background-color: #ffeb3b;
  font-weight: bold;
}
```

---

### ➕ Estilo do "Adicionar"

```css
.meu-select .dropdown-add-new {
  color: #28a745;
  font-style: italic;
}

.meu-select .dropdown-add-new:hover {
  background-color: #e6ffe6;
}
```

---

## 📁 Estrutura do Código

```
📦 dropdown-vanilha-js
├── dropdown.css         → Estilização dos componentes
├── dropdown.js          → Script com toda a lógica
│   ├─ Funções utilitárias (removeDiacritics, highlightMatch, etc.)
│   ├─ Criação do dropdown (modo único e múltiplo)
│   ├─ Eventos (cliques, busca, seleção)
│   └─ createCustomDropdown() e updateCustomDropdown()
```

---

## 🗂️ Exemplo de `.gitignore`

```gitignore
# Logs e arquivos temporários
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
```

---

## 🤝 Contribuindo

1. Faça um **fork**
2. Crie uma nova branch:

```bash
git checkout -b minha-feature
```

3. Commit:

```bash
git commit -m "Minha nova feature"
```

4. Push:

```bash
git push origin minha-feature
```

5. Abra um **Pull Request**

---

## 📝 Licença

Distribuído sob a licença MIT.  
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

> 💡 **Dica Final**: use `id` ou `name` nos `<select>` para facilitar personalizações específicas via CSS.

```
