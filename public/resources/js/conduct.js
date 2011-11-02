$(document).ready(function(){
	var body = $('#container');
	body.html("")
	var footer=false;
	$.ajax({
        type: "GET",
		url: "settings/settings.xml",
		dataType: "xml",
		success: function(xml) {
			$("style",xml).each(function(){
				var styleTag = $(this)
				if($(this).attr('background')!=""){
					$("#container").each(function(){
						$(this).css({"background-color":styleTag.attr('background')});
					})
				}
			})
			
			$("image",xml).each(function(){
				if($(this).attr('location')!=""){
					body.append('<div class="panelwidth"><img src="'+$(this).attr('location')+'">');
					if($(this).attr('stretch')=='true') {
						$('img',body).load(function(){
							$(this).addClass('stretch');
							var prop = $(this).width()/$(this).height();
							$(this).css({width:$(this).parent().width()});
							$(this).css({height:$(this).width()/prop})
						})
					}
					body.append('</div>')
				}
			})
			
			$("panel",xml).each(function(){
				body.append('<div class="panel"><div class="title"><a href="#">'+$(this).attr('title')+'</a></div><div class="content">'+$(this).text()+'</div></div>');
				var panel = $(this);
				$(".panel:last .content").each(function(){
					if(panel.attr('opened')=='true'){
						$(this).parent().addClass('opened')
						$(this).prev().css('background-image','url(../resources/img/arrow-up.png)')
						$(this).css('display','block')
						$(this).parent().css('height',40+$(this).height());
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
				$(this).click(function(e){
				e.preventDefault();
				if($(this).parent().parent().height()>40){
					$(this).parent().parent().animate({height:40},400).removeClass('opened')
					$(this).parent().css('background-image','url(../resources/img/arrow-down.png)');
				}
				else {
					//expand
					$(this).parent().next().css('display','block')
					$(this).parent().css('background-image','url(../resources/img/arrow-up.png)');
					$(".opened").each(function(){
						$(this).animate({height:40},400);
						$('.title',$(this)).css('background-image','url(../resources/img/arrow-down.png)');
						$(this).removeClass('opened')
					});
						
					$(this).parent().parent().animate({ height: $(this).parent().next().height()+ 80},400 ).addClass('opened')
				}
			})});
			
			$('footer',xml).each(function(){
				footer=true;
				var footerhtml = '';
				
				if($('text',this).length>0)footerhtml+='<span>'+$('text',this).text()+'</span><div>';
				$('facebook',this).each(function(){
					footerhtml+='<a href="'+$(this).attr('link')+'"><img src="../resources/img/facebook.gif"></a>';
				})
				if($('twitter',this).length>0)footerhtml+='<a href="'+$('twitter',this).attr('link')+'"><img src="../resources/img/twitter.png"></a>';
				if($('phone',this).length>0)footerhtml+='<a href=\"tel:'+$('phone',this).attr('link')+'\""><img src="../resources/img/phone.png"></a>';
				if($('email',this).length>0)footerhtml+='<a href=mailto:"'+$('email',this).attr('link')+'"><img src="../resources/img/email.png"></a>';
				if($('map',this).length>0)footerhtml+='<a href=http://maps.google.com.au/maps?q="'+$('map',this).attr('link')+'"><img src="../resources/img/map.png"></a>';
				if($('text',this).length>0)footerhtml+='</div>';
				body.append('<div id="footer"><div id="foot-inner">'+footerhtml+'</div></div>');
				
				var footer = $(this);
				
				if($(this).attr('color')!=""){
					$("#footer").each(function(){
						$(this).css('color',footer.attr('textcolor'));
						$(this).css('background',footer.attr('bgcolor'));
					})
				}
			})
			
			$('app',xml).each(function(){
				document.title = $(this).attr('title');
			});
			
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
	}
	Resize();
})
