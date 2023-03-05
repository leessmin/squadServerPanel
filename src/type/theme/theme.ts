// 主题的名称
export type ThemeType = "dark" | "light"

type Color = string
type Variate = string
// 主题的颜色
export type ThemeColor = Map<Color, Variate>