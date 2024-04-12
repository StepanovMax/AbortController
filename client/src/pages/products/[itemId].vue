<template>
    <div class="p-4">
        <div v-if="isLoading" class="text-gray-500">Загрузка ...</div>
        <ProductCard v-if="product" :product="product" />
        <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref, PropType, watch, computed, onMounted } from 'vue';
import useApi from '@composables/useApi';
import { computedAsync } from '@vueuse/core';
import { Product } from '@server/product/products.database';

const { Api } = useApi();

const props = defineProps({
    itemId: {
        type: String,
        required: true,
    },
});

const product = ref<Product>();
const errorMessage = ref('');
const isLoading = ref(true);

onMounted(() => {
    Api.Product.getItem(props.itemId)
        .then((data) => {
            product.value = data;
        })
        .catch(error => {
            errorMessage.value = error.message;
        })
        .finally(() => {
            isLoading.value = false;
        });
});
</script>
