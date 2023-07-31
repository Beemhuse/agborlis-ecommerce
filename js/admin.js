// Function to handle form submission
document.getElementById('newProductForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get form values
  
    // Perform validation on form fields if needed
  
    
    const user = firebase.auth().currentUser;
    if (user) {
      user.getIdToken().then(token => {
        // Use the token to upload the image
        uploadImageToStorage(token);
      });
    }
    // Upload the product image to Firebase Storage
   });
  
  // function uploadImageToStorage(token) {
  //   // ... (rest of your code)
  //   const provider = document.getElementById('provider').value;
  //   const productImageFile = document.getElementById('productImage').files[0];
  // const header = document.getElementById('header').value;
  // const description = document.getElementById('description').value;
  // const large_description = document.getElementById('large_description').value;
  // const category = document.getElementById('category').value;
  // const stars = parseFloat(document.getElementById('stars').value);
  // const price = parseFloat(document.getElementById('price').value);


  // // Create a new product object
  // const productData = {
  //   provider: provider,
  //   photo: productImageFile,
  //   title: header,
  //   description: description,
  //   large_description: large_description,
  //   category: category,
  //   stars: stars,
  //   price: price
  // };
  //   // Upload the product image to Firebase Storage
  //   if (productImageFile) {
  //     const storageRef = firebase.storage().ref();
  //     const imageRef = storageRef.child(`product_images/${productImageFile.name}`);
      
  //     // Set the custom token for the request to authenticate the user
  //     const metadata = {
  //       customMetadata: {
  //         authToken: token
  //       }
  //     };
      
  //     imageRef.put(productImageFile, metadata)
  //       .then(snapshot => snapshot.ref.getDownloadURL())
  //       .then(imageUrl => {
  //         newProduct.image = imageUrl;
  //         // Once the image is uploaded, you can save the product details to the database
  //         saveProductToDatabase(newProduct);
  //       })
  //       .catch(error => {
  //         console.error('Error uploading image:', error);
  //         alert('Error uploading image. Please try again.');
  //       });
  //   } else {
  //     // If no image is selected, save the product details to the database without an image
  //     saveProductToDatabase(productData);
  //   }
  // }
  


  // Function to save the product details to the database
  
  async function uploadImageToStorage(token) {
    const provider = document.getElementById('provider').value;
    const productImageFile = document.getElementById('productImage').files[0];
    const header = document.getElementById('header').value;
    const description = document.getElementById('description').value;
    const large_description = document.getElementById('large_description').value;
    const category = document.getElementById('category').value;
    const stars = parseFloat(document.getElementById('stars').value);
    const price = parseFloat(document.getElementById('price').value);
  
    // Create a new product object
    const productData = {
      provider: provider,
      photo: productImageFile,
      title: header,
      description: description,
      large_description: large_description,
      category: category,
      stars: stars,
      price: price
    };
  
    // Upload the product image to Firebase Storage
    if (productImageFile) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`product_images/${productImageFile.name}`);
      
      // Set the custom token for the request to authenticate the user
      const metadata = {
        customMetadata: {
          authToken: token
        }
      };
  
      try {
        const snapshot = await imageRef.put(productImageFile, metadata);
        const imageUrl = await snapshot.ref.getDownloadURL();
        productData.photo = imageUrl;
        // Once the image is uploaded, you can save the product details to the database
        saveProductToDatabase(productData);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      }
    } else {
      // If no image is selected, save the product details to the database without an image
      saveProductToDatabase(productData);
    }
  }
  
  
  function saveProductToDatabase(product) {
    // Here, you can add your logic to save the product object to the database.
    // For example, using Firebase Realtime Database, you can do the following:
    const database = firebase.database();
    const productsRef = database.ref('products');
    productsRef.push(product)
      .then(() => {
        alert('Product added successfully!');
        // Reset the form after successful product creation
        document.getElementById('newProductForm').reset();
      })
      .catch(error => {
        console.error('Error creating product:', error);
        alert('Error creating product. Please try again.');
      });
  }
  