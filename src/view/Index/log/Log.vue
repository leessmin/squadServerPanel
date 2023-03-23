<template>
    <!-- 日志页面 -->
    <main>
        <SectionPanel class="mt-zero">
            <div class="title-box">
                <h3>日志</h3>
            </div>

            <a-table :columns="columns" :data-source="data" @change="onChange">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'level'">
                        <a-tag :color="logLevelColor.get(record.level)">{{ record.level }}</a-tag>
                    </template>
                </template>
            </a-table>
        </SectionPanel>
    </main>
</template>

<script setup lang="ts">
import SectionPanel from '../../../components/Section/SectionPanel.vue';
import type { TableColumnType, TableProps } from 'ant-design-vue';
import { LogLevelType } from '../../../type/log/log';

// 表格数据类型
type TableDataType = {
    key: string;
    message: string;
    time: string;
    level: LogLevelType;
};

// 表格列表
const columns: TableColumnType<TableDataType>[] = [
    {
        title: '消息',
        dataIndex: 'message',
        key: "message",
    },
    {
        title: '级别',
        dataIndex: 'level',
        key: "level",
        width: "8%",
        filters: [
            { text: 'DEBUG', value: 'DEBUG' },
            { text: 'INFO', value: 'INFO' },
            { text: 'WARN', value: 'WARN' },
            { text: 'ERROR', value: 'ERROR' },
            { text: 'FATAL', value: 'FATAL' },
        ],
        onFilter: (value: string | number | boolean, record: TableDataType) => value === record.level
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: "time",
        width: "10%"
    },

];

// 表格数据
const data: TableDataType[] = [
    {
        key: '1',
        message: "登录",
        time: "2023.03.23 21:23:55",
        level: 'INFO'
    },
    {
        key: '2',
        message: "失败的登录",
        time: "2023.03.23 21:23:55",
        level: 'ERROR'
    },
    {
        key: '3',
        message: "发生了未知的错误",
        time: "2023.03.23 21:23:55",
        level: 'FATAL'
    },
];

// 日志级别以及对应的颜色map
const logLevelColor: Map<LogLevelType, string> = new Map([
    ["DEBUG", "success"],
    ["INFO", "default"],
    ["WARN", "warning"],
    ["ERROR", "error"],
    ['FATAL', '#ff0d00']
])


const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};
</script>

<style scoped lang="less"></style>