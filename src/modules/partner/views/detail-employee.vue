<template>
  <div class="container-fluid tpl-employe tpl-employe-partner">
    <form>
      <div class="d-flex align-items-center img-name">
        <div class="avatar flex-shrink-0">
          <imageBlock :url="$getUrlImage(urlAvatar)" @changeFile="changeFile" />
        </div>     
        <h2 class="ml-3 ml-lg-5 overflow-hidden" style="font-weight: 600; text-overflow: ellipsis">
          {{ formEmployee.name }}
        </h2>
      </div>

      <div class="row" style="margin-bottom: 20px">
        <div class="col-12 col-lg-4">
          <h3 class="title font-weight-bold">Thông tin</h3>
        </div>
        <div class="col-12 col-lg-8 text-lg-right mt-3 mt-lg-0">
          <p
            v-if="
              formEmployee.time_updated != null &&
              formEmployee.time_updated != ''
            "
            class="mb-0"
          >
            <span>Cập nhật lần cuối:</span>
            {{ formEmployee.time_updated }}
          </p>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-lg-3 col-form-label font-weight-bold">Họ và tên</label>
        <div class="col-12 col-lg-9">
          <input
            type="text"
            v-model="formEmployee.name"
            :class="{'form-control size-input' : true, 'is-invalid' : errors.name}"
            placeholder="Họ và tên"
            :disabled="!$myCanUpdate()"
          />
          <form-invalid :error="errors.name"/>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-lg-3 col-form-label font-weight-bold">Ngày sinh</label>
        <div class="col-12 col-lg-9">
          <input
            type="date"
            v-model="formEmployee.birthday"
            :class="{'form-control size-input input-date' : true, 'is-invalid' : errors.birthday}"
            placeholder="Ngày sinh"
            :disabled="!$myCanUpdate()"
          />
          <form-invalid :error="errors.birthday"/>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-lg-3 col-form-label font-weight-bold">Số điện thoại</label>
        <div class="col-12 col-lg-9">
          <input
            type="text"
            v-model="formEmployee.phone"
            :class="{'form-control size-input' : true, 'is-invalid' : errors.phone}"
            placeholder="Số điện thoại"
            :disabled="!$myCanUpdate()"
          />
          <form-invalid :error="errors.phone"/>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-lg-3 col-form-label font-weight-bold">Email</label>
        <div class="col-12 col-lg-9">
          <input
            type="text"
            v-model="formEmployee.email"
            :class="{'form-control size-input' : true, 'is-invalid' : errors.email}"
            placeholder="Email"
            :disabled="!$myCanUpdate()"
          />
          <form-invalid :error="errors.email"/>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-lg-3 col-form-label font-weight-bold">Mức lương</label>
        <div class="col-12 col-lg-9">
          <input
            type="text"
            v-model="formEmployee.salary"
            :class="{'form-control size-input' : true, 'is-invalid' : errors.salary}"
            placeholder="Mức lương"
            :disabled="!$myCanUpdate()"
          />
          <form-invalid :error="errors.salary"/>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-lg-3 col-form-label font-weight-bold">Chức vụ</label>
        <div class="col-12 col-lg-9">
          <input
            type="text"
            v-model="formEmployee.position"
            :class="{'form-control size-input' : true, 'is-invalid' : errors.position}"
            placeholder="Chức vụ"
            :disabled="!$myCanUpdate()"
          />
          <form-invalid :error="errors.position"/>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-lg-3 col-form-label font-weight-bold">Thời gian vào làm</label>
        <div class="col-12 col-lg-9">
          <input
            type="date"
            v-model="formEmployee.time_to_work"
            :class="{'form-control size-input input-date' : true, 'is-invalid' : errors.time_to_work}"
            :disabled="!$myCanUpdate()"
          />
          <form-invalid :error="errors.time_to_work"/>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-lg-3 col-form-label font-weight-bold">Số căn cước công dân</label>
        <div class="col-12 col-lg-9">
          <input
            type="text"
            v-model="formEmployee.id_number"
            :class="{'form-control size-input' : true, 'is-invalid' : errors.id_number}"
            placeholder="Số căn cước công dân"
            :disabled="!$myCanUpdate()"
          />
          <form-invalid :error="errors.id_number"/>
        </div>
      </div>
      <label v-if="otherInfo && $myCanUpdate()" class="col-form-label font-weight-bold">Thông tin thêm</label>
      <div :class="{'is-invalid' : errors.other_info}">
        <div
          class="form-group row"
          v-for="(item, index) in otherInfo"
          :key="index"
        >
          <div class="col-3" :class="{ 'pr-0': $detect == 'mobile' }">
            <input
              type="text"
              v-model="item.label"
              class="form-control size-input"
              placeholder="Tiêu đề"
              :disabled="!$myCanUpdate()"
            />
          </div>
          <div class="col-9">
            <div class="d-flex">
              <input
                type="text"
                v-model="item.value"
                placeholder="Nội dung"
                class="form-control size-input"
                :disabled="!$myCanUpdate()"
              />
              <button
                  type="button"
                  class="ml-3 btn btn-danger rounded-circle d-flex justify-content-center align-items-center flex-shrink-0"
                  :style="$detect === 'web' ? 'height: 32px; width: 32px;' : 'height: 40px; width: 40px'"
                  @click="removeOther(index)"
                  :disabled="!$myCanUpdate()">
                <i class="icon ion-md-trash"></i>
              </button>
            </div>
          </div>       
        </div>
      </div>
      <form-invalid :error="errors.other_info"/>

      <div v-if="$myCanUpdate()" class="form-group row" :class="{ 'mt-3': $detect == 'web' }">
        <div class="col-12">
          <button type="button" @click="addOther()" class="btn btn-success">
            Thêm thông tin
          </button>
        </div>
      </div>
      <div class="inforAdditional mt-4">
        <div class="form-group row">
          <div class="col-12 mt-4 mb-4">
            <h3 class="title font-weight-bold">Thông tin thêm</h3>
          </div>
          <label class="col-sm-3 font-weight-bold">Hợp đồng lao động</label>
          <div class="col-sm-9" style="overflow: auto">
            <div class="list-file d-flex flex-wrap scroll-images">
              <div v-if="$myCanUpdate()" class="file mr-2 mb-2">
                <ldc-upload
                  v-model="fileLabor"
                  :multiple="true"
                  @input="makeUrlFileLaborContract(fileLabor)"
                >
                  <div class="upload_image position-relative rounded h-100">
                    <div
                      class="d-flex align-items-center justify-content-center position-relative w-100 h-100"
                      style="border: 1px dashed black; border-radius: 5px"
                      upload
                    >
                      <i class="icon ion-md-cloud-upload mr-2"></i>
                      Chọn ảnh
                    </div>
                  </div>
                </ldc-upload>
              </div>
              <div
                class="file mr-2 mb-2"
                v-for="(item, index) in urlLaborContract"
                :key="index"
              >
                <div class="upload_image position-relative rounded h-100">
                  <span
                    v-if="$myCanUpdate()"
                    class="position-absolute opacity-75 btn text-white right-0 start-0 close-icon"
                    @click="
                      removeImage('LABOR', index, urlLaborContract[index])
                    "
                  >
                    X
                  </span>
                  <imageBlock v-if="urlLaborContract[index]" :url="$getUrlImage(urlLaborContract[index])" :edit="false"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 font-weight-bold">Quyết định lên lương</label>
          <div class="col-sm-9" style="overflow: auto">
            <div class="list-file d-flex flex-wrap scroll-images">
              <div v-if="$myCanUpdate()" class="file mb-2 mr-2">
                <ldc-upload
                  v-model="fileSalary"
                  :multiple="true"
                  @input="makeUrlFileSalaryIncrease(fileSalary)"
                >
                  <div class="upload_image position-relative rounded h-100">
                    <div
                      style="border: 1px dashed black; border-radius: 5px"
                      class="d-flex align-items-center justify-content-center position-relative w-100 h-100"
                      upload
                    >
                      <i class="icon ion-md-cloud-upload mr-2"></i>
                      Chọn ảnh
                    </div>
                  </div>
                </ldc-upload>
              </div>
              <div
                class="file mr-2 mb-2"
                v-for="(item, index) in urlSalaryIncrease"
                :key="index"
              >
                <div class="upload_image position-relative rounded h-100">
                  <span
                    v-if="$myCanUpdate()"
                    class="position-absolute opacity-75 btn text-white close-icon"
                    @click="
                      removeImage('SALARY', index, urlSalaryIncrease[index])
                    "
                  >
                    X
                  </span>
                  <imageBlock v-if="urlSalaryIncrease[index]" :url="$getUrlImage(urlSalaryIncrease[index])" :edit="false"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group d-flex justify-content-start">
          <buttom-fixed>
            <button
              type="button"
              :class="{'btn btn-success size-button' : true, 'w-100' : $detect === 'mobile'}"
              :disabled="loading"
              v-if="$route.name === 'add-employee' && $myCanCreate()"
              @click="addEmployee()"
            >
              Thêm nhân viên
            </button>
            <button
              type="button"
              :class="{'btn btn-primary size-button' : true, 'w-100' : $detect === 'mobile'}"
              v-else-if="$route.name !== 'add-employee' && $myCanUpdate()"
              @click="updateEmployee()"
              :disabled="loading"
            >
              Cập nhật
          </button>
          </buttom-fixed>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  addEmployee,
  updateEmployee,
  detailEmployee,
  deleteImage,
} from "@/repositories/employee";
export default {
  components: {
    imageBlock: () => import('@/components/imageBlock')
  },
  data() {
    return {
      fileLabor: [],
      fileSalary: [],
      id: this.$route.params.id,
      formatDate: "",
      file: "",
      loading: false,
      info: {
        label: "",
        value: "",
      },
      otherInfo: [],
      fileLaborContract: [],
      fileSalaryIncrease: [],
      urlAvatar: "",
      urlLaborContract: [],
      urlSalaryIncrease: [],
      formEmployee: {
        avatar: "",
        birthday: "",
        email: "",
        id: "",
        id_business: "",
        id_number: "",
        labor_contract: [],
        name: "",
        name_search: "",
        other_info: [],
        phone: "",
        position: "",
        salary: "",
        salary_increase: [],
        time_created: "",
        time_to_work: "",
        time_updated: "",
      },
      errors: {}
    }
  },
  mounted() {
    if (this.id != null && this.id != "") {
      this.getDetailEmployee();
    }
  },
  methods: {
    changeFile(file) {
      this.file = file
    },
    addOther() {
      if (this.otherInfo == null) {
        this.otherInfo = [];
      }
      let newInfo = { ...this.info };
      this.otherInfo.push(newInfo);
    },
    removeOther(key) {
      this.otherInfo.splice(key, 1);
    },
    makeUrlFile(file) {
      const typeFile = ["image/png", "image/jpeg", "image/jpg"];
      let errImg = false;

      if (file) {
        if (typeFile.indexOf(file.type) == -1) {
          errImg = true;
        }
        if (errImg) {
          this.$showMessage(
            `Vui lòng chọn file có định dạng là png jpg jpeg `,
            "warning"
          );
        } else {
          this.urlAvatar = URL.createObjectURL(file);
        }
      }
    },
    makeUrlFileLaborContract(file) {
      const typeFile = ["image/png", "image/jpeg", "image/jpg"];
      let errImg = false;

      if (file.length > 0) {
        file.forEach((element) => {
          if (typeFile.indexOf(element.type) == -1) {
            errImg = true;
          }
        });
        if (errImg) {
          this.$showMessage(
            `Vui lòng chọn file có định dạng là png jpg jpeg `,
            "warning"
          );
        } else {
          file.forEach((element) => {
            this.fileLaborContract.unshift(element);
            this.urlLaborContract.unshift(URL.createObjectURL(element));
          });
        }
      }
      this.fileLabor = [];
    },
    makeUrlFileSalaryIncrease(file) {
      const typeFile = ["image/png", "image/jpeg", "image/jpg"];
      let errImg = false;
      if (file.length > 0) {
        file.forEach((element) => {
          if (typeFile.indexOf(element.type) == -1) {
            errImg = true;
          }
        });
        if (errImg) {
          this.$showMessage(
            `Vui lòng chọn file có định dạng là png jpg jpeg `,
            "warning"
          );
        } else {
          file.forEach((element) => {
            this.fileSalaryIncrease.unshift(element);
            this.urlSalaryIncrease.unshift(URL.createObjectURL(element));
          });
        }
      }
    },
    async removeImage(type, index, file) {
      if (file.search("https://storage.googleapis.com/v10-dev/") == 0) {
        let param = {
          image: file.replace(
            "https://storage.googleapis.com/v10-dev/upy/",
            ""
          ),
          type: type,
        };
        this.$confirm(`Bạn có chắc chắn xóa `, "Xóa ảnh", {
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
          type: "error",
        })
          .then(async () => {
            this.loading = true;
            await deleteImage(this.id, param).then((res) => {
              this.$showMessage(res.data.message);
              this.getDetailEmployee();
            });
            if (type == "LABOR") {
              this.urlLaborContract.splice(index, 1);
              this.fileLaborContract.splice(index, 1);
            } else {
              this.fileSalaryIncrease.splice(index, 1);
              this.urlSalaryIncrease.splice(index, 1);
            }
            this.loading = false;
          })
          .catch(() => {});
        // await this.deleteImage(this.id, param);
      } else {
        if (type == "LABOR") {
          this.urlLaborContract.splice(index, 1);
          this.fileLaborContract.splice(index, 1);
        } else {
          this.fileSalaryIncrease.splice(index, 1);
          this.urlSalaryIncrease.splice(index, 1);
        }
      }
    },
    getDetailEmployee() {
      let id = this.id;
      detailEmployee(id).then((res) => {
        this.loading = true;
        let data = res.data.data;
        this.formEmployee = data;
        this.urlAvatar = this.formEmployee.avatar;
        this.otherInfo = this.formEmployee.other_info;
        this.formEmployee.salary = this.$formatNumber(this.formEmployee.salary);
        if (this.formEmployee.labor_contract) {
          this.urlLaborContract = this.formEmployee.labor_contract.map(
            function (item) {
              return item.url;
            }
          );
        }
        if (this.formEmployee.salary_increase) {
          this.urlSalaryIncrease = this.formEmployee.salary_increase.map(
            function (item) {
              return item.url;
            }
          );
        }
        //format date
        if (this.formEmployee.birthday) {
          var arrDate = this.formEmployee.birthday.split("-");
          this.formEmployee.birthday =
            arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
        }

        if (this.formEmployee.time_to_work) {
          var arrDate = this.formEmployee.time_to_work.split("-");
          this.formEmployee.time_to_work =
            arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
        }
        this.loading = false;
      });
    },
    //add Employe
    async addEmployee() {
      this.loading = true;
      let form = {};
      let getOtherInfo = this.otherInfo;

      if (getOtherInfo.length > 0) {
        form.other_info = getOtherInfo;
      }
      if (this.file) {
        this.formEmployee.avatar = await this.$uploadFile(this.file);
        form.avatar = this.formEmployee.avatar;
      }

      if (this.fileLaborContract.length != 0) {
        for (const key in this.fileLaborContract) {
          this.formEmployee.labor_contract[key] = await this.$uploadFile(
            this.fileLaborContract[key]
          );
        }
        form.labor_contract = this.formEmployee.labor_contract;
        this.fileLaborContract = [];
      }
      if (this.fileSalaryIncrease.length != 0) {
        for (const key in this.fileSalaryIncrease) {
          this.formEmployee.salary_increase[key] = await this.$uploadFile(
            this.fileSalaryIncrease[key]
          );
        }
        form.salary_increase = this.formEmployee.salary_increase;
        this.fileSalaryIncrease = [];
      }

      form.name = this.formEmployee.name;
      form.birthday = this.formEmployee.birthday;
      form.phone = this.formEmployee.phone;
      form.email = this.formEmployee.email;
      form.position = this.formEmployee.position;
      form.salary = this.formEmployee.salary;
      form.time_to_work = this.formEmployee.time_to_work;
      form.id_number = this.formEmployee.id_number;

      addEmployee(this.$returnForm(form)).then((res) => {
        let data = res.data;
        this.$showMessage(data.message);
        this.$router.push({
          name: "company-information",
        });
      }).catch(err => this.requestError(err))
      this.loading = false;
    },
    async updateEmployee() {
      this.loading = true;
      let form = {};
      let getOtherInfo = this.otherInfo;
      if (getOtherInfo) {
        form.other_info = getOtherInfo;
      }
      if (this.file) {
        this.formEmployee.avatar = await this.$uploadFile(this.file);
        if (
          this.formEmployee.avatar !== null &&
          this.formEmployee.avatar !== ""
        ) {
          form.avatar = this.formEmployee.avatar;
        }
      }

      if (this.fileLaborContract.length != 0) {
        let arrImage = [];
        for (var key in this.fileLaborContract) {
          if (this.fileLaborContract[key]) {
            var image = await this.$uploadFile(this.fileLaborContract[key]);
            arrImage.push(image);
          }
        }
        form.labor_contract = arrImage;
        this.fileLaborContract = [];
      }

      if (this.fileSalaryIncrease.length != 0) {
        let arrImage2 = [];
        for (var key in this.fileSalaryIncrease) {
          if (this.fileSalaryIncrease[key]) {
            var image2 = await this.$uploadFile(this.fileSalaryIncrease[key]);
            arrImage2.push(image2);
          }
        }
        form.salary_increase = arrImage2;
        this.fileSalaryIncrease = [];
      }
      form.name = this.formEmployee.name;
      form.birthday = this.formEmployee.birthday;
      form.phone = this.formEmployee.phone;
      form.position = this.formEmployee.position;
      form.email = this.formEmployee.email;
      form.salary = this.$stringToNumber(this.formEmployee.salary);
      form.time_to_work = this.formEmployee.time_to_work;
      form.id_number = this.formEmployee.id_number;

      try {
        await updateEmployee(this.formEmployee.id, form).then((res) => {
          this.$showMessage(res.data.message);
          this.errors = {};
        });
      } catch (error) {
        this.loading = false;
        this.requestError(error)
      }
      this.loading = false;

      // this.otherInfo = [];
      // this.getDetailEmployee();
    },
    requestError(err) {
      if (err.status === HTTP_CODE_GONE) {
        this.$showMessage(err.data.message, "warning");
        // this.goList();
      } else if (err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
        this.errors = err.data.data.data;
      }
    },
  },
};
</script>

