<template>
    <!--  控制面板 index页面  -->

    <a-layout>
        <a-layout-sider class="index-menu">
            <Menu></Menu>
        </a-layout-sider>
        <a-layout>
            <!-- <a-layout-header>Header</a-layout-header> -->
            <a-layout-content>
                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer>Footer</a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
import Menu from './components/Menu.vue';

</script>

<style scoped>
main {
    padding: 20px;
    box-sizing: content-box;
}

.index-menu {
    position: sticky;
    top: 0;
    height: 100vh;
}
</style>