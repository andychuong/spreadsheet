const body = document.body
let alphaStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
let alpha = alphaStr.split('')
let firstSel = false
let rows = 31
let cols = 27
let cur

function createTable() {
  let grid = document.createElement('table')
  grid.id = "spreadsheet"
  let thead = document.createElement('thead')
  grid.appendChild(thead)
  let tbody = document.createElement('tbody')
  for (let i = 0; i < rows; i++) { // Rows
    let tr = document.createElement('tr')
    for (let j = 0; j < cols; j++) { // Cols
      let td = document.createElement('td')
      // Add class 'cell'
      td.classList.add('cell')
      if (i === 0 && j === 0) {
        td.classList.add('header')
      }
      // Add class 'header' fill values
      if (i === 0 && j !== 0) {
        td.innerText = alpha[j - 1]
        td.classList.add('header')
        td.id = alpha[j - 1]
      }
      if (j === 0 && i > 0) {
        td.innerText = i
        td.classList.add('header')
        td.id = i
      }
      // Add ids and custom attributes
      if (j !== 0 && i !== 0) {
        td.id = `${alpha[j-1]}${i}`
        td.setAttribute('row', i)
        td.setAttribute('col', alpha[j - 1])
        // Select A1
        if (td.id === "A1") {
          td.classList.add('selected')
          cur = td
        }
      }
      tr.appendChild(td) // add cell to row
    }
    tbody.appendChild(tr); //add row to table
  }
  grid.appendChild(tbody)
  return grid // add table to body
}

function updateCur() {
  cur = document.getElementsByClassName('selected')[0]
  // Allow cell to be edited
  cur.contentEditable = true
  cur.dispatchEvent(new Event('dblclick', {
    bubbles: true
  }))
}

function removeCur() {
  // Remove selected class from current
  cur.classList.remove('selected')
  // Make current uneditable
  cur.contentEditable = false
}

document.addEventListener('click', onClick)

function onClick(e) {
  if (e.target.className !== 'header' && e.target.className === 'cell') {
    removeCur()
    e.target.classList.add('selected')
    updateCur()
  }
}

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  switch (e.keyCode) {
    case 38:
      upKey(e)
      break;
    case 40:
      downKey(e)
      break;
    case 37:
      leftKey(e)
      break;
    case 39:
      rightKey(e)
      break;
  }
}

function arrows(e) {
  removeCur()
  document.getElementById(e).classList.add('selected')
  updateCur()
}

function upKey(e) {
  // Check edge case, by row number
  if (parseInt(cur.getAttribute('row')) > 1) {
    let upRow = `${cur.getAttribute('col')}${parseInt(cur.getAttribute('row'))-1}`
    arrows(upRow)
  }
}

function downKey(e) {
  // Check for not bottom row
  if (parseInt(cur.getAttribute('row')) < rows - 1) {
    let downRow = `${cur.getAttribute('col')}${parseInt(cur.getAttribute('row'))+1}`
    arrows(downRow)
  }
}

function leftKey(e) {
  // Check for col1 +
  let colIndex = alpha.indexOf(cur.getAttribute('col'))
  if (colIndex > 0) {
    let leftCol = `${alpha[colIndex-1]}${cur.getAttribute('row')}`
    arrows(leftCol)
  }
}

function rightKey(e) {
  // Check for last col
  let colIndex = alpha.indexOf(cur.getAttribute('col'))
  if (colIndex < cols - 2) {
    let rightCol = `${alpha[colIndex+1]}${cur.getAttribute('row')}`
    arrows(rightCol)
  }
}
