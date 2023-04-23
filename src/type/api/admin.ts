import { type } from "os"
import { AdminGroupAuth } from "../adminGroup/adminGroup"

// 管理组集合 类型
export type adminGroupType = {
	adminGroup: groupType[]
}

// 管理组类型
export type groupType = {
	groupName: string
	info: string
	auth: (keyof AdminGroupAuth)[]
}

// 管理员集合 类型
export type adminUserType = {
	adminUser: userType[]
}

// 管理员类型
export type userType = {
	steamName: string,
	steamId: string,
	groupName: string,
}