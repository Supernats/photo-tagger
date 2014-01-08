(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotoFormView = PT.PhotoFormView = function () {
    var that = this;
    this.$el = $("<div>");
    $(document).on('submit', "#photo_form", function (event) {
      that.submit(this);
    });
  }

  _.extend(PhotoFormView.prototype, {
    render: function() {
      this.$el.append(JST["photo_form"]());
      return this.$el;
    },
    submit: function (photo_data) {
      var data = $(photo_data).serializeJSON().photo;
      var photo = new PT.Photo(data);
      photo.save();
    }
  })
})(this);