<template>
    <!-- 添加 管理员 -->
    <main>
        <SectionPanel class="mt-zero">
            <div class="title-box">
                <h3>管理员</h3>
            </div>

            <div class="btn-box">
                <a-button type="primary" class="editable-add-btn" @click="addHandle">添加</a-button>
            </div>

            <div class="table">
                <a-table :columns="columns" :data-source="dataSource" bordered :pagination="pagination"
                    @change="changePagination">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'steamName'">
                            <div
                                :style="{ color: isNull(record.steamName) ? 'var(--ant-primary-color)' : 'var(--text-color)' }">
                                {{ record.steamName || '未找到该steamID下的信息' }}
                            </div>
                        </template>
                        <template v-else-if="column.dataIndex === 'steamID'">
                            <div>
                                <a-input v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-else-if="column.dataIndex === 'adminGroup'">
                            <div>
                                <a-select v-if="editableData[record.key]" :options="selectOptions" show-search
                                    v-model:value="editableData[record.key][column.dataIndex]" style="width: 300px">
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-else-if="column.dataIndex === 'operation'">
                            <div class="editable-row-operations" style="display: inline-block;">
                                <span v-if="editableData[record.key]">
                                    <a-typography-link @click="save(record.key)"
                                        style="margin-right: 10px;">保存</a-typography-link>
                                    <a-popconfirm title="你确定要取消吗" @confirm="cancel(record.key)" okText="确定"
                                        cancelText="取消">
                                        <a>取消</a>
                                    </a-popconfirm>
                                </span>
                                <span v-else>
                                    <a @click="edit(record.key)">编辑</a>
                                </span>
                            </div>
                            <div class="delete" style="display: inline-block;">
                                <a-popconfirm title="你确定要删除吗" ok-text="确定" cancel-text="取消"
                                    @confirm="deleteHandle(record.key)">
                                    <a-button type="link" danger>删除</a-button>
                                </a-popconfirm>
                            </div>
                        </template>
                    </template>
                </a-table>
            </div>
        </SectionPanel>

    </main>
</template>

<script setup>
import SectionPanel from '../../../components/SectionPanel.vue';
import { cloneDeep } from 'lodash-es';
import { reactive, ref, onMounted } from 'vue';
import { isNull } from '../../../hooks/isNull';
import { message } from 'ant-design-vue';




// 选择管理组的选项
const selectOptions = ref([
    {
        value: 'admin',
        label: 'admin',
    },
    {
        value: 'root',
        label: 'root',
    },
    {
        value: 'VIP',
        label: 'VIP',
    },
]);


const columns = [
    {
        title: 'steam昵称',
        dataIndex: 'steamName',
        width: '25%',
    },
    {
        title: 'steamID',
        dataIndex: 'steamID',
        width: '25%',
    },
    {
        title: '管理组',
        dataIndex: 'adminGroup',
        width: '20%',
    },
    {
        title: '操作',
        dataIndex: 'operation',
    }
];
const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        steamName: `Edrward ${i}`,
        steamID: 32215456457686875689,
        adminGroup: `admin`,
    });
}


// 数据源
const dataSource = ref(data);
// 编辑的数据
const editableData = reactive({});



// 编辑
const edit = key => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};

// 保存
const save = key => {
    // 保存之前判断是否填写完毕
    let temp = editableData[key]
    if (isNull(temp.steamID) || isNull(temp.adminGroup)) {
        message.warning('信息填写不完整');

        return
    }

    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];
};

// 取消
const cancel = key => {
    // 取消前判断 原始数据是否为空，如果为空说明这条数据是添加的，为空则删除
    dataSource.value = dataSource.value.filter((item) => {

        // 找到该数据
        if (key === item.key) {

            // 判断该数据是否为空
            if (isNull(item.steamID) || isNull(item.adminGroup)) {
                return false
            }
        }


        return true
    })

    delete editableData[key];
};

// 删除
const deleteHandle = key => {
    dataSource.value = dataSource.value.filter((value) => {
        return value.key !== key
    })
}

// 添加 按钮 回调
function addHandle() {
    console.log("添加");

    // 获取添加的数据下标
    let index = dataSource.value[dataSource.value.length - 1].key + 1

    // 添加 临时 数据
    editableData[index] = {
        key: index,
        steamName: ``,
        steamID: null,
        adminGroup: ``,
    }



    // 向数据源最加数据
    dataSource.value.push(cloneDeep(editableData[index]))

    // 跳转至最后一页
    pagination.current = Math.ceil(dataSource.value.length / pagination.defaultPageSize)
}



// 分页器的配置
let pagination = reactive({
    current: 1,
    defaultPageSize: 10,
    showTotal: total => `共 ${total} 条数据`,
    showSizeChanger: false,
})

// 分页器的改变
function changePagination({ current }) {
    console.log(pagination);
    pagination.current = current
}

</script>

<style lang="less" scoped>
main {

    .btn-box {
        width: 100%;
        display: flex;
        justify-content: right;
        margin: 10px 0;
    }
}
</style>