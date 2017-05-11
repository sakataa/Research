<template>
    <input placeholder="Search..." :value="value" @input="search($event.target.value)" />
</template>

<script>
export default {
    props: ["value"],
    methods: {
        search: function (newValue) {
            this.$emit("input", newValue);
        }
    }
}
</script>