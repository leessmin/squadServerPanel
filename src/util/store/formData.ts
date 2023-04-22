// 整合form-data数据
export function dealFormData(obj: Object): FormData {
	const formData = new FormData()
	for (const key in obj) {
		formData.append(key, (obj as any)[key])

	}

	return formData
}