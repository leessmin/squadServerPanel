<template>
	<!-- 添加 管理组 -->
	<main>
		<SectionPanel class="mt-zero">
			<div class="title-box">
				<h3>管理组</h3>
			</div>
			<div class="btn-box">
				<a-button type="primary" class="editable-add-btn" @click="addHandle">添加</a-button>
			</div>
			<a-table bordered :data-source="dataSource" :columns="columns" :pagination="false" :scroll="{ x: 1100 }">
				<template #bodyCell="{ column, text, record }">
					<template v-if="column.dataIndex === 'info'">
						<span :style="{ color: record.info == '' ? 'var(--heading-color)' : 'var(--text-color)' }">{{
							record.info == '' ? '无备注' :
							record.info
						}}</span>
					</template>
					<template v-else-if="column.dataIndex === 'auth'">
						<span>
							<a-tag v-for="auth in record.auth" :key="auth" :color="groupAuthMap.get(auth)!.color"
								style="margin-bottom: 8px; font-size: medium;">
								<span style="color: #fff;">
									{{ groupAuthMap.get(auth)!.title }}
								</span>
							</a-tag>
						</span>
					</template>
					<template v-else-if="column.dataIndex === 'operation'">
						<a-button type="link" @click="onEdit(record)">编辑</a-button>
						<a-popconfirm v-if="dataSource.length" title="删除会将组下的全部管理员一起删除，你确定要删除吗?" okText="确定" cancelText="取消"
							@confirm="onDelete(record)">
							<a-button danger type="link">删除</a-button>
						</a-popconfirm>
					</template>
				</template>
			</a-table>
		</SectionPanel>
	</main>

	<!-- 添加管理组 弹出框 -->
	<AdminGroupAddPanel :visible="visible" @addData="addDataHandle" @changeVisible="visibleHandle"
		:groupNameArr="groupNameArr" :keyValue="keyValue" :editObj="editObj!"></AdminGroupAddPanel>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { string } from 'vue-types';
import SectionPanel from '../../../components/Section/SectionPanel.vue';
import { AdminGroupData } from '../../../type/adminGroup/adminGroup';
import AdminGroupAddPanel from './components/AdminGroupAddPanel.vue';
import { useAdminStore } from '../../../store/useAdminStore';

// 列表数据
const columns = [
	{
		title: '组名',
		dataIndex: 'groupName',
		width: "150px",
		fixed: 'left',
	},
	{
		title: '备注',
		dataIndex: 'info',
		// watch: 150,
	},
	{
		title: '权限',
		dataIndex: 'auth',
		// width: 900,
	},
	{
		title: '操作',
		dataIndex: 'operation',
		width: 200,
		fixed: 'right',
	}
];

// 数据源
const dataSource = ref<AdminGroupData[]>([
	{
		key: '0',
		groupName: 'admin',
		info: "管理员",
		auth: ["forceteamchange", "canseeadminchat"],
	},
]);

// 管理组的权限 map映射
const groupAuthMap = new Map([
	[
		"changemap",
		{
			title: "更换/预设地图",
			color: "#eccc68"
		}
	],
	[
		"pause",
		{
			title: "暂停游戏",
			color: "#ff6b81"
		}
	],
	[
		"cheat",
		{
			title: "使用作弊命令",
			color: "#ff7f50"
		}
	],
	[
		"private",
		{
			title: "设置服务器密码",
			color: "#ffa502"
		}
	],
	[
		"balance",
		{
			title: "忽略服务器阵营平衡",
			color: "#69c987"
		}
	],
	[
		"chat",
		{
			title: "管理员聊天/服务器公告",
			color: "#c9b984"
		}
	],
	[
		"kick",
		{
			title: "踢出玩家",
			color: "#70a1ff"
		}
	],
	[
		"ban",
		{
			title: "封禁玩家",
			color: "#00a8ff"
		}
	],
	[
		"config",
		{
			title: "更改服务器配置",
			color: "#9aecdb"
		}
	],
	[
		"cameraman",
		{
			title: "摄影机-管理员视角",
			color: "#1e90ff"
		}
	],
	[
		"immune",
		{
			title: "无法被 踢出/封禁",
			color: "#e056fd"
		}
	],
	[
		"manageserver",
		{
			title: "关闭服务器",
			color: "#55e6c1"
		}
	],
	[
		"reserve",
		{
			title: "预留位",
			color: "#ff9ff3"
		}
	],
	[
		"debug",
		{
			title: "调试",
			color: "#f368e0"
		}
	],
	[
		"teamchange",
		{
			title: "忽略更换阵营时间限制",
			color: "#feca57"
		}
	],
	[
		"forceteamchange",
		{
			title: "允许执行强制更换阵营命令",
			color: "#ff9f43"
		}
	],
	[
		"canseeadminchat",
		{
			title: "查看 管理员聊天/友军击杀/管理员加入消息",
			color: "#48dbfb"
		}
	],
])

// 是否关闭对话框
const visible = ref(false);

// 已经拥有的组名
const groupNameArr = ref<Array<string>>([])
// 第一次加载页面，初始化拥有的组名
filterGroupName(dataSource.value)

// 需要编辑的对象
let editObj = ref<AdminGroupData>()

// 数据的key Value
let keyValue = ref<string>(String(parseInt(dataSource.value[dataSource.value.length - 1].key) + 1))


// 添加 按钮 回调
function addHandle() {
	visible.value = true
}

// 编辑 按钮 回调
function onEdit(obj: AdminGroupData) {
	console.log(obj);


	editObj.value = obj

	// 重新赋值key
	keyValue.value = obj.key
	visible.value = true
}

// 删除 按钮 回调
function onDelete(obj: AdminGroupData) {
	dataSource.value = dataSource.value.filter(item => item.key !== obj.key);
}



// 监听对话框是否关闭
function visibleHandle(value: boolean) {
	visible.value = value



	// 如果对话框关闭
	if (!value) {
		// 清空需要编辑的对象
		editObj.value = undefined
		// 刷新key
		keyValue.value = String(parseInt(dataSource.value[dataSource.value.length - 1].key) + 1)
	}
}

// 添加数据 函数
function addDataHandle(value: AdminGroupData) {

	// 是否有该数据
	let isHave = false

	// 遍历 数据源
	dataSource.value.forEach((v, index) => {
		// 判断是否有该key  没有就追加，有则覆盖
		if (v.key == value.key) {
			dataSource.value[index] = value
			isHave = true
		}
	})

	if (!isHave) {
		dataSource.value.push(value)
	}

	visible.value = false
}



// 监听数据源
watch(dataSource.value, (value) => {
	// 更新已经拥有的组名
	filterGroupName(value)
})



// 获取传入数据源组名
function filterGroupName(arr: AdminGroupData[]) {
	// 清空表单数据
	groupNameArr.value = []

	arr.forEach((value) => {
		groupNameArr.value.push(value.groupName)
	})
}



// 初始化仓库
const adminStore = useAdminStore()
// 发送请求获取管理组列表
adminStore.getAdminGroup()

// 监听仓库变化
adminStore.$subscribe((mutations, state) => {
	// 服务器返回的数据显示
	dataSource.value = state.adminGroup as AdminGroupData[]

	// 数据发送变化 key也要发送变化
	keyValue.value = String(parseInt(dataSource.value[dataSource.value.length - 1].key) + 1)
})
</script>

<style scoped lang="less">
main {

	.btn-box {
		width: 100%;
		display: flex;
		justify-content: right;
		margin: 10px 0;
	}
}
</style>