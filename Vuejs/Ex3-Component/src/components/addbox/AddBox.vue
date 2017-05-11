<template>
    <div class="addbox">
        <input type="text" autocomplete="off" :value="value" @input="$emit('input', $event.target.value)" placeholder="Add Person..." />
        <button @click="handleAdd">Add</button>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
    },

    methods: {
        handleAdd: function(){
            this.$emit("onAdd", this.value);
        }
    }
}
</script>