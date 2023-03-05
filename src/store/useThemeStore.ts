import { defineStore } from 'pinia'
import { ref } from "vue";
import { light } from "../theme/light.js";
import { dark } from "../theme/dark.js";
import { ThemeColor, ThemeType } from '../type/theme/theme'

export const useThemeStore = defineStore('theme', () => {
    // 当前主题
    const isTheme = ref<ThemeType>('light')
    // 当前主题用的颜色 map
    const themeColor = ref<ThemeColor>(light)

    // 切换主题
    function switchTheme() {

        // 添加过度效果
        addTransition()

        // 切换主题
        isTheme.value = isTheme.value === 'light' ? 'dark' : 'light'

        // 更换主题用的map颜色
        themeColor.value = isTheme.value === 'light' ? light : dark
    }

    return {
        isTheme,
        switchTheme,
        themeColor
    }
})



// 添加过度效果
function addTransition() {
    // 切换主题前先将所有的元素添加transition
    // 获取head标签
    let head = document.querySelector("head") as HTMLHeadElement
    // 创建styleTag标签
    let styleTag = document.createElement("style")
    // 设置id
    styleTag.setAttribute("id", "ThemeStyle")
    styleTag.setAttribute("type", "text/css")
    styleTag.innerHTML = `
            *{
                transition: all 0.5s !important;
            }
        `

    // 追加
    head.appendChild(styleTag)
    // 1秒后删除自己创建的style标签
    setTimeout(() => {
        // 删除
        document.querySelector("#ThemeStyle")!.remove()
    }, 600)
}
