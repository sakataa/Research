<template>
<tr>
    <Cell v-for="prop in item" :cellValue="prop" :key="prop" />
</tr>
</template>

<script>
    import Cell from "./Cell.vue"

    export default {
        props: ["item"],

        components: {
            Cell
        }
    }
</script>