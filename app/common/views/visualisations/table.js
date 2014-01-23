define([
  'extensions/views/view',
  'tpl!common/templates/visualisations/table.html'
],
function (View, template) {
  var TableView = View.extend({

    template: template,

    //el: function(){
    //  return "#" + this.id();
    //},

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);

      var events = 'reset sync error';
      if (this.changeOnSelected) {
        events += ' change:selected';
      }
      this.collection.on(events, this.render, this);
    },

    trimEnd: function (array, condition) {
      while(condition(_.last(array))){
        array.pop();
      }
      return array;
    },

    getColumnData: function (title) {
      return _.find(this.collection.models, function (model) {
        return model.get('title') == title;
      });
    },

    getColumnValues: function (column, columnMeta) {
      data = column.get('values').map(function (model) {
        return {
          value: model.get(columnMeta.valueAttr),
          period: this.formatPeriod(model, this.getPeriodType(columnMeta))
        };
      }, this);
      return this.trimEnd(data, function(item){
        return item.value == null;
      });
    },

    //necessary until we refactor completion number and rate
    getPeriodType: function (columnMeta) {
      var period = this.collection.query.get('period');
      return period ? period : columnMeta.period;
    },

    updateNumberOfValuesIfRequired: function (new_number){
      if(new_number > this.numberOfValues){
        this.numberOfValues = new_number; 
      }
    },

    buildColumn: function (columnMeta, column_values) {
      return {
        title: columnMeta.column_header ? columnMeta.column_header : columnMeta.title,
        data: column_values 
      };
    },

    templateContext: function () {
      this.numberOfValues = 0;
      var columns = this.model.get('column_meta').map(function (columnMeta) {
        var column_data = this.getColumnData(columnMeta.title);
        var column_values = this.getColumnValues(column_data, columnMeta);

        this.updateNumberOfValuesIfRequired(column_values.length);

        return this.buildColumn(columnMeta, column_values);
      }, this);

      return _.extend(
        View.prototype.templateContext.apply(this, arguments),
        {
          numValues: this.numberOfValues,
          columns: columns
        }
      );
    }
  });

  return TableView;
});
