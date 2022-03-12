<template>
  <div v-loading="v_loading" class="container-fluid py-lg-3 mt-3 pt-3 bg-white shadow-sm" style="border-radius: 5px">
    <div class="inforEmploye" v-if="$route.name != 'partner-add'">
      <h4 class="mb-3 font-weight-bold">
        Thông tin nhân viên
      </h4>
      <div class="d-flex align-items-lg-end flex-column flex-lg-row justify-content-between pb-4">
          <div>
            <button
              class="btn btn-info mr-3 position-relative"
              v-if="$myCanUploadExcel()">
              <span><i class="icon ion-md-cloud-upload"></i> Tải lên (xlxs/csv)</span>
              <input
                class="ip-excel"
                type="file"
                ref="file"
                @change="uploadFile()"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
            </button>
            <button
              class="btn btn-primary mr-3 position-relative"
              v-if="$myCanUploadExcel()"
              @click="exportSample()">
              <span><i class="icon ion-md-cloud-download"></i> Tải xuống mẫu</span>
            </button>
            <button
              class="btn btn-success"
              @click="goCreate()"
              v-if="$myCanCreate()">
              <i class="icon ion-md-add"></i> Thêm mới
            </button>
          </div>
          <div class="d-flex align-items-end justify-content-lg-end mt-3 mt-lg-0">
            <div class="flex-grow-1 glex-grow-lg-0 position-relative">
              <input
                class="form-control size-input"
                v-model="keyword"
                placeholder="Tìm kiếm theo họ tên, SĐT, email"
                @input="search()"
              />
              <span
                v-if="keyword !== '' && $detect === 'mobile'"
                class="position-absolute"
                style="top: 50%; right: 6px; transform: translateY(-50%);"
                @click="clearFilter()">
                <i class="icon ion-md-close-circle-outline" style="color: #d5d5d5; font-size: 18px;"></i>
              </span>
            </div>
            <div v-if="$detect === 'web'" class="ml-3">
              <button 
                  class="btn btn-secondary w-100"
                  :disabled="keyword === ''"
                  @click="clearFilter()">
                      Bỏ lọc
              </button>
            </div>
          </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th style="min-width: 120px">Họ tên</th>
                  <th style="min-width: 80px">Chức vụ</th>
                  <th style="min-width: 110px">Số điện thoại</th>
                  <th :class="$detect == 'mobile' ? 'd-none' : ''">Email</th>
                  <th
                    :class="$detect == 'mobile' ? 'd-none' : ''"
                    style="min-width: 150px"
                  >
                    Thời gian cập nhật
                  </th>
                  <th
                    :style="
                      $route.name == 'company-information'
                        ? 'min-width: 150px'
                        : 'min-width: 100px'
                    "
                    width="150px"
                  >
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in getEmployee" :key="item.id">
                  <td>{{ item.employee_id }}</td>
                  <td class="pointer" @click="goDetail(item.id)">{{ item.name }}</td>
                  <td>{{ item.position }}</td>
                  <td>{{ item.phone }}</td>
                  <td :class="$detect == 'mobile' ? 'd-none' : ''">
                    {{ item.email }}
                  </td>
                  <td :class="$detect == 'mobile' ? 'd-none' : ''">
                    {{ item.time_updated }}
                  </td>
                  <td>
                    <button
                      class="btn btn-primary"
                      style="margin-right: 5px"
                      @click="goDetail(item.id)"
                      :disabled="loading"
                    >
                      Chi tiết
                    </button>
                    <button
                      class="btn btn-danger"
                      v-if="classify != 'ADMIN_CMS'"
                      @click="deleteEmployee(item.id)"
                      :disabled="loading"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="getEmployee.length === 0"
              class="text-center text-black-50 py-4"
            >
              Không có dữ liệu
            </div>
          </div>
        </div>
        <div class="col-12">
          <ldc-pagination
            :current_page="page"
            :last_page="total"
            :scroll_top="true"
            :callData="changePage"
            class="pt-4 border-top"
          >
          </ldc-pagination>
        </div>
      </div>
      <partnerEmployee
        :visible.sync="dialogEmployee"
        :employee="employee"
        :classify="classify"
        :status="dialogEmployeeStatus"
      >
      </partnerEmployee>
    </div>
  </div>
