<template>
    <div class="p-4">
        <ProductCard v-if="product" :product="product" />
        <div v-else class="text-red-500">Товар не найден</div>
    </div>
</template>

<script setup lang="ts">
import { ref, PropType, watch, computed } from 'vue';
import useApi from '@composables/useApi';
import { computedAsync } from '@vueuse/core';

const { Api } = useApi();

const props = defineProps({
    itemId: {
        type: String,
        required: true,
    },
});

const product = computedAsync(() => Api.Product.getItem(props.itemId));
</script>
