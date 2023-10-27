<script setup lang="ts">
const { $isMobile, $isDesktop } = useNuxtApp();
</script>

<template>
  <footer class="bg-white">
    <div class="container">
      <div class="context">
        <div>
          © 2017-2023 鱼七博客
        </div>
        <div class="justify-end">
          定期更新教程
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="less">
.bg-white {
  background-color: #ffffff;
  height: 70px;

  .context {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    font-size: .875rem;
    color: #676767;

    div {
      a {
        color: #1677ff;
        &:hover {
          color: rgba(50, 194, 124, 0.58);
        }
      }
    }

    ul {
      display: flex;
      align-items: center;

      li {
        a {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>