use Rack::Static, 
	:urls => [
		"/resources",
		"/abcpool",
		"/bodhi",
		"/devine",
		"/fightgym",
		"/genesian",
		"/redoak",
    	"/sinceileftyou",        
		"/smallbarerskine"
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