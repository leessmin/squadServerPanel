import dayjs from "dayjs"

// 被封禁的玩家 集合
export type BansType = {
	bansPlayers: BanserType[]
}

// 单个被封禁的玩家
export type BanserType = {
	steamId: string
	info: string
	bansTime: string | null | dayjs.Dayjs
}