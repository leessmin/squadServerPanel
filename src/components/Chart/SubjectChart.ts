import * as echarts from 'echarts'
// <T extends echarts.EChartOption<echarts.EChartOption.Series>>
// 监听配置变化 更新图表
export default class SubjectChart<T extends echarts.EChartsOption | echarts.EChartOption<echarts.EChartOption.Series> | echarts.EChartsResponsiveOption> {
	// 配置
	private option: T
	// 储存 myChart变量
	private myChart: echarts.EChartsType

	constructor(option: T, chart: HTMLElement) {
		// 初始化图表
		this.option = option
		this.myChart = echarts.init(chart)
		this.updateChart()
	}

	// 更新图表
	private updateChart() {
		// 更新图表             // TODO：类型 echarts.EChartsOption 不能使用setOption方法， 暂时使用 类型断言 any
		this.myChart.setOption(this.option as any)
	}

	// 获取图表配置
	public getOption(): T {
		return this.option
	}

	// 更新配置
	public setOption(callback: (option: T) => T) {

		this.option = callback(this.getOption())

		this.updateChart()
	}

	// 更新图表
	public resize() {
		this.myChart.resize()
	}
}