/**
 * Remove diacríticos (acentos) de uma string.
 * Ex.: "São Paulo" -> "Sao Paulo"
 */
function removeDiacritics(str) {
  if (!str || typeof str.normalize !== 'function') return str || '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Destaca no texto o trecho que corresponde à query.
 * Ex.: highlightMatch("Alabama", "ala") ->
 * "Al<span class='highlight'>aba</span>ma"
 */
function highlightMatch(text, query) {
  const textNormalized = removeDiacritics(text.toLowerCase());
  const queryNormalized = removeDiacritics(query.toLowerCase());
  const startIndex = textNormalized.indexOf(queryNormalized);
  if (startIndex === -1) return text;
  const endIndex = startIndex + query.length;
  return (
    text.substring(0, startIndex) +
    "<span class='highlight'>" +
    text.substring(startIndex, endIndex) +
    "</span>" +
    text.substring(endIndex)
  );
}

/**
 * Fecha todos os dropdowns abertos (para cliques fora).
 */
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown-list.open').forEach(list => {
    list.classList.remove('open');
  });
}

/**
 * Remove o dropdown customizado existente para evitar duplicidade.
 */
function removeExistingDropdown(selectEl) {
  if (selectEl.nextElementSibling && selectEl.nextElementSibling.classList.contains('custom-dropdown')) {
    selectEl.nextElementSibling.remove();
  }
}

/**
 * Cria um item do dropdown com base em uma <option>.
 * Armazena o texto original (para restauração e highlight).
 */
function createDropdownItem(option) {
  const item = document.createElement('div');
  item.className = 'dropdown-item';
  item.dataset.value = option.value;
  item.dataset.originalText = option.textContent;
  item.textContent = option.textContent;
  if (option.selected) item.classList.add('selected-item');
  if (option.disabled) {
    item.style.pointerEvents = 'none';
    item.style.opacity = '0.5';
  }
  return item;
}

/**
 * Popula a lista de itens do dropdown (incluindo optgroups).
 */
function populateDropdownItems(selectEl, dropdownListEl) {
  dropdownListEl.innerHTML = ''; // Limpa antes de popular
  Array.from(selectEl.children).forEach(child => {
    if (child.tagName === 'OPTGROUP') {
      const groupLabel = document.createElement('div');
      groupLabel.className = 'optgroup-label';
      groupLabel.textContent = child.label;
      dropdownListEl.appendChild(groupLabel);
      Array.from(child.children).forEach(option => {
        const item = createDropdownItem(option);
        dropdownListEl.appendChild(item);
      });
    } else if (child.tagName === 'OPTION') {
      const item = createDropdownItem(child);
      dropdownListEl.appendChild(item);
    }
  });
}

/**
 * Adiciona (cria) uma nova <option> no select, marca como selecionada e atualiza a interface.
 */
function addNewOption(selectEl, value, isMultiple, dropdownListEl, searchInput, selectedContainer) {
  if (!value.trim()) return;
  const newOption = document.createElement('option');
  newOption.value = value;
  newOption.textContent = value;
  newOption.selected = true;
  selectEl.appendChild(newOption);
  populateDropdownItems(selectEl, dropdownListEl);
  
  // Marca visualmente o novo item
  const newItem = Array.from(dropdownListEl.querySelectorAll('.dropdown-item'))
    .find(i => removeDiacritics(i.dataset.originalText.toLowerCase()) === removeDiacritics(value.toLowerCase()));
  if (newItem) newItem.classList.add('selected-item');
  
  if (!isMultiple) {
    searchInput.value = value;
    dropdownListEl.classList.remove('open');
  } else {
    updateSelectedTags(selectEl, selectedContainer, searchInput);
    searchInput.value = '';
  }
}

/**
 * Filtra os itens do dropdown com base no texto digitado.
 * – Remove elementos customizados antigos ("Não encontrado..." e "Adicionar").
 * – Atualiza os itens padrão e adiciona, sempre, o botão "Adicionar <valor>" se add-new="true".
 */
