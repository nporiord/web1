use Rack::Static, 
	:urls => [
		"/resources",
		"/resources/css",
		"/resources/fonts",
		"/resources/img",
		"/resources/js",
		"/teknor",
		"/teknor/img",
		"/teknor/settings",
		"/fightGym",
		"/fightGym/settings",
		"/fightGym/img"], 
	:root => "public";