<template>
    <div class="btn-box">
        <a-button type="primary" @click="saveHandle">保存</a-button>
        <a-button type="primary" danger>取消</a-button>
    </div>
    <div class="map">
        <div class="left">
            <h3>已选择的地图</h3>
            <ul @dragover="dragoverHandle" class="box" ref="mapUlDom">
                <li @dragend="dragendHandle" @dragstart="dragstartHandle" class="square" draggable="true"
                    v-for="(a, i) in mapSelected">
                    <a-tag color="pink">{{ a }}</a-tag>
                </li>
            </ul>
        </div>
        <div class="right">
            <h3>可选择的地图</h3>
            <ul @dragover="dragoverHandle" class="box">
                <li @dragend="dragendHandle" @dragstart="dragstartHandle" class="square" draggable="true"
                    v-for="(a, i) in mapSelect">
                    <a-tag color="pink">{{ a }}</a-tag>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch, nextTick } from 'vue';
import getUlMapValue from '../../../../../util/gameServer/GSMap/getUlMapValue';




// props
const props = defineProps<{
    // map数据
    mapArr: Map<string, string[]>
}>()

// 已选择的地图
let mapSelected: Ref<string[]> = ref(JSON.parse(JSON.stringify(props.mapArr.get("selected"))))
// 可选择的地图
let mapSelect: Ref<string[]> = ref(JSON.parse(JSON.stringify(props.mapArr.get("select"))))
// 监听props
watch(props, async (v, o) => {
    mapSelected.value = []
    mapSelect.value = []

    // 刷新dom  防止v-for没有刷新
    await nextTick()

    mapSelected.value = JSON.parse(JSON.stringify(v.mapArr.get("selected")))
    mapSelect.value = JSON.parse(JSON.stringify(v.mapArr.get("select")))
})


// 创建零时的dom元素对象
const tempDom = document.createElement("li")
tempDom.setAttribute("id", "tempDom")
tempDom.style.cssText = 'width: 100px; height: 30px; border: 3px dotted #ccc; box-sizing: border-box;'

// 拖放事件 执行 回调
const dragoverHandle = (event: MouseEvent) => {
    // 阻止默认事件   因为只有阻止默认事件drop才可以运行
    event.preventDefault()

    // 判断是否为可替换元素，如果不是直接退出 避免性能浪费
    if (!((event.target as HTMLLIElement).className.includes("square") || (event.target as HTMLLIElement).className.includes("box"))) {
        return
    }


    // 判断元素
    if ((event.target as HTMLLIElement).className === 'square') {
        // 在他之前插入元素
        (event.target as HTMLLIElement).parentNode?.insertBefore(tempDom, (event.target as HTMLLIElement))
    } else {
        // 没有之前的元素则向父元素追加
        if ((event.target as HTMLUListElement).className === 'box') {
            (event.target as HTMLUListElement).appendChild(tempDom)
        }
    }
}

// 拖放事件 开始 回调
const dragstartHandle = (event: MouseEvent) => {
    (event.target as HTMLLIElement).classList.add("hide")
}

// 拖放事件 结束 回调
const dragendHandle = (event: MouseEvent) => {
    // 获取temp 元素
    const t = document.querySelector("#tempDom") as HTMLLIElement
    // 替换元素
    t?.parentNode?.replaceChild((event.target as HTMLLIElement), t);
    (event.target as HTMLLIElement).classList.remove("hide")
}



// 定义emit
// TODO:目前并没有定义取消按钮
const emit = defineEmits(['saveMap'])


// 获取 已选择的地图 ul
const mapUlDom = ref()

// 保存按钮回调函数
const saveHandle = () => {
    emit('saveMap', getUlMapValue(mapUlDom.value))
}
</script>

<style scoped lang="less">
.btn-box {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}

.map {
    margin-top: 20px;
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: space-between;

    div {
        width: 40%;
        border: 4px solid var(--ant-primary-color);
        box-sizing: border-box;
        border-radius: 5px;

        h3 {
            text-align: center;
            border-bottom: 1px solid var(--ant-primary-color);
            font-size: 1.2rem;
            font-weight: 600;
        }

        ul {
            width: 80%;
            height: 85%;
            overflow-y: auto;

            li {
                // margin: 10px 0;
                padding: 10px 0;

                span {
                    padding: 5px;
                    font-size: 1.2rem;
                    cursor: pointer;
                }
            }
        }
    }
}

.hide {
    opacity: 0.5;
}
</style>