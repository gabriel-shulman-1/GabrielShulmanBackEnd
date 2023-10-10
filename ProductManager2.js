const fs = require('fs');

class ProductManager{
    constructor(path) {
        this.path = path;
    }
    
    async create(data){
        const { title,description,price, Thumbnail, code, stock } = data
          if(!title||!description||!price||!Thumbnail||!code||!stock) {
              throw new Error("There are fields that are not complete")
            }
        
        const Product = await getJsonFromFile(this.path);
        
        const newProduct = {
            id: Date.now(),
            title,
            description,
            price,
            Thumbnail,
            code,
            stock,
        }
        Product.push(newProduct)
        
        await saveJsonInFile(this.path, Product);
        console.log('El producto se agrego correctamente');
        
    }
    
    get() {
        return getJsonFromFile(this.path);
      }

    async update(id, data) {
        const { title,description,price, Thumbnail, code, stock } = data;
        const products = await getJsonFromFile(this.path);
        const position = products.findIndex((u) => u.id === id);

        if (position === -1) {
          throw new Error('Producto no encontrado');
        }
        if (title) {
            products[position].title = title;
        }
        if (description) {
            products[position].description = description;
        }

        if (price) {
            products[position].price = price;
        }
        if (Thumbnail) {
            products[position].Thumbnail = Thumbnail;
        }
        if (code) {
            products[position].code = code;
        }
        if (stock) {
            products[position].stock = stock;
        }
        
        await saveJsonInFile(this.path, products);
        console.log('Usuario actualido con exito 😎');
      }

    async removeProductById(id){
        let products = await getJsonFromFile(this.path);
        let position = products.findIndex((u) => u.id === id);

        if (position !== -1) {
            products.splice(position, 1);
            console.log("Producto eliminado")
            saveJsonInFile(this.path, products);
            console.log(`Product id ${id} deleted! 😎`)
        } else {
              throw new Error('Producto no encontrado');
          }
    }

      
}

const getJsonFromFile = async (path) => {
    if (!fs.existsSync(path)) {
      return [];
    }
    const content = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(content);
};
const saveJsonInFile = (path, data) => {
    const content = JSON.stringify(data, null, '\t');
    return fs.promises.writeFile(path, content, 'utf-8');
}

async function test() {

    const productManager1 = new ProductManager('./Products.json');
    const data1 = {
        title: "manzanas",
        description: "frutas",
        price: 2,
        Thumbnail: "imagen",
        code: "fruta1",
        stock: 25
    };
    const data2 = {
        title: "peras",
        description: "frutas",
        price: 2,
        Thumbnail: "imagen",
        code: "fruta1",
        stock: 25
    };
    const data3 = {
        title: "frutillas",
        description: "frutas",
        price: 2,
        Thumbnail: "imagen",
        code: "fruta1",
        stock: 25
    };
    const data4 = {
        title: "vacio",
        description: "carnes",
        price: 4,
        Thumbnail: "imagen",
        code: "fruta1",
        stock: 25
    };
    const data5 = {
        title: "muslo",
        description: "carnes",
        price: 4,
        Thumbnail: "imagen",
        code: "fruta1",
        stock: 25
    };

    //await productManager1.create(data1);
    //await productManager1.create(data2);
    //await productManager1.create(data3);
    //await productManager1.create(data4);
    //await productManager1.create(data5);
    //console.log(await productManager1.get());

    //await productManager1.update(1696895448695, { price: 10 });
    //console.log(await productManager1.get());

    await productManager1.removeProductById(1696895739589)
    console.log(await productManager1.get());
  }

  test()