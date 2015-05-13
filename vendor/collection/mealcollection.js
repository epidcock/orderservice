var hotel = hotel || {};

hotel.mealCollection = Backbone.Collection.extend({
	model: hotel.mealmodel
})
hotel.mealcollection = new hotel.mealCollection();
$.ajax({
	dataType: 'json',
	url:'meals.js',
	success: function(data) {
		console.log(data)
		for( var i = 0 ; i < data.Meals.length;i++){
			hotel.mealcollection.add(data.Meals[i])			
		}
		console.log(hotel.mealcollection)
		hotel.mealview.render();	

	}
})
