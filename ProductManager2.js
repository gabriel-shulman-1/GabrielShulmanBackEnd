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
        console.log('El producto se agrego correctamente 😎');
        
    }
    
    get() {
        return getJsonFromFile(this.path);
      }

    async update(id, data) {
        const { title,description,price, Thumbnail, code, stock } = data;
        const products = await getJsonFromFile(this.path);
        const position = products.findIndex((u) => u.id === id);

        if (position === -1) {
          throw new Error('Usuario no encontrado 😨');
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

    const productManager = new ProductManager('./Products.json');
    const data = {
        title: "manzanas",
        description: "frutas",
        price: 2,
        Thumbnail: "imagen",
        code: "fruta1",
        stock: 25
    };

    await productManager.create(data);
    console.log(await productManager.get());

    await productManager.update(1696878347063, { stock: 80 });
    console.log(await productManager.get());
  }

  test()