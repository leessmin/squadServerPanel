import MyFetch from "./myFetch";

// 使用MyFetch
let myFetch: MyFetch | undefined

// 底层url
let baseUrl = "http://127.0.0.1:8080/api"

function http(): MyFetch {
	if (myFetch == undefined) {
		myFetch = new MyFetch(baseUrl, 8000)
	}

	return myFetch
}

export default http