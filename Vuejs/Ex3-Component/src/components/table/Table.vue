<template>
    <table>
        <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
        </thead>
    
        <tbody>
            <Row v-for="(item, key, index) in data" :item="item" :key="index" />
        </tbody>
    </table>
</template>

<script>
import Row from './Row.vue'

export default {
    props: ["data"],
    components: {
        Row
    }
}
</script>