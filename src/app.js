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
          }
          tr.appendChild(td)
        }
        grid.appendChild(tr);
    }
    body.appendChild(grid)
  }
  createGrid()
  // Add click to select cell
  document.addEventListener('click', (e) => {
    let theGrid = document.getElementById('mainGrid')
    if (e.target.className !== 'header' && e.target.className === 'cell'){
      // e.target.focus()
      if(!firstSel){
        e.target.classList.add('selected')
        firstSel = true
      } else {
        document.getElementsByClassName('selected')[0].classList.remove('selected')
        e.target.classList.add('selected')
      }
      // e.target.style.backgroundColor = "black"

    }
  })
})