function filterDropdownItems(dropdownListEl, searchInput, selectEl, isMultiple, selectedContainer) {
  const searchValue = searchInput.value;
  const lowerSearch = removeDiacritics(searchValue.toLowerCase());
  
  // Remove os elementos customizados previamente inseridos
  dropdownListEl.querySelectorAll('.dropdown-not-found, .dropdown-add-new').forEach(el => el.remove());
  
  // Atualiza apenas os itens padrão (excluindo os customizados)
  const items = dropdownListEl.querySelectorAll('.dropdown-item:not(.dropdown-add-new):not(.dropdown-not-found)');
  items.forEach(item => {
    const textOriginal = item.dataset.originalText;
    const textNormalized = removeDiacritics(textOriginal.toLowerCase());
    if (!lowerSearch || textNormalized.includes(lowerSearch)) {
      item.style.display = 'block';
      item.innerHTML = searchValue ? highlightMatch(textOriginal, searchValue) : textOriginal;
    } else {
      item.style.display = 'none';
    }
  });
  
  // Atualiza a visibilidade dos labels de optgroup
  const groupLabels = dropdownListEl.querySelectorAll('.optgroup-label');
  groupLabels.forEach(label => {
    let sibling = label.nextSibling;
    let anyVisible = false;
    while (sibling && !(sibling.classList && sibling.classList.contains('optgroup-label'))) {
      if (sibling.classList && sibling.classList.contains('dropdown-item') && sibling.style.display !== 'none') {
        anyVisible = true;
        break;
      }
      sibling = sibling.nextSibling;
    }
    label.style.display = anyVisible ? 'block' : 'none';
  });
  
  // Se nenhum item estiver visível, adiciona "Não encontrado..."
  const visibleItems = [...dropdownListEl.querySelectorAll('.dropdown-item:not(.dropdown-add-new):not(.dropdown-not-found)')]
    .filter(item => item.style.display !== 'none');
  if (visibleItems.length === 0) {
    const notFoundEl = document.createElement('div');
    notFoundEl.className = 'dropdown-item dropdown-not-found';
    notFoundEl.style.pointerEvents = 'none';
    notFoundEl.textContent = 'Não encontrado...';
    dropdownListEl.appendChild(notFoundEl);
  }
  
  // Se o atributo add-new estiver habilitado e houver texto, adiciona "Adicionar <valor>"
  if (selectEl.hasAttribute('add-new') && selectEl.getAttribute('add-new') === 'true' && searchValue.trim() !== '') {
    const addNewEl = document.createElement('div');
    addNewEl.className = 'dropdown-item dropdown-add-new';
    addNewEl.innerHTML = `Adicionar "<strong>${searchValue}</strong>"`;
    addNewEl.addEventListener('click', function() {
      addNewOption(selectEl, searchInput.value, isMultiple, dropdownListEl, searchInput, selectedContainer);
    });
    dropdownListEl.appendChild(addNewEl);
  }
}

/**
 * Trata o clique em um item do dropdown no modo SINGLE.
 */
function handleItemClickSingle(item, selectEl, dropdownListEl, searchInput) {
  const value = item.dataset.value;
  const optionToSelect = Array.from(selectEl.options).find(
    opt => opt.value === value || opt.textContent === value
  );
  if (!optionToSelect) return;
  Array.from(selectEl.options).forEach(opt => opt.selected = false);
  optionToSelect.selected = true;
  dropdownListEl.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected-item'));
  item.classList.add('selected-item');
  searchInput.value = optionToSelect.value === "" ? "" : optionToSelect.textContent;
  if (optionToSelect.value === "") {
    searchInput.placeholder = optionToSelect.textContent;
  }
  dropdownListEl.classList.remove('open');
}

/**
 * Cria um elemento "tag" para exibir a seleção no modo MULTIPLE.
 */
function createTagElement(text, onRemoveCallback) {
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = text;
  const removeIcon = document.createElement('span');
  removeIcon.className = 'tag-remove';
  removeIcon.textContent = 'x';
  removeIcon.addEventListener('click', e => {
    e.stopPropagation();
    onRemoveCallback(text);
  });
  tag.appendChild(removeIcon);
  return tag;
}

/**
 * Atualiza visualmente as "tags" no modo MULTIPLE.
 */
function updateSelectedTags(selectEl, selectedContainer, searchInput) {
  selectedContainer.querySelectorAll('.tag').forEach(t => t.remove());
  Array.from(selectEl.selectedOptions).forEach(opt => {
    if (opt.value !== "") {
      const tagEl = createTagElement(opt.textContent, textRemoved => {
        removeOptionSelection(selectEl, textRemoved);
        updateSelectedTags(selectEl, selectedContainer, searchInput);
      });
      selectedContainer.insertBefore(tagEl, searchInput);
    }
  });
}

/**
 * Remove a seleção de um option (pelo texto) no modo MULTIPLE.
 */
function removeOptionSelection(selectEl, textRemoved) {
  const option = Array.from(selectEl.options).find(
    opt => opt.textContent === textRemoved
  );
  if (option) option.selected = false;
}

