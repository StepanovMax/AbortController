import axios, { GenericAbortSignal } from 'axios';
import { ItemsFilter } from '@server/product/product.service';
import { ProductController, ItemsList } from '@server/product/product.controller';
import { Product } from '@server/product/products.database';

const instance = axios.create({
    baseURL: '/api',
});

const getItem = (itemId: string): Promise<Product> => {
    //!todo type
    return instance
        .get<ReturnType<ProductController['getItem']>>(`/product/${itemId}`)
        .then(response => response.data)
        .then(product => {
            if (!product) {
                throw new Error('Товар не найден.');
            }
            return product;
        });
};

const getList = (filter?: ItemsFilter): Promise<ItemsList> => {
    return instance
        .get<ReturnType<ProductController['getList']>>(`/product`, {
            params: filter,
        })
        .then(response => response.data);
};

const Api = {
    Product: {
        getItem,
        getList,
    },
};

const summ = (a: number, b: number) => {
    return '' + a + b;
};


export default () => ({
    Api,
});
