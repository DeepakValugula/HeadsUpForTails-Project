
//Create Loader Here
var main__content_body = document.getElementsByTagName("body");
var main__content_body_new = main__content_body[0];
main__content_body_new.style.cssText += 'display:none';

var loader_text  = '<div class="cod_loading" id="cod_loader"></div>';
	loader_text += '<style>.cod_loading{display:none;height: 0;width: 0;padding: 30px;border: 2px solid #1878b9;border-right-color: #e4d1d1;';
	loader_text += 'border-radius: 35px;-webkit-animation: rotate 1s infinite linear;position: absolute;left: 45%;top: 35%;}';
	loader_text += '@-webkit-keyframes rotate { 100% {-webkit-transform: rotate(360deg);}';

main__content_body_new.insertAdjacentHTML('beforebegin', loader_text);
document.getElementById("cod_loader").style.display = "block";


(function() {

	Shopify = window.Shopify || {};
	shopname = Shopify.shop;
	
	if(typeof Shopify.Checkout !="undefined" && typeof Shopify.Checkout !=null && Shopify.checkout !="undefined" && Shopify.checkout != null){
	
		//send request for thank you msg
		ajax_thank_you(shopname);

		//send request for otp form
		if((Shopify.checkout.phone !="undefined" && Shopify.checkout.phone != null) || (Shopify.checkout.billing_address.phone !="undefined" && Shopify.checkout.billing_address.phone != null) || (Shopify.checkout.shipping_address.phone !="undefined" && Shopify.checkout.shipping_address.phone != null)){
			var credit_card = true;
			order_id = Shopify.checkout.order_id;
			
			//send request for thank you msg
			cod_to_prepaid_link(order_id, shopname);
			
			if(Shopify.checkout.credit_card == null){
				credit_card = false;
			}

			setTimeout(function(){
				var response = ajax_otp_form(shopname, order_id,credit_card);
				if(response == true){
					document.getElementById("cancel_order").onclick = function(){
						var yes_no_button = document.getElementById("yes_no_button");
						var cancel_order = document.getElementById("cancel_order");
						yes_no_button.style.display = "block";
						cancel_order.style.display = "none";
						
					};
					
					document.getElementById("not_cancel").onclick = function(){
						var yes_no_button = document.getElementById("yes_no_button");
						var cancel_order = document.getElementById("cancel_order");
						yes_no_button.style.display = "none";
						cancel_order.style.display = "block";
					};

					document.getElementById("yes_cancel").onclick = function(){

						document.getElementById("cod_loader").style.display = "block";
						var container = document.getElementById("container");
						var order_cancel = document.getElementById("order_cancel");
						var order_confirm = document.getElementById("order_confirm");
						
						setTimeout(function(){
							var url = 'https://www.codivr.com/embedded/cod_confirmation/cron/exotel/otp_order_confirm_cancel.php';
							url = url+'?alldata='+shopname+'&order_id='+order_id+'&request_type=cancel';

							var xhReq = new XMLHttpRequest();
							xhReq.open('POST', url, false);
							xhReq.send(null);

							var serverResponse = xhReq.responseText;
							document.getElementById("cod_loader").style.display = "none";

							if(serverResponse == ' 1'){
								order_cancel.style.display = "block";
								setTimeout(function(){
									var main__content = document.getElementsByClassName("main__content");
									var main__content_new = main__content[0];
									main__content_new.style.removeProperty('position');
									main__content_new.style.removeProperty('left');
									//order_cancel.style.cssText += 'margin-bottom: 25px;';

									container.style.display = "none";
									order_confirm.style.display = "none";
									order_cancel.style.display = "none";
								}, 3000);
							}
						}, 2000);	
					};

					document.getElementById("signupsubmit").onclick = function(){
						var container = document.getElementById("container");
						var order_cancel = document.getElementById("order_cancel");
						var order_confirm = document.getElementById("order_confirm");
						var otp = document.getElementById("otp_value").value;
						
						if(otp == ''){
							document.getElementById("enter_otp_error").style.display = "block";
							return false;
						}else{
							document.getElementById("enter_otp_error").style.display = "none";
						}

						document.getElementById("cod_loader").style.display = "block";

						setTimeout(function(){

							var url = 'https://www.codivr.com/embedded/cod_confirmation/cron/exotel/otp_order_confirm_cancel.php';
							url = url+'?alldata='+shopname+'&order_id='+order_id+'&request_type=confirm&otp='+otp;

							var xhReq = new XMLHttpRequest();
							xhReq.open('POST', url, false);
							xhReq.send(null);

							var serverResponse = xhReq.responseText;
							document.getElementById("cod_loader").style.display = "none";

							if(serverResponse == ' 1'){
								order_confirm.style.display = "block";

								//send request for thank you msg
								cod_to_prepaid_link(order_id, shopname);

								setTimeout(function(){
									var main__content = document.getElementsByClassName("main__content");
									var main__content_new = main__content[0];
									main__content_new.style.removeProperty('position');
									main__content_new.style.removeProperty('left');
									
									container.style.display = "none";
									order_cancel.style.display = "none";
									order_confirm.style.display = "none";
									document.getElementById("enter_otp_error").style.display = "none";
								}, 3000);
								
							}else if(serverResponse == ' 0'){
								container.style.display = "block";
								order_confirm.style.display = "none";
								order_cancel.style.display = "none";
								document.getElementById("invalid_otp").style.display = "block";
							}
						}, 2000);
					};

					document.getElementById("resend_otp").onclick = function(){
						
						var url = 'https://www.codivr.com/embedded/cod_confirmation/cron/exotel/resend_otp.php';
						url = url+'?alldata='+shopname+'&order_id='+order_id;

						var warning_msg = document.getElementById("warning_msg");
						var resend_otp_msg = document.getElementById("resend_otp_msg");

						var xhReq = new XMLHttpRequest();
						xhReq.open('POST', url, false);
						xhReq.send(null);

						var serverResponse = xhReq.responseText;
						
						if(serverResponse == ' 1'){
							warning_msg.style.display = "none";
							resend_otp_msg.style.display = "block";
						}
						

					};
				}
			}, 2000);		
		}else{
			document.getElementById("cod_loader").style.display = "none";
		}
		
	}else{
		document.getElementById("cod_loader").style.display = "none";
		main__content_body_new.style.cssText += 'display:block';
	}	


})();

