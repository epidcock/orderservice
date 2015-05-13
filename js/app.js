/*globals FastClick, simpleCart, console */

$( document ).ajaxComplete(function() {
$(document).foundation();
});

jQuery(document).ready(function($){

	$(function() {
	    FastClick.attach(document.body);
	});

	
/*
 * Tab System
 * ================================================================================ */	
	
   $(".button").each(function(i){ // "i" means index.
        i++; // Starts the first index at 1 instead of 0.
            
        $(this).click(function(){
            // Styling class for the tab.
            $(this).parent().find('.active-tab').removeClass('active-tab');
            $(this).addClass('active-tab');
        
            // Hide / Show for menus
            $(".menus").children().hide();
            $(".menus").find(".menu" + i).show();
        });
    });


/*
 * Column Height
 * ================================================================================ */	
 
 	$(function(){
	 	var windowHeight = $(window).height(),
	 		headerHeight = $(".header").outerHeight(),
	 		columnHeight = windowHeight - headerHeight;
	 		
	 	$(window).load(function(){
		 	$('.e-column').each(function(){
			 	$(this).height(columnHeight);
		 	});
		 });
 	});
 
/*
 * Foundation Reveal Extras
 * ================================================================================ */	

	$('.item_add').click(function(){
		$(this).foundation('reveal', 'close');
		//$('.item_note').val('');
	});


/*
 * Simplecart Config
 * ================================================================================ */	
	
	simpleCart({
	    cartColumns: [
		    { attr: "quantity", label: "Qty" },
	        //{ attr: "id", label: "ID" },
	        { attr: "name", label: "Name" },
	        { view: function(item, column){
					return item.get("option");
				}, attr: "options" ,label: "Options"
			},
	        //{ attr: "price", label: "Price", view: 'currency' },
	        
	        { attr: "total", label: "SubTotal", view: 'currency' },
	        { view: "remove", text: "X", label: false },
/*
	        { view: function( item, column ){
					return "<a class='btn-edit'>E</a>";
				},
				label: false 
			},
*/
			{ view: function(item, column){
					return item.get("note");
				}, attr: "note" ,label: false
			},
	    ],
	    cartStyle: "table", 
		
		// tax rate applied to cart subtotal
		taxRate: 0.065,
		// true if tax should be applied to shipping
		taxShipping: false,
		
		shippingFlatRate: 3,
		
		data: {},
			
		checkout: { 
	        type: "SendForm" , 
	        url: "http://posttestserver.com/post.php" ,
	
	        // http method for form, "POST" or "GET", default is "POST"
	        method: "POST" , 
	
	        // url to return to on successful checkout, default is null
	        success: "success.html" , 
	
	        // url to return to on cancelled checkout, default is null
	        cancel: "cancel.html" ,
	
	        // an option list of extra name/value pairs that can
	        // be sent along with the checkout data
	        extra_data: {
	        }
	    } 
	});
	
	
/* 
 * Quantiy increase/descrease button functionality
 * ============================================================ */ 
		
	$(".btn-qty").on("click", function() {
	
		var $button = $(this);
		var oldValue = $button.parent().find("input.item__qty").val();
		
		if ($button.text() == "+") {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 0) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 0;
			}
		}
		
		$button.parent().find("input.item__qty").val(newVal);
	
	});	
			
			
			
			
			
			
		
	
	
