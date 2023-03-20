<template>
    <!-- 每日消息 -->
    <div class="main">
        <div class="title-box">
            <h3>每日消息</h3>
        </div>

        <div class="GSDayMessage">
            <div class="title">
                <p>服务器介绍[每日消息] || 支持两个 HTML 标记(不要写多了哦,虽然我也不知道写多会发生啥)</p>
            </div>

            <div class="content">
                <a-textarea class="textarea-input" v-model:value="value" placeholder="请输入服务器介绍[每日消息]" :rows="18" />
            </div>

            <div class="btn-box">
                <a-button type="primary">保存</a-button>
                <a-button type="primary" danger>取消</a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 文本框输入的文本
const value = ref<string>('');
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

        .content{
            font-family: SourceCodePro;

            .textarea-input{
                font-size: 1rem;
                background-color: var(--table-header-bg);
                color: var(--text-color);
                border-color: var(--border-color-base);
            }
        }

        .btn-box{
            height: 80px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }
    }
}
</style>