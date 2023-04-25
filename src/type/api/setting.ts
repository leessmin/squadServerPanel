export type settingType = {
	config: settingConfigType
}

export type settingConfigType = {
	game_serve_path: string
	listening_time: number
	panel_port: number
	server_ip: string
}