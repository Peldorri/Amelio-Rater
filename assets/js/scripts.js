
jQuery(document).ready(function() {

    /*
        Fullscreen background
    */
    $.backstretch("/static/img/backgrounds/1.jpg");
		$("#form-error").hide();
    /*
        Form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });

    $('.login-form').on('submit', function(e) {
			var isValid = true;
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
					isValid = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
			e.preventDefault();
			if(isValid){
				var settings = {
			  "async": true,
			  "crossDomain": true,
			  "url": "https://fierce-refuge-50550.herokuapp.com/user/login",
			  "method": "POST",
			  "headers": {
			    "content-type": "application/x-www-form-urlencoded",
			    "cache-control": "no-cache"
			  },
			  "data": {
			    "email": $(this).find('input[type="text"]').val(),
			    "password": $(this).find('input[type="password"]').val()
			  }
			}

			$.ajax(settings).done(function (response) {
			  if(response._id){
					window.location.href = "https://fierce-refuge-50550.herokuapp.com";												//replace localhost
				} else{
					$("#form-error").show();
				}
			});
			}
    });




});
