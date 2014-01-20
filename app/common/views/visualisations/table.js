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

    trimEnd: function (array, condition) {
      while(condition(_.last(array))){
        array.pop();
      }
      return array;
    },

    templateContext: function () {
      var columns = [];

      var numValues = 0;
      var period = this.collection.query.get('period');
      _.each(this.model.get('column_meta'), function (columnMeta) {
        var column_data = _.find(this.collection.models, function (model) {
          return model.get('title') == columnMeta.title;
        });
        var data = column_data.get('values').reduce(function (values, model) {
          values.push({
            value: model.get(columnMeta.valueAttr),
            //necessary until we refactor completion number and rate
            period: this.formatPeriod(model, (period ? period : columnMeta.period))
          });
          return values;
        }, [], this);
        data = this.trimEnd(data, function(item){
          return item.value == null;
        });
        if(data.length > numValues){
          numValues = data.length; 
        }
        var column = {
          title: columnMeta.column_header ? columnMeta.column_header : columnMeta.title,
          data: data
        };
        columns.push(column);
      }, this);

      return _.extend(
        View.prototype.templateContext.apply(this, arguments),
        {
          numValues: numValues,
          columns: columns
        }
      );
    }
  });

  return TableView;
});
