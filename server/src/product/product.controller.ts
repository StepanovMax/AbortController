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
        @Query('searchString') searchString?: string,
        @Query('offset', ParseIntPipe) offset: number = 0,
    ): Promise<ItemsList> {
        console.log({ searchString, offset });

        const items = await this.productService.getList();
        const total = items.length;
        const limit = 10;

        return {
            total,
            limit,
            offset,
            items: items.slice(offset, limit),
        };
    }

    @Get('/:itemId')
    async getItem(@Param('itemId') itemId: string) {
        return this.productService.getItem(itemId);
    }
}
