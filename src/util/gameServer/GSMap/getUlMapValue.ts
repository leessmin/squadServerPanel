// 从dom中获取到地图列表

function getUlMapValue(ulDom: HTMLUListElement): string[] {
    // 获取子元素
    const childDom = (ulDom as HTMLUListElement).children

    // 储存 地图的数组
    let mapArr: string[] = new Array()

    for (let i = 0; i < childDom.length; i++) {
        mapArr.push(childDom[i].children[0].textContent as string)
    }

    return mapArr
}

export default getUlMapValue