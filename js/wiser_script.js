var wiser_shop = Shopify.shop;
var oursite="https://wiser.expertvillagemedia.com/"; 
var wiser_pid="";
/*
if((wiser_shop == "afends.myshopify.com")){
	var http = new XMLHttpRequest();
	var url = oursite+"ordersales/checkclick?shop="+wiser_shop;
	var data = new FormData();	    
	data.append('shopify_checkout', JSON.stringify(Shopify.Checkout));			
	data.append('shopify_checkout', JSON.stringify(Shopify));
	http.open('POST', url, true);
	console.log(data);
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			if(http.responseText){
			}
		}
	} 
	http.send(data);
}*/
if(typeof Shopify.Checkout!="undefined" && (Shopify.Checkout.page=="thank_you" || Shopify.Checkout.page=="checkout_one_thank_you") ){

/*recent purchase history localStorage code start*/
	//localStorage.removeItem("wi_purchased_product");
	if(Shopify.checkout.line_items.length>0)
	{
		if(localStorage.getItem("wi_purchased_product")==undefined)
		{
			var evmpurchaseproductIds = [];
			var evmPurchaseProductDetails = {
				ppdetails: []
			};
			for (var i = 0; i < Shopify.checkout.line_items.length; i++) 
			{
				purchasepid = Shopify.checkout.line_items[i].product_id;
				evmpurchaseproductIds.push(purchasepid);
				evmPurchaseProductDetails.ppdetails.push({ 
						id : purchasepid,
						title : Shopify.checkout.line_items[i].title,
						variants : Shopify.checkout.line_items[i].variant_id,
						vendor : Shopify.checkout.line_items[i].vendor,
					});
			}
		}
		else
		{
			var evmpurchaseproductIds = localStorage.getItem("wi_purchased_product");
			evmpurchaseproductIds = JSON.parse(evmpurchaseproductIds);
			var evmPurchaseProductDetails = localStorage.getItem("wi_purchased_product_detail");
			evmPurchaseProductDetails = JSON.parse(evmPurchaseProductDetails);
			
			if(evmpurchaseproductIds.length>6)
			{
				var splicecount = evmpurchaseproductIds.length-6;
				evmpurchaseproductIds.splice(0, splicecount); // returns [1]
				evmPurchaseProductDetails.splice(0, splicecount);
			}
			 		
			for (var i = 0; i < Shopify.checkout.line_items.length; i++) 
			{
				purchasepid = Shopify.checkout.line_items[i].product_id;
				var evmindex = evmpurchaseproductIds.indexOf(purchasepid);
				if(evmindex == -1)
				{		      
					evmpurchaseproductIds.push(purchasepid);
					evmPurchaseProductDetails.ppdetails.push({ 
						id : purchasepid,
						title : Shopify.checkout.line_items[i].title,
						variants : Shopify.checkout.line_items[i].variant_id,
						vendor : Shopify.checkout.line_items[i].vendor,
					});     
				}
			}
		}
		if(evmpurchaseproductIds.length > 0){
			localStorage.setItem("wi_purchased_product",JSON.stringify(evmpurchaseproductIds));
			localStorage.setItem("wi_purchased_product_detail",JSON.stringify(evmPurchaseProductDetails));
		}
	}
	/*recent purchase history localStorage code end*/	
	var orderid=Shopify.checkout.order_id;
	wiser_pid= orderid;
	localStorage.removeItem("wiser_pid");
	localStorage.setItem("wiser_pid",wiser_pid);
    if(localStorage.getItem("evm_wiser_productids")!=undefined || localStorage.getItem("evm_popup_ws_productids")!=undefined){
		var http = new XMLHttpRequest();
		var url = oursite+"admin/orderid/?shop="+wiser_shop+"&orderid="+orderid;
		var data = new FormData();
		/*Widget track*/
		data.append('products', localStorage.getItem("evm_wiser_productids"));
		data.append('evm_wiser_page', localStorage.getItem("evm_wiser_page"));
		data.append('evm_wiser_template', localStorage.getItem("evm_wiser_template"));
		data.append('evm_wiser_widget', localStorage.getItem("evm_wiser_widget"));
		data.append('evm_add_to_cart', localStorage.getItem("evm_add_to_cart"));
		data.append('total_price', Shopify.checkout.total_price);
		/*Popup Track*/    
		data.append('evm_popup_ws_productids', localStorage.getItem("evm_popup_ws_productids"));
		data.append('evm_popup_ws_page', localStorage.getItem("evm_popup_ws_page"));
		data.append('evm_popup_ws_template', localStorage.getItem("evm_popup_ws_template"));
		data.append('evm_popup_ws_widget', localStorage.getItem("evm_popup_ws_widget"));
		data.append('evm_popup_ws_addtocart', localStorage.getItem("evm_popup_ws_addtocart"));
		data.append('evm_popup_ws_popupids', localStorage.getItem("evm_popup_ws_popupids"));
		data.append('evm_wis_customer_browsed', localStorage.getItem("wis_customer_browsed"));
		if(window.localStorage.getItem("ws_disc_res")!=undefined)
		{
			var ws_disc_res_localstorag = window.localStorage.getItem("ws_disc_res");
			var ws_variant_ids_obj      = JSON.parse(ws_disc_res_localstorag);
			var ws_disc_code            = ws_variant_ids_obj.ws_disc_code;			
			newdisc_code ='';
			for (let i = ws_disc_code.length - 1; i >= 0; i--) {
				newdisc_code += ws_disc_code[i];
			}
			data.append('ws_disc_code', newdisc_code);
		}
		http.open('POST', url, true);
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				if(http.responseText){
				}
			}
		} 
		
		http.send(data);
		localStorage.removeItem("evm_wiser_productids");
		localStorage.removeItem("evm_wiser_page");
		localStorage.removeItem("evm_wiser_template");
		localStorage.removeItem("evm_wiser_widget");
		localStorage.removeItem("evm_add_to_cart");
		localStorage.removeItem("evm_popup_ws_productids");
		localStorage.removeItem("evm_popup_ws_page");
		localStorage.removeItem("evm_popup_ws_template");
		localStorage.removeItem("evm_popup_ws_widget");
		localStorage.removeItem("evm_popup_ws_addtocart");
		localStorage.removeItem("evm_popup_ws_popupids");
		localStorage.removeItem("wis_customer_browsed");

		/*For FBT Bundle discount*/
		window.localStorage.removeItem("fbt_disc_apld_msg");
		window.localStorage.removeItem("ws_disc_res");
		window.localStorage.removeItem("fbt_manu_bndl_disc");
		window.localStorage.removeItem("fbt_global_discount");
		window.localStorage.removeItem("fbt_disc_apld_chk");
	}
