define([
  'extensions/controllers/controller',
  'modernizr',
  'common/views/module',
  'common/views/module_raw',
  'common/views/visualisations/table',
  'common/views/module_standalone'
], function (Controller, Modernizr, ModuleView, RawView, TableView, StandaloneView) {

  var ModuleController = Controller.extend({
    Modernizr: Modernizr,

    tableClass: TableView,

    visualisationClass: null,
    requiresSvg: false,

    id: function () {
      return this.model.get("slug") || this.model.get("module-type");
    },

    table_id: function () {
      var id = this.model.get("slug") || this.model.get("module-type");
      return id + "_table";
    },
        
    initialize: function(options) {
      if (isClient) {
        this.viewClass = ModuleView;
      } else if (options.raw != null) {
        this.viewClass = RawView;
      } else if (options.dashboard) {
        this.viewClass = ModuleView;
        this.url = this.url + '/' + this.id();
      } else {
        this.viewClass = StandaloneView;
      }
    },

    render: function () {
      if (isClient && this.requiresSvg && !this.Modernizr.inlinesvg) {
        // Do not try to render an SVG in a non-SVG browser
        this.trigger('ready');
        return;
      }
      Controller.prototype.render.apply(this, arguments);
    },

    tableViewOptions: function () {
      var options = {
        visualisationClass: this.visualisationClass,
        className: this.tableClassName,
        id: this.table_id,
        requiresSvg: this.requiresSvg,
        url: this.url
      };

      if (isClient) {
        // reuse existing module slot
        var el = $('#' + this.table_id());
        if (el.length) {
          options.el = el;
        }
      }

      return options;
    },

    viewOptions: function () {
      var options = {
        visualisationClass: this.visualisationClass,
        className: this.className,
        id: this.id,
        requiresSvg: this.requiresSvg,
        url: this.url
      };

      if (isClient) {
        // reuse existing module slot
        var el = $('#' + this.id());
        if (el.length) {
          options.el = el;
        }
      }

      return options;
    }
  });

  return ModuleController;

});
