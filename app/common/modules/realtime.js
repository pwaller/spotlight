define([
  'extensions/controllers/module_controller',
  'stache!common/templates/visualisation'
],
function (ModuleController, template) {
  var Realtime = ModuleController.extend({

    initialize: function (options) {
      console.log(options);
    },

    render: function () {
      this.trigger('postrender');
    },

    html: function () {
      return "<some html>";
    }

//    var visitorsRealtimeCollection = new VisitorsRealtimeCollection([],{
//    serviceName: "licensing"
//    });
//
//    var visitorsRealtimeView = new VisitorsRealtimeView({
//    el: $('#number-of-visitors-realtime'),
//    collection: visitorsRealtimeCollection
//    });
//
//    visitorsRealtimeCollection.fetch();
//
  });

  return Realtime;
});
