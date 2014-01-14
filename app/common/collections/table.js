define([
  'extensions/collections/collection'
],
function (Collection) {
  var TableCollection = Collection.extend({

    initialize: function (models, options) {
      Collection.prototype.initialize.apply(this, arguments);
    },

    queryParams: function () {
      return {
        collect: this.options.valueAttr,
        period: this.options.period,
        group_by: this.options.category,
        filter_by: this.options.filterBy ? this.options.filterBy : []
      };
    },

    parse: function (response) {
      return response.data;
    },

    fetch: function (options) {
      Collection.prototype.fetch.call(this, options);
    }
  });

  return TableCollection;
});
