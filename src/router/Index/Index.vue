<template>
    <!--  控制面板 index页面  -->
    <a-row type="flex">
        <a-col class="index-menu" flex="180px" style="height: 100vh;">

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

<style scoped lang="less">
main {
    padding: 20px;
    box-sizing: content-box;
}

.index-menu {
        position: sticky;
        top: 0;
    }
</style>
