<template>
  <div>
    <el-button type="primary" @click="startTime">上班打卡</el-button>
    <el-button type="primary" @click="endTime">下班打卡</el-button>
  </div>
</template>

<script>
import { AddPunch } from "@/api/punch.js";
import { getUsername } from "@/utils/cookies";
import { formatDate } from "@/utils/time";
export default {
  data() {
    return {
      username: getUsername()
    };
  },
  methods: {
    startTime() {
      let requestData = {
        staff_name: this.username,
        type: 1,
        start_date: formatDate(new Date().getTime()),
        start_time: new Date().getTime(),
        splice_date: formatDate(new Date().getTime()).split(" ")[0]
      };

      AddPunch(requestData).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    endTime() {
      let requestData = {
        staff_name: this.username,
        type: 2,
        end_date: formatDate(new Date().getTime()),
        end_time: new Date().getTime(),
        splice_date: formatDate(new Date().getTime()).split(" ")[0]
      };

      AddPunch(requestData).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
