var hotel = hotel || {};

hotel.menuCollection = Backbone.Collection.extend({
	model: hotel.menuModel
})
hotel.menucollection = new hotel.menuCollection();
function pickmenu(menukey){
	hotel.menucollection.reset();
	$.ajax({
		dataType: 'json',
		url:'menu.js',
		success: function(data) {
			for (var i = 0; i < data[menukey].length;i++){
				hotel.menucollection.add(data[menukey][i])
			}
			hotel.menuview.render()
		}

	})
}
pickmenu('Breakfast')
