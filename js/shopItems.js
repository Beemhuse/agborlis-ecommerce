// document.addEventListener('DOMContentLoaded', () => {
//   // Fetch and display all products
//   showShopItems(databaseRef, 'products');

//   // Fetch and display products for each category
//   showShopItems(databaseRef, 'tablets', { byChild: true, child: 'category', equalTo: 'tablets' });
//   showShopItems(databaseRef, 'phones', { byChild: true, child: 'category', equalTo: 'phones' });
//   showShopItems(databaseRef, 'laptops', { byChild: true, child: 'category', equalTo: 'laptops' });
//   showShopItems(databaseRef, 'gaming', { byChild: true, child: 'category', equalTo: 'gaming' });
//   showShopItems(databaseRef, 'cameras', { byChild: true, child: 'category', equalTo: 'cameras' });
// });

document.addEventListener('DOMContentLoaded', function () {
  const productsRoot = document.getElementById('products');
  showShopItems(databaseRef, productsRoot);
});
//root products
function showShopItemsMain(databaseRef, root, filter, categoryName) {
  // Clear the root element before populating it with new items
  root.innerHTML = '';

  // Create a row to contain the shop items
  const row = createRow(root, true);
  showShopItems(databaseRef, root, filter)
  // Query the database based on the filter
  let query = databaseRef.ref('products');
  console.log(query)
  if (filter && filter.byChild && filter.child && filter.equalTo) {
    query = query.orderByChild(filter.child).equalTo(filter.equalTo);
  }

  query.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      const productObj = {
        key: childSnapshot.key,
        val: function () {
          return childSnapshot.val();
        },
      };
      buildProduct(productObj, row);
    });
  });
}
const products = document.getElementById('products');

let shopItems = {


}



// function showShopItems(refDB, mainRoot, filter = !null){
// //get products from the database
// let counter = 0;
// console.log(mainRoot)
// let rootRow = createRow(mainRoot, true);

// //build the rows and colums
// let DBref = refDB.ref('products');

// if(filter){

// if(filter.byChild){

//   DBref = DBref.orderByChild(filter.child);

//    if(filter.range){
//        DBref = DBref.startAt(filter.range.startAt).endAt(filter.range.endAt);
//    }
//    if(filter.equalTo){
//       DBref = DBref.equalTo(filter.equalTo);
//    }
// }

// if(filter.limitToFirst){
//   DBref = DBref.limitToFirst(filter.limitToFirst.limit);
// }

// }

// console.log(mainRoot)


// DBref.on('child_added', snap => {

//   if(counter < 4){
//     buildProduct(snap, rootRow);
//     counter++;
//   }else {
//     rootRow = createRow(mainRoot, true);
//     buildProduct(snap, rootRow);
//     counter -= 3;
//   }
// });

// }


function showShopItems(databaseRef, root) {
  databaseRef.ref('products').on('value', function (snapshot) {
    root.innerHTML = ''; // Clear the root element before appending products

    snapshot.forEach(function (childSnapshot) {
      let productObj = childSnapshot;

      // Create rows to group the products
      let row = createRow(root, true);

      // Build each product and append it to the row
      buildProduct(productObj, row);
    });
  });
}
// By adding root.innerHTML = ''; at the beginning of the showShopItems function, you ensure that the root element is cleared before appending the products. This should prevent the "Cannot read properties of null" error.

// If the error persists, please double-check that the root element exists and has the correct ID or class name specified in your HTML file. Additionally, make sure that you have correctly initialized Firebase and have the appropriate data in your Firebase Realtime Database.












function buildButton(root, parameter){
  let col = document.createElement('div');
  col.classList.add('col-sm-3');

  let btn = document.createElement('a');
  btn.classList.add('btn');
  btn.classList.add('btn-comment');
  btn.classList.add('btn-block');
  btnTextNode = document.createTextNode('See More');
  btn.appendChild(btnTextNode);
  btn.href = `index.html?c=${parameter}`;

  col.appendChild(btn);

  root.appendChild(col);
}

function setLabelCategory(root, label){
  let h3 = document.createElement('h3');
  let h3TextNode = document.createTextNode(label.toUpperCase());
  h3.style ='padding:10px';
  h3.appendChild(h3TextNode);
  root.appendChild(h3);
}



// shopItems.js
