define([
  'extensions/views/view',
  'tpl!common/templates/visualisations/table.html'
],
function (View, template) {
  var TableView = View.extend({

    template: template,

    initialize: function (options) {
      View.prototype.initialize.apply(this, arguments);
    },

    templateContext: function () {
      var columns = [];

      //for matrix collection
//      _.each(this.model.get('column_meta'), function (columnMeta) {
//        var column = {
//          title: columnMeta.title,
//          data: this.collection.map(function (model) {
//            return model.get(columnMeta.valueAttr);
//          })
//        };
//        columns.push(column);
//      }, this);
      _.each(this.model.get('column_meta'), function (columnMeta) {
        var column_data = _.find(this.collection.models, function (model) {
          return model.get('title') == columnMeta.title;
        });
        var column = {
          title: columnMeta.title,
          data: column_data.get('values').map(function (model) {
            return model.get(columnMeta.valueAttr);
          })
        };
        columns.push(column);
      }, this);

      return _.extend(
        View.prototype.templateContext.apply(this, arguments),
        {
          numValues: 12,
          columns: columns
        }
      );
    }
  });

  return TableView;
});
