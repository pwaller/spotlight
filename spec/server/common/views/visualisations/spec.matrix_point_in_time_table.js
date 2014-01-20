define([
  'common/views/visualisations/matrix_point_in_time_table',
  'extensions/collections/collection',
  'extensions/collections/matrix',
  'common/collections/journey_series',
  'extensions/models/model',
  'path',
  'fs'
],
function (
  TableView, 
  Collection, 
  MatrixCollection, 
  JourneySeriesCollection, 
  Model, 
  path, 
  fs
) {

  var fetch_method_returning_response = function (json_response) {  
    return function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      var method = options.reset ? 'reset' : 'set';
      collection[method](json_response, options);
      if (success) success(collection, json_response, options);
      collection.trigger('sync', collection, json_response, options);
    };
  };

  var collectionWithStubbedFetchResponse = function (collectionClass, options, json_response) {
    collection = new collectionClass([], options);

    collection.fetch = fetch_method_returning_response(json_response);

    return collection
  };

  describe("templateContext", function () {
    describe("JourneyCollection", function() {
      var model, collection;
      beforeEach(function () {
        var collection_config_options = {
          "module-type": "journey",
          "title": "Users at each stage",
          "description": "Number of users who completed important stages of the transaction last week",
          "data-group": "deposit-foreign-marriage",
          "data-type": "journey",
          "matching-attribute": "eventCategory",
          "steps": [
            {"id": "deposit-foreign-marriage:start", "title": "Start"},
            {"id": "deposit-foreign-marriage:confirm", "title": "Confirm"},
            {"id": "deposit-foreign-marriage:done", "title": "Done"}
          ]
        };
        var table_options = {
          "column_meta": [
            { "title": "Journey", "column_header": "Start", "valueAttr": "uniqueEvents" },
            { "title": "Journey", "column_header": "Confirm", "valueAttr": "uniqueEvents" },
            { "title": "Journey", "column_header": "Done", "valueAttr": "uniqueEvents" }
          ]
        };
        var response = fs.readFileSync(path.join('app/support/backdrop_stub/responses/journey-with-missing-data.json'));
        var json_response = JSON.parse(response);

        JourneySeriesCollection.prototype.fetch = fetch_method_returning_response(json_response);

        JourneyCollection = MatrixCollection.extend({
          collections: [ JourneySeriesCollection ]
        });
        
        collection = new JourneyCollection([], collection_config_options);

        model = new Model(table_options);
      });

      it("should render the table correctly", function () {
        collection.once('sync reset error', function() {
          var table_view = new TableView({
            model: model,
            collection: collection
          });
          table_view.render();
          var html = table_view.$el[0].outerHTML;
          expect(table_view.$("th[scope='col']:contains('Date Period')").length).toEqual(1);
          expect(table_view.$("th[scope='col']:contains('Start')").length).toEqual(1);
          expect(table_view.$("th[scope='col']:contains('Confirm')").length).toEqual(1);
          expect(table_view.$("th[scope='col']:contains('Done')").length).toEqual(1);
          expect(table_view.$("tr").length).toEqual(2);
          expect(table_view.$("td[scope='row']").length).toEqual(1);
          expect(table_view.$("td[scope='row']:eq(0)").text()).toEqual("13 to 19 Jan 2014");
          expect(table_view.$("td").length).toEqual(4 * 1);
        }, this);
        collection.fetch();
      });
    });
  });

});
