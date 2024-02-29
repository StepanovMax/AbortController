import axios from 'axios';
import { ItemsFilter } from '@server/product/product.service';
import { ProductController, ItemsList } from '@server/product/product.controller';

const instance = axios.create({
    baseURL: '/api',
});

const getItem = (itemId: string) => {
    //!todo type
    return instance.get(`/product/${itemId}`).then(response => response.data);
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

export default () => ({
    Api,
});
