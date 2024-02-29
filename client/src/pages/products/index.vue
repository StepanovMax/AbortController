<template>
    <div class="p-4 flex flex-col space-y-4">
        <input
            type="text"
            v-model="filter.searchString"
            class="border"
            placeholder="Поиск по товарам"
        />

        <table>
            <tbody>
                <tr v-for="(product, productIndex) in products" :key="`product_${productIndex}`">
                    <td>
                        <RouterLink :to="`/products/${product.id}`">{{ product.name }}</RouterLink>
                    </td>
                    <td>
                        {{ product.price }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex flex-row space-x-4 items-center">
            <button @click="() => page--">Назад</button>
            <div @click="askPage">{{ page }} / {{ total }}</div>
            <button @click="() => page++">Вперед</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, PropType, watch, reactive } from 'vue';
import useApi from '@composables/useApi';
import { computedAsync } from '@vueuse/core';
import { ItemsFilter } from '@server/product/product.service';
import { Product } from '@server/product/products.database';

const { Api } = useApi();

const filter = reactive<ItemsFilter>({
    searchString: '',
    offset: 0,
});

const products = ref<Product[]>([]);

computedAsync(() =>
    Api.Product.getList(filter).then(data => {
        products.value = data.items;
        total.value = data.total;
    }),
);

//!todo pagination
const page = ref(1);
const total = ref(0);
</script>