/** Wiser widget sale end **/
/** Wiser email widget sale start **/
	var ew_array_products = {};
	var ew_array_campaign = {};
	var ew=0;
	for (var i = 0; i < localStorage.length; i++){
		if (localStorage.key(i).substring(0,9) == 'ew_wiser_') {
			var campaign_details = localStorage.key(i).split("_");
			ew_array_products['campaign_'+ew] = localStorage.getItem(localStorage.key(i));
			ew_array_campaign['campaign_'+ew] = campaign_details[2];
			ew++;
		}
	}	
	if(ew_array_products && ew_array_campaign){		
		var http = new XMLHttpRequest();
		var url = oursite+"admin/go_email_widget/?shop="+wiser_shop+"&orderid="+orderid;	   
		var data = new FormData();
		data.append('ew_array_products', JSON.stringify(ew_array_products));
		data.append('ew_array_campaign', JSON.stringify(ew_array_campaign));
		http.open('POST', url, true);
		http.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				if(this.responseText){
					var setting = JSON.parse(this.responseText);
					var count= setting['cart_array'].length;
					if(count > 0){
						for (var i = 0; i < count; i++) {
							var campaign = setting['cart_array'][i].campaign;
							var product_id = setting['cart_array'][i].product_id;
							product_id = product_id.toString();
							if(localStorage.getItem("ew_wiser_"+campaign)==undefined){
							}else{
								var ewproduct = localStorage.getItem("ew_wiser_"+campaign);
								ewproduct = JSON.parse(ewproduct);
								var index = ewproduct.indexOf(product_id);
								if(index > -1)
								{
									ewproduct.splice(index, 1);
									if(ewproduct.length > 0){
										localStorage.setItem("ew_wiser_"+campaign,JSON.stringify(ewproduct));
									}else{
										localStorage.removeItem("ew_wiser_"+campaign);
									}	
								}	
							}
						}
					}
				}
			}
		} 
		http.send(data);
	}
	/** Wiser widget sale end **/	
	/* AOV  */
	function getCookie(cName) {
		const name = cName + "=";
		const cDecoded = decodeURIComponent(document.cookie); //to be careful
		const cArr = cDecoded.split('; ');
		let res;
		cArr.forEach(val => {
			if (val.indexOf(name) === 0) res = val.substring(name.length);
		})
		return res;
	}
	var order_id = Shopify.checkout.order_id;
	var pdata =[];
	var timecount = Math.round(Math.random() * 100);
	var iplog = getCookie('__uipdata');
	var navlog = getCookie('__unavdata');
	
	Shopify.checkout.line_items.forEach(myFunction)		
	function myFunction(item, index, arr) {
		if ((Shopify.checkout.line_items.length) != index) {	
			pdata[index] = item.product_id+","+item.quantity+","+item.price+","+item.variant_id+"||";
		} 
	}		
	var http = new XMLHttpRequest();
	var url = oursite+"ordersales/?shop="+wiser_shop+"&orderid="+order_id;
	var data = new FormData();	    
	data.append('product_info', JSON.stringify(pdata));		
	data.append('total_line_items', Shopify.checkout.line_items.length);
	data.append('created_at', Shopify.checkout.created_at);
	data.append('total_price', Shopify.checkout.total_price);
	data.append('customer_id', Shopify.checkout.customer_id);
	data.append('customer_email', Shopify.checkout.email);
	data.append('country', Shopify.country);
	data.append('currency', Shopify.currency.active);
	data.append('billing_address', JSON.stringify(Shopify.checkout.billing_address));
	data.append('url', window.location.href);
	data.append('timespend', timecount);
	data.append('user_nav',navlog);
	data.append('IPData', iplog);
	data.append('product_line_items', JSON.stringify(Shopify.checkout.line_items));
	http.open('POST', url, true);
	console.log(data);
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			if(http.responseText){
			}
		}
	} 
	http.send(data);
}