/**
 * Trata o clique em um item do dropdown no modo MULTIPLE (toggle).
 */
function handleItemClickMultiple(item, selectEl, dropdownListEl, searchInput, selectedContainer) {
  const value = item.dataset.value;
  const optionToSelect = Array.from(selectEl.options).find(
    opt => opt.value === value || opt.textContent === value
  );
  if (!optionToSelect) return;
  optionToSelect.selected = !optionToSelect.selected;
  if (optionToSelect.selected) {
    item.classList.add('selected-item');
  } else {
    item.classList.remove('selected-item');
  }
  updateSelectedTags(selectEl, selectedContainer, searchInput);
  searchInput.focus();
}

/**
 * Cria o dropdown customizado para modo SINGLE.
 */
function createSingleDropdown(selectEl) {
  const dropdownContainer = document.createElement('div');
  dropdownContainer.className = 'custom-dropdown';
  // Adiciona a classe baseada no id (prioridade) ou name do select
  if (selectEl.id && selectEl.id.trim() !== '') {
    dropdownContainer.classList.add(selectEl.id);
  } else if (selectEl.name && selectEl.name.trim() !== '') {
    dropdownContainer.classList.add(selectEl.name);
  }
  
  const selectedEl = document.createElement('div');
  selectedEl.className = 'dropdown-selected';
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'dropdown-search-inside';
  
  // Se houver data-valor, atualiza o select e exibe o label correspondente
  if (selectEl.hasAttribute('data-valor') && selectEl.getAttribute('data-valor').trim() !== '') {
    const dataValor = selectEl.getAttribute('data-valor');
    updateSelectValue(selectEl, dataValor);
    const selectedOption = Array.from(selectEl.options).find(opt => opt.selected);
    if (selectedOption && selectedOption.value !== "") {
      searchInput.value = selectedOption.textContent;
    } else {
      searchInput.placeholder = 'Selecione...';
    }
  } else {
    const selectedOption = Array.from(selectEl.options).find(opt => opt.selected);
    if (!selectedOption || selectedOption.value === "") {
      const defaultOption = Array.from(selectEl.options).find(opt => opt.selected);
      searchInput.value = "";
      searchInput.placeholder = defaultOption ? defaultOption.textContent : 'Selecione...';
    } else {
      searchInput.value = selectedOption.textContent;
    }
  }
  
  selectedEl.appendChild(searchInput);
  
  const dropdownListEl = document.createElement('div');
  dropdownListEl.className = 'dropdown-list';
  populateDropdownItems(selectEl, dropdownListEl);
  
  dropdownContainer.appendChild(selectedEl);
  dropdownContainer.appendChild(dropdownListEl);
  selectEl.parentNode.insertBefore(dropdownContainer, selectEl.nextSibling);
  selectEl.style.display = 'none';
  
  searchInput.addEventListener('focus', function () {
    closeAllDropdowns();
    dropdownListEl.classList.add('open');
    filterDropdownItems(dropdownListEl, searchInput, selectEl, false, null);
  });
  
  searchInput.addEventListener('input', function () {
    filterDropdownItems(dropdownListEl, searchInput, selectEl, false, null);
    dropdownListEl.classList.add('open');
  });
  
  searchInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      const addNewEl = dropdownListEl.querySelector('.dropdown-add-new');
      if (addNewEl) {
        e.preventDefault();
        addNewOption(selectEl, searchInput.value, false, dropdownListEl, searchInput, null);
      }
    }
  });
  
  document.addEventListener('click', function (e) {
    if (!dropdownContainer.contains(e.target)) dropdownListEl.classList.remove('open');
  });
  
  dropdownListEl.addEventListener('click', function (e) {
    const item = e.target.closest('.dropdown-item');
    if (item && !item.classList.contains('dropdown-not-found') && !item.classList.contains('dropdown-add-new')) {
      handleItemClickSingle(item, selectEl, dropdownListEl, searchInput);
    }
  });
}

/**
 * Cria o dropdown customizado para modo MULTIPLE.
 */
