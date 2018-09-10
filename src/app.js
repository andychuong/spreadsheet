const body = document.body
let alphaStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
let alpha = alphaStr.split('')
let firstSel = false
let rows = 31
let cols = 27
let cur

let createTable = () => {
  let grid = document.createElement('table')
  grid.id = "spreadsheet"
  // grid.style.width = '100%'
  // grid.setAttribute('border', '1')
  // var tbdy = document.createElement('tbody');
  let thead = document.createElement('thead')
  grid.appendChild(thead)
  let tbody = document.createElement('tbody')
  for (let i = 0; i < rows; i++) { // Rows
      let tr = document.createElement('tr')
      for (let j = 0; j < cols; j++) { // Cols
        let td = document.createElement('td')
        // Add class 'cell'
        td.classList.add('cell')
        if(i === 0 && j === 0){
          td.classList.add('header')
        }
        // Add class 'header' fill values
        if (i === 0 && j !== 0){
          td.innerText = alpha[j-1]
          td.classList.add('header')
          td.id = alpha[j-1]
        }
        if (j === 0 && i > 0){
          td.innerText = i
          td.classList.add('header')
          td.id = i
        }
        // Add ids and custom attributes
        if(j !== 0 && i !== 0){
          td.id = `${alpha[j-1]}${i}`
          td.setAttribute('row', i)
          td.setAttribute('col',alpha[j-1])
          if(td.id === "A1"){
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

document.addEventListener('click', onClick)

function onClick(e) {
  if (e.target.className !== 'header' && e.target.className === 'cell'){
    cur.classList.remove('selected')
    e.target.classList.add('selected')
    cur = document.getElementsByClassName('selected')[0]
  }
}

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    console.log(cur.id)
    let colIndex = alpha.indexOf(cur.getAttribute('col'))
    if (e.keyCode == '38') {
      // up arrow
      if(parseInt(cur.getAttribute('row'))>1){
        let upCol = `${cur.getAttribute('col')}${parseInt(cur.getAttribute('row'))-1}`
        console.log(upCol)
        document.getElementsByClassName('selected')[0].classList.remove('selected')
        document.getElementById(upCol).classList.add('selected')
        cur = document.getElementsByClassName('selected')[0]
      }
    }
    else if (e.keyCode == '40') {
        // down arrow
        if(parseInt(cur.getAttribute('row'))<rows-1){
          let downCol = `${cur.getAttribute('col')}${parseInt(cur.getAttribute('row'))+1}`
          document.getElementsByClassName('selected')[0].classList.remove('selected')
          document.getElementById(downCol).classList.add('selected')
          cur = document.getElementsByClassName('selected')[0]
        }
    }
    else if (e.keyCode == '37') {
       // left arrow
       if(colIndex> 0){
         let leftCol = `${alpha[colIndex-1]}${cur.getAttribute('row')}`
         document.getElementsByClassName('selected')[0].classList.remove('selected')
         document.getElementById(leftCol).classList.add('selected')
         cur = document.getElementsByClassName('selected')[0]
       }
    }
    else if (e.keyCode == '39') {
       // right arrow
       if(colIndex < cols -2){
         let rightCol = `${alpha[colIndex+1]}${cur.getAttribute('row')}`
         document.getElementsByClassName('selected')[0].classList.remove('selected')
         document.getElementById(rightCol).classList.add('selected')
         cur = document.getElementsByClassName('selected')[0]
       }
    }
}
