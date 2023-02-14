// 判断是否为空  为空返回true
export function isNull(value) {
    return value === undefined || value === null || value.toString().trim().length === 0;
}
