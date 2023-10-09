const fs = require('fs');

class ProductManager{

    constructor(path) {
        this.path = path;
      }

    getProducts() {
        return this.products
    }

    addProduct (title,description,price, Thumbnail, code, stock){
        if(!title||!description||!price||!Thumbnail||!code||!stock) {
            console.error("There are fields that are not complete")
            return
        }
        
        const newProduct = {
            id: 1,
            title,
            description,
            price,
            Thumbnail,
            code,
            stock,
        }
        
        this.products.push(newProduct)
        console.log("Product added")
    }

    getProductById(id){
        for (let index = 0; index < this.products.length; index++) {
            if(id===this.products[index].id){
                console.log("Product with id " + id + " founded." )
                return this.products[index]
            }
        }
        return(
            console.log("The product with the id " + id + " was not found.")
        )
    }
    
}

const productManager = new ProductManager()
productManager.addProduct(
    "Producto de prueba",
    "Esto es un producto de prueba",
    200,
    "Sin imagen",
    "abc123",
    25
)
productManager.addProduct(
    "Producto de prueba 2",
    "Esto es un producto de prueba 2",
    200,
    "Sin imagen",
    "abc124",
    26
)
productManager.addProduct(
    "Producto de prueba 3",
    "Esto es un producto de prueba 3",
    200,
    "Sin imagen",
    "abc125",
    26
)
productManager.addProduct(
    "Producto de prueba 3",
    "Esto es un producto de prueba 3",
    200,
    "Sin imagen",
    "abc125",
    26
)
console.log("get products: ", productManager.getProducts())
console.log(productManager.getProductById(4))