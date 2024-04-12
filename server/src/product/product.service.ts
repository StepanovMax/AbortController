import { Injectable } from '@nestjs/common';
import { productsDatabase, Product } from './products.database';

export interface ItemsFilter {
    searchString?: string;
    offset?: number;
}

export const delay = (ms: number) => {
    return new Promise(r => setTimeout(r, ms));
};

export const randomBetween = (min: number, max: number, round?: true) => {
    let random = Math.random() * (max - min) + min;
    return round ? Math.round(random) : random;
};

@Injectable()
export class ProductService {
    async getList(filter?: ItemsFilter): Promise<{
        items: Product[],
        total: number
    }> {

        const filteredProducts = productsDatabase.filter(product => {
            if (!filter?.searchString) {
                return true;
            }
            return product.name.toLocaleLowerCase().includes(filter.searchString.toLocaleLowerCase());
        });

        const filteredProductsLength = filteredProducts.length;

        const slicedfilteredProducts = filteredProducts.slice(filter?.offset, (filter?.offset || 0) + 10);

        //!todo filter works
        await delay(randomBetween(1000, 3000));

        return {
            items: slicedfilteredProducts,
            total: filteredProductsLength,
        };
    }

    async getItem(itemId: string): Promise<Product | undefined> {
        await delay(randomBetween(100, 500));
        return productsDatabase.find(x => x.id === itemId);
    }
}
