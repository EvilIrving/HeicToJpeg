<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>



<style>
:root {
  --height: 200px;
}

.primary-btn {
  /* 设置按钮的背景颜色和文本颜色  */
  background-color: #00c853;
  color: #fff;

  /* 设置按钮的边框和圆角 */
  border: none;
  border-radius: 5px;

  /* 设置按钮的内边距和外边距 */
  padding: 10px 20px;
  margin: 10px;

  /* 设置按钮的文字样式 */
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;

  /* 设置按钮的阴影效果 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(0);

  /* 设置按钮的鼠标悬停样式 */
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-btn:hover {
  /* 鼠标悬停时改变按钮的位置和阴影效果 */
  transform: translateY(-3px);
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.4), 0px 4px 6px rgba(0, 0, 0, 0.3);
}
</style>
