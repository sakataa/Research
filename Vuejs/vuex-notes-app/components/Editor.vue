<template>
  <div id="note-editor">
    <textarea :value="activeNoteText" @input="editNote" class="form-control">
    </textarea>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: mapState({
      activeNoteText: state => state.activeNote.text
    }),
    methods: {
      ...mapActions([
            'editNote'
        ])
    }
}
</script>