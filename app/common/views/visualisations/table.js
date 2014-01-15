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
      var numValues = 0;
      _.each(this.model.get('column_meta'), function (columnMeta) {
        var column_data = _.find(this.collection.models, function (model) {
          return model.get('title') == columnMeta.title;
        });
        var data = column_data.get('values').reduce(function (values, model) {
          values.push({
            value: model.get(columnMeta.valueAttr),
            period: this.formatPeriod(model, 'month')
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
          title: columnMeta.title,
          data: data
        };
        console.log(numValues);
        columns.push(column);
      }, this);

      console.log(columns);
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
