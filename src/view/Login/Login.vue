<template>
    <!-- 登录页面 -->
    <main>
        <section class="login-section">
            <h1>登录</h1>
            <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
                :label-col="{ style: { width: '70px' } }" @finishFailed="onFinishFailed">
                <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名！！！' }]">
                    <a-input v-model:value="formState.username">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码！！！' }]">
                    <a-input-password v-model:value="formState.password">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item label="验证码" name="verifyCode" :rules="[{ required: true, message: '请输入验证码！！！' }]">
                    <div class="verify-code-form">
                        <a-input v-model:value="formState.verifyCode">
                        </a-input>
                        <div class="verify-code">
                            <img src="/vcode.png" alt="">
                        </div>
                    </div>

                </a-form-item>

                <a-form-item>
                    <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                        登录
                    </a-button>
                </a-form-item>
            </a-form>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';

interface FormState {
    username: string;
    password: string;
    // 验证码
    verifyCode: string;
}

const formState = reactive<FormState>({
    username: '',
    password: '',
    verifyCode: '',
});
const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(formState.username && formState.password && formState.verifyCode);
});
</script>

<style scoped lang="less">
main {
    width: 100vw;
    height: 100vh;
    background: url("/login_bg.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-section {
        width: 450px;
        height: 350px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;

        h1{
            font-size: 2rem;
            font-weight: 600;
            margin: 10px 0;
        }

        .login-form {
            width: 80%;

            .verify-code-form {
                display: flex;

                .verify-code {
                    width: 100px;
                    height: 35px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

        }
    }
}
</style>