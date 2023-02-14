<template>
    <!--  控制面板 index页面  -->
    <a-row type="flex">
        <a-col flex="180px" style="height: 100vh;">

            <Menu></Menu>

        </a-col>
        <a-col flex="auto">
            <router-view></router-view>
        </a-col>
    </a-row>
</template>

<script setup>
import Menu from "../../components/Menu.vue";
</script>

<style scoped>
main{
    padding: 20px;
    box-sizing: content-box;
}
</style>
