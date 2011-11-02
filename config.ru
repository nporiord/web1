use Rack::Static, 
	:urls => [
		"/resources",
		"/teknor",
		"/fightgym",
		"/bodhi",
		"/cafeamici",
		"/redoak",
		"/bambini",
		"/smallbar",
		"/devine"
		], 
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