if(typeof Shopify.Checkout!="undefined" && Shopify.Checkout.isOrderStatusPage==='true')
{
	$('.chckupsellHeading').hide();
	$('.evm-checkout-upsell').hide();
}

if(typeof Shopify.Checkout!="undefined" && Shopify.Checkout !="undefined"){
	wiser_pid = wiser_pid ? wiser_pid : localStorage.getItem("wiser_pid");
	var is_evm_ws_enabled = (localStorage.getItem("evm_wiser_popup_enable")!=undefined) ? 1:0;
	/*is_evm_ws_enabled removed as we dont have any option to show popup on thankyou page*/
	/* ************ */
	var ws_get_scripts = document.getElementsByTagName("script");
	var append_or_not = 0;
	for (var i = 0; i < ws_get_scripts.length; i++) {
		if (ws_get_scripts[i].src != "https://wiser.expertvillagemedia.com/assets/js/wiser_recom.js") {
			var append_or_not = 1;
		} else {
			var append_or_not = 0;
			break;
		}
	}

	if (append_or_not == 1) {
		if((is_evm_ws_enabled) || (!window.jQuery)){
			var slidecall=document.createElement('script');
			slidecall.src= "https://code.jquery.com/jquery-2.2.4.min.js";
			document.getElementsByTagName('head')[0].appendChild(slidecall);
		}
		if(wiser_shop == 'goldelucks-bakeshop.myshopify.com') {
			var slidecall=document.createElement('script');
			slidecall.src= oursite+"assets/js/wiser_recom.js";
			slidecall.setAttribute("data-productid", wiser_pid);
			slidecall.setAttribute("data-collectid", "");
			slidecall.setAttribute("data-page", "thank_you");
			slidecall.setAttribute("data-shop-id", wiser_shop);
			document.getElementsByTagName('head')[0].appendChild(slidecall);
		} else {
			setTimeout(function () {
				var slidecall=document.createElement('script');
				slidecall.src= oursite+"assets/js/wiser_recom.js";
				slidecall.setAttribute("data-productid", wiser_pid);
				slidecall.setAttribute("data-collectid", "");
				slidecall.setAttribute("data-page", "thank_you");
				slidecall.setAttribute("data-shop-id", wiser_shop);
				document.getElementsByTagName('head')[0].appendChild(slidecall);
			}, 500);	
		}
	}
}
wiserpagename ='';
let mfileName = window.location.href.split('/');
var wiserpagename = '';
if((mfileName[3]!='') && (mfileName[3]=='products')){
    var wiserpagename = 'product';//trim(mfileName[1]);
}else{
    var wiserpagename = (typeof meta.page.pageType !== "undefined" || typeof meta.page.pageType !== undefined) ? meta.page.pageType : "";	
}
//console.log(wiserpagename);
if(wiserpagename == 'product'){
	var ew_pid = getWiserQueryStringValue("ws");
	var c_ew = getWiserQueryStringValue("cs");
	if(c_ew != "" && ew_pid != ""){
		var viewurl=oursite+"app/go_email_widegt_clicks?shop="+wiser_shop+"&ew_pid="+ew_pid+"&c_ew="+c_ew;
		var clickscall=document.createElement('script');
		clickscall.src=viewurl
		document.getElementsByTagName('body')[0].appendChild(clickscall);
		if(localStorage.getItem("ew_wiser_"+c_ew)==undefined){
			var ewproduct = [];
			ewproduct.push(ew_pid);
			localStorage.setItem("ew_wiser_"+c_ew,JSON.stringify(ewproduct));
		}else{
			var ewproduct = localStorage.getItem("ew_wiser_"+c_ew);
			ewproduct = JSON.parse(ewproduct);
			var index = ewproduct.indexOf(ew_pid);
			if(index == -1)
			{
				ewproduct.push(ew_pid);
				localStorage.setItem("ew_wiser_"+c_ew,JSON.stringify(ewproduct));
			}	
		}			
	}
	function getWiserQueryStringValue (key) {  
	  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
	}  
}

/** INCLUDE JS FILE RUN TIME */
function includeFile(file_name) {      
    var scriptname = document.createElement('script');
    scriptname.src = file_name;
    scriptname.type = 'text/javascript';
    scriptname.defer = true;      
    document.getElementsByTagName('head').item(0).appendChild(scriptname);
}
includeFile('https://wiser.expertvillagemedia.com/assets/js/ws_dtc.js?v=39');