<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants.json";

export default {
  name: "AppDrop",

  methods: {
    onDrop({ dataTransfer }) {
      const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
      if (payload) {
        const transferData = JSON.parse(
          dataTransfer.getData(DATA_TRANSFER_PAYLOAD)
        );
        this.$emit("drop", transferData);
        const element = document.querySelector(".pizza");
        element.classList.add("animate__animated", "animate__pulse");
        element.addEventListener("animationend", () => {
          element.classList.remove("animate__animated", "animate__pulse");
        });
      }
    },
  },
};
</script>
