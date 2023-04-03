<template>
    <!-- 常规配置 -->
    <div class="main">
        <div class="title-box">
            <h3>常规配置</h3>
        </div>

        <div class="GSNormal">
            <div class="btn-box">
                <a-button type="primary" style="margin-left: 280px;">保存</a-button>
                <a-button type="primary" style="margin-left: 100px;" danger>取消</a-button>
            </div>
            <ul>
                <li>
                    <a-form-item label="服务器名字" :label-col="labelCol">
                        <div class="input-box">
                            <a-input v-model:value="ServerConfig.ServerName" />
                        </div>
                    </a-form-item>
                    <span>(ServerName)服务器列表中显示的名字</span>
                </li>
                <li>
                    <a-form-item label="是否在浏览器中可见" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.ShouldAdvertise" />
                        </div>
                    </a-form-item>
                    <span>(ShouldAdvertise)控制服务器在浏览器中的可见性。默认值：true</span>
                </li>
                <li>
                    <a-form-item label="局域网是否可连接" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.IsLANMatch" />
                        </div>
                    </a-form-item>
                    <span>(IsLANMatch)如果为true则开启局域网连接，反之。默认值：false</span>
                </li>
                <li>
                    <a-form-item label="最大玩家数量" :label-col="labelCol">
                        <div class="other-box">
                            <a-input-number id="inputNumber" v-model:value="ServerConfig.MaxPlayers" :min="1" :max="100" />
                        </div>
                    </a-form-item>
                    <span>(MaxPlayers)服务器最大能容纳的玩家数量。最大值：100</span>
                </li>
                <li>
                    <a-form-item label="预留位" :label-col="labelCol">
                        <div class="other-box">
                            <a-input-number id="inputNumber" v-model:value="ServerConfig.NumReservedSlots" :min="0"
                                :max="100" />
                        </div>
                    </a-form-item>
                    <span>(NumReservedSlots)为管理员/成员预留的插槽数量。最大值：100</span>
                </li>
                <li>
                    <a-form-item label="排队人数" :label-col="labelCol">
                        <div class="other-box">
                            <a-input-number id="inputNumber" v-model:value="ServerConfig.PublicQueueLimit" :min="0"
                                :max="100" />
                        </div>
                    </a-form-item>
                    <span>(PublicQueueLimit)服务器排队大小，供普通用户使用。默认值：25</span>
                </li>
                <li>
                    <a-form-item label="标签" :label-col="labelCol">
                        <div class="other-box">
                            <a-input v-model:value="ServerConfig.Tags" />
                        </div>
                    </a-form-item>
                    <span>(Tags)服务器的标签，默认值：null</span>
                </li>
                <li>
                    <a-form-item label="换图模式" :label-col="labelCol">
                        <div class="other-box">
                            <a-select ref="select" v-model:value="ServerConfig.MapRotationMode" style="width: 120px">
                                <a-select-option value="LayerList">LayerList</a-select-option>
                                <a-select-option value="LevelList">LevelList</a-select-option>
                            </a-select>
                        </div>
                    </a-form-item>
                    <span>(MapRotationMode)换图模式，地图规则请前往地图循环修改。默认值：LayerList</span>
                </li>
                <li>
                    <a-form-item label="随机列表" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.RandomizeAtStart" />
                        </div>
                    </a-form-item>
                    <span>(RandomizeAtStart)地图/图层旋转列表是否应该在开始时随机化?。默认值：true</span>
                </li>
                <li>
                    <a-form-item label="阵营投票" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.UseVoteFactions" />
                        </div>
                    </a-form-item>
                    <span>(UseVoteFactions)阵营应该在通用层上投票吗?。默认值：false</span>
                </li>
                <li>
                    <a-form-item label="地图投票" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.UseVoteLevel" />
                        </div>
                    </a-form-item>
                    <span>(UseVoteLevel)下一张地图应该在回合结束时投票吗?。默认值：false</span>
                </li>
                <li>
                    <a-form-item label="层投票" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.UseVoteLayer" />
                        </div>
                    </a-form-item>
                    <span>(UseVoteLayer)下一层应该在回合结束时投票吗?。默认值：false</span>
                </li>
                <li>
                    <a-form-item label="是否允许跳边" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.AllowTeamChanges" />
                        </div>
                    </a-form-item>
                    <span>(AllowTeamChanges)允许或不允许跳边。默认值：true</span>
                </li>
                <li>
                    <a-form-item label="是否考虑队伍平衡跳变" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.PreventTeamChangeIfUnbalanced" />
                        </div>
                    </a-form-item>
                    <span>(PreventTeamChangeIfUnbalanced)允许或不允许跳边。默认值：true</span>
                </li>
                <li>
                    <a-form-item label="允许的人数差" :label-col="labelCol">
                        <div class="other-box">
                            <a-input-number id="inputNumber" v-model:value="ServerConfig.NumPlayersDiffForTeamChanges"
                                :min="1" :max="100" />
                        </div>
                    </a-form-item>
                    <span>(NumPlayersDiffForTeamChanges)两队之间允许的最大玩家数量差异。这将考虑到玩家离开的团队和玩家加入的团队。默认值：3</span>
                </li>
                <li>
                    <a-form-item label="踢出未加入小队的玩家" :label-col="labelCol">
                        <div class="other-box">
                            <a-input-number id="inputNumber" v-model:value="ServerConfig.RejoinSquadDelayAfterKick"
                                :min="0" />
                        </div>
                    </a-form-item>
                    <span>(RejoinSquadDelayAfterKick)踢出未加入小队的玩家，单位秒。默认值：180</span>
                </li>
                <li>
                    <a-form-item label="记录演示" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.RecordDemos" />
                        </div>
                    </a-form-item>
                    <span>(RecordDemos)（我也不知道这个配置是做什么用的，知道的可以在github上提交Issues，我先谢谢各位了）。默认值：false</span>
                </li>
                <li>
                    <a-form-item label="是否允许公众客户记录" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.AllowPublicClientsToRecord" />
                        </div>
                    </a-form-item>
                    <span>(AllowPublicClientsToRecord)（我也不知道这个配置是做什么用的，知道的可以在github上提交Issues，我先谢谢各位了）。默认值：false</span>
                </li>
                <li>
                    <a-form-item label="消息间隔" :label-col="labelCol">
                        <div class="other-box">
                            <a-input-number id="inputNumber" v-model:value="ServerConfig.ServerMessageInterval" :min="1" />
                        </div>
                    </a-form-item>
                    <span>(ServerMessageInterval)服务器消息的间隔，单位秒。默认值：300</span>
                </li>
                <li>
                    <a-form-item label="强制服务器进行一次非无缝传输" :label-col="labelCol">
                        <div class="other-box">
                            <a-input-number id="inputNumber"
                                v-model:value="ServerConfig.ForceNonSeamlessTravelIntervalSeconds" :min="1" />
                        </div>
                    </a-form-item>
                    <span>(ForceNonSeamlessTravelIntervalSeconds)服务器消息的间隔，单位秒。默认值：43200</span>
                </li>
                <li>
                    <div style="width: 100%; margin-left: 40px;">
                        <a-divider />
                        <h3>以下内容对于许可服务器是必需的，但对于非许可服务器可以更改</h3>
                    </div>
                </li>
                <li>
                    <a-form-item label="tk队友自动踢出" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.TKAutoKickEnabled" />
                        </div>
                    </a-form-item>
                    <span>(TKAutoKickEnabled)tk队友自动踢出。默认值：true</span>
                </li>
                <li>
                    <a-form-item label="tk的人数" :label-col="labelCol">
                        <div class="other-box">
                            <a-input-number id="inputNumber" v-model:value="ServerConfig.AutoTKBanNumberTKs" :min="1" />
                        </div>
                    </a-form-item>
                    <span>(AutoTKBanNumberTKs)超过tk的人数自动踢出。默认值：7</span>
                </li>
                <li>
                    <a-form-item label="自动踢出的延迟时间" :label-col="labelCol">
                        <div class="other-box">
                            <a-input-number id="inputNumber" v-model:value="ServerConfig.AutoTKBanTime" :min="1" />
                        </div>
                    </a-form-item>
                    <span>(AutoTKBanTime)自动踢出的延迟时间，单位秒。默认值：300</span>
                </li>
                <li>
                    <a-form-item label="车辆套件要求" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.VehicleKitRequirementDisabled" />
                        </div>
                    </a-form-item>
                    <span>(VehicleKitRequirementDisabled)（我也不知道这个配置是做什么用的，知道的可以在github上提交Issues，我先谢谢各位了）。默认值：false</span>
                </li>
                <li>
                    <a-form-item label="允许社区管理员访问" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.AllowCommunityAdminAccess" />
                        </div>
                    </a-form-item>
                    <span>(AllowCommunityAdminAccess)允许社区管理员访问。默认值：true</span>
                </li>
                <li>
                    <a-form-item label="允许Offworld Industries的开发者是管理员" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.AllowDevProfiling" />
                        </div>
                    </a-form-item>
                    <span>(AllowDevProfiling)允许Offworld Industries的开发者是管理员。默认值：true</span>
                </li>
                <li>
                    <a-form-item label="允许QA" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.AllowQA" />
                        </div>
                    </a-form-item>
                    <span>(AllowQA)允许QA。默认值：true</span>
                </li>
                <li>
                    <a-form-item label="下面的命令对于所有服务器都是可选的" :label-col="labelCol">
                        <div class="other-box">
                            <a-switch v-model:checked="ServerConfig.VehicleClaimingDisabled" />
                        </div>
                    </a-form-item>
                    <span>(VehicleClaimingDisabled)下面的命令对于所有服务器都是可选的。默认值：false</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { ServerConfigType } from '../../../../type/gameServer/gameServer';

