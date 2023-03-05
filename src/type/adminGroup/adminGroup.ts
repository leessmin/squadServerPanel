import { type } from "os";

// 管理组的数据格式
export type AdminGroupData = {
    // key
    key: string,
    // 组名
    groupName: string,
    // 备注
    info: string,
    // 权限
    auth: (keyof AdminGroupAuth)[],
}

// 管理组的权限
export type AdminGroupAuth = {
    // 组名
    groupName: string,
    // 备注
    info: string,
    // 更换/预设地图
    changemap: boolean,
    // 暂停游戏
    pause: boolean,
    // 使用作弊命令
    cheat: boolean,
    // 设置服务器密码
    private: boolean,
    // 忽略服务器阵营平衡
    balance: boolean,
    // 忽略服务器阵营平衡
    chat: boolean,
    // 踢出玩家
    kick: boolean,
    // 封禁玩家
    ban: boolean,
    // 更改服务器配置
    config: boolean,
    // 摄影机 - 管理员视角
    cameraman: boolean,
    // 无法被 踢出/封禁
    immune: boolean,
    // 关闭服务器
    manageserver: boolean,
    // 预留位
    reserve: boolean,
    // 调试
    debug: boolean,
    // 忽略更换阵营时间限制
    teamchange: boolean,
    // 允许执行强制更换阵营命令
    forceteamchange: boolean,
    // 查看 管理员聊天/友军击杀/管理员加入消息
    canseeadminchat: boolean,
}