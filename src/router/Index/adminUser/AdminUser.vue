<template>
    <!-- 添加 管理员 -->
    <main>
        <SectionPanel class="mt-zero">
            <div class="title-box">
                <h3>管理员</h3>
            </div>

            <div class="btn-box">
                <div style="margin-right: 10px;">
                    <a-button type="primary" danger :disabled="!hasSelected" :loading="deleteSelect.loading"
                        @click="deleteArr">
                        删除
                    </a-button>
                    <span style="margin-left: 8px">
                        <template v-if="hasSelected">
                            {{ `选中 ${deleteSelect.selectedRowKeys.length} 行` }}
                        </template>
                    </span>
                </div>
                <a-button type="primary" class="editable-add-btn" @click="addHandle">添加</a-button>
            </div>

            <div class="table">
                <a-table :columns="columns" :data-source="dataSource" bordered :pagination="pagination"
                    :scroll="{ x: 1000 }"
                    :row-selection="{ selectedRowKeys: deleteSelect.selectedRowKeys, onChange: onSelectChange }"
                    @change="changePagination">

                    <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
                        <div style="padding: 8px">
                            <a-input ref="searchInput" :placeholder="`搜索 ${column.title}`" :value="selectedKeys[0]"
                                style="width: 188px; margin-bottom: 8px; display: block"
                                @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                                @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
                            <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
                                @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
                                <template #icon>
                                    <SearchOutlined />
                                </template>
                                搜索
                            </a-button>
                            <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
                                重置
                            </a-button>
                        </div>
                    </template>

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
                                    <div>{{ text }}</div>
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
import { reactive, ref, computed, watch } from 'vue';
import { isNull } from '../../../hooks/isNull';
import { message } from 'ant-design-vue';
import { useSteamStore } from '../../../store/useSteamStore';
import { SearchOutlined } from '@ant-design/icons-vue';




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



// 表格配置
const columns = [
    {
        title: 'steam昵称',
        dataIndex: 'steamName',
        width: '20%',
        fixed: 'left',
        // 配置可搜索
        customFilterDropdown: true,
        onFilter: (value, record) => record.steamName.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => {
                    searchInput.value.focus();
                }, 100);
            }
        },
    },
    {
        title: 'steamID',
        dataIndex: 'steamID',
        width: '30%',
    },
    {
        title: '管理组',
        dataIndex: 'adminGroup',
        width: '30%',
        filters: [
            {
                text: 'admin',
                value: 'admin',
            },
            {
                text: 'root',
                value: 'root',
            },
            {
                text: 'VIP',
                value: 'VIP',
            }
        ],
        // 过滤管理组 处理函数
        onFilter: (value, record) => record.adminGroup === value,
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        fixed: 'right',
    }
];

const data = [
    {
        key: '1',
        steamName: ``,
        steamID: "76561199182276910",
        adminGroup: `admin`,
    },
    {
        key: '2',
        steamName: ``,
        steamID: "76561199182276917",
        adminGroup: `root`,
    },
    {
        key: '3',
        steamName: ``,
        steamID: "76561198816965856",
        adminGroup: `admin`,
    }
];



// 数据源
const dataSource = ref(data)
// 编辑的数据
const editableData = reactive({})

// 实例化steam仓库
const steamStore = useSteamStore()



// 监听数据源
watch(dataSource.value, (value) => {
    // 发送请求 拿到用户名
    getSteamName()
})




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
        steamID: '',
        adminGroup: ``,
    }



    // 向数据源最加数据
    dataSource.value.push(cloneDeep(editableData[index]))

    // 跳转至最后一页
    pagination.current = Math.ceil(dataSource.value.length / pagination.defaultPageSize)
}



// 通过 steamName 搜索列表
// 搜索框的内容
const searchInput = ref();

// 搜索
const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
};

// 重置搜索
const handleReset = clearFilters => {
    clearFilters({
        confirm: true,
    });
};



// 批量选择
const deleteSelect = reactive({
    selectedRowKeys: [],
    // Check here to configure the default column
    loading: false,
})

// 选中的行数
const hasSelected = computed(() => deleteSelect.selectedRowKeys.length > 0);

// 选中的行
const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    deleteSelect.selectedRowKeys = selectedRowKeys;
};

// 批量删除回调
function deleteArr() {
    deleteSelect.loading = true;
    // TODO: 发送请求

    console.log(deleteSelect.selectedRowKeys);

    setTimeout(() => {
        deleteSelect.loading = false;

        // 删除
        for (let i = 0; i < deleteSelect.selectedRowKeys.length; i++) {
            dataSource.value = dataSource.value.filter((value) => {
                return deleteSelect.selectedRowKeys[i] !== value.key
            })
        }

        deleteSelect.selectedRowKeys = [];
    }, 1000);
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



// 发送请求 拿到用户名
async function getSteamName() {
    // 发送请求 拿到用户名
    dataSource.value.forEach(async (value, index) => {
        dataSource.value[index].steamName = await steamStore.getSteamName(value.steamID)
    })
}
// 初次加载页面，执行一次
getSteamName()
</script>

<style lang="less" scoped>
main {

    .btn-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }
}
</style>