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
	
run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('public/index.html', File::RDONLY)
  ]
}