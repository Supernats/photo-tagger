(function(root) {
  var PT = root.PT = ( root.PT || {} )

  var Photo = PT.Photo = function(data) {
    this.attrs = _.extend({}, data);
  };

  _.extend(Photo, {
    fetchByUserId: function (userId, callback) {
      $.ajax({
        url: "api/users/" + userId + "/photos",
        type: "GET",
        success: function (resp) {
          _.each(resp, function(photo_data) {
            var photo = new Photo(photo_data);
            Photo.all.push(photo);
          })
          callback(Photo.all);
        }
      })
    },

    all: [],

    _events: {}

    on: function (eventName, callback) {
      Photo._events[eventName] = callback;
    }

    trigger: function(eventName) {
      _.each(Photo._events, function( k,v ) {
        if (eventName === k) { v() }
      })
    }
  });

  _.extend(Photo.prototype, {
    get: function(attr_name) {
      return this.attrs[attr_name];
    },

    set: function(attr_name, val) {
      this.attrs[attr_name] = val;
    },

    create: function(callback) {
      var that = this;
      $.ajax({
        url: "/api/photos",
        type: "POST",
        data: {photo: that.attrs },
        success: function (resp) {
          _.extend(that.attrs, resp);
          Photo.all.push(that);
          Photo.trigger("add");
        }
      })
    },

    update: function (callback) {
      var that = this;
      $.ajax({
        url: "/api/photos/" + that.get("id"),
        type: "PUT",
        data: { photo: that.attrs },
        success: function(resp) {
          callback(that);
        }
      })
    },

    save: function(callback) {
      var that = this;
      if (that.attrs.id) {
        that.update(callback);
      } else {
        that.create(callback);
      }
    }

  });

})(this);
