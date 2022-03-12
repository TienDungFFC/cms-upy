<template>
  <div class="container-fluid pt-2 py-lg-3 bg-white shadow-sm" style="border-radius: 5px">
    <h4 v-if="$detect === 'web'" class="font-weight-bold mb-3">
      {{
        id || $route.name == "company-information"
          ? "Thông tin công ty"
          : "Thêm công ty"
      }}
    </h4>
    <form>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <label class="col-2 mb-0"></label>
            <div class="col-lg-10">
              <ldc-upload v-model="file" @input="makeUrlFile(file)">
                <div class="avatar-partner">
                  <img
                    v-if="url"
                    :src="$getUrlImage(url)"
                    alt=""
                    class="avatar-preview"
                  />
                  <div class="avatar-upload">
                    <i
                      v-if="url"
                      @click="preview()"
                      class="icon ion-md-search mr-4"
                    ></i>
                    <i
                      upload
                      :class="
                        !url
                          ? 'icon ion-md-cloud-upload w-100 lh-100 text-center'
                          : 'icon ion-md-create'
                      "
                    ></i>
                  </div>
                  <previewImage
                      :visible.sync="dialog"
                      :url="url"
                  />
                </div>
              </ldc-upload>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group row">
            <label class="col-md-2 col-form-label font-weight-bold"
              >Tên công ty</label
            >
            <div class="col-md-10">
              <input
                v-model="form.name"
                :readonly="false"
                placeholder="Tên công ty"
                :class="{
                  'form-control size-input': true,
                  'is-invalid': errors.name,
                }"
                :disabled="!$myCanCreate()"
              />
              <form-invalid :error="errors.name" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-2 col-form-label font-weight-bold"
              >Địa chỉ</label
            >
            <div class="col-md-10">
              <input
                v-model="form.address"
                :readonly="false"
                placeholder="Địa chỉ"
                :class="{
                  'form-control size-input': true,
                  'is-invalid': errors.address,
                }"
                :disabled="!$myCanCreate()"
              />
              <form-invalid :error="errors.address" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-2 col-form-label font-weight-bold">Điện thoại</label>
            <div class="col-md-10">
              <input
                v-model="form.phone"
                :readonly="false"
                placeholder="Điện thoại"
                :class="{
                  'form-control size-input': true,
                  'is-invalid': errors.phone,
                }"
                :disabled="!$myCanCreate()"
              />
              <form-invalid :error="errors.phone" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-2 col-form-label font-weight-bold"
              >Email</label
            >
            <div class="col-md-10">
              <input
                v-model="form.email"
                :readonly="false"
                placeholder="Email"
                :class="{
                  'form-control size-input': true,
                  'is-invalid': errors.email,
                }"
                :disabled="!$myCanCreate()"
              />
              <form-invalid :error="errors.email" />
            </div>
          </div>
          <div
            class="form-group row"
            v-if="$route.name != 'company-information'"
          >
            <label class="col-md-2 col-form-label font-weight-bold"
              >Hạn mức tối thiểu</label
            >
            <div class="col-lg-4 col-md-10">
              <input
                v-model="form.min"
                :readonly="false"
                placeholder="Hạn mức tối thiểu"
                :class="{
                  'form-control size-input': true,
                  'is-invalid': errors.min,
                }"
                :disabled="!$myCanCreate()"
              />
              <form-invalid :error="errors.min" />
            </div>
            <label
              class="col-md-2 col-form-label font-weight-bold"
              :class="{
                'mt-3': $detect == 'mobile',
              }"
              >Hạn mức tối đa</label
            >
            <div class="col-lg-4 col-md-10">
              <input
                v-model="form.max"
                :readonly="false"
                placeholder="Hạn mức tối đa"
                :class="{
                  'form-control size-input': true,
                  'is-invalid': errors.max,
                }"
                :disabled="!$myCanCreate()"
              />
              <form-invalid :error="errors.max" />
            </div>
          </div>
          <div
            v-for="(item, index) in form.other_info"
            :key="index"
            class="form-group row"
          >
            <div class="col-2">
              <input
                v-model="item.key"
                type="text"
                class="form-control font-weight-bold"
                placeholder="Tiêu đề"
                :disabled="!$myCanCreate()"
              />
            </div>
            <div class="col-10">
              <input
                v-model="item.value"
                type="text"
                class="form-control"
                placeholder="Nội dung"
                :disabled="!$myCanCreate()"
              />
            </div>
          </div>
          <div class="form-group row">
            <!-- <label class="col-lg-2">
              <button
                v-if="classify != 'ADMIN_CMS'"
                class="btn btn-success size-button"
                :disabled="loading"
                :loading="loading"
                @click.prevent="addOtherInfo()"
              >
                Thêm thông tin
              </button>
            </label> -->
            <div class="col-lg-10">
              <button
                v-if="(id || $route.name == 'company-information') && $myCanCreate()"
                :class="{'btn btn-primary size-button' : true, 'w-100 is-tablet' : $detect === 'mobile' }"
                :disabled="loading"
                :loading="loading"
                @click.prevent="update()"
              >
                Cập nhật thông tin
              </button>
              <buttom-fixed v-else-if="!id && $myCanCreate()">
                <button
                  :class="{
                    'btn btn-success size-button' : true, 
                    'w-100' : $detect === 'mobile'
                  }"
                  :disabled="loading"
                  :loading="loading"
                  @click.prevent="create()"
                >
                  Tạo mới
              </button>
              </buttom-fixed>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import {
  detailPartner,
  addPartner,
  updatePartner,
  updateMyPartner,
  detailMyPartner,
} from "@/repositories/partner";
export default {
  components: {
    previewImage: () => import('@/components/previewImage'),
  },
  props: ["classify"],
  data() {
    return {
      id: this.$route.params.id,
      errors: {},
      loading: false,
      file: "",
      url: "",
      form: {
        name: "",
        avatar: "",
        address: "",
        phone: "",
        email: "",
        min: "",
        max: "",
        other_info: [],
      },

      other_info_default: {
        key: "",
        value: "",
      },
      dialog: false,
    };
  },
  watch: {
    "form.min"(val) {
      if (val) {
        this.form.min = this.$formatNumber(val);
      }
    },
    "form.max"(val) {
      if (val) {
        this.form.max = this.$formatNumber(val);
      }
    },

    visible(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("update:visible", val);
    },
  },
  computed: {
    redirect() {
      return this.$store.state.general.redirect;
    },
  },
  created() {
    if (this.id || this.$route.name == "company-information") {
      this.getData();
    }
  },
  methods: {
    preview() {
      this.dialog = true;
    },
    makeUrlFile(file) {
      if (file) {
        this.url = URL.createObjectURL(file);
      } else {
        this.url = "";
      }
    },
    getData() {
      if (this.id) {
        detailPartner(this.id)
          .then((res) => {
            let data = res.data.data;
            this.url = data.avatar;
            this.form = {
              name: data.name,
              address: data.address,
              phone: data.phone,
              email: data.email,
              min: data.moneyLoanBusiness?.data.min,
              max: data.moneyLoanBusiness?.data.max,
              other_info: data.orther_info,
            };
          })
          .catch((err) => {
            if (err.status === HTTP_CODE_GONE) {
              this.$showMessage(err.data.data.message, "warning");
              this.$router.push({
                path: this.getPathGoList(),
              });
            }
          });
      }
      if (this.$route.name == "company-information") {
        detailMyPartner()
          .then((res) => {
            let data = res.data.data;
            this.url = data.avatar;
            this.form = {
              name: data.name,
              address: data.address,
              phone: data.phone,
              email: data.email,
              min: data.moneyLoanBusiness?.data.min,
              max: data.moneyLoanBusiness?.data.max,
              other_info: data.orther_info,
            };
          })
          .catch((err) => {
            if (err.status === HTTP_CODE_GONE) {
              this.$showMessage(err.data.data.message, "warning");
              this.$router.push({
                path: this.getPathGoList(),
              });
            }
          });
      }
    },

    async create() {
      this.errors = {};
      let form = {};
      this.form.avatar = await this.$uploadFile(this.file);
      this.loading = true;
      if (this.form.avatar !== null && this.form.avatar !== "") {
        form.avatar = this.form.avatar;
      }
      if (this.form.name !== null && this.form.name !== "") {
        form.name = this.form.name;
      }
      if (this.form.address !== null && this.form.address !== "") {
        form.address = this.form.address;
      }
      if (this.form.phone !== null && this.form.phone !== "") {
        form.phone = this.form.phone;
      }
      if (this.form.email !== null && this.form.email !== "") {
        form.email = this.form.email;
      }
      if (this.form.min !== null && this.form.min !== "") {
        form.min = this.$stringToNumber(this.form.min);
      }
      if (this.form.max !== null && this.form.max !== "") {
        form.max = this.$stringToNumber(this.form.max);
      }
      await addPartner(form)
        .then((res) => {
          this.$showMessage(res.data.message, "success");
          this.goList();
        })
        .catch((err) => {
          this.requestError(err);
        });
      this.loading = false;
    },
    async update() {
      this.loading = true;
      this.errors = {};
      let form = {};
      if (this.file) {
        this.form.avatar = await this.$uploadFile(this.file);
        if (this.form.avatar !== null && this.form.avatar !== "") {
          form.avatar = this.form.avatar;
        }
      }
      if (this.form.name !== null && this.form.name !== "") {
        form.name = this.form.name;
      }
      if (this.form.address !== null && this.form.address !== "") {
        form.address = this.form.address;
      }
      if (this.form.phone !== null && this.form.phone !== "") {
        form.phone = this.form.phone;
      }
      if (this.form.email !== null && this.form.email !== "") {
        form.email = this.form.email;
      }

      //check route
      if (this.$route.name == "company-information") {
        await updateMyPartner(form)
          .then((res) => {
            this.$showMessage(res.data.message, "success");
          })
          .catch((err) => {
            this.requestError(err);
          });
      } else {
        if (this.form.min !== null && this.form.min !== "") {
          form.min = this.$stringToNumber(this.form.min);
        }
        if (this.form.max !== null && this.form.max !== "") {
          form.max = this.$stringToNumber(this.form.max);
        }
        await updatePartner(this.id, form)
          .then((res) => {
            this.$showMessage(res.data.message, "success");
          })
          .catch((err) => {
            this.requestError(err);
          });
      }
      this.loading = false;
    },
    requestError(err) {
      if (err.status === HTTP_CODE_GONE) {
        this.$showMessage(err.data.message, "warning");
        this.$router.push({
          path: this.getPathGoList(),
        });
      } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
        this.errors = err.data.data.data;
      }
    },
    getPathGoList() {
      let path = "/partner";
      return path + this.redirect;
    },
    goList() {
      this.$router.push({
        path: this.getPathGoList(),
      });
    },
    addOtherInfo() {
      let dataPush = { ...this.other_info_default };
      this.form.other_info.push(dataPush);
    },
  },
};
</script>
<style lang="scss">
</style>