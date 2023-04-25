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
import { useLoggerStore } from '../../../store/useLoggerStore';
import { ref } from 'vue';
import { TableDataType } from '../../../type/api/logger';


// 表格列表
const columns: TableColumnType<TableDataType>[] = [
	{
		title: '消息',
		dataIndex: 'msg',
		key: "msg",
	},
	{
		title: '级别',
		dataIndex: 'level',
		key: "level",
		width: "8%",
		filters: [
			{ text: 'debug', value: 'debug' },
			{ text: 'info', value: 'info' },
			{ text: 'warn', value: 'warn' },
			{ text: 'error', value: 'error' },
			{ text: 'fatal', value: 'fatal' },
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
const data = ref<TableDataType[]>();

// 日志级别以及对应的颜色map
const logLevelColor: Map<LogLevelType, string> = new Map([
	["debug", "success"],
	["info", "default"],
	["warn", "warning"],
	["error", "error"],
	['fatal', '#ff0d00']
])


const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {
	console.log('params', pagination, filters, sorter);
};



// 实例化仓库
const loggerStore = useLoggerStore()
loggerStore.getLogger()

// 监听仓库变化
loggerStore.$subscribe((mutation, state) => {
	data.value = state.logData
})
</script>

<style scoped lang="less"></style>