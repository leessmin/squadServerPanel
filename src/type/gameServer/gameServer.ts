// 游戏的配置
export type ServerConfigType = {
    // 服务器的名字
    ServerName: string,
    // 是否在浏览器中可见
    ShouldAdvertise: boolean,
    // 局域网是否可连接
    IsLANMatch: boolean,
    // 最大玩家数量
    MaxPlayers: number,
    // 预留位
    NumReservedSlots: number,
    // 排队人数
    PublicQueueLimit: number,
    // 服务器的标签
    Tags: string,
    // 换图模式
    MapRotationMode: string,
    // 随机列表
    RandomizeAtStart: boolean,
    // 阵营投票
    UseVoteFactions: boolean,
    // 地图投票
    UseVoteLevel: boolean,
    // 层投票
    UseVoteLayer: boolean,
    // 是否允许跳边
    AllowTeamChanges: boolean,
    // 是否考虑队伍平衡跳变
    PreventTeamChangeIfUnbalanced: boolean,
    // 允许的人数差
    NumPlayersDiffForTeamChanges: number,
    // 踢出未加入小队的玩家
    RejoinSquadDelayAfterKick: number,
    // 记录演示
    RecordDemos: boolean,
    // 是否允许公众客户记录
    AllowPublicClientsToRecord: boolean,
    // 服务器消息间隔
    ServerMessageInterval: number,
    // 强制服务器每X秒进行一次非无缝传输(更改地图时断开连接)
    ForceNonSeamlessTravelIntervalSeconds: number,
    // tk队友自动ban
    TKAutoKickEnabled: boolean,
    // tk的人数
    AutoTKBanNumberTKs: number,
    // 自动ban的延迟时间
    AutoTKBanTime: number,
    // 车辆套件要求
    VehicleKitRequirementDisabled: boolean,
    // 允许社区管理员访问
    AllowCommunityAdminAccess: boolean,
    // 只有Offworld Industries的开发者是管理员
    AllowDevProfiling: boolean,
    // 允许QA
    AllowQA: boolean,
    // 下面的命令对于所有服务器都是可选的
    VehicleClaimingDisabled: boolean,
}