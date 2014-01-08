(function(root) {
  var PT = root.PT = ( root.PT || {} )

  var PhotosListView = PT.PhotosListView = function() {
    this.$el = $("<div>");
  };

  _.extend(PhotosListView.prototype, {
    render: function() {
      this.$el.empty();

      var $ul = $('<ul id=photo-list>');

      _.each(PT.Photo.all, function(photo) {
        $p = $("<li>" + photo.attrs.title + "</li>");
        $ul.append($p);
      });

      this.$el.append($ul);
      return this.$el;
    }
  });

})(this)