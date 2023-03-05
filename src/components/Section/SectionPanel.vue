<template>
    <!-- section插槽 -->
    <section>
        <slot></slot>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
section {
    width: 95%;
    padding: 10px;
    box-sizing: content-box;
    background-color: var(--component-background);
    border-radius: 4px;
    margin: 20px auto 0;
}
</style>