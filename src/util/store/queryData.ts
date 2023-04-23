// 整合 query 参数
export function dealQuery(key: string, arr: string[]): string {
	let queryStr = ""

	arr.forEach(v => {
		queryStr += `${key}=${v}&`
	})

	return queryStr.substring(0, queryStr.length - 1)
}