</template>
<script>
import {
  getEmployee,
  deleteEmployee,
  detailEmployee,
  uploadFileExcel,
  exportSample,
} from "@/repositories/employee";
export default {
  props: ["classify"],
  components: {
    partnerEmployee: () => import("./employee-partner"),
  },
  data() {
    return {
      id: this.$route.params.id,
      getEmployee: [],
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      pageSize: 0,
      loading: false,
      total: 0,
      idEmployee: "",
      keyword: "",
      dialogEmployee: false,
      dialogEmployeeStatus: "create",
      file: "",
      errors: {},
      employee: {},
      formEmployee: {
        avatar: "",
        birthday: "",
        id: "",
        id_business: "",
        id_number: "",
        labor_contract: "",
        name: "",
        name_search: "",
        other_info: "",
        phone: "",
        position: "",
        salary: "",
        salary_increase: "",
        time_created: "",
        time_to_work: "",
        time_updated: "",
      },
      v_loading: false
    };
  },
  created() {
    this.getDataEmployee();
  },
  computed: {
    query() {
      return this.$route.query;
    },
  },
  watch: {
    query(val) {
      this.getDataEmployee();
    },
  },
  methods: {
    uploadFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
      if (this.file) {
        this.uploadFileExcel(this.file).then(res => {
          this.$showMessage(res.data.message, 'success')
        }).catch(err => {
          this.$showMessage(err.data.data.message, 'warning')
        })
        this.getDataEmployee();
      }
    },
    exportSample() {
      this.v_loading = true;
      exportSample().then(res => {
        if(res.data.success === API_STATUS_SUCCESS) {
          window.open(res.data.urlDownload)
        } else {
          this.$showMessage(res.data.message, 'warning')
        }
      }).catch(err => this.v_loading = false)
      this.v_loading = false;
    },
    changePage(page) {
      this.page = page;
      this.changeUrl();
    },
    search() {
      if (this.timeOut) clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.page = 1;
        this.changeUrl();
      }, 500);
    },
    clearFilter() {
      this.keyword = '';
      this.page = 1;
      this.changeUrl();
    },
    changeUrl() {
      this.$router.push({
        name: this.$route.name,
        query: this.setQuery(),
      });
    },
    setQuery() {
      let query = {};
      if (this.keyword !== "") query.keyword = this.keyword;
      if (this.page > 1) query.page = this.page;
      return query;
    },
    goCreate() {
      if (this.$route.name == "company-information") {
        this.$router.push({
          name: "add-employee",
        });
      } else {
        this.dialogEmployee = true;
        this.dialogEmployeeStatus = "create";
      }
    },
    async deleteEmployee(id) {
      await this.$confirm(`Bạn có chắc chắn xóa `, "Xóa nhân viên", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        type: "error",
      })
        .then(async () => {
          this.loading = true;
          await deleteEmployee(id).then((res) => {
            this.$showMessage(res.data.data.message);
            this.getDataEmployee();
          });
          this.loading = false;
        })
        .catch(() => {});
    },
    async uploadFileExcel(file) {
      let file_data = new FormData();
      file_data.append("file", file);
      await uploadFileExcel(file_data).then((res) => {
        this.loading = true;
        this.$showMessage(res.data.message);
        this.loading = false;
      });
      this.file = "";
    },
    async goDetail(idEmployee) {
      if (this.$route.name == "company-information") {
        this.$router.push({
          name: "detail-employee",
          params: {
            id: idEmployee,
          },
        });
      } else if(this.$route.name == "partner-show" && this.$detect == 'mobile') {
        this.$router.push({
          name: "partner-show-emplyee",
          params: {
            id: idEmployee,
          },
        });
      } else {
        this.loading = true;
        await this.detailEmployee(idEmployee);
        this.loading = false;
        this.dialogEmployee = true;
        this.dialogEmployeeStatus = "show"
      }
    },
    getDataEmployee() {
      let query = {};
      query.id_business = this.id;
      if (this.keyword !== "") query.keyword = this.keyword;

      if (this.page > 1) query.page = this.page;
      getEmployee(query).then((res) => {
        this.getEmployee = res.data.data.data;
        let pagination = res.data.data.meta.pagination;
        this.page = pagination.current_page;
        this.pageSize = pagination.per_page;
        this.total = pagination.total_pages;
      });
    },
    async detailEmployee(idEmployee) {
      let id = idEmployee;
      await detailEmployee(id).then((res) => {
        let data = res.data.data;
        this.employee = data;
        //format date
        if (this.employee.birthday) {
          var arrDate = this.employee.birthday.split("-");
          this.employee.birthday =
            arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
        }

        if (this.employee.time_to_work) {
          var arrDate = this.employee.time_to_work.split("-");
          this.employee.time_to_work =
            arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
        }
        // }
      });
    },
    callData(e) {
      if (e) {
        this.page = 1;
        this.keyword = "";
        this.changeUrl();
        this.getDataEmployee();
      }
    },
  },
};
</script>
<style lang="scss">
.ip-excel {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  opacity: 0;
  width: 100%;
}
</style>
