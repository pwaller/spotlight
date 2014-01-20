define([
  'common/views/visualisations/table'
],
function (TableView) {
  var MatrixPointInTimeTableView = TableView.extend({


    getColumnValues: function (column, columnMeta) {
      var model = column.get('values').find(function (model) {
        return model.get('title') == columnMeta.column_header;
      });
      var start = model.collection.query.get('start_at');
      var end = model.collection.query.get('end_at').subtract(1, 'days');
      var period = [
        start.format(start.month() === end.month() ? 'D' : 'D MMM'),
        ' to ',
        end.format('D MMM YYYY')
      ].join('');
      return [{
        value: model.get(columnMeta.valueAttr),
        period: period
      }];
    }

  });

  return MatrixPointInTimeTableView;
});
