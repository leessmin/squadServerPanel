<template>
	<!-- 添加管理组 添加面板 -->
	<div>
		<a-modal v-model:visible="t_visible" :maskClosable="false" title="添加管理组" @ok="okHandle" okText="确认"
			:confirm-loading="confirmLoading" cancelText="取消" width="1000px">
			<a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" autocomplete="off">
				<a-form-item label="组名" name="groupName" :validateStatus="groupNameStatus.state"
					:help="groupNameStatus.help">
					<a-input v-model:value="formState.groupName" :disabled="editObj?.groupName.length > 0" />
					<span v-show="editObj?.groupName.length > 0" style="font-size: 12px; color: red;">编辑操作不能修改组名，如需修改组名，建议删除后重新添加</span>
				</a-form-item>

				<a-form-item label="备注" name="info">
					<a-input v-model:value="formState.info" />
				</a-form-item>

				<div class="form-gutter">
					<h3>权限：</h3>
					<a-row :gutter="16">
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="changemap" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.changemap">更换/预设地图</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="pause" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.pause">暂停游戏</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="cheat" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.cheat">使用作弊命令</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="private" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.private">设置服务器密码</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="balance" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.balance">忽略服务器阵营平衡</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="chat" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.chat">管理员聊天/服务器公告</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="kick" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.kick">踢出玩家</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="ban" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.ban">封禁玩家</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="config" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.config">更改服务器配置</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="cameraman" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.cameraman">摄影机-管理员视角</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="immune" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.immune">无法被 踢出/封禁</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="manageserver" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.manageserver">关闭服务器</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="reserve" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.reserve">预留位</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="debug" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.debug">调试</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="teamchange" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.teamchange">忽略更换阵营时间限制</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="forceteamchange" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.forceteamchange">允许执行强制更换阵营命令</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
					</a-row>
					<a-row :gutter="16">
						<a-col class="gutter-row" :span="6">
							<div class="gutter-box">
								<a-form-item name="canseeadminchat" :wrapper-col="{ offset: 8, span: 16 }">
									<a-checkbox v-model:checked="formState.canseeadminchat">查看
										管理员聊天/友军击杀/管理员加入消息</a-checkbox>
								</a-form-item>
							</div>
						</a-col>
					</a-row>
				</div>
			</a-form>
		</a-modal>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { AdminGroupAuth, AdminGroupData } from '../../../../type/adminGroup/adminGroup';
import { useAdminStore } from '../../../../store/useAdminStore';
import { message } from 'ant-design-vue';

// 注册props
interface Props {
	// 是否显示弹出框
	visible: boolean
	// 用户组的名字 数组
	groupNameArr: string[]
	// 当前编辑列的key值
	keyValue: string
	// 编辑的对象
	editObj: AdminGroupData
}
const props = defineProps<Props>()

// 声明emit
interface Emit {
	(e: 'changeVisible', value: boolean): void
	(e: 'addData', value: AdminGroupData): void
}
const emit = defineEmits<Emit>()

// 是否关闭对话框
const t_visible = ref(props.visible);
// 异步关闭对话框
let confirmLoading = ref(false)

// 组名input状态
let groupNameStatus = reactive({
	// 校验状态 'success' 'warning' 'error' 'validating'
	state: "",
	// 未通过的提示
	help: "",
})

// 添加表单的数据
const formState: AdminGroupAuth = reactive<AdminGroupAuth>({
	// 组名
	groupName: '',
	// 备注
	info: '',
	// 更换/预设地图
	changemap: false,
	// 暂停游戏
	pause: false,
	// 使用作弊命令
	cheat: false,
	// 设置服务器密码
	private: false,
	// 忽略服务器阵营平衡
	balance: false,
	// 忽略服务器阵营平衡
	chat: false,
	// 踢出玩家
	kick: false,
	// 封禁玩家
	ban: false,
	// 更改服务器配置
	config: false,
	// 摄影机 - 管理员视角
	cameraman: false,
	// 无法被 踢出/封禁
	immune: false,
	// 关闭服务器
	manageserver: false,
	// 预留位
	reserve: false,
	// 调试
	debug: false,
	// 忽略更换阵营时间限制
	teamchange: false,
	// 允许执行强制更换阵营命令
	forceteamchange: false,
	// 查看 管理员聊天/友军击杀/管理员加入消息
	canseeadminchat: false,
});


// 实例化仓库
const adminStore = useAdminStore()

// 添加 管理组 确认 按钮
const okHandle = async (e: MouseEvent) => {

	// 判断组名是否为空
	if (formState.groupName == '') {
		// 组名为空

		groupNameStatus.state = "error"
		groupNameStatus.help = "组名不能为空"
		return
	}


	// 判断是否存在编辑的对象，如果存在说明是编辑，
	// 过滤 表格数据 判断是否有相同的名字
	let arr = props.groupNameArr.filter((value) => {
		return value === formState.groupName && value != props.editObj?.groupName
	})
	if (arr.length !== 0) {
		// 存在相同的组名

		groupNameStatus.state = "error"
		groupNameStatus.help = "存在相同的组名"
		return
	}





	// 成功
	groupNameStatus.state = "success"
	groupNameStatus.help = ""

	// 向表中添加 管理组

	// 创建一个零时的对象
	let tempObj: AdminGroupData = {
		key: props.keyValue,
		groupName: formState.groupName,
		info: formState.info,
		auth: [],
	}

	// 遍历表单输入的对象
	let k: keyof AdminGroupAuth
	for (k in formState) {

		// 如果key等于groupName则跳过这次循环
		if (k === "groupName" || k === "info") {
			continue
		}

		// 如果 结果为true 将key存入tempObj auth中
		if (formState[k]) {
			tempObj.auth.push(k)
		}
	}

	// 判断是否存在权限
	if (tempObj.auth.length == 0) {
		message.warning("管理组的权限不能为空")
		return
	}

	console.log(tempObj);

	confirmLoading.value = true;

	// TODO: 发送请求 向服务器添加管理组
	await adminStore.addEditAdminGroup(tempObj)


	// 关闭对话框

	t_visible.value = false;
	confirmLoading.value = false;

	// 添加数据至表表格
	emit('addData', tempObj)
};



// 监听props
watch(props, (value) => {
	t_visible.value = value.visible

	// 初始化表单数据
	let k: keyof AdminGroupAuth
	for (k in formState) {
		// 如果key等于groupName则跳过这次循环
		if (k === "groupName" || k === 'info') {
			formState[k] = ""
		} else {
			// 如果 结果为true 将结果设置为false  默认值
			if (!formState[k]) {
				continue
			}

			formState[k] = false
		}
	}



	// 判断编辑对象是否存在 不存在直接退出函数
	if (value.editObj == undefined) {
		return
	}

	// 添加项目组名
	formState.groupName = value.editObj.groupName
	formState.info = value.editObj.info

	// 遍历 已经添加的权限
	value.editObj.auth.forEach((v: keyof AdminGroupAuth) => {
		if (v == "groupName" || v == "info") {
			return
		}
		// 添加的权限赋值为true
		formState[v] = true
	})
})

// 监听对话框的状态
watch(t_visible, (value) => {
	emit('changeVisible', value)
})
</script>

<style scoped lang="less"></style>