<style lang="scss">
.scroll-images {
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  display: inline-block !important;
  .file {
    display: inline-block !important;
  }
}
.upload_image {
  background: white;
  div {
    i {
      font-size: 26px;
    }
  }
}
.close-icon {
  height: 30px;
  width: 30px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tpl-employe {
  padding: 42px 90px 143px 117px;
  .title {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    margin-bottom: 0;
  }
  .img {
    width: 170px;
    height: 170px;
    background: #b7b7b7;
    border-radius: 50%;
    > div {
      height: 100%;
      border-radius: 50%;
    }
  }
  .name {
    display: flex;
    align-items: center;
    h2 {
      font-size: 30px;
    }
  }
  .img-name {
    margin-bottom: 45px;
  }
  .ldc-dialog-content {
    padding: 25px !important;
  }
  .avatar {
    width: 132px;
    height: 132px;
    border-radius: 50%;
    background-color: #ccc;
    border: 1px solid #ddd;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
  }
  .file {
    width: 140px;
    height: 125px;
    box-sizing: border-box;
    border-radius: 5px;

    > div {
      height: 100%;
      border-radius: 5px;
      overflow: hidden;
    }
  }
}
@media screen and (max-width: 1023px) {
  .tpl-employe {
    padding: 0.5rem;
    .avatar {
      width: 100px;
      height: 100px;
    }
    .img-name {
      margin-bottom: 30px;
    }
  }
}
</style>