function ajax_thank_you(shopname){
	
    var url = 'https://www.codivr.com/embedded/cod_confirmation/cron/exotel/thankyou.php';
    url = url+'?alldata='+shopname;

    var xhReq = new XMLHttpRequest();
	xhReq.open('POST', url, false);
	xhReq.send(null);

	var serverResponse = xhReq.responseText;

	Shopify.Checkout.OrderStatus.addContentBox('<div id="thankumessage"></div>');
	document.getElementById("thankumessage").innerHTML = serverResponse;
  
    
}

function cod_to_prepaid_link(order_id,shopname){
	
    var url = 'https://www.codivr.com/embedded/cod_confirmation/cron/exotel/payment_link.php';
    url = url+'?shopname='+shopname+'&order_id='+order_id;

    var xhReq = new XMLHttpRequest();
	xhReq.open('POST', url, false);
	xhReq.send(null);

	var serverResponse = xhReq.responseText;
	var serverResponse_new = JSON.parse(serverResponse);
	document.getElementById("cod_loader").style.display = "none";
	var main__content_body = document.getElementsByTagName("body");
	var main__content_body_new = main__content_body[0];
	main__content_body_new.style.cssText += 'display:block';
	
	if(serverResponse_new.payment_link_content !=='' && serverResponse_new.time_in_seconds > 0){
		Shopify.Checkout.OrderStatus.addContentBox('<div id="cod_to_prepaid_link"></div>');
		document.getElementById("cod_to_prepaid_link").innerHTML = serverResponse_new.payment_link_content;
		//start timer
		startTimer(serverResponse_new.time_in_seconds); 
	}	
	
}
	
function ajax_otp_form(shopname, order_id, credit_card){

    var url = 'https://www.codivr.com/embedded/cod_confirmation/cron/exotel/otp_form.php';
    url = url+'?shopname='+shopname+'&order_id='+order_id+'&credit_card='+credit_card;
	
    var xhReq = new XMLHttpRequest();
	xhReq.open('POST', url, false);
	xhReq.send(null);

	var serverResponse = xhReq.responseText;
	var serverResponse_new = JSON.parse(serverResponse);

	//remove thank you msg
	if(serverResponse_new.ivrappmode == 'otpmode'){
		document.getElementById("thankumessage").parentElement.parentElement.style.display = "none";
	}

	//hide loader
	var main__content_body = document.getElementsByTagName("body");
	var main__content_body_new = main__content_body[0];
	main__content_body_new.style.cssText += 'display:block';
	document.getElementById("cod_loader").style.display = "none";
	
	if(serverResponse_new.otp_form_content !==''){
		var main__content = document.getElementsByClassName("main__content");
		var main__content_new = main__content[0];
		
		if(serverResponse_new.input_key == '1' || serverResponse_new.input_key == ' 1' || serverResponse_new.input_key == '2' || serverResponse_new.input_key == '2'){
	
			main__content_new.style.removeProperty('position');
			main__content_new.style.removeProperty('left');
			
		}else{
			main__content_new.style.cssText += 'position: absolute;left: -2000px;';
			main__content_new.insertAdjacentHTML('beforebegin', '<main id="otp_form"></main>');

			document.getElementById("otp_form").innerHTML = serverResponse_new.otp_form_content;
			document.getElementById("phone_number").innerHTML = serverResponse_new.phone;

		}		

		return true;
		
	}else{
		return false;
	}
  
}

function onlyNumberKey(evt) {
          
	// Only ASCII charactar in that range allowed
	var ASCIICode = (evt.which) ? evt.which : evt.keyCode
	if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
		return false;
	return true;
}

var timeInSecs;
var ticker;
function startTimer(secs) {
	timeInSecs = parseInt(secs);
	ticker = setInterval("tick()", 1000); 
}

function tick() {
	var secs = timeInSecs;
	if (secs > 0) {
		timeInSecs--; 
	}

	var mins = Math.floor(secs/60);
	var hours = Math.floor(secs/(60*60));
		secs %= 60;
		mins %= 60; 
	var new_hr = ( (hours < 10) ? "0" : "" ) + hours;
	var new_min = ( (mins < 10) ? "0" : "" ) + mins;
	var new_sec = ( (secs < 10) ? "0" : "" ) + secs;

	document.getElementById("c2p_timer_hours").innerHTML = new_hr;
	document.getElementById("c2p_timer_minutes").innerHTML = new_min;
	document.getElementById("c2p_timer_seconds").innerHTML = new_sec;
}

	
   


