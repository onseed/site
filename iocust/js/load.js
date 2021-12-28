$(function() {
	$("#svg_sean").load( "svg.php",function(){
		$.getScript( "js/main.js" )
			.done(function( script, textStatus ) {
				screenWidth = parseInt($(window).innerWidth());
				screenHeight = parseInt($(window).height());
				setResolution();
			})
			.fail(function( jqxhr, settings, exception ) {
		});
	});
});