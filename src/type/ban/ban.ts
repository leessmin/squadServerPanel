import dayjs from "dayjs";

// 被封禁的玩家的数据格式
export type BanerData = {
	key: string,
	// 玩家姓名
	steamName: string,
	// 玩家steam id
	steamId: string,
	// 封禁的原因
	info: string,
	// 封禁的时间
	bansTime: dayjs.Dayjs | null,

}