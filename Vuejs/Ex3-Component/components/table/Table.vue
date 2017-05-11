<template>
    <table>
        <Row v-for="item in data" :item="item" />
    </table>
</template>

<script>
    import Row from './Row'

    export default {
        props: ["data"],

        components: {
            Row
        }
    }
</script>