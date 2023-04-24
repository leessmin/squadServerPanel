<template>
	<!-- 封禁 -->
	<main>
		<SectionPanel class="mt-zero">
			<div class="title-box">
				<h3>封禁</h3>
			</div>

			<div class="btn-box">
				<div style="margin-right: 10px;">
					<a-button type="primary" danger :disabled="!hasSelected" :loading="deleteSelect.loading"
						@click="deleteArr">
						删除
					</a-button>
					<span style="margin-left: 8px">
						<template v-if="hasSelected">
							{{ `选中 ${deleteSelect.selectedRowKeys.length} 行` }}
						</template>
					</span>
				</div>
				<a-tooltip placement="topLeft" title="当封禁时间为空时，将永久封禁">
					<a-button type="primary" class="editable-add-btn" @click="addHandle">添加</a-button>
				</a-tooltip>
			</div>

			<div class="table">
				<a-table :columns="columns" :data-source="dataSource" bordered :pagination="pagination"
					:row-selection="{ selectedRowKeys: deleteSelect.selectedRowKeys, onChange: onSelectChange }"
					@change="changePagination" :scroll="{ x: 1000 }">

					<template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
						<div style="padding: 8px">
							<a-input ref="searchInput" :placeholder="`搜索 ${column.title}`" :value="selectedKeys[0]"
								style="width: 188px; margin-bottom: 8px; display: block"
								@change="(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
								@pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
							<a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
								@click="handleSearch(selectedKeys, confirm, column.dataIndex)">
								<template #icon>
									<SearchOutlined />
								</template>
								搜索
							</a-button>
							<a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
								重置
							</a-button>
						</div>
					</template>

					<template #bodyCell="{ column, text, record }">
						<template v-if="column.dataIndex === 'steamName'">
							<div
								:style="{ color: record.steamName == '' ? 'var(--ant-primary-color)' : 'var(--text-color)' }">
								{{ record.steamName || '未找到该steamID下的信息' }}
							</div>
						</template>
						<template v-else-if="['steamId'].includes(column.dataIndex)">
							<div>
								<div v-if="editableData[record.key]">
									<a-input v-if="text.length == 0"
										v-model:value="editableData[record.key][(column.dataIndex as keyof BanerData)]"
										style="margin: -5px 0" />
									<template v-else>
										{{ text }}
									</template>
								</div>
								<template v-else>
									{{ text }}
								</template>
							</div>
						</template>
						<template v-else-if="['info'].includes(column.dataIndex)">
							<div>
								<a-input v-if="editableData[record.key]"
									v-model:value="editableData[record.key][(column.dataIndex as keyof BanerData)]"
									style="margin: -5px 0" />
								<template v-else>
									{{ text }}
								</template>
							</div>
						</template>
						<template v-else-if="column.dataIndex === 'bansTime'">
							<a-date-picker v-if="editableData[record.key]"
								v-model:value="editableData[record.key][(column.dataIndex as keyof BanerData)]" show-time
								placeholder="选择封禁结束时间" />
							<div v-else>
								{{
									record.bansTime == null || record.bansTime.unix() == 0 ?
									'永久封禁'
									:
									record.bansTime.format('YYYY-MM-DD HH:mm:ss')
								}}
							</div>
						</template>
						<template v-else-if="column.dataIndex === 'operation'">
							<div class="editable-row-operations" style="display: inline-block;">
								<span v-if="editableData[record.key]">
									<a-typography-link @click="save(record.key)"
										style="margin-right: 10px;">保存</a-typography-link>
									<a-popconfirm title="你确定要取消吗" @confirm="cancel(record.key)" okText="确定" cancelText="取消">
										<a>取消</a>
									</a-popconfirm>
								</span>
								<span v-else>
									<a @click="edit(record.key)">编辑</a>
								</span>
							</div>
							<div class="delete" style="display: inline-block;">
								<a-popconfirm title="你确定要删除吗" ok-text="确定" cancel-text="取消"
									@confirm="deleteHandle(record.key)">
									<a-button type="link" danger>删除</a-button>
								</a-popconfirm>
							</div>
						</template>
					</template>
				</a-table>
			</div>
		</SectionPanel>
	</main>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash-es';
import { computed, reactive, ref, UnwrapRef } from 'vue';
import { BanerData } from '../../../type/ban/ban';
import SectionPanel from '../../../components/Section/SectionPanel.vue';
import { useBansStore } from '../../../store/useBansStore';





