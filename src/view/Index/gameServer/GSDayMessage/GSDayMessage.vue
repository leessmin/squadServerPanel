<template>
	<!-- 每日消息 -->
	<div class="main">
		<div class="title-box">
			<h3>每日消息</h3>
		</div>

		<div class="GSDayMessage">
			<div class="title">
				<p>服务器介绍[每日消息] || 支持两个 HTML 标记</p>
			</div>

			<div class="content">
				<a-textarea class="textarea-input" v-model:value="value" placeholder="请输入服务器介绍[每日消息]" :rows="18" />
			</div>

			<div class="btn-box">
				<a-button type="primary" @click="save">保存</a-button>
				<a-button type="primary" danger @click="cancel">取消</a-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSquadServerStore } from '../../../../store/useSquadServerStore';
import { onBeforeRouteLeave } from 'vue-router';
import { abortAlert } from '../../../../util/alert/alert';

// 文本框输入的文本
const value = ref<string>('');


// 实例化仓库
const squadStore = useSquadServerStore()
squadStore.getSquadDayMessage()

// 订阅仓库
squadStore.$subscribe((mutation, state) => {
	value.value = state.dayMsg
})


// 保存 回调
const save = () => {
	squadStore.saveSquadDayMessage(value.value)
}

// 取消 回调
const cancel = () => {
	squadStore.getSquadDayMessage()
}



// 路由守卫  离开当前页面时判断是否存在数据修改未保存
onBeforeRouteLeave(async (to, from, next) => {
	// 判断配置是否修改
	if (!isCfgChange()) {
		// 配置没有被修改
		next()
		return
	}

	// 用户点击了取消 不跳转
	if (!await abortAlert()) {
		// 点击了取消按钮
		next(from)
		return
	}

	// 放行
	next()
})

function isCfgChange(): boolean {

	return !(squadStore.dayMsg == value.value)
}
</script>

<style scoped lang="less">
.main {
	.GSDayMessage {
		.title {
			padding: 10px;
			padding-bottom: 0;

			p {
				color: var(--text-color-secondary);
			}
		}

		.content {
			font-family: SourceCodePro;

			.textarea-input {
				font-size: 1rem;
				background-color: var(--table-header-bg);
				color: var(--text-color);
				border-color: var(--border-color-base);
			}
		}

		.btn-box {
			height: 80px;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
		}
	}
}
</style>