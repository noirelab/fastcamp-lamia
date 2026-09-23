interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
}

// Pick: pega campos
type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>;

// Omit: tudo menos o id
type ProductInput = Omit<Product, 'id'>;

// Partial: tudo opcional
type ProductPatch = Partial<ProductInput>;

// Record: dicionário
type ProductCatalog = Record<string, ProductSummary>;

const input: ProductInput = {
  name: 'Teclado',
  price: 150,
  description: 'Teclado mecânico ABNT2',
  stock: 10,
};

const patch: ProductPatch = { price: 139.9, stock: 8 };

const catalog: ProductCatalog = {
  '1': {
    id: '1',
    name: input.name,
    price: patch.price ?? input.price,
  },
};

console.log({ input, patch, catalog });
