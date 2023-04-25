<template>
	<!-- 服务器信息设置面板 -->
	<main>
		<SectionPanel class="mt-zero">
			<div class="title-box">
				<h3>面板设置</h3>
			</div>

			<div class="setting-box">
				<ul>
					<li>
						<a-form-item label="服务器ip" name="serverIp" style="margin: 0;" :label-col="labelCol">
							<div class="input-box">
								<a-input v-model:value="config.server_ip" />
							</div>
						</a-form-item>
						<a-button type="primary" style="margin: 0 10px;"
							@click="save<string>('server_ip', config.server_ip)">保存</a-button>
						<span>默认为外网IP,若您在本地虚拟机测试，请填写虚拟机内网IP</span>
					</li>
					<li>
						<a-form-item label="面板端口" name="panelPort" style="margin: 0;" :label-col="labelCol">
							<div class="input-box">
								<a-input-number v-model:value="config.panel_port" style="width: 100%" />
							</div>
						</a-form-item>
						<a-button type="primary" style="margin: 0 10px;"
							@click="save<number>('panel_port', config.panel_port)">保存</a-button>
						<span>建议端口范围8888 - 65535，注意：有安全组的服务器请提前在安全组放行新端口</span>
					</li>
					<li>
						<a-form-item label="监听时间" name="listeningTime" style="margin: 0;" :label-col="labelCol">
							<div class="input-box">
								<a-input-number v-model:value="config.listening_time" style="width: 100%" :min="1"
									:max="10" />
							</div>
						</a-form-item>
						<a-button type="primary" style="margin: 0 10px;"
							@click="save<number>('listening_time', config.listening_time)">保存</a-button>
						<span>监听系统信息的时间间隔，建议1-5秒</span>
					</li>
					<li>
						<a-form-item label="游戏服务器路径" name="gameServePath" style="margin: 0;" :label-col="labelCol">
							<div class="input-box">
								<a-input v-model:value="config.game_serve_path" />
							</div>
						</a-form-item>
						<a-button type="primary" style="margin: 0 10px;"
							@click="save<string>('game_serve_path', config.game_serve_path)">保存</a-button>
						<span>游戏服务器的根路径</span>
					</li>
					<li>
						<a-form-item label="账号密码" name="listeningTime" style="margin: 0;" :label-col="labelCol">
							<div class="input-box">
								<a-button type="primary" style="width: 100%;"
									@click="isUserVisible = true">修改账号密码</a-button>
							</div>
						</a-form-item>
					</li>
				</ul>
			</div>
		</SectionPanel>
	</main>

	<!-- 修改账号密码 弹出框 -->
	<UserModal v-model:isUserVisible="isUserVisible"></UserModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SectionPanel from '../../../components/Section/SectionPanel.vue';
import UserModal from './components/UserModal.vue'
import { useSettingStore } from '../../../store/useSettingStore';
import { settingConfigType } from '../../../type/api/setting';



// a-form-item label 的宽度
const labelCol = { style: { width: '120px' } };


// 是否显示修改账号密码弹出框
const isUserVisible = ref(false)

// 配置
const config = ref<settingConfigType>({
	// 服务器的ip
	server_ip: "",
	// 面板端口
	panel_port: 8888,
	// 游戏服务器路径
	game_serve_path: "",
	// 监听时间
	listening_time: 5
})

// 保存按钮
const save = <T>(key: string, value: T) => {

	settingStore.saveSetting<T>(key, value)

}



// 初始化 仓库
const settingStore = useSettingStore()
settingStore.getSetting()

// 订阅仓库
settingStore.$subscribe((mutation, state) => {
	config.value = state.cfgSetting as settingConfigType
})
</script>

<style scoped lang="less">
.setting-box {
	ul {
		width: 100%;

		li {
			display: flex;
			align-items: center;
			margin: 20px 0;

			.input-box {
				width: 250px;
			}

			span {
				color: var(--text-color-secondary);
				width: 400px;
			}
		}
	}
}
</style>
