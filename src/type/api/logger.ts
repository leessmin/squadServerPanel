import { LogLevelType } from "../log/log";

// 服务器返回的类型
export type loggerType = {
	log: logType[]
}

export type logType = {
	msg: string;
	time: string;
	level: string;
}


// 表格数据类型
export type TableDataType = {
	key: string;
	msg: string;
	time: string;
	level: LogLevelType;
};