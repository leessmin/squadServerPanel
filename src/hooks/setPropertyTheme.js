// 设置主题
import {dark} from "../theme/dark.js";
import {light} from "../theme/light.js";
import {isNull} from "./isNull.js";

export function setPropertyTheme(isDark) {
    // 判断是否转换dark主题
    if (isDark === 'dark'){
        // 遍历设置暗黑主题
        dark.forEach(forEachHandle)
    }else {
        // 遍历设置光亮主题
        light.forEach(forEachHandle)
    }
}

// 获取文档的body的style
const body = document.body.style;

function forEachHandle(value, key){
    // 判断是否有value,没有value就删除  还原设置  这段是无效代码
    // if (isNull(value)){
    //     body.removeProperty(key)

    //     return
    // }

    body.setProperty(key, value, 'important');
}
