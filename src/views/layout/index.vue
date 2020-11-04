
<template>
  <el-container class="layout-container">
    <el-header class="header">
      <h1>今日头条管理系统
        <i
        :class="{
              'el-icon-s-fold': isCollapse,
              'el-icon-s-unfold': !isCollapse
            }"
        @click="isCollapse = !isCollapse"
      ></i>
      </h1>

      <el-dropdown>
        <div class="avatar-wrap">
          <img class="avatar" :src="user.photo" alt srcset />
          <span>{{user.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <!--
              组件默认是不识别原生事件的，除非内部做了处理
              https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6
          -->
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
          class="nav-menu el-menu-vertical-demo"
          :default-active="$route.path"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :collapse="isCollapse"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="iconfont iconimage"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="iconfont iconpublish"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="iconfont iconcomment"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-setting"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/settings">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserProfile } from "@/api/user";
export default {
  name: "Layout",
  data() {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边菜单栏的展示状态
    };
  },
  created() {
    this.loadUserProfile(); //组件初始化好，请求获取用户资料
  },
  methods: {
    // 除了登录接口，其它所有接口都需要授权才能请求使用
    // 或者说，除了登录接口，其它接口都需要提供你的身份令牌才能获取数据
    loadUserProfile() {
      getUserProfile().then(res => {
        this.user = res.data.data;
        // console.log(res);
      });
    },
    //登出功能
    logout() { 
      this.$confirm("确认退出吗？", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 把用户的登录状态清除
          window.localStorage.removeItem("user");

          // 跳转到登录页面
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less" >
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .header {
    width: 100%;
    height: 50px;
    background-color: #002033;
    border-bottom: 1px solid #fff;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .avatar-wrap {
      display: flex;
      align-items: center;
      color: #fff;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

    .nav-menu {
      height: 100%;
      .iconfont {
        margin-right: 10px;
        padding-left: 5px;
      }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  }
  .main{
    background-color: rgb(223, 230, 231);
    padding: 10px;

  }
}
</style>