// 表格配置
const columns = [
	{
		title: 'steam昵称',
		dataIndex: 'steamName',
		width: '25%',
		fixed: 'left',
		// 配置可搜索
		customFilterDropdown: true,
		onFilter: (value: string, record: BanerData) => record.steamName.toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible: boolean) => {
			if (visible) {
				setTimeout(() => {
					searchInput.value.focus();
				}, 100);
			}
		},
	},
	{
		title: 'steamID',
		dataIndex: 'steamId',
		width: '25%',
	},
	{
		title: '原因',
		dataIndex: 'info',
		width: '20%',
	},
	{
		title: '封禁时间',
		dataIndex: 'bansTime',
		// 排序
		sorter: (a: BanerData, b: BanerData) => Number(a.bansTime) - Number(b.bansTime),
	},
	{
		title: '操作',
		dataIndex: 'operation',
		fixed: 'right',
	}
];


// 数据源
const dataSource = ref<BanerData[]>([])
// 编辑的数据
const editableData: UnwrapRef<Record<string, BanerData>> = reactive({})



// 编辑
const edit = (key: string) => {
	editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);

	// 判断是否为永久封禁，如果为永久封禁 则为null
	editableData[key].bansTime = editableData[key].bansTime?.unix() == 0 ? null : editableData[key].bansTime
};

// 保存
const save = (key: string) => {
	// 保存之前判断是否填写完毕
	let temp = editableData[key]

	if (temp.steamId == '' || temp.info == '') {
		message.warning('信息填写不完整');

		return
	}



	// 向服务器发送数据
	bansStore.addEditBans(temp)



	// 保存至 原始数据
	Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
	delete editableData[key];
};

// 取消
const cancel = (key: string) => {
	// 取消前判断 原始数据是否为空，如果为空说明这条数据是添加的，为空则删除
	dataSource.value = dataSource.value.filter((item) => {

		// 找到该数据
		if (key === item.key) {

			// 判断该数据是否为空
			if (item.steamId == '') {
				return false
			}
		}


		return true
	})

	delete editableData[key];
};

// 删除
const deleteHandle = (key: string) => {

	// 删除的 玩家 id
	let steamIds: string[] = []

	dataSource.value = dataSource.value.filter((value) => {
		// 判断是否为删除的对象
		if (value.key == key) {
			// 存储要删除的 对象 steamId
			steamIds.push(value.steamId)
		}

		return value.key !== key
	})

	bansStore.delBans(steamIds)
}

// 添加 按钮 回调
function addHandle() {
	console.log("添加");

	// 获取添加的数据下标
	let index = `${Number(dataSource.value[dataSource.value.length - 1].key) + 1}`

	// 添加 临时 数据
	editableData[index] = {
		key: index,
		steamName: ``,
		steamId: '',
		info: '',
		bansTime: null,
	}



	// 向数据源最加数据
	dataSource.value.push(cloneDeep(editableData[index]))

	// 跳转至最后一页
	pagination.current = Math.ceil(dataSource.value.length / pagination.defaultPageSize)
}



// 通过 steamName 搜索列表
// 搜索框的内容
const searchInput = ref();

// 搜索
const handleSearch = (selectedKeys: string, confirm: Function, dataIndex: string) => {
	confirm();
};

// 重置搜索
const handleReset = (clearFilters: Function) => {
	clearFilters({
		confirm: true,
	});
};



// 批量选择
const deleteSelect = reactive<{
	selectedRowKeys: string[]
	loading: boolean
}>({
	selectedRowKeys: [],
	// Check here to configure the default column
	loading: false,
})

// 选中的行数
const hasSelected = computed(() => deleteSelect.selectedRowKeys.length > 0);

// 选中的行
const onSelectChange = (selectedRowKeys: string[]) => {
	console.log('selectedRowKeys changed: ', selectedRowKeys);
	deleteSelect.selectedRowKeys = selectedRowKeys;
};

// 批量删除回调
async function deleteArr() {
	deleteSelect.loading = true;

	// 删除玩家 的 steamId
	let steamIds: string[] = []

	// 删除
	for (let i = 0; i < deleteSelect.selectedRowKeys.length; i++) {
		dataSource.value = dataSource.value.filter((value) => {
			if (deleteSelect.selectedRowKeys[i] == value.key) {
				steamIds.push(value.steamId)
			}
			return deleteSelect.selectedRowKeys[i] !== value.key
		})
	}

	// 删除
	await bansStore.delBans(steamIds)


	deleteSelect.loading = false;
	deleteSelect.selectedRowKeys = [];
}



// 实例化仓库
const bansStore = useBansStore()
bansStore.getBans()

// 订阅仓库的状态
bansStore.$subscribe((mutations, state) => {
	dataSource.value = bansStore.banserListFormatTime
})




// 分页器的配置
let pagination = reactive({
	current: 1,
	defaultPageSize: 10,
	showTotal: (total: number) => `共 ${total} 条数据`,
	showSizeChanger: false,
})

// 分页器的改变
function changePagination(args: { current: number }) {
	console.log(pagination);
	pagination.current = args.current
}

</script>

<style scoped lang="less">
main {

	.btn-box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 10px 0;
	}
}
</style>