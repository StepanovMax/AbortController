<template>
    <div>
        <pre>{{ product }}</pre>
    </div>
</template>

<script setup lang="ts">
import { ref, PropType, watch, computed } from 'vue';
import { Product } from '@server/product/products.database';

const props = defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true,
    },
});
</script>