/* 
 * Add To Cart Button Functionality
 * ============================================================ */ 
	var runningTotal = 0;
	var optionNames = '';
	
	$('.item').each(function(i){
		var itemIndex = 'item-' + i;
			
		$(this).addClass(itemIndex);	
				
		// Adds item to cart
		$(this).find('.item__add').on('click', function(){
			
			// On click of add item, get these variables
			var itemName = $(this).parents('.item').find('.item__name').text(),
				itemOptions = '',
				itemPrice = $(this).parents('.item').find('.item__price').html().split("$").join(""), /* Removes $ from value */
				itemQty = $(this).parents('.item').find('.item__qty').val(),
				itemNote = $(this).parents('.item').find('.item__note'),
				itemNoteValue = itemNote.val();
													
			// If options exist for the item, do this
			//if ( $(this).parents('.item').find('.item__options').length && $(this).parents('.item').find("input[type='checkbox']").is(':checked')){
			if ( $(this).parents('.item').find("input[type='checkbox']").is(':checked') || $(this).parents('.item').find("input[type='radio']").is(':checked') ){
				
				console.log('Options are selected.');
				
				// if an option is selected, do this.
				$(this).parents('.item').find('.item__option').each(function(){
					
					if ( $(this).find("input").is(':checked') ) {
						var optionName = $(this).find("label").text();
						var optionCost = $(this).find(".item__option-price").html().split("$").join(""); /* Removes $ from value */
						
						if (optionCost === ''){
							optionCost = 0.00;
						}
						
																			
						// Get Price, Get Name, Add prices together and update name.							
						console.log("Option: " + optionName + " for " + optionCost + " was selected.");
						
						// Combines the costs of the options selected
						runningTotal += parseFloat(optionCost);
						
						// Wraps each option selected 
						optionNames += "<li>" + optionName + "</li>";				
					}					
					
				});
				
				console.log("Option Cost: " + runningTotal);			
				
				var subtotal = parseFloat(runningTotal) + parseFloat(itemPrice);
				console.log("Item Total: " + subtotal);
				
				itemPrice = subtotal;
				
				itemOptions = "<ul class='options'>" + optionNames + "</ul>";
						
			}
						
			// Adds the item to the cart
			itemIndex = simpleCart.add({ 
				name: itemName, 
				option: itemOptions, 
				price: itemPrice,
				quantity: itemQty,
				note: itemNoteValue
			});
			
			// reset variables
			runningTotal = 0;
			optionNames = '';
			itemName = '';
			itemNote.val(''); // Clears note textarea
			$(this).parents('.item').find("input[type='checkbox']").prop('checked', false); // Clears selected options
			console.log("==^== Item Added ==^==");
			
			// If this is a button inside a modal, close the modal when it's clicked
			if ( $(this).parents(".reveal-modal").length === 1 ) { 
				$(this).foundation('reveal', 'close');
			}
			
		});	

	});
	
	
/* 
 * Edit Cart Item
 * ============================================================ */ 		

 	
 	//simpleCart.find( ); // returns the item with id of SCI-11, if it is in the cart
 	


 	setTimeout( function(){
	 	$('#cartItem_SCI-3').each(function(){
		 	var itemId =  $(this).attr('id');
		 		itemId = itemId.replace('cartItem_','');
		 	
		 	var editItem = simpleCart.find(itemId),
		 		editItemName = editItem.get("name"),
		 		editItemOptions = editItem.get("option"),
		 		//editItemPrice = editItem.get("price"),
		 		editItemQty = editItem.get("quantity"),
		 		editItemNote = editItem.get("note");
		 		
		 	$('.item-edit').each(function(){
			 	$(this).find('.item__name').html(editItemName);
			 	//$(this).find('.item__price').html(editItemPrice);
			 	$(this).find('.item__qty').val(editItemQty);
			 	$(this).find('.item__note').val(editItemNote);
			 	
			 	

/*
			 	var valNew=editItemOptions.str.split(" ");;

			    for(var i=0;i<valNew.length;i++){
			        console.log(valNew.length);
			    }
*/
			    
   var countryArray = editItemOptions.find('li');
   
    for (var i = 0; i < countryArray.length; i++) {
      console.log(countryArray[i]);
    }
			 	
			 
			 	
		 	});
		 	
		
		 				 	
		 	
		 	$('.item__update').on('click', function(){
			 	editItemName = $(this).parents('.item-edit').find('.item__name').html();
			 	editItemNote = $(this).parents('.item-edit').find('.item__note').val();
				editItemQty = $(this).parents('.item-edit').find('.item__qty').val();
			 	
			 	
			 	// If options exist for the item, do this
			 	
			 	
				if ($().find('ul').length() > 0){
					
					console.log('Options are available and atleast one is selected.');
					
/*
					// if an option is selected, do this.
					$(this).parents('.item').find('.item__option').each(function(){
						
						if ( $(this).find("input[type='checkbox']").is(':checked') ) {
							var optionName = $(this).find("label[name]").text();
							var optionCost = $(this).find(".item__option-price").html().split("$").join(""); // Removes $ from value
																				
							// Get Price, Get Name, Add prices together and update name.							
							console.log("Option: " + optionName + " for " + optionCost + " was selected.");
							
							// Combines the costs of the options selected
							runningTotal += parseFloat(optionCost);
							
							// Wraps each option selected 
							optionNames += "<li>" + optionName + "</li>";				
						}					
						
					});
					
					console.log("Option Cost: " + runningTotal);			
					
					var subtotal = parseFloat(runningTotal) + parseFloat(itemPrice);
					console.log("Item Total: " + subtotal);
					
					itemPrice = subtotal;
					
					itemName = itemName + "<ul class='options'>" + optionNames + "</ul>";
*/
					
					
				}
			 	
			 	
			 	
			 	
			 	
			 	
			 	
			 	
			 	
			 	editItem.set( "name" , editItemName);
			 	editItem.set( "note" , editItemNote);
			 	editItem.set( "quantity" , editItemQty);
			 	
			 	
			 	simpleCart.update();
			 
		 	});
		 	
	 	});
	}, 2000 );


});