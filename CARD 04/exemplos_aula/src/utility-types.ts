interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
}

// Pick: seleciona só os campos necessários
type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>;

// Omit: tudo menos o id (que é gerado depois)
type ProductInput = Omit<Product, 'id'>;

// Partial: todos os campos viram opcionais (útil para updates)
type ProductPatch = Partial<ProductInput>;

// Record: dicionário indexado por chave
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
