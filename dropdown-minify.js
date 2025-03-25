function removeDiacritics(e){return e&&"function"==typeof e.normalize?e.normalize("NFD").replace(/[\u0300-\u036f]/g,""):e||""}function highlightMatch(e,t){const n=removeDiacritics(e.toLowerCase()),o=removeDiacritics(t.toLowerCase()),a=n.indexOf(o);if(-1===a)return e;const d=a+t.length;return e.substring(0,a)+"<span class='highlight'>"+e.substring(a,d)+"</span>"+e.substring(d)}function closeAllDropdowns(){document.querySelectorAll(".dropdown-list.open").forEach((e=>{e.classList.remove("open")}))}function removeExistingDropdown(e){e.nextElementSibling&&e.nextElementSibling.classList.contains("custom-dropdown")&&e.nextElementSibling.remove()}function createDropdownItem(e){const t=document.createElement("div");return t.className="dropdown-item",t.dataset.value=e.value,t.dataset.originalText=e.textContent,t.textContent=e.textContent,e.selected&&t.classList.add("selected-item"),e.disabled&&(t.style.pointerEvents="none",t.style.opacity="0.5"),t}function populateDropdownItems(e,t){t.innerHTML="",Array.from(e.children).forEach((e=>{if("OPTGROUP"===e.tagName){const n=document.createElement("div");n.className="optgroup-label",n.textContent=e.label,t.appendChild(n),Array.from(e.children).forEach((e=>{const n=createDropdownItem(e);t.appendChild(n)}))}else if("OPTION"===e.tagName){const n=createDropdownItem(e);t.appendChild(n)}}))}function addNewOption(e,t,n,o,a,d){if(!t.trim())return;const l=document.createElement("option");l.value=t,l.textContent=t,l.selected=!0,e.appendChild(l),populateDropdownItems(e,o);const s=Array.from(o.querySelectorAll(".dropdown-item")).find((e=>removeDiacritics(e.dataset.originalText.toLowerCase())===removeDiacritics(t.toLowerCase())));s&&s.classList.add("selected-item"),n?(updateSelectedTags(e,d,a),a.value=""):(a.value=t,o.classList.remove("open"))}function filterDropdownItems(e,t,n,o,a){const d=t.value,l=removeDiacritics(d.toLowerCase());e.querySelectorAll(".dropdown-not-found, .dropdown-add-new").forEach((e=>e.remove()));e.querySelectorAll(".dropdown-item:not(.dropdown-add-new):not(.dropdown-not-found)").forEach((e=>{const t=e.dataset.originalText,n=removeDiacritics(t.toLowerCase());!l||n.includes(l)?(e.style.display="block",e.innerHTML=d?highlightMatch(t,d):t):e.style.display="none"}));e.querySelectorAll(".optgroup-label").forEach((e=>{let t=e.nextSibling,n=!1;for(;t&&(!t.classList||!t.classList.contains("optgroup-label"));){if(t.classList&&t.classList.contains("dropdown-item")&&"none"!==t.style.display){n=!0;break}t=t.nextSibling}e.style.display=n?"block":"none"}));if(0===[...e.querySelectorAll(".dropdown-item:not(.dropdown-add-new):not(.dropdown-not-found)")].filter((e=>"none"!==e.style.display)).length){const t=document.createElement("div");t.className="dropdown-item dropdown-not-found",t.style.pointerEvents="none",t.textContent="Não encontrado...",e.appendChild(t)}if(n.hasAttribute("add-new")&&"true"===n.getAttribute("add-new")&&""!==d.trim()){const l=document.createElement("div");l.className="dropdown-item dropdown-add-new",l.innerHTML=`Adicionar "<strong>${d}</strong>"`,l.addEventListener("click",(function(){addNewOption(n,t.value,o,e,t,a)})),e.appendChild(l)}}function handleItemClickSingle(e,t,n,o){const a=e.dataset.value,d=Array.from(t.options).find((e=>e.value===a||e.textContent===a));d&&(Array.from(t.options).forEach((e=>e.selected=!1)),d.selected=!0,n.querySelectorAll(".dropdown-item").forEach((e=>e.classList.remove("selected-item"))),e.classList.add("selected-item"),o.value=""===d.value?"":d.textContent,""===d.value&&(o.placeholder=d.textContent),n.classList.remove("open"))}function createTagElement(e,t){const n=document.createElement("span");n.className="tag",n.textContent=e;const o=document.createElement("span");return o.className="tag-remove",o.textContent="x",o.addEventListener("click",(n=>{n.stopPropagation(),t(e)})),n.appendChild(o),n}function updateSelectedTags(e,t,n){t.querySelectorAll(".tag").forEach((e=>e.remove())),Array.from(e.selectedOptions).forEach((o=>{if(""!==o.value){const a=createTagElement(o.textContent,(o=>{removeOptionSelection(e,o),updateSelectedTags(e,t,n)}));t.insertBefore(a,n)}}))}function removeOptionSelection(e,t){const n=Array.from(e.options).find((e=>e.textContent===t));n&&(n.selected=!1)}function handleItemClickMultiple(e,t,n,o,a){const d=e.dataset.value,l=Array.from(t.options).find((e=>e.value===d||e.textContent===d));l&&(l.selected=!l.selected,l.selected?e.classList.add("selected-item"):e.classList.remove("selected-item"),updateSelectedTags(t,a,o),o.focus())}function createSingleDropdown(e){const t=document.createElement("div");t.className="custom-dropdown",e.id&&""!==e.id.trim()?t.classList.add(e.id):e.name&&""!==e.name.trim()&&t.classList.add(e.name);const n=document.createElement("div");n.className="dropdown-selected";const o=document.createElement("input");if(o.type="text",o.className="dropdown-search-inside",e.hasAttribute("data-valor")&&""!==e.getAttribute("data-valor").trim()){const t=e.getAttribute("data-valor");updateSelectValue(e,t);const n=Array.from(e.options).find((e=>e.selected));n&&""!==n.value?o.value=n.textContent:o.placeholder="Selecione..."}else{const t=Array.from(e.options).find((e=>e.selected));if(t&&""!==t.value)o.value=t.textContent;else{const t=Array.from(e.options).find((e=>e.selected));o.value="",o.placeholder=t?t.textContent:"Selecione..."}}n.appendChild(o);const a=document.createElement("div");a.className="dropdown-list",populateDropdownItems(e,a),t.appendChild(n),t.appendChild(a),e.parentNode.insertBefore(t,e.nextSibling),e.style.display="none",o.addEventListener("focus",(function(){closeAllDropdowns(),a.classList.add("open"),filterDropdownItems(a,o,e,!1,null)})),o.addEventListener("input",(function(){filterDropdownItems(a,o,e,!1,null),a.classList.add("open")})),o.addEventListener("keyup",(function(t){if("Enter"===t.key){a.querySelector(".dropdown-add-new")&&(t.preventDefault(),addNewOption(e,o.value,!1,a,o,null))}})),document.addEventListener("click",(function(e){t.contains(e.target)||a.classList.remove("open")})),a.addEventListener("click",(function(t){const n=t.target.closest(".dropdown-item");!n||n.classList.contains("dropdown-not-found")||n.classList.contains("dropdown-add-new")||handleItemClickSingle(n,e,a,o)}))}function createMultipleDropdown(e){const t=document.createElement("div");t.className="custom-dropdown",e.id&&""!==e.id.trim()?t.classList.add(e.id):e.name&&""!==e.name.trim()&&t.classList.add(e.name);const n=document.createElement("div");n.className="dropdown-selected";const o=document.createElement("input");o.type="text",o.className="dropdown-search-inside",o.placeholder="Selecione...",n.appendChild(o);const a=document.createElement("div");a.className="dropdown-list",populateDropdownItems(e,a),t.appendChild(n),t.appendChild(a),e.parentNode.insertBefore(t,e.nextSibling),e.style.display="none",updateSelectedTags(e,n,o),o.addEventListener("focus",(function(){closeAllDropdowns(),a.classList.add("open"),filterDropdownItems(a,o,e,!0,n)})),o.addEventListener("input",(function(){filterDropdownItems(a,o,e,!0,n),a.classList.add("open")})),o.addEventListener("keyup",(function(t){if("Enter"===t.key){a.querySelector(".dropdown-add-new")&&(t.preventDefault(),addNewOption(e,o.value,!0,a,o,n))}})),document.addEventListener("click",(function(e){t.contains(e.target)||a.classList.remove("open")})),a.addEventListener("click",(function(t){const d=t.target.closest(".dropdown-item");!d||d.classList.contains("dropdown-not-found")||d.classList.contains("dropdown-add-new")||handleItemClickMultiple(d,e,a,o,n)}))}function createCustomDropdown(e){e&&"SELECT"===e.tagName?(removeExistingDropdown(e),e.multiple?createMultipleDropdown(e):createSingleDropdown(e)):console.warn("Elemento fornecido não é um <select> válido.",e)}function updateSelectValue(e,t){if(!t)return;let n=!1,o="string"==typeof t&&-1!==t.indexOf(",")?t.split(",").map((e=>e.trim())):[t];if(e.multiple)Array.from(e.options).forEach((e=>{o.includes(e.value)||o.includes(e.textContent)?(e.selected=!0,n=!0):e.selected=!1}));else{const t=o[0];Array.from(e.options).forEach((e=>{e.value===t||e.textContent===t?(e.selected=!0,n=!0):e.selected=!1}))}n||console.warn("Nenhuma opção encontrada com o valor fornecido:",t)}function updateCustomDropdown(e,t){const n=document.getElementById(e);n&&"SELECT"===n.tagName?(null!=t&&""!==t||!n.getAttribute("data-valor")||(t=n.getAttribute("data-valor")),null!=t&&""!==t&&updateSelectValue(n,t),createCustomDropdown(n)):console.warn("Elemento com o id fornecido não é um <select> válido.")}document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll("select.dropdown").forEach((e=>{e.hasAttribute("data-valor")&&""!==e.getAttribute("data-valor").trim()?updateCustomDropdown(e.id,e.getAttribute("data-valor")):createCustomDropdown(e)}))}));
