let products = [];// Array vacío que contiene los productos
let id = 0;// Variable que genera un id único para cada producto

// Reinicia la lista de productos y el contador de IDs
function resetProducts() {
    products = [];
    id = 0;
}

// Añadir un producto
function addProduct(name, price) {
    if (!name || !price) {//  evalúa si alguno de estos valores es "falso" 
        throw new Error('The name and price must be defined');
    }
    const existingProduct = products.find(product => product.name === name); // Verificar si ya existe un producto con el mismo nombre
    if (existingProduct) {
        throw new Error('The product already exists');// Lanza mensaje de error si el producto exitste
    }
    id++;//Si no hay errores hasta este punto, se procede a asignar un nuevo id al producto.
    products.push({ id, name, price });//Se agrega el nuevo producto a products.
}

// Eliminar un producto por su id
function removeProduct(productId) {// El ID del producto que se desea eliminar
    const index = products.findIndex(product => product.id === productId);// Se busca el índice del producto cuyo id coincida con productId.
    if (index === -1) {//Si el producto no existe (el índice es -1), lanza un mensaje de error
        throw new Error('Product not found');
    }
    products.splice(index, 1);//Si el producto existe, se usa splice para eliminar el producto del array products en el índice encontrado.
}

// Retorna array de products
function getProducts() {
    return products;
}

// Obtener un producto por su id
function getProduct(productId) {// Id del producto que se desea obtener.
    const product = products.find(product => product.id === productId);// find para buscar el producto cuyo id sea igual a productId
    if (!product) {// Si no encuentra el producto, lanza un mensaje de error
        throw new Error('The product does not exist');
    }
    return product;// Si lo encuentra, devuelve el producto.
}

// Actualizar un producto por su id
function updateProduct(productId, name, price) {
    const product = getProduct(productId); //Verifica que el producto existe. Si no existe, lanza un error
    if (name) product.name = name;// Si el parámetro name es válido (no es nulo), actualiza el nombre del producto
    if (price) product.price = price;//Si el parámetro price es válido, actualiza el precio del producto
}

module.exports = { 
    resetProducts,  
    addProduct, 
    removeProduct, 
    getProducts, 
    getProduct, 
    updateProduct
}