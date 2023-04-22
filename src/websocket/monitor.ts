import { cpuType, dealNetType, dealSystemInfoType, loadType, memType, monitorType, netType } from "../type/api/monitor"
import MyWS from "./ws"

// 使用 web worker 监听 websocket

// 存储MyWS
let ws: MyWS

// 监听发送来的消息
self.onmessage = function (msg) {
	// 判断是否创建 MyWS
	if (ws == undefined) {
		// 创建 MyWS
		ws = MyWS.createMyWS(msg.data)

		ws.addMsg(myWSMsg)
	}
}

// 接收ws发送来的消息
function myWSMsg(e: MessageEvent) {
	// 获取原始的数据
	let systemOriginal = JSON.parse(e.data) as monitorType

	// 处理好信息
	let sit: dealSystemInfoType = {
		cpu: cpuHandle(systemOriginal.systemInfo.cpu),
		memory: memHandle(systemOriginal.systemInfo.memory),
		swap: memHandle(systemOriginal.systemInfo.swap),
		disk: diskHandle(systemOriginal.systemInfo.disk),
		load: loadHandle(systemOriginal.systemInfo.load.load),
		net: netHandle(systemOriginal.systemInfo.net),
		time: systemOriginal.time
	}
	// 将处理好的信息返回
	self.postMessage(sit)
}

// cpu信息处理
function cpuHandle(cpu: cpuType): cpuType {

	// 保留两位小数
	cpu.used = Number(cpu.used.toFixed(2))

	return cpu
}

// 内存相关的信息处理
function memHandle(mem: memType): memType {
	// 保留两位数
	mem.used_percent = Number(mem.used_percent.toFixed(2))

	// 换算成MB
	mem.total = Math.round(mem.total / 1024 / 1024)
	mem.used = Math.round(mem.used / 1024 / 1024)

	return mem
}

// 存储相关的信息处理
function diskHandle(disk: memType): memType {
	// 保留两位数
	disk.used_percent = Number(disk.used_percent.toFixed(2))

	// 换算成GB
	disk.total = Math.round(disk.total / 1024 / 1024 / 1024)
	disk.used = Math.round(disk.used / 1024 / 1024 / 1024)

	return disk
}

// 系统平均负载
function loadHandle(load: loadType): number {
	let total = Math.round((load.load1 + load.load5 + load.load15) / 3)

	return total
}

// 存储之前的网络状态
let beforeNet: netType

// 网络相关类型
function netHandle(net: netType): dealNetType {
	if (beforeNet == undefined) {
		beforeNet = net
	}

	let dn: dealNetType = {
		now_recv: Number(((net.bytes_recv - beforeNet.bytes_recv) / 1024 / 1024).toFixed(2)),
		now_sent: Number(((net.bytes_sent - beforeNet.bytes_sent) / 1024 / 1024).toFixed(2)),
		bytes_recv: Number((beforeNet.bytes_recv / 1024 / 1024 / 1024).toFixed(2)),
		bytes_sent: Number((beforeNet.bytes_sent / 1024 / 1024 / 1024).toFixed(2)),
	}

	beforeNet = net

	return dn
}