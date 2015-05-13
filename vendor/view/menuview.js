var hotel = hotel || {};

hotel.menuView = Backbone.View.extend({
	 el: '#menudiv',
  render: function() {
    var self = this;
    var output = '';
    this.collection.each(
      function(models) {
        var getindex = self.collection.indexOf(models)
        var index = getindex + 1 
        models.set('indexes', index)
        console.log(models.attributes)

        output += self.template(models.attributes);
      })
    this.$el.html(output);
  },
  settings: _.templateSettings = {
    evaluate: /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g
  },
  template: _.template($("#menutemplate").html()),
});

hotel.menuview = new hotel.menuView({
  collection: hotel.menucollection
});