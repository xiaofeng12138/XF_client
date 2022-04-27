<template>
  <div>
    <!-- 搜索框接收配置选项 -->
    <formSearch
      v-if="table_config.show_formSearch"
      :formItem="table_config.form_item"
      :formHander="table_config.form_hander"
      :buttonConfig="table_config.button_config"
      @componentFn="componentsChild"
    />
    <slot name="content"></slot>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-loading="tableLoading"
      element-loading-text="数据加载中"
    >
      <el-table-column
        v-if="table_config.checkbox"
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <template v-for="(item, index) in table_config.thead">
        <el-table-column
          v-if="item.type == 'function'"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span
              v-html="item.callback && item.callback(scope.row, item.prop)"
            ></span>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type == 'slot'"
          :prop="item.prop"
          :label="item.label"
          align="center"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>

        <!-- switch封装 -->
        <el-table-column
          v-else-if="item.type == 'switch'"
          :prop="item.prop"
          :label="item.label"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="item.hander && item.hander($event, scope.row)"
              v-model="scope.row[item.prop]"
              :active-value="item.activeValue || true"
              :inactive-value="item.inactiveValue || false"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
            <slot
              :name="item.slotName"
              :data="scope.row"
              :type="item.prop"
            ></slot>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type == 'image'"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :width="item.width"
        >
          <template slot-scope="scope">
            <img
              :src="scope.row[item.prop]"
              :width="item.imgWidth || 50"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type == 'operation'"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :width="item.width"
        >
          <template slot-scope="scope">
            <template v-for="(button, index) in item.buttonGroup">
              <el-button
                v-if="button.event === 'button'"
                :key="index"
                size="mini"
                :type="button.type"
                @click="button.hander && button.hander(scope.row)"
                class="mr-10"
              >
                {{ button.label }}
              </el-button>
              <router-link
                v-else
                :to="{
                  name: button.name,
                  query: {
                    [button.key || 'id']: scope.row[button.value || 'id']
                  }
                }"
                class="mr-10"
              >
                <el-button :type="button.type" size="mini">{{
                  button.label
                }}</el-button>
              </router-link>
            </template>
            <!-- <template v-if="item.defaultBtn && item.defaultBtn.editBtn">
                                <el-button  size="mini" v-if="item.defaultBtn.defaultClick" @click="editFn(scope.row[item.defaultBtn.defaultParams || 'id'],item.defaultBtn.routerLink)">编辑</el-button>
                                <router-link  v-else :to="{name:item.defaultBtn.routerLink,query:{[item.defaultBtn.defaultParams || 'id']:scope.row.id}}" class="mr-10">
                                       <el-button  size="mini" >编辑</el-button>
                                </router-link>
                            </template> -->
            <!-- 删除按钮 -->
            <el-button
              size="mini"
              type="danger"
              v-if="item.defaultBtn && item.defaultBtn.deleteBtn"
              @click="delFn(scope.row[item.defaultBtn.deleteParams || 'id'])"
              >删除</el-button
            >
            <!-- 定义按钮 -->
            <slot
              v-if="item.slotName"
              :name="item.slotName"
              :data="scope.row"
            ></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          align="center"
        >
        </el-table-column>
      </template>
    </el-table>
    <el-row class="padding-top-25">
      <el-col :span="4"><div style="padding:5px"></div></el-col>
      <el-col :span="20">
        <el-pagination
          v-if="table_config.pagination"
          class="pull-right"
          background
          layout="total,prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { tableLoad, deleteFn } from "@/api/common.js";
import formSearch from "../formSearch/index";
export default {
  components: { formSearch },
  props: {
    configTable: {
      type: Object,
      default: () => ({})
    },
    searchFromConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // form_item:[
      //     { label:'城市', type:'city'},
      //     { label:'类型', prop:'type' ,type:'select',width:'120px',options:"parking_type"},
      //     { label:'禁启用', prop:'status' , type:'select',width:'120px',options:"brand_status"},
      //     { label:'关键字',type:'keyword'},
      // ],
      form_data: {
        type: "",
        status: ""
      },

      tableLoading: false, //表格加载loading
      tableData: [],
      table_config: {
        isRequest: true, //第一次进入是否加载数据
        thead: [], //表头
        checkbox: true, //是否显示多选框
        url: "", //页面请求地址
        pagination: true, //是否显示分页
        data: {}, //表格数据
        show_formSearch: true, //s是否显示表头搜索选项
        form_item: [], //表头搜索框内容
        button_config: {
          //按钮组
          resetButton: false
        },
        form_hander: []
      },
      total: 0
    };
  },
  methods: {
    //子组件调用父组件的方法
    componentsChild(params) {
      this[params.function](params.data);
    },
    search(data) {
      let requsetData = data;
      requsetData.pageNumber = 1;
      requsetData.pageSize = 100;
      this.requestLoadData(requsetData);
    },
    editFn(id, url) {
      this.$router.push({
        name: url,
        query: { id }
      });
    },
    handleCurrentChange(page) {
      console.log(page);
    },
    initTableData() {
      let requsetData = {
        url: this.table_config.url,
        data: this.table_config.data
      };
      tableLoad(requsetData).then(res => {
        let data = res.data;
        if (res.data.data) {
          this.tableLoading = false;
          this.tableData = data.data;
          this.total = data.total;
        }
      });
    },
    initConfigData() {
      for (let key in this.configTable) {
        if (Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.configTable[key];
        }
      }
      if (this.table_config.isRequest) {
        this.initTableData();
      }
    },
    //数据请求函数
    requestLoadData(params) {
      if (params) {
        this.table_config.data = params;
        this.initTableData();
      } else {
        this.initTableData();
      }
    },
    //删除函数
    delFn(row) {
      console.log(row);
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let requset = {
            url: this.table_config.url + "Delete",
            data: { id: row }
          };
          deleteFn(requset).then(res => {
            if (res.resCode == 0) {
              this.$message({
                type: "success",
                message: res.message
              });
              this.initTableData();
            }
          });
        })
        .catch(() => {});
    }
  },
  watch: {
    configTable: {
      handler(newValue) {
        this.initConfigData();
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.mr-10 {
  margin-right: 15px;
}
</style>
