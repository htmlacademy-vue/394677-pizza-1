<template>
  <div
    v-bind="{ draggable }"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "@/common/constants.json";

export default {
  name: "AppDrag",

  props: {
    transferData: {
      type: Object,
      required: true,
    },
  },

  computed: {
    draggable() {
      return this.transferData.count < 3;
    },
  },

  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>
