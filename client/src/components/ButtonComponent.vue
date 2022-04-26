<template>
    <div>
        <button type="submit" class="btn btn-primary btn-lg">{{ message }}</button>
    </div>
</template>

<script>

export default {
  props: {
    message: {
      type: String,
      requred: true,
      default: 'Submit',
    },
  },
};
</script>

<style scoped>
.btn.btn-primary.btn-lg {
    background-color: rgb(0, 0, 0);
    border-radius: 50px;
    border-color: black;
    text-align: center;
 }
</style>
