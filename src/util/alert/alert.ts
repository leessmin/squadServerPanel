import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";


// 判断是否需要阻止路由跳转
export function abortAlert(): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		Modal.confirm({
			content: '你还没有保存配置呢，你确定要退出吗',
			icon: createVNode(ExclamationCircleOutlined),
			onOk() {
				resolve(true)
			},
			cancelText: '取消',
			onCancel() {
				Modal.destroyAll();
				resolve(false)
			},
		});
	})
}