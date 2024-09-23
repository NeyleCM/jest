const { resetProducts,  addProduct, removeProduct, getProducts, getProduct, updateProduct} = require('./product');

// Reiniciar lista de productos antes de cada test
beforeEach(() => {
    resetProducts();
});

describe('Gestión de productos', () => {

    describe('Añadir productos', () => {
        // Test para añadir un producto
        it('Must add a product', () => {
            addProduct('Laptop', 1000); // Se añade un producto con nombre 'Laptop' y precio 1000
            const products = getProducts(); // Obtenemos la lista de productos
            // Verificaciones
            expect(products).toHaveLength(1); // Verificamos que la longitud de la lista de productos es 1
            expect(products[0].name).toBe('Laptop'); // Verificamos que el nombre del primer producto es 'Laptop'
            expect(products[0].price).toBe(1000); // Verificamos que el precio del primer producto es 1000
        });

        // Test para fallo al añadir un producto sin nombre
        it('Should fail when adding an unnamed product', () => {
            expect(() => addProduct(undefined, 1000)).toThrow('The name and price must be defined');
        });

        // Test para fallo al añadir un producto sin precio
        it('Should fail when adding a product without a price', () => {
            expect(() => addProduct('Laptop')).toThrow('The name and price must be defined');
        });

        // Test para fallo al añadir un producto duplicado
        it('Should fail when adding a duplicate product', () => {
            addProduct('Laptop', 1000);
            expect(() => addProduct('Laptop', 1000)).toThrow('The product already exists');
        });
    });

    describe('Eliminar productos', () => {
        // Test para eliminar un producto
        it('Must remove a product', () => {
            addProduct('Laptop', 1000); // Añadimos un producto
            removeProduct(1); // Eliminamos el producto con id 1
            const products = getProducts(); // Obtenemos la lista actualizada de productos
            expect(products).toHaveLength(0); // Verifica que la lista de productos debería estar vacía después de eliminar
        });
    });

    describe('Obtener productos', () => {
        // Test para obtener un producto por ID
        it('Must return a product for id', () => {
            addProduct('Laptop', 1000); // Añadimos un producto
            const product = getProduct(1); // Obtenemos el producto con id 1
            expect(product.name).toBe('Laptop'); // Verifica que el nombre del producto debería ser 'Laptop'
        });
    });

    describe('Actualizar productos', () => {
        // Test para actualizar un producto por ID
        it('Must update a product by its id', () => {
            addProduct('Laptop', 1000); // Añadimos un producto
            updateProduct(1, 'Laptop Gaming', 1200); // Actualizamos el producto con id 1
            const product = getProduct(1); // Obtenemos el producto actualizado
            // Verificaciones
            expect(product.name).toBe('Laptop Gaming'); // El nombre debería haberse actualizado a 'Laptop Gaming'
            expect(product.price).toBe(1200); // El precio debería haberse actualizado a 1200
        });

        // Test para fallo al actualizar un producto que no existe
        it('should fail when updating a product that does not exist', () => {
            expect(() => updateProduct(999, 'Nuevo Producto', 2000)).toThrow('The product does not exist');
        });

        // Test para actualizar solo el nombre del producto
        it('Should update only the product name', () => {
            addProduct('Laptop', 1000);
            updateProduct(1, 'Laptop Gaming'); // Solo actualiza el nombre
            const product = getProduct(1);
            expect(product.name).toBe('Laptop Gaming'); // Verifica el nombre actualizado
            expect(product.price).toBe(1000); // El precio debe permanecer igual
        });

        // Test para actualizar solo el precio del producto
        it('Should update only the product price', () => {
            addProduct('Laptop', 1000);
            updateProduct(1, undefined, 1200); // Solo actualiza el precio
            const product = getProduct(1);
            expect(product.name).toBe('Laptop'); // El nombre debe permanecer igual
            expect(product.price).toBe(1200); // Verifica el precio actualizado
        });
    });

});

/*
describe('Gestión de productos', () => {

//Test para añadir un producto, verifica si la función addProduct agrega correctamente un producto a la lista de productos
it('Must add a product', () => {
    addProduct('Laptop', 1000); // Se añade un producto con nombre 'Laptop' y precio 1000
    const products = getProducts(); // Obtenemos la lista de productos
    // Verificaciones
    expect(products).toHaveLength(1); // Verificamos que la longitud de la lista de productos es 1
    expect(products[0].name).toBe('Laptop'); // Verificamos que el nombre del primer producto es 'Laptop'
    expect(products[0].price).toBe(1000); // Verificamos que el precio del primer producto es 1000
});

//Test para eliminar un producto, verifica si la función removeProduct elimina correctamente un producto por su ID
it('Must remove a product', () => {
    addProduct('Laptop', 1000); // Añadimos un producto
    removeProduct(1); // Eliminamos el producto con id 1
    const products = getProducts(); // Obtenemos la lista actualizada de productos
    expect(products).toHaveLength(0); // Verifica que la lista de productos debería estar vacía después de eliminar
});

//Test para obtener un producto por id, verifica si la función getProduct devuelve correctamente un producto por su ID
it('Must return a product for id', () => {
    addProduct('Laptop', 1000); // Añadimos un producto
    const product = getProduct(1); // Obtenemos el producto con id 1
    expect(product.name).toBe('Laptop'); // Verifica que el nombre del producto debería ser 'Laptop'
});

// Test para actualizar un producto
it('Must update a product by its id', () => {
    addProduct('Laptop', 1000); // Añadimos un producto
    updateProduct(1, 'Laptop Gaming', 1200); // Actualizamos el producto con id 1
    const product = getProduct(1); // Obtenemos el producto actualizado
    // Verificaciones
    expect(product.name).toBe('Laptop Gaming'); // El nombre debería haberse actualizado a 'Laptop Gaming'
    expect(product.price).toBe(1200); // El precio debería haberse actualizado a 1200
    });

    it('Should fail when adding an unnamed product', () => {//debería fallar al agregar un producto sin nombre
        expect(() => addProduct(undefined, 1000)).toThrow('The name and price must be defined');
    });

    it('Should fail when adding a product without a price', () => {//debería fallar al agregar un producto sin precio
        expect(() => addProduct('Laptop')).toThrow('The name and price must be defined');
    });

    it('Should fail when adding a duplicate product', () => {//debería fallar al agregar un producto duplicado
        addProduct('Laptop', 1000);
        expect(() => addProduct('Laptop', 1000)).toThrow('The product already exists');
    });

    it('should fail when updating a product that does not exist', () => {//debería fallar al actualizar un producto que no existe
        expect(() => updateProduct(999, 'Nuevo Producto', 2000)).toThrow('The product does not exist');
    });

    it('Should update only the product name', () => {//debería actualizar solo el nombre del producto
        addProduct('Laptop', 1000);
        updateProduct(1, 'Laptop Gaming');
        const product = getProduct(1);
        expect(product.name).toBe('Laptop Gaming');
        expect(product.price).toBe(1000);
    });

    it('Should update only the product price', () => {//debería actualizar solo el precio del producto
        addProduct('Laptop', 1000);
        updateProduct(1, undefined, 1200);
        const product = getProduct(1);
        expect(product.name).toBe('Laptop');
        expect(product.price).toBe(1200);
    });
});
*/