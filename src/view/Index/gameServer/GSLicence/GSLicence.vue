<template>
    <!-- 许可证 -->
    <div class="main">
        <div class="title-box">
            <h3>许可证</h3>
        </div>

        <div class="GSLicence">
            <div class="title">
                <p>添加许可证成为官方认证服务器</p>
            </div>

            <div class="content">
                <a-textarea class="textarea-input" v-model:value="value" placeholder="请输入许可证" :rows="18" />
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
    .GSLicence {
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