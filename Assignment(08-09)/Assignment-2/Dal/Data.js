class DataAccess {
    #products = [];
    #Users = new Map();
    constructor() {
        this.#products = [
            {
                ProductId: "Prd-001",
                ProductName: "Laptop",
                CategoryName: "Electronics",
                Manufacturer: "IBM",
                Description: "Gaming",
                Price: 123000,
            },
            {
                ProductId: "Prd-002",
                ProductName: "Iron",
                CategoryName: "Electrical",
                Manufacturer: "Bajaj",
                Description: "Power Press",
                Price: 3000,
            },
        ];

        this.#Users.set('Arun', 'arun@parmar');
        this.#Users.set('Nayan', 'nayan@rajani');
        this.#Users.set('Rahul', 'rahul@pal');
    }

    getProducts() {
        return this.#products;
    }

    getProductsById(id) {
        let product = this.#products.find(p => p.ProductId === id);
        return product;
    }

    createProduct(product) {
        this.#products.push(product);
        return this.#products;
    }

    updateProduct(id, product) {
        let res = this.#products.filter((p, i) => {
            return p.ProductId === id;
        });
        if (res.length === 0)
            return 0;

        else {
            res[0].ProductId = product.ProductId;
            res[0].ProductName = product.ProductName;
            res[0].CategoryName = product.CategoryName;
            res[0].Manufacturer = product.Manufacturer;
            res[0].Description = product.Description;
            res[0].Price = product.Price;

            return this.#products;
        }
    }

    deleteProduct(id) {
        let flag = 0;
        for (let i = 0; i < this.#products.length; i++) {
            if (id === this.#products[i].ProductId) {
                flag = 1;
                this.#products.splice(i, 1);
            }
        }
        if (flag === 0)
            return 0;

        else
            return this.#products;

    }

    getUser() {
        return this.#Users;
    }
}

module.exports = DataAccess;
