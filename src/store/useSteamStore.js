// 和steam api 交互的仓库
import { defineStore } from 'pinia'

export const useSteamStore = defineStore('steam', () => {


    // TODO: steam需要使用代理   这是node的代理 这是暂时的 等开发go server 到时候统一修改
    // 发送请求获取steam用户名
    async function getSteamName(steamID) {

        // 发送请求
        // TODO: key 为steam key 需要使用用户自己的key  开发阶段使用本人的key
        let result = await fetch(`http://127.0.0.1:8008/api/steam/getName?key=1155051B4536156145C47935A24134EB&steamids=${steamID}`).then(response => response.json())

        // 请求失败
        if (result.code != 200 || result.players.length <= 0) {
            // 失败返回空  没有找到玩家名字
            return null
        }

        return result.players[0].personaname
    }



    return {
        getSteamName
    }
})