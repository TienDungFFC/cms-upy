<template>
  <div class="partner_area container-fluid">
    <div class="d-flex align-items-end justify-content-between flex-wrap py-3 pt-lg-0">
      <div class="flex-grow-1">
        <button v-if="$myCanCreate()" class="btn btn-success" @click="goCreate()">
          + Thêm công ty
        </button>
      </div>
      <div
        v-if="$detect == 'web'"
        class="row align-items-end flex-wrap flex-grow-1 flex-md-grow-0 pt-lg-3 pt-xl-0"
      >
        <div class="col-8 col-sm-8 pt-md-0">
          <label class="font-weight-bold">Từ khoá</label>
          <input
            v-model="keyword"
            class="form-control size-input"
            placeholder="Tìm kiếm"
            @input="search()"
          />
        </div>
        <div class="col-4 col-sm-4 pt-3 pt-md-0">
          <button
            class="btn btn-secondary"
            :disabled="keyword === ''"
            style="height: 32px; width: 100%"
            @click="clearFilter()"
          >
            Bỏ lọc
          </button>
        </div>
      </div>
    </div>
    <div input-search>
      <div content-input-search>
        <div class="position-relative">
          <input
            v-model="keyword"
            class="form-control size-input pr-4"
            placeholder="Tìm kiếm"
            @input="search()"/>
          <span
            v-if="keyword !== ''"
            class="position-absolute"
            style="top: 50%; right: 6px; transform: translateY(-50%);"
            @click="clearFilter()">
            <i class="icon ion-md-close-circle-outline" style="color: #d5d5d5; font-size: 18px;"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table :class="{'table table-striped' : true, 'table-mobile' : $detect === 'mobile'}">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên công ty</th>
                <th>Hạn mức</th>
                <th>Thời gian cập nhật</th>
                <th style="width: 100px">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in partner" :key="item.id">
                <td>{{ item.user_id }}</td>
                <td>
                  <router-link :to="goDetail(item)" class="format-link" >
                      {{ item.name }}
                  </router-link>
                </td>
                <td>
                  <span v-if="item.moneyLoanBusiness">
                    <span v-html="item.moneyLoanBusiness.data['min-text']"></span> - 
                    <span v-html="item.moneyLoanBusiness.data['max-text']"></span>
                  </span>
                  <span v-else>0</span>
                </td>
                <td>{{ item.time_updated }}</td>
                <td>
                  <router-link :to="goDetail(item)">
                    <button class="btn btn-primary">
                        Chi tiết
                    </button>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-if="partner.length === 0"
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
  </div>
</template>

<script>
import { getPartner } from "@/repositories/partner";
export default {
  data() {
    return {
      optionsActive: [
        {
          value: 1,
          label: "Hoạt động",
        },
        {
          value: 0,
          label: "Không hoạt động",
        },
      ],
      partner: [],
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      pageSize: 0,
      total: 0,
      timeOut: null,
      keyword: this.$route.query?.keyword ? this.$route.query.keyword : "",
      dialogAccount: false,
      statusDetailAccount: "create",
      accountShow: {},
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
  },
  watch: {
    query(val) {
      this.getData();
    },
  },
  created() {
    this.getData();
  },
  methods: {
    changePage(page) {
      this.page = page;
      this.changeUrl();
    },
    changeUrl() {
      this.$router.push({
        name: "partner",
        query: this.setQuery(),
      });
    },
    setQuery() {
      let query = {};
      if (this.keyword !== "") query.keyword = this.keyword;
      if (this.page > 1) query.page = this.page;
      return query;
    },
    clearFilter() {
      this.keyword = "";
      this.page = 1;
      this.changeUrl();
    },
    getData() {
      let query = {};
      if (this.keyword !== "") query.keyword = this.keyword;
      if (this.page > 1) query.page = this.page;
      getPartner(query).then((res) => {
        this.partner = res.data.data;
        let pagination = res.data.meta.pagination;
        this.page = pagination.current_page;
        this.pageSize = pagination.per_page;
        this.total = pagination.total_pages;
      });
    },
    search() {
      if (this.timeOut) clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.page = 1;
        this.changeUrl();
      }, 500);
    },
    goCreate() {
      let query = {};
      this.$router.push({
        name: "partner-add",
        query: {
          redirect: this.$encodeRedirect(query),
        },
      });
    },
    goDetail(account) {
      return {
        name: 'partner-show',
        params: {
          id: account.id,
        },
        query: {
          redirect: this.$encodeRedirect(this.setQuery())
        }
      }
    },
    callData(e) {
      if (e) {
        this.page = 1;
        this.keyword = "";
        this.changeUrl();
        this.getData();
      }
    },
  },
};
</script>

<style lang="scss">
.partner_area {
  background: #fff;
  border-radius: 5px;
  .header {
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 20px;
    .filter {
      margin-left: -10px;
      margin-right: -10px;
      .filter-item {
        padding-left: 10px;
        padding-right: 10px;
        h2 {
          color: #333;
          padding-bottom: 5px;
        }
      }
    }
  }
  .d-flex {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .el-pagination {
    padding: 15px;
    padding-bottom: 0;
    text-align: right;
  }
  .el-table thead {
    color: #333;
  }
  .table-mobile {
    table-layout: fixed;
    th,td {
        width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        &:first-child {
            width: 70px;
        }
        &:last-child {
            width: 100px;
        }
    }
  }
}
</style>