<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h3>Đăng nhập</h3>
      </div>

      <div class="col-4">
        <h4>Ảnh trang đăng nhập</h4>
        <ldc-upload v-model="file" @input="makeUrlFile(file)">
          <div class="upload_image position-relative rounded h-100">
            <img
              alt=""
              :src="$getUrlImage(urlAvatar)"
              class="position-absolute w-100 h-100 img-thumbnail"
              style="border-radius: 50%; z-index: 10"
            />
            <div
              class="position-absolute"
              upload
              style="bottom: 8px; right: 0px; z-index: 100"
            >
              <span
                class="d-flex justify-content-center align-items-center img-thumbnail"
                style="height: 40px; width: 40px; border-radius: 50%"
              >
                <i style="" class="icon ion-md-camera"></i>
              </span>
            </div>
          </div>
        </ldc-upload>
      </div>
      <div class="col-8">form</div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3>Đăng ký</h3>
      </div>
      <div class="col-4">img</div>
      <div class="col-8">form</div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3>Chia sẻ</h3>
      </div>
      <div class="col-4">img</div>
      <div class="col-8">form</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileLogin: "",
      fileShare: "",
      fileLogin: "",
      urlAvatar: "",
      params: {
        image_login: "",
        title_login: "",
        text_login: "",
        image_share: "",
        content_share: "",
        image_sign: "",
        title_sign: "",
        text_sign: "",
      },
    };
  },
};
</script>
<style lang="scss"></style>
