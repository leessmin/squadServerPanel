<template>
    <a-menu v-model:selectedKeys="current" mode="horizontal">
        <a-menu-item key="GSNormal">
            <template #icon>
                <mail-outlined />
            </template>
            常规配置
        </a-menu-item>
        <a-menu-item key="mail">
            <template #icon>
                <mail-outlined />
            </template>
            常规配置
        </a-menu-item>
    </a-menu>
</template>

<script setup>
import { MailOutlined } from '@ant-design/icons-vue';
</script>

<style lang="less" scoped>

</style>