use Rack::Static, 
	:urls => [
		"/resources",
		"/teknor",
		"/fightGym",
		"/bodhi",
		"/cafeAmici",
		"/redoak",
		"/bambini",
		"/smallBar",
		"/deVine"
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