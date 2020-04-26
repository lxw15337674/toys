<template>
  <div class="file-upload">
    <el-upload
      v-on="$listeners"
      v-bind="$attrs"
      ref="upload"
      :on-progress="uploadProcess"
      :show-file-list="false"
      :before-upload="beforeUpload"
      multiple
    >
      <slot>
        <el-button type="primary" size="small" icon="el-icon-upload2">上传 </el-button>
      </slot>
    </el-upload>
    <!--      右下方文件上传列表-->
    <el-card class="upload-card" :style="{ bottom: uploadCardBottom }" v-show="uploadCardShow">
      <div slot="header">
        <span style="font-size: 15px;line-height: 24px;">上传列表 </span>
        <div style="float:right">
          <el-button
            :icon="uploadCardBottom !== '0' ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            circle
            size="mini"
            @click="minimizeUploadList"
          ></el-button>
          <el-button icon="el-icon-close" circle size="mini" @click="closeUploadList"></el-button>
        </div>
      </div>
      <div v-for="(file, index) in uploadFileList" :key="index">
        <el-row>
          <el-col :span="13">{{ file.name }}</el-col>
          <el-col :span="4">{{ sizeTransformation(file.size) }}</el-col>
          <el-col :span="5">{{ file.uploadSpeed }}/s</el-col>
        </el-row>
        <el-progress :percentage="file.percent" :color="customColorMethod"></el-progress>
        <br />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    //大小限制,以MB为单位
    fileSizeLimit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      uploadCardShow: false,
      uploadFileList: {},
      fileList: [],
      // 用于上传列表的显隐
      uploadCardBodyHeight: '0',
      uploadCardBottom: '0',
    };
  },
  computed: {
    sizeLimit() {
      return this.fileSizeLimit * 1024 * 1024;
    },
  },
  methods: {
    customColorMethod(percentage) {
      if (percentage === 0) {
        return '#f56c6c';
      } else if (percentage < 100) {
        return '#409eff';
      } else {
        return '#67c23a';
      }
    },
    closeUploadList() {
      this.uploadCardShow = false;
    },
    minimizeUploadList() {
      // 判断隐藏还是显示
      if (this.uploadCardBottom === '0') {
        //  记录body高度用于隐藏。
        this.uploadCardBodyHeight =
          document.getElementsByClassName('el-card')[0].offsetHeight -
          document.getElementsByClassName('el-card__header')[0].offsetHeight;
        this.uploadCardBottom = `-${this.uploadCardBodyHeight}px`;
      } else {
        this.uploadCardBottom = '0';
      }
    },
    // 上传事件监听
    uploadProcess(event, file, fileList) {
      let uploadFile = this.uploadFileList[file.name];
      // 计算上传速度
      // 通过判断时间戳判断是否为第一次计算

      if (uploadFile.timeStamp === 0) {
        // 先计算出上传速度，再记录第一次时间戳和已上传大小
        uploadFile.uploadSpeed = this.sizeTransformation(event.loaded);
      } else {
        // 通过差值计算出上传速度
        let timeDifference = event.timeStamp - uploadFile.timeStamp;
        let sizeDifference = event.loaded - uploadFile.loaded;

        uploadFile.uploadSpeed = this.sizeTransformation(sizeDifference / (timeDifference / 1000));
      }
      // 记录本次监听的时间戳和已上传大小
      uploadFile.timeStamp = event.timeStamp;
      uploadFile.loaded = event.loaded;

      //  上传进度
      uploadFile.percent = parseInt(event.percent, 10);
    },
    beforeUpload(file) {
      // 文件大小限制
      if (file.size > this.sizeLimit) {
        this.$notify({
          message: `${file.name}文件超过${this.fileSizeLimit}MB大小限制`,
          type: 'error',
        });
        return false;
      }
      // 文件格式限制
      let fileSuffixs = file.name.split('.').pop();
      if (this.$refs.upload.accept && this.$refs.upload.accept.indexOf(fileSuffixs) === -1) {
        this.$notify({
          message: `${file.name}文件上传失败，不能上传${fileSuffixs}格式文件`,
          type: 'error',
        });
        return false;
      }
      let fileObj = {
        name: file.name,
        size: file.size,
        percent: 0,
        uploadSpeed: '0',
        timeStamp: 0,
        loaded: 0,
      };
      this.$set(this.uploadFileList, fileObj.name, fileObj);
      // 处理上传列表card样式
      this.uploadCardShow = true;
      if (this.uploadCardBottom !== '0') {
        this.minimizeUploadList();
      }
      return true;
    },

    // 文件大小转换
    sizeTransformation(size) {
      let result;
      if (size < 0.1 * 1024) {
        result = size.toFixed(2) + 'B';
      } else if (size < 0.1 * 1024 * 1024) {
        result = (size / 1024).toFixed(2) + 'KB';
      } else {
        result = (size / 1024 / 1024).toFixed(2) + 'MB';
      }
      return result;
    },
  },
};
</script>

<style lang="stylus" scoped>
.file-upload {
  .upload-card {
    position: fixed;
    right: 20px;
    width 600px
    z-index: 1024
    >>> .el-card__body {
      max-height 600px;
      overflow-y auto;
      padding: 7px 20px;
    }
  }
}
</style>
