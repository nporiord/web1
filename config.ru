use Rack::Static, 
	:urls => [
		"/resources",
		"/resources/css",
		"/resources/fonts",
		"/resources/img",
		"/resources/js",
		"/teknor",
		"/fightGym"], 
	:root => "public"