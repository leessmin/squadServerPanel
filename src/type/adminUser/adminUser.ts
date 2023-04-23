// 管理员的数据格式
export type AdminUserData = {
	key: string,
	steamName: string,
	steamId: string,
	groupName: string,
}

// 选择管理组 选项
export type selectType = {
	value: string
	label: string
}