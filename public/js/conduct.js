$(document).ready(function(){
	var body = $('#container');
	body.html("")
	var footer=false;
	$.ajax({
        type: "GET",
		url: "settings/settings.xml",
		dataType: "xml",
		success: function(xml) {
			$("image",xml).each(function(){
				if($(this).attr('location')!=""){
					body.append('<img src="'+$(this).attr('location')+'">');
					if($(this).attr('stretch')=='true') {
						$('img',body).load(function(){
							$(this).addClass('stretch');
							var prop = $(this).width()/$(this).height();
							$(this).css({width:$(window).width()-35});
							$(this).css({height:$(this).width()/prop})
						})
					} 
				}
			})
			$("panel",xml).each(function(){
				body.append('<div class="panel"><div class="title"><a href="#">'+$(this).attr('title')+'</a></div><div class="content">'+$(this).text()+'</div></div>');
				var panel = $(this);
				$(".panel:last .content").each(function(){
					if(panel.attr('opened')=='true'){
						$(this).parent().addClass('opened')
						$(this).css('display','block')
						$(this).parent().css('height',70+$(this).height());
					}
					if(panel.attr('color')!=""){
						$(this).prev().find("a").css('color',panel.attr('color'));
					}
					if(panel.attr('textcolor')!=""){
						$(this).css('color',panel.attr('textcolor'));
					}
					if(panel.attr('bgcolor')!=""){
						$(this).parent().css('background-color',panel.attr('bgcolor'));
					}
				})
			});
			$('.panel .title a',body).each(function(){
				//$(this).parent().corner("round all 5px");
				$(this).click(function(e){
				e.preventDefault();
				if($(this).parent().parent().height()>70){
					$(this).parent().parent().animate({height:70},400).removeClass('opened')
				}
				else {
					//expand
					$(this).parent().next().css('display','block')
					$(".opened").animate({height:70},400).removeClass('opened')
					$(this).parent().parent().animate({ height: $(this).parent().next().height()+ 80},400 ).addClass('opened')
				}
			})});
			
			$('footer',xml).each(function(){
				footer=true;
				var footerhtml = '';
				if($('text',this).length>0)footerhtml+='<span>'+$('text',this).text()+'</span>';
				if($('facebook',this).length>0)footerhtml+='<a href="'+$('facebook',this).attr('link')+'"><img src="img/facebook.gif"></a>';
				if($('twitter',this).length>0)footerhtml+='<a href="'+$('twitter',this).attr('link')+'"><img src="img/twitter.png"></a>';
				body.append('<div id="footer"><div id="foot-inner">'+footerhtml+'</div></div>');
			})
			Resize();
		},
		error:function(error){
			alert('error in app')
		}
	})
	
	$(window).resize(Resize);
	
	function Resize(){
		body.css({width:$(window).width()-20})
		var bheight = $(window).height();
		$('img.stretch',body).each(function(){
			var prop = $(this).width()/$(this).height();
			$(this).css({width:$(window).width()-35});
			$(this).css({height:$(this).width()/prop})
		})
		/*
		if(footer){
			$('#footer',body.parent()).each(function(){
				$(this).css({width:$(window).width()-47, top:$(window).height()-50});
			})
			bheight-=72;
		}*/
		
		//body.css('height', bheight)
	}
	Resize();
})
