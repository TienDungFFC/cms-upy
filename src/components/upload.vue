<template>
    <div>
        <slot />
        <input type="file" hidden ldc-upload @change="changeFile" :multiple="multiple"/>
    </div>
</template>
<script>
export default {
  props: ["value", "multiple"],
  data() {
    return {
      file: null,
    };
  },
  watch: {
    file: {
      handler(val) {
        this.$emit("input", val);
      },
      deep: true,
    },
  },
  created() {
    if (this.multiple) this.file = [];
  },
  mounted() {
    const upload_dom = this.$el.querySelector("[upload]");
    if (!upload_dom) {
      throw "ldc-upload phải có dom attr upload";
    }
    upload_dom.onclick = () => {
      return this.activeUpload();
    };
  },
  methods: {
    activeUpload() {
      let input = this.$el.querySelector("[ldc-upload]");
      if (input) input.click();
    },
    changeFile(e) {
      let files = e.target.files;
      const typeFile = ["image/png", "image/jpeg", "image/jpg"];
      const maxFileSize = 8;
      const maxSize = maxFileSize * 1024;

      if (this.multiple) {
        let file = [];
        for (let i = 0; i < files.length; i++) {
          file.push(files[i]);
        }
        this.file = file;
      } else {
        this.file = files[0];
        const size = Math.round(this.file.size / 1024);

        if (typeFile.indexOf(this.file.type) !== -1 && size < maxSize) {
          this.file = files[0];
        } else {
          this.file = null;
          this.$showMessage(
            `Vui lòng chọn file có định dạng là png jpg jpeg và kích thước nhỏ hơn ${maxFileSize} MB`,
            "warning"
          );
        }
      }
      e.target.value = "";
    },
  },
};
</script>
