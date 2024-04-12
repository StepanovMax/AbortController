import {
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseFloatPipe,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { ItemsFilter, ProductService } from './product.service';
import { Product } from './products.database';

//!todo generic
export interface ItemsList {
    total: number;
    limit: number;
    offset: number;
    items: Product[];
}

@Controller('/product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get('/')
    async getList(
        @Query('offset', ParseIntPipe) offset: number = 0,
        @Query('searchString') searchString?: string,
    ): Promise<ItemsList> {

        const limit = 10;

        const { items, total } = await this.productService.getList({
            searchString,
            offset,
        });

        return {
            total,
            limit,
            offset,
            items,
        };
    }

    @Get('/:itemId')
    async getItem(@Param('itemId') itemId: string) {
        return this.productService.getItem(itemId);
    }
}
