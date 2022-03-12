<template>
  <div class="detail-partner container-fluid">
    <infoPartner :classify="classify" />
    <listAccount v-if="id || $isPartner()" class="bg-white shadow-sm mt-3 rounded">
      <h4 class="font-weight-bold mb-0 pt-3">Danh sách tài khoản thuộc công ty</h4>
    </listAccount>
    <listEmployee :classify="classify" v-if="$route.name != 'partner-add'" />
  </div>
</template>

<script>
export default {
  components: {
    listEmployee: () => import("./list-employee"),
    listAccount: () => import("../../account-admin/views/index"),
    infoPartner: () => import("./info-partner"),
  },
  data() {
    return {
      classify: "",
      id: this.$route.params.id,
    };
  },
  created() {
    this.getClassify();
  },
  methods: {
    getClassify() {
      this.classify = $store.state.profile.user.classify;
    },
  },
};
</script>

<style lang="scss">
.detail-partner {
  // background: rgb(255, 255, 255);
  background: rgb(240, 245, 249);
  // padding: 20px;
  padding: 0;
  box-shadow: none;
  border-radius: 5px;
  h1 {
    padding-bottom: 25px;
  }
  .avatar-partner {
    margin-bottom: 1rem;
    height: 200px;
    background-color: rgb(240, 245, 249);
    position: relative;
    &:hover .avatar-upload {
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 3;
      .icon {
        color: #fff;
      }
    }
    .avatar-preview {
      display: block;
      position: absolute;
      height: 200px;
      width: 100%;
      object-fit: cover;
      border: 1px solid #ced4da;
      z-index: 2;
    }
    .avatar-upload {
      position: absolute;
      height: 200px;
      width: 100%;
      border: 1px dotted #ced4da;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      transition: linear 0.3s;
      .icon {
        font-size: 25px;
        color: #6c757d;
        cursor: pointer;
        transition: linear 0.3s;
        &.ion-md-cloud-upload {
          font-size: 50px;
        }
      }
      .lh-100 {
        line-height: 200px;
      }
    }
  }
}
</style>
