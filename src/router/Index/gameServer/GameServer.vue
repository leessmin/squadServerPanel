<template>
    <!-- 游戏服务设置 -->
    <main>
        <SectionPanel class="mt-zero">
            <GameServerMenu></GameServerMenu>
        </SectionPanel>

        <SectionPanel>
            <router-view></router-view>
        </SectionPanel>
    </main>
</template>

<script setup>
import SectionPanel from '../../../components/SectionPanel.vue';
import GameServerMenu from '../../../components/GameServerMenu.vue'


</script>

<style lang="less" scoped>

</style>