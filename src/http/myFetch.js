class myFetch {

    constructor(option = {}) {
        this.#option = option
    }

    // 发送请求
    async getResult(uri) {
        return await fetch(`${this.#url}${uri}`, this.#option).then(r => r.json())
    }


    #url = ""
    #uri = ""
    #option = {}
}

export default myFetch