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
                                <a-input v-model:value="serverIp" />
                            </div>
                        </a-form-item>
                        <a-button type="primary" style="margin: 0 10px;">保存</a-button>
                        <span>默认为外网IP,若您在本地虚拟机测试，请填写虚拟机内网IP</span>
                    </li>
                    <li>
                        <a-form-item label="面板端口" name="panelPort" style="margin: 0;" :label-col="labelCol">
                            <div class="input-box">
                                <a-input-number v-model:value="panelPort" style="width: 100%" />
                            </div>
                        </a-form-item>
                        <a-button type="primary" style="margin: 0 10px;">保存</a-button>
                        <span>建议端口范围8888 - 65535，注意：有安全组的服务器请提前在安全组放行新端口</span>
                    </li>
                    <li>
                        <a-form-item label="监听时间" name="listeningTime" style="margin: 0;" :label-col="labelCol">
                            <div class="input-box">
                                <a-input-number v-model:value="listeningTime" style="width: 100%" :min="1" :max="10" />
                            </div>
                        </a-form-item>
                        <a-button type="primary" style="margin: 0 10px;">保存</a-button>
                        <span>监听系统信息的时间间隔，建议1-5秒</span>
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
    <UserModal :isUserVisible="isUserVisible" @visibleChange="(value) => { isUserVisible = value }"></UserModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SectionPanel from '../../../components/Section/SectionPanel.vue';
import UserModal from './components/UserModal.vue'



// a-form-item label 的宽度
const labelCol = { style: { width: '280px' } };

// 服务器的ip
const serverIp = ref("127.0.0.1")
// 面板端口
const panelPort = ref(8888)
// 监听时间
const listeningTime = ref(5)

// 是否显示修改账号密码弹出框
const isUserVisible = ref(false)
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
            }
        }
    }
}
</style>
