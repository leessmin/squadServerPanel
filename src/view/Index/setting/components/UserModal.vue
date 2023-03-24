<template>
    <!-- 修改账号密码 弹出框 -->
    <!-- 修改账号密码 -->
    <a-modal v-model:visible="isVisible" title="修改账号密码" @ok="userHandleOk">
        <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout"
            @finish="handleFinish">
            <a-form-item has-feedback label="旧账号" name="oldUser">
                <a-input v-model:value="formState.oldUser" type="text" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="新账号" name="user">
                <a-input v-model:value="formState.user" type="text" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="旧密码" name="oldPass">
                <a-input v-model:value="formState.oldPass" type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="新密码" name="pass">
                <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="确认密码" name="checkPass">
                <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import { FormInstance, Rule } from 'ant-design-vue/lib/form';
import { reactive, ref, watch } from 'vue';

const emit = defineEmits(['visibleChange'])

const props = defineProps<{
    // 修改账号密码弹出框是否显示
    isUserVisible: boolean
}>()

// 是否显示弹出框
let isVisible = ref(props.isUserVisible)

// 监听props
watch(props, (value, oldValue) => {
    isVisible.value = value.isUserVisible
})

watch(isVisible, (value, oldValue) => {
    emit('visibleChange', value)
})

// 点击确定的回调
const userHandleOk = () => {

}



// 表单的状态
interface FormState {
    oldUser: string;
    user: string;
    oldPass: string;
    pass: string;
    checkPass: string;
}

const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
    oldUser: '',
    user: '',
    oldPass: '',
    pass: '',
    checkPass: '',
});
let validateOldUser = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入账号');
    } else {
        return Promise.resolve();
    }
};
let validateOldPass = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入旧密码');
    } else {
        return Promise.resolve();
    }
};
let validatePass = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入密码');
    } else {
        if (formState.checkPass !== '') {
            formRef.value?.validateFields('checkPass');
        }
        return Promise.resolve();
    }
};
let validatePass2 = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请确认密码');
    } else if (value !== formState.pass) {
        return Promise.reject("两次密码不一致");
    } else {
        return Promise.resolve();
    }
};

const rules: Record<string, Rule[]> = {
    oldUser: [{ required: true, validator: validateOldUser, trigger: 'change' }],
    oldPass: [{ required: true, validator: validateOldPass, trigger: 'change' }],
    pass: [{ required: true, validator: validatePass, trigger: 'change' }],
    checkPass: [{ validator: validatePass2, trigger: 'change' }],
};
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};
const handleFinish = (values: FormState) => {
    console.log(values, formState);
};
</script>

<style scoped lang="less"></style>