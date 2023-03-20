<template>
    <!-- 循环公告 -->
    <div class="main">
        <div class="title-box">
            <h3>循环公告</h3>
        </div>

        <div class="GSCycleAnnouncement">
            <div class="title">
                <p>在游戏中每隔 x 秒按顺序循环发送一条消息（基于服务器配置）</p>
            </div>

            <div class="content">
                <div class="content-box">
                    <ul ref="ulDOM">
                        <li v-for="(msg, index) in messageList" :key="index">
                            <a-tag>
                                {{ msg }}

                                <div style="display: inline-block;">
                                    <up-outlined style="cursor: pointer;" @click="upOrDownHandle(msg, 0)" />
                                    <down-outlined style="cursor: pointer;" @click="upOrDownHandle(msg, 1)" />
                                    <close-outlined style="cursor: pointer;" @click="handleClose(msg)" />
                                </div>

                            </a-tag>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="input-box">
                <a-input-group compact style="width: 80%;" size="large">
                    <a-input placeholder="请输入循环公告的消息" v-model:value="msgValue" style="width: calc(100% - 100px)" />
                    <a-button size="large" type="primary" @click="addMessageHandle()">添加消息</a-button>
                </a-input-group>
            </div>

            <div class="btn-box">
                <a-button type="primary">保存</a-button>
                <a-button type="primary" danger>取消</a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { ref, nextTick } from 'vue';
import randomRGBColor from '../../../../util/gameServer/GSMap/randomRGBColor';

// 添加消息的输入框
const msgValue = ref<string>("")

// 循环公告 中的消息
const messageList = ref<string[]>(['你好你好', '欢迎光临'])

// 循环公告的内容ul dom
const ulDOM = ref<HTMLUListElement>()



// 添加消息的回调函数
const addMessageHandle = async () => {
    // 判断输入框是否有内容
    if (msgValue.value.trim().length <= 0) {
        message.warning('您未输入任何内容');
    } else {
        messageList.value.push(msgValue.value)
        await nextTick()
        ulDOM.value?.scrollTo(0, ulDOM.value?.scrollHeight)
    }

    msgValue.value = ''
}

// 上移或下移元素  type 0为上移  1为下移
const upOrDownHandle = (msg: string, type: number) => {
    // 获取msg的位置
    let index: number = messageList.value.indexOf(msg)

    if (type === 0) {
        // 上移
        // 删除元素
        messageList.value.splice(index, 1)

        // 向上移动的位置
        index = index - 1 < 0 ? 0 : index - 1

        messageList.value.splice(index, 0, msg)
    } else if (type === 1) {
        // 下移
        // 删除元素
        messageList.value.splice(index, 1)

        // 向下移动的位置
        index = index >= messageList.value.length ? messageList.value.length : index + 1

        messageList.value.splice(index, 0, msg)
    }

}

// 关闭tag的回调函数
const handleClose = (msg: string) => {
    messageList.value = messageList.value.filter(v => {
        return v !== msg
    })
}
</script>

<style scoped lang="less">
.main {
    .GSCycleAnnouncement {
        .title {
            padding: 10px;
            padding-bottom: 0;

            p {
                color: var(--text-color-secondary);
            }
        }

        .content {
            width: 90%;
            margin: 0 auto;

            .content-box {
                width: 100%;
                height: 480px;
                border: 4px solid var(--ant-primary-color);
                border-radius: 5px;
                padding: 10px;

                ul {
                    padding-left: 10px;
                    height: 100%;
                    overflow-y: auto;

                    li {
                        margin: 10px 0;
                        width: 100%;

                        span {
                            max-width: 90%;
                            font-size: 1.2rem;
                            padding: 4px;
                            word-break: keep-all;
                            white-space: normal;
                            overflow-wrap: break-word;
                            /*就是下面这一句，好像网上没有这一个的说明，但是浏览器都支持*/
                            word-break: break-word;
                            word-wrap: break-word;

                            background-color: var(--ant-primary-color);
                            color: #fff;

                            span {

                                &:hover {
                                    transition: all 0.5s;
                                    fill: #40a9ff !important;
                                    color: #40a9ff;
                                }
                            }
                        }
                    }
                }



            }
        }

        .input-box {
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .btn-box {
            height: 40px;
            display: flex;
            justify-content: space-evenly;
            // align-items: center;
        }
    }
}
</style>