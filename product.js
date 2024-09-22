let products = [];
let id = 0;

// Reinicia la lista de productos
function resetProducts() {
    products = [];
    id = 0;
}

// Añadir un producto
function addProduct(name, price) {
    if (!name || !price) {
        throw new Error('The name and price must be defined');
    }
    id++;
    products.push({ id, name, price });
}


module.exports = { 
    resetProducts,  
    addProduct, 
    removeProduct, 
    getProducts, 
    getProduct, 
    updateProduct
}