define([
  'extensions/controllers/module_controller',
  'common/views/visualisations/realtime',
  'common/collections/visitors-realtime'
],
function (ModuleController, VisitorsRealtimeView, VisitorsRealtimeCollection) {
  var Realtime = ModuleController.extend({

    render: function () {
      var visitorsRealtimeCollection = new VisitorsRealtimeCollection([],{
        serviceName: "licensing"
      });

      var visitorsRealtimeView = new VisitorsRealtimeView({
        el: $('#number-of-visitors-realtime'),
        collection: visitorsRealtimeCollection
      });
      visitorsRealtimeView.once('postrender', function () {
        this.the_html = visitorsRealtimeView.html; 
        this.trigger('postrender');
      }, this);

      visitorsRealtimeCollection.fetch();
    },

    html: function () {
      return this.the_html; 
    }

  });

  return Realtime;
});
