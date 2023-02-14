<template>
    <!-- 管理组 -->
    <main>
        <SectionPanel class="mt-zero">
            <div class="btn-box">
                <a-button type="primary" class="editable-add-btn" @click="handleAdd">添加</a-button>
            </div>
            <a-table bordered :data-source="dataSource" :columns="columns" :pagination="false">
                <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'operation'">
                        <a-button type="link">编辑</a-button>
                        <a-popconfirm v-if="dataSource.length" title="删除会将组下的全部管理员一起删除，你确定要删除吗?" okText="确定"
                            cancelText="取消" @confirm="onDelete(record.key)">
                            <a-button danger type="link">删除</a-button>
                        </a-popconfirm>
                    </template>
                </template>
            </a-table>
        </SectionPanel>
    </main>
</template>

<script setup>
import SectionPanel from '../../../components/SectionPanel.vue';
import { computed, defineComponent, reactive, ref } from 'vue';
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';



// 列表数据
const columns = [
    {
        title: '组名',
        dataIndex: 'groupName',
        width: 100,
    },
    {
        title: '权限',
        dataIndex: 'auth',
        width: 700,
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 100,
    }
];


// 数据源
const dataSource = ref([
    {
        key: '0',
        groupName: 'admin',
        auth: "换地图,暂停,作弊,修改服务器配置,上帝视角,关服,预留位,无时限跳边,强制跳边,Debug,换地图,暂停,作弊,修改服务器配置,上帝视角,关服,预留位,无时限跳边,强制跳边,Debug",
    },
]);


const count = computed(() => dataSource.value.length + 1);

// 删除 按钮回调
const onDelete = key => {
    dataSource.value = dataSource.value.filter(item => item.key !== key);
};

// 添加 管理组 回调
const handleAdd = () => {
    const newData = {
        key: `${count.value}`,
        name: `Edward King ${count.value}`,
        age: 32,
        address: `London, Park Lane no. ${count.value}`,
    };
    dataSource.value.push(newData);
};

</script>

<style lang="less" scoped>
main {

    .btn-box {
        width: 100%;
        display: flex;
        justify-content: right;
        margin-bottom: 10px;
    }
}
</style>