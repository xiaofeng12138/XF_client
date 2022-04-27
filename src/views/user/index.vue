<template>
  <div class="wrap">
    <div class="tableList">
      <el-table border :data="tableData" style="width:100%">
        <template v-for="(item, index) in tableConfig">
          <el-table-column
            v-if="item.slotName == 'num'"
            :key="index"
            :width="item.width || ''"
            :label="item.label"
            align="center"
          >
            <template slot-scope="scope">
              {{ (pageNum - 1) * pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>

          <el-table-column
            v-else-if="item.slotName == 'operate'"
            :key="index"
            :width="item.width || ''"
            :label="item.label"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                v-if="userRole == 0"
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
                >{{ scope.row.status == 1 ? "禁用" : "激活" }}</el-button
              >
              <el-button
                v-if="userRole == 0"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.slotName == 'switch'"
            :key="index"
            :prop="item.prop"
            :width="item.width || ''"
            :label="item.label"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.job_status === 0 ? true : false"
                @change="changeStatus(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column
            v-else
            :key="index"
            :prop="item.prop"
            :width="item.width || ''"
            :label="item.label"
            align="center"
            :formatter="item.FormatterFn"
          >
          </el-table-column>
        </template>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next,total"
        :total="this.total"
        @current-change="currentPageChange"
        style="float:right;margin-top:20px"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getRole } from "@/utils/cookies.js";
import { queryUserList, delUser, useUser } from "@/api/user.js";
export default {
  data() {
    return {
      userRole: getRole(),
      total: 0,
      radio: "1",
      updateId: "",
      showModal: false,
      pageNum: 1,
      pageSize: 10,
      searchModel: {
        staff_name: "",
        staff_status: ""
      },
      tableData: [],
      tableConfig: [
        {
          slotName: "num",
          label: "序号",
          width: "80"
        },
        {
          label: "用户名",
          prop: "username"
        },

        {
          label: "角色",
          prop: "role",
          FormatterFn: value => {
            return value.role == 0 ? "管理员" : "一般用户";
          }
        },
        {
          label: "注册时间",
          prop: "time"
        },
        {
          label: "用户状态",
          prop: "status",
          FormatterFn: value => {
            return value.status == 0 ? "未激活" : "已激活";
          }
        },

        {
          slotName: "operate",
          label: "操作"
        }
      ],
      filterDepList: [],
      filterJobList: []
    };
  },

  methods: {
    //用户激活接口
    handleEdit(index, row) {
      console.log(row);
      let data = {
        user_id: row.user_id,
        status: row.status == 1 ? 0 : 1
      };
      useUser(data).then(res => {
        if (res.data.code == "200") {
          this.$message.success(res.data.msg);
          this.queryUserListFn();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //分页
    currentPageChange(page) {
      this.pageNum = page;
      this.queryStaffList();
    },

    handleDelete(index, row) {
      this.$confirm("是否确认当前用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      })
        .then(() => {
          let data = {
            user_id: row.user_id,
            role: row.role
          };
          delUser(data).then(res => {
            if (res.data.code == "200") {
              this.$message.success(res.data.msg);
              this.queryUserListFn();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {});
    },

    //职位列表查询
    queryUserListFn() {
      queryUserList().then(res => {
        console.log(res.data);
        this.tableData = res.data.data;
        this.total = res.data.count;
      });
    }
  },
  mounted() {
    this.queryUserListFn();
  }
};
</script>

<style lang="scss">
.search_wrap {
  height: 70px;
  width: 100%;
}
</style>
