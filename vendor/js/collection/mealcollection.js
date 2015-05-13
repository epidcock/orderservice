var hotel = hotel || {};

hotel.mealcollection = Backbone.Collection.extend({
	model: hotel.mealmodel
}])
$.ajax({
	dataType: 'json',
	url:'menu.json',
	success: function(data) {
		console.log(data)
	}
})
hotel.mealCollection = new hotel.mealcollection();