// 随机颜色

function randomRGBColor() {
    //随机生成RGB颜色
    let arr = [];
    for (var i = 0; i < 3; i++) {
        // 暖色
        arr.push(Math.floor(Math.random() * 128 + 64));
        // 亮色
        arr.push(Math.floor(Math.random() * 128 + 128));
    }
    let [r, g, b] = arr;
    // 16进制颜色
    var color = `#${r.toString(16).length > 1 ? r.toString(16) : '0' + r.toString(16)}${g.toString(16).length > 1 ? g.toString(16) : '0' + g.toString(16)}${b.toString(16).length > 1 ? b.toString(16) : '0' + b.toString(16)}`;
    return color;
}

export default randomRGBColor