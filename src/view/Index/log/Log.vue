<template>
    <!-- 日志页面 -->
    <main>
        <SectionPanel class="mt-zero">
            <div class="title-box">
                <h3>日志</h3>
            </div>

            <a-table :columns="columns" :data-source="data" @change="onChange" />
        </SectionPanel>
    </main>
</template>

<script setup lang="ts">
import SectionPanel from '../../../components/Section/SectionPanel.vue';
import type { TableColumnType, TableProps } from 'ant-design-vue';

type TableDataType = {
    key: string;
    message: string;
    time: string;
    level: number;
};

const columns: TableColumnType<TableDataType>[] = [
    {
        title: '消息',
        dataIndex: 'message',
    },
    {
        title: '级别',
        dataIndex: 'level',
    },
    {
        title: '时间',
        dataIndex: 'time',
    },

];

const data: TableDataType[] = [
    {
        key: '1',
        message: "登录",
        time: "2023.03.23",
        level: 1
    },
];


const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};
</script>

<style scoped lang="less"></style>