// a-form-item label 的宽度
const labelCol = { style: { width: '280px' } };



// 服务器的配置
const ServerConfig = reactive<ServerConfigType>({
    // 服务器的名字
    ServerName: "",
    // 是否在浏览器中可见
    ShouldAdvertise: true,
    // 局域网是否可连接
    IsLANMatch: false,
    // 最大玩家数量
    MaxPlayers: 100,
    // 预留位
    NumReservedSlots: 0,
    // 排队人数
    PublicQueueLimit: 25,
    // 服务器的标签
    Tags: "",
    // 换图模式
    MapRotationMode: 'LayerList',
    // 随机列表
    RandomizeAtStart: true,
    // 阵营投票
    UseVoteFactions: false,
    // 地图投票
    UseVoteLevel: false,
    // 层投票
    UseVoteLayer: false,
    // 是否允许跳边
    AllowTeamChanges: true,
    // 是否考虑队伍平衡跳变
    PreventTeamChangeIfUnbalanced: true,
    // 允许的人数差
    NumPlayersDiffForTeamChanges: 3,
    // 踢出未加入小队的玩家
    RejoinSquadDelayAfterKick: 180,
    // 记录演示
    RecordDemos: false,
    // 是否允许公众客户记录
    AllowPublicClientsToRecord: false,
    // 服务器消息间隔
    ServerMessageInterval: 300,
    // 强制服务器每X秒进行一次非无缝传输(更改地图时断开连接)
    ForceNonSeamlessTravelIntervalSeconds: 43200,
    // tk队友自动ban
    TKAutoKickEnabled: true,
    // tk的人数
    AutoTKBanNumberTKs: 7,
    // 自动ban的延迟时间
    AutoTKBanTime: 300,
    // 车辆套件要求
    VehicleKitRequirementDisabled: false,
    // 允许社区管理员访问
    AllowCommunityAdminAccess: true,
    // 允许Offworld Industries的开发者是管理员
    AllowDevProfiling: false,
    // 允许QA
    AllowQA: true,
    // 下面的命令对于所有服务器都是可选的
    VehicleClaimingDisabled: false,
})
</script>

<style scoped lang="less">
.main {


    .GSNormal {
        margin-top: 20px;

        // .btn-box {}

        ul {
            padding: 0;

            li {
                margin-top: 20px;
                display: flex;

                .btn {
                    margin-left: 10px;
                }

                span {
                    height: 32px;
                    line-height: 32px;
                    margin-left: 10px;
                    color: var(--text-color-secondary);
                    width: 600px;
                }

                .input-box {
                    width: 250px;
                    display: flex;
                    justify-content: right;
                    float: right;
                }

                .other-box {
                    width: 120px;
                    display: flex;
                    justify-content: center;
                    float: right;
                }
            }
        }
    }
}
</style>