const textInsertContract = document.querySelector('.textInsertContract')
const textInsertName = document.querySelector('.textInsertName')
const btnInsert = document.querySelector('.divInsert button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')
const searchInput = document.querySelector('.searchInput')

let itensDB = []

btnDeleteAll.onclick = () => {
  itensDB = []
  updateDB()
}

btnInsert.onclick = () => {
  if (textInsertContract.value != '' && textInsertName.value != '') {
    setItemDB()
  }
}

textInsertName.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    if (textInsertContract.value != '' && textInsertName.value != '') {
      setItemDB()
    }
  }
})

searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase().trim()
  filterItens(searchValue)
})

function setItemDB() {
  if (itensDB.length >= 20) {
    alert('Limite máximo de 20 itens atingido!')
    return
  }

  itensDB.push({ 'contract': textInsertContract.value, 'name': textInsertName.value })
  updateDB()
}

function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
}

function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    insertItemTela(item.contract, item.name, i)
  })
}

function insertItemTela(contract, name, i) {
  const li = document.createElement('li')
  li.innerHTML = `
    <div class="divLi">
      <span class="spanContract">${contract}</span>
      <span class="spanName">${name}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li)

  textInsertContract.value = ''
  textInsertName.value = ''
}

function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
}

function filterItens(searchValue) {
  ul.childNodes.forEach(li => {
    const spanContract = li.querySelector('.spanContract').textContent.toLowerCase()
    const spanName = li.querySelector('.spanName').textContent.toLowerCase()

    if (spanContract.includes(searchValue) || spanName.includes(searchValue)) {
      li.style.display = ''
    } else {
      li.style.display = 'none'
    }
  })
}

loadItens()
