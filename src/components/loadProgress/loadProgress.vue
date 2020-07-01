<template>
    <div class="loadings" v-if="showCom">
      <div class="ComName">
        <el-row>
          <el-col :span="21">{{ComName}}</el-col>
          <el-col :span="3">{{progress}}%</el-col>
        </el-row>
      </div>
      <el-progress
        class="progressbar"
        id="loading"
        :text-inside="false"
        :stroke-width="15"
        :percentage="progress"
      ></el-progress>
    </div>
</template>

<script>
  export default {
    name: 'loadProgress',
    props: {
      // 是否展示loadings组件
      showCom: {
        type: Boolean,
        default: true
      },
      // 进度名称
      ComName: {
        type: String,
        default: ''
      },
      // 进度
      progress: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="scss" >
  .loadings {
    width: px2rem(400);
    height: px2rem(150);
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgb(216, 216, 216);

    .progressbar {
      width: px2rem(380);
      margin: 0 auto;

      .el-progress__text {
        display: none;
      }

      .el-progress-bar {
        padding: 0;
        margin: 0;

        .el-progress-bar__outer {
          border-radius: px2rem(5);

          .el-progress-bar__inner {
            border-radius: px2rem(5);
          }
        }
      }
    }

    .ComName {
      color: gray;
      text-align: left;
      margin-top: px2rem(10);
      padding: px2rem(20) px2rem(14);
      border-radius: px2rem(30);
    }
  }
</style>
