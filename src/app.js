document.addEventListener('DOMContentLoaded', function(event) {
  // Define Body
  const body = document.body
  var alphaStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";;
  var alpha = alphaStr.split('');
  // Create table
  let createGrid = () => {
    let grid = document.createElement('table')

  }
  function tableCreate() {
    let body = document.getElementsByTagName('body')[0];
    let tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    // var tbdy = document.createElement('tbody');
    for (let i = 0; i < 21; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < 27; j++) {
          let td = document.createElement('td')
          if (i === 0 && j !== 0){
            td.innerText = alpha[j-1]
          }
          if (j === 0 && i > 0){
            td.innerText = i
          }
          tr.appendChild(td)
        }
        tbl.appendChild(tr);
    }
    body.appendChild(tbl)
  }
  tableCreate()
})
