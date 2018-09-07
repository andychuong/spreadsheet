document.addEventListener('DOMContentLoaded', function(event) {
  // Define Body
  const body = document.body
  let alphaStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let alpha = alphaStr.split('')
  let firstSel = false
  // Create grid
  let createGrid = () => {
    let grid = document.createElement('table')
    grid.id = "mainGrid"
    // grid.style.width = '100%'
    // grid.setAttribute('border', '1')
    // var tbdy = document.createElement('tbody');
    for (let i = 0; i < 50; i++) {
        let tr = document.createElement('tr')
        for (let j = 0; j < 40; j++) {
          let td = document.createElement('td')
          td.classList.add('cell')
          if(i === 0 && j === 0){
            td.classList.add('header')
          }
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
          if(j !== 0 && i !== 0){
            td.id = `${alpha[j-1]}${i}`
            td.setAttribute('row', i)
            td.setAttribute('col',alpha[j-1])
          }
          tr.appendChild(td)
        }
        grid.appendChild(tr);
    }
    body.appendChild(grid)
  }
  createGrid()
  // Add click to select cell
  if(!firstSel){
    document.getElementById('A1').classList.add('selected')
    firstSel = true
  }
  let cur = document.getElementsByClassName('selected')[0]
  document.addEventListener('click', (e) => {
    let theGrid = document.getElementById('mainGrid')
    if (e.target.className !== 'header' && e.target.className === 'cell'){
      // e.target.focus()
      document.getElementsByClassName('selected')[0].classList.remove('selected')
      e.target.classList.add('selected')
      // e.target.style.backgroundColor = "black"
      cur = document.getElementsByClassName('selected')[0]
    }
  })

  // Arrow Keys
  document.onkeydown = checkKey;

  function checkKey(e) {
      e = e || window.event;
      console.log(cur.id)
      if (e.keyCode == '38') {
        // up arrow
        let upCol = `${cur.getAttribute('col')}${parseInt(cur.getAttribute('row'))-1}`
        console.log(upCol)
        document.getElementsByClassName('selected')[0].classList.remove('selected')
        document.getElementById(upCol).classList.add('selected')
        cur = document.getElementsByClassName('selected')[0]
      }
      else if (e.keyCode == '40') {
          // down arrow
      }
      else if (e.keyCode == '37') {
         // left arrow
      }
      else if (e.keyCode == '39') {
         // right arrow
      }

  }
})
