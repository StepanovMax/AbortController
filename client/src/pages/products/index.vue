<template>
    <div class="p-4 flex flex-col space-y-4">
        <input type="text" v-model="filter.searchString" class="border" />

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
            <button @click="prevPage">Назад</button>
            <div @click="askPage">{{ page }}</div>
            <button @click="prevPage">Вперед</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, PropType, watch, reactive } from 'vue';
import useApi from '@composables/useApi';
import { computedAsync } from '@vueuse/core';
import { ItemsFilter } from '@server/product/product.service';

const { Api } = useApi();

const filter = reactive<ItemsFilter>({
    searchString: '',
    priceMin: undefined,
    priceMax: undefined,
    offset: 0,
});

const products = computedAsync(() => Api.Product.getList(filter.value));

const page = ref(1);

//!todo pagination
</script>
