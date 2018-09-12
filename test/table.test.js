describe("createTable", function () {

  it("creates a table with a thead", function () {
    let table = createTable()
    expect(table.querySelectorAll('thead').length).to.eq(1)
  })

  it("table has 27 columns", function () {
    let table = createTable()
    expect(table.rows[0].cells.length).to.eq(27)
  })

  it("table has 31 rows", function () {
    let table = createTable()
    expect(table.getElementsByTagName("tr").length).to.eq(31)
  })

  // This nested describe tells other developers that you are about
 // to test a number of things related to a single part of the application.
 //
 // In this case you are testing all the functionality around selecting cells
 describe("selecting cells", function () {

   // In each test you need a clean version of the table
   // so you need to add a new container DIV before each test,
   // and then add the table to that container
   //
   // This line just declares those variables in a way that tests can access them
   let table, container

   beforeEach(function () {
     document.body.insertAdjacentHTML('afterbegin', `<div id="container">`);
     container = document.getElementById('container')
     table = createTable()
     container.appendChild(table)
   })

   afterEach(function () {
     document.body.removeChild(container);
   })

   it("allows users to select a cell by clicking on it", function () {

     // For the setup in this test, find any cell other than A1
     let tbody = table.querySelector('tbody')
     let rows = tbody.querySelectorAll('tr')
     let A3 = rows[3].children[1]
     // let A3 = document.getElementById('A3')

     // Simulate clicking on the cell
     A3.dispatchEvent(new Event('click', {bubbles: true}))

     // Check to make sure that the A3 cell has been selected
     expect(A3.classList.contains('selected')).to.eq(true)
     // expect(A3.id).to.eq(true)
     // Check to make sure that the A1 cell is no longer selected
     expect(rows[1].children[1].classList.contains('selected')).to.eq(false)
   })

   it("allows users to select a cell by using arrow keys", function () {

     // For the setup in this test, find any cell other than A1
     let tbody = table.querySelector('tbody')
     let rows = tbody.querySelectorAll('tr')
     let A2 = rows[2].children[1]

     // Simulate clicking key down
     let event = new KeyboardEvent('keydown', {bubbles: true, keyCode: '40'})
     document.dispatchEvent(event)

     // Check to make sure that the A3 cell has been selected
     expect(A2.classList.contains('selected')).to.eq(true)
     // expect(A3.id).to.eq(true)
     // Check to make sure that the A1 cell is no longer selected
     expect(rows[1].children[1].classList.contains('selected')).to.eq(false)
   })
 })
})