function createMultipleDropdown(selectEl) {
  const dropdownContainer = document.createElement('div');
  dropdownContainer.className = 'custom-dropdown';
  // Adiciona a classe baseada no id (prioridade) ou name do select
  if (selectEl.id && selectEl.id.trim() !== '') {
    dropdownContainer.classList.add(selectEl.id);
  } else if (selectEl.name && selectEl.name.trim() !== '') {
    dropdownContainer.classList.add(selectEl.name);
  }
  
  const selectedEl = document.createElement('div');
  selectedEl.className = 'dropdown-selected';
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'dropdown-search-inside';
  searchInput.placeholder = 'Selecione...';
  selectedEl.appendChild(searchInput);
  
  const dropdownListEl = document.createElement('div');
  dropdownListEl.className = 'dropdown-list';
  populateDropdownItems(selectEl, dropdownListEl);
  
  dropdownContainer.appendChild(selectedEl);
  dropdownContainer.appendChild(dropdownListEl);
  selectEl.parentNode.insertBefore(dropdownContainer, selectEl.nextSibling);
  selectEl.style.display = 'none';
  
  updateSelectedTags(selectEl, selectedEl, searchInput);
  
  searchInput.addEventListener('focus', function () {
    closeAllDropdowns();
    dropdownListEl.classList.add('open');
    filterDropdownItems(dropdownListEl, searchInput, selectEl, true, selectedEl);
  });
  
  searchInput.addEventListener('input', function () {
    filterDropdownItems(dropdownListEl, searchInput, selectEl, true, selectedEl);
    dropdownListEl.classList.add('open');
  });
  
  searchInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      const addNewEl = dropdownListEl.querySelector('.dropdown-add-new');
      if (addNewEl) {
        e.preventDefault();
        addNewOption(selectEl, searchInput.value, true, dropdownListEl, searchInput, selectedEl);
      }
    }
  });
  
  document.addEventListener('click', function (e) {
    if (!dropdownContainer.contains(e.target)) dropdownListEl.classList.remove('open');
  });
  
  dropdownListEl.addEventListener('click', function (e) {
    const item = e.target.closest('.dropdown-item');
    if (item && !item.classList.contains('dropdown-not-found') && !item.classList.contains('dropdown-add-new')) {
      handleItemClickMultiple(item, selectEl, dropdownListEl, searchInput, selectedEl);
    }
  });
}

/**
 * Função principal que decide se cria SINGLE ou MULTIPLE.
 */
function createCustomDropdown(selectEl) {
  if (!selectEl || selectEl.tagName !== 'SELECT') {
    console.warn('Elemento fornecido não é um <select> válido.', selectEl);
    return;
  }
  removeExistingDropdown(selectEl);
  if (selectEl.multiple) {
    createMultipleDropdown(selectEl);
  } else {
    createSingleDropdown(selectEl);
  }
}

/**
 * Atualiza a seleção do <select> com base no valor informado.
 */
function updateSelectValue(selectEl, selectedValue) {
  if (!selectedValue) return;
  let optionFound = false;
  let selectedValues = typeof selectedValue === 'string' && selectedValue.indexOf(',') !== -1
    ? selectedValue.split(',').map(v => v.trim())
    : [selectedValue];
  
  if (!selectEl.multiple) {
    const firstValue = selectedValues[0];
    Array.from(selectEl.options).forEach(option => {
      if (option.value === firstValue || option.textContent === firstValue) {
        option.selected = true;
        optionFound = true;
      } else {
        option.selected = false;
      }
    });
  } else {
    Array.from(selectEl.options).forEach(option => {
      if (selectedValues.includes(option.value) || selectedValues.includes(option.textContent)) {
        option.selected = true;
        optionFound = true;
      } else {
        option.selected = false;
      }
    });
  }
  
  if (!optionFound) {
    console.warn('Nenhuma opção encontrada com o valor fornecido:', selectedValue);
  }
}

/**
 * Atualiza ou recria o dropdown customizado para um <select> específico.
 */
function updateCustomDropdown(selectId, selectedValue) {
  const selectEl = document.getElementById(selectId);
  if (!selectEl || selectEl.tagName !== 'SELECT') {
    console.warn('Elemento com o id fornecido não é um <select> válido.');
    return;
  }
  if ((selectedValue === undefined || selectedValue === null || selectedValue === "") && selectEl.getAttribute('data-valor')) {
    selectedValue = selectEl.getAttribute('data-valor');
  }
  if (selectedValue !== undefined && selectedValue !== null && selectedValue !== '') {
    updateSelectValue(selectEl, selectedValue);
  }
  createCustomDropdown(selectEl);
}

/**
 * Inicializa os dropdowns customizados para todos os <select> com a classe ".dropdown".
 * Se o <select> possuir o atributo data-valor, este valor é usado para selecionar a opção
 * e imprimir a label correspondente no input do dropdown.
 */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('select.dropdown').forEach(select => {
    if (select.hasAttribute('data-valor') && select.getAttribute('data-valor').trim() !== '') {
      updateCustomDropdown(select.id, select.getAttribute('data-valor'));
    } else {
      createCustomDropdown(select);
    }
  });
});
