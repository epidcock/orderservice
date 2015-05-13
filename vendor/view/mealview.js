var hotel = hotel || {};

hotel.mealView = Backbone.View.extend({
	 el: '#mealdiv',
  render: function() {
    var self = this;
    var output = '<h4> Meal Times</h4>';
    this.collection.each(
      function(models) {
        output += self.template(models.attributes);
      })
    this.$el.html(output);
  },
  settings: _.templateSettings = {
    evaluate: /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g
  },
  template: _.template($("#mealtemplate").html()),
  events:{
  	'click #011':'Breakfast',
  	'click #013':'Dining',
  	'click #012':'Allday',
  	'click #014':'Beer',
  	'click #015':'Kids'
  },
  Breakfast: function(){
  	console.log('is running')
  	pickmenu('Breakfast')
  },
    Dining: function(){
    pickmenu('LATE NIGHT')
  },
  Allday: function(){
  	console.log('is running')
  	pickmenu('ALL DAY DINING')
  },
  Beer: function(){
  	pickmenu('WINE/BEER')
  },
  Kids: function(){
  	pickmenu("CHILDREN'S MENU")
  }
});

hotel.mealview = new hotel.mealView({
  collection: hotel.mealcollection
});