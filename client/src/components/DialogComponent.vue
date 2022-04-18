<template>
  <teleport to="body">
    <dialog open v-if="show">
      <header>
        <h1>
          {{ heading }}
        </h1>
      </header>
      <menu>
        <button @click="close">Close</button>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      require: true,
    },
    heading: {
      type: String,
      require: true,
    },
  },
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scope>
dialog {
  position: fixed;
  top: 20vh;
  border-radius: 12px;
}
menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
button {
  background-color: black;
  color: white;
  border-radius: 30px;
}
</style>