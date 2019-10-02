<template>
  <a-form>
    <a-form-item class="align-items-middle">
      <a-upload
        listType="picture-card"
        class="avatar-uploader"
        :showUploadList="false"
        :beforeUpload="uploadAvatar"
        @change="handleChangeAvatar"
      >
        <img
          v-if="avatar && avatar.image_url"
          :src="avatar.image_url"
          :alt="avatar.image_url"
        />
        <div v-else>
          <a-icon v-if="loading_avatar" type="loading" />
          <div v-else>Upload Avatar</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item
      label="Email"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input v-model="details.user.email" disabled placeholder="Email" />
    </a-form-item>
    <a-form-item
      label="First Name"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input v-model="details.user.name.first" disabled placeholder="First Name" />
    </a-form-item>
    <a-form-item
      label="Middle Name"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input v-model="details.user.name.middle" placeholder="Middle Name" />
    </a-form-item>
    <a-form-item
      label="Last Name"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input v-model="details.user.name.last" disabled placeholder="Last Name" />
    </a-form-item>
    <a-button style="float: right" :loading="loading" type="primary" @click="$emit('next', 1)">Next</a-button>
  </a-form>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default: () => {
        return { user: { avatar: {}, name: {} } };
      }
    },
    avatar: {
      type: Object,
      default: () => {
        return { image_url: '', form_data: '' };
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading_avatar: false,
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 18
        }
      }
    };
  },
  methods: {
    handleChangeAvatar(info) {
      if (info.file.status === "uploading") {
        this.loading_avatar = true;
        return;
      }
    },
    uploadAvatar(file) {
      var form_data = new FormData();
      form_data.append("avatar", file, file.name);
      this.avatar.form_data = form_data;
      this.getBase64(file, image_url => {
        this.avatar.image_url = image_url;
        this.loading_avatar = false;
      });
    }
  }
};
</script>

<style>
.avatar-uploader img {
  width: 110px;
}

.align-items-middle {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>