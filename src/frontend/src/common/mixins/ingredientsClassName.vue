<script>
export default {
  name: "ingredientsClassName",
  methods: {
    ingredientClassName(ingredient) {
      let className = ingredient.image.split("filling/")[1];
      className = className.split(".svg")[0];
      return className;
    },
  },
};
</script>

<style scoped></style>
