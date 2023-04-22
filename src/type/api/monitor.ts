// 系统的信息 类型
export type systemInfoType = {
	cpu: cpuType
	disk: memType
	load: {
		load: loadType
	}
	memory: memType
	net: netType
	swap: memType
	system: {
		sa: string,
		system_name: string
	}
}

// 存储相关的 类型
export type memType = {
	total: number
	used: number
	used_percent: number
}

// cpu相关的类型
export type cpuType = {
	core: number
	core_logic: number
	model_name: number
	used: number
}

// 系统平均负载 相关 的类型
export type loadType = {
	load1: number
	load5: number
	load15: number
}

// 与网络相关的类型
export type netType = {
	bytes_recv: number
	bytes_sent: number
}

// 系统监控  类型
export type monitorType = {
	// 记录的时间
	time: string
	// 系统的信息
	systemInfo: systemInfoType
}


// 处理好的网络 类型
export type dealNetType = {
	now_recv: number
	now_sent: number
	bytes_recv: number
	bytes_sent: number
}

// 处理好的 系统的信息
export type dealSystemInfoType = {
	cpu: cpuType
	memory: memType
	swap: memType
	disk: memType
	load: number
	net: dealNetType
	time: string
}