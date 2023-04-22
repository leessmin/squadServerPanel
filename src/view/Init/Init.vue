<template>
	<!-- 第一次登录 初始化服务器 -->
	<main>
		<section class="setting">
			<div class="title-box">
				<h1>初始化服务器</h1>
				<p>第一次加载服务器需要进行初始化设置</p>
			</div>

			<a-form :model="formState" name="basic" :label-col="{ style: { width: '160px' } }" :wrapper-col="{ span: 16 }"
				autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
				<a-form-item label="设置新账号" name="username" :rules="[{ required: true, message: '请输入新的账号！' }]">
					<a-input v-model:value="formState.username" />
				</a-form-item>

				<a-form-item label="设置新密码" name="password" :rules="[{ required: true, message: '请输入新的密码！' }]">
					<a-input-password v-model:value="formState.password" />
				</a-form-item>

				<a-form-item label="squad服务器安装路径" name="serverPath" :rules="[{ required: true, message: '请输入服务器安装路径' }]">
					<a-input v-model:value="formState.serverPath" />
				</a-form-item>

				<div class="confirm-box">
					<a-button type="primary" class="confirm-btn" html-type="submit">确认</a-button>
				</div>
			</a-form>
		</section>
	</main>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import { useLoginStore } from '../../store/useLoginStore'


// 提示用户 初次加载页面
message.info("检测到第一次登录面板，需要进行初始化设置哦")


// 实例化 登录仓库
const loginStore = useLoginStore()


interface FormState {
	username: string;
	password: string;
	serverPath: string;
}

const formState = reactive<FormState>({
	username: '',
	password: '',
	serverPath: '',
});
const onFinish = (values: FormState) => {
	console.log('Success:', values);

	// 发送请求  初始设置
	loginStore.initServer(values.username, values.password, values.serverPath)

};

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo);
};
</script>

<style scoped lang="less">
main {
	width: 100vw;
	height: 100vh;
	background: url("/login_bg.jpg");
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;


	.setting {
		filter: opacity(90%);
		padding: 40px;
		padding-top: 20px;
		width: 500px;
		flex-direction: column;
		background-color: var(--body-background);
		border-radius: 10px;

		.title-box {
			display: block;
			height: auto;
			padding: 0;
			margin-bottom: 20px;

			h1 {
				font-size: 2rem;
				font-weight: 600;
				margin: 0;
				text-align: center;
			}

			P {
				color: var(--text-color-secondary);
				text-align: center;
				margin: 0;
			}
		}

		.confirm-box {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>