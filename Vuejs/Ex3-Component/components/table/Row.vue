<template>
<tr v-for="prop in item">
    <Cell :cellValue="prop" />
</tr>
</template>

<script>
    import Cell from "./Cell"

    export default {
        props: ["item"],

        components: {
            Cell
        }
    }
</script>