import { Module } from '@nestjs/common';
import { ProductModule } from '@server/product/product.module';

@Module({
    imports: [ProductModule],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
