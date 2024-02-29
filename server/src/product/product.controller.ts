import { Controller, Get, Param, Query } from '@nestjs/common';
import { ItemsFilter, ProductService } from './product.service';
import { Product } from './products.database';

//!todo generic
export interface ItemsList {
    total: number;
    items: Product[];
}

@Controller('/product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get('/')
    async getList(@Query('filter') filter?: ItemsFilter): Promise<ItemsList> {
        const items = await this.productService.getList(filter);
        const total = items.length;
        const offset = filter?.offset || 0;
        const limit = 10;

        return {
            total,
            items: items.slice(offset, limit),
        };
    }

    @Get('/:itemId')
    async getItem(@Param('itemId') itemId: string) {
        return this.productService.getItem(itemId);
    }
}
