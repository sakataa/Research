<template>
    <div id="app">
        <Toolbar />
        <NotesList />
        <Editor />
    </div>
</template>

<script>
import Toolbar from "./ToolBar.vue"
import NotesList from "./NotesList.vue"
import Editor from "./Editor.vue"

export default {
    components: {
        Toolbar,
        NotesList,
        Editor
    }
}
</script>

