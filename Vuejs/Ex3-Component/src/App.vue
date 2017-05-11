<template>
    <div>
        <AddBox v-model="newPerson" @onAdd="addPerson" />
        <SearchBox v-model="searchValue" />
        <Grid :data="data" />
    </div>
</template>

<script>
import Grid from "./components/table/Table.vue"
import SearchBox from "./components/searchbox/SearchBox.vue"
import AddBox from "./components/addbox/AddBox.vue"
import Constant from "./configs/constant"

export default {
    data: function () {
        return {
            data: Constant.data,
            searchValue: '',
            newPerson: ''
        }
    },

    components: {
        SearchBox, Grid, AddBox
    },

    watch: {
        searchValue: function (newValue, oldValue) {
            console.log("Changed! " + newValue)
            if (newValue === '') {
                this.data = Constant.data;
            }
            else {
                newValue = newValue.toLowerCase();
                let dataFilter = Constant.data.filter(item =>
                    item.FirstName.toLowerCase().indexOf(newValue) > -1 ||
                    item.LastName.toLowerCase().indexOf(newValue) > -1);

                console.log(dataFilter)
                this.data = dataFilter;
            }
        }
    },

    methods: {
        addPerson: function () {
            let [FirstName = '', LastName = '', Age = 0] = this.newPerson.split(',');
            this.data.push({
                FirstName,
                LastName,
                Age
            });
            
            this.newPerson = '';
        }
    }
}
</script>