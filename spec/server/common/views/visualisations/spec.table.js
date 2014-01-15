define([
  'common/views/visualisations/table',
  'extensions/collections/collection',
  'common/collections/grouped_timeseries',
  'extensions/models/model',
  'path',
  'fs'
],
function (TableView, Collection, GroupedTimeseriesCollection, Model, path, fs) {

  //also test template
  describe("templateContext", function () {
    describe("when the collection is a matrix collection", function() {
      var model, collection;
      beforeEach(function () {
        var collection_config_options = {
          "category": "geography",
          "seriesList": [
             { "id": "England", "title": "England" },
             { "id": "Scotland", "title": "Scotland" },
             { "id": "Wales", "title": "Wales" },
             { "id": "Northern_Ireland", "title": "Northern Ireland" }
          ]
        };
        var table_options = {
          "column_meta": [
             { "title": "England", "valueAttr": "value:sum" },
             { "title": "Scotland", "valueAttr": "value:sum"  },
             { "title": "Wales", "valueAttr": "value:sum"  },
             { "title": "Northern Ireland", "valueAttr": "value:sum"  }
          ]
        };
        var response = fs.readFileSync(path.join('app/support/backdrop_stub/responses/housing_residential_transactions.json'));
        var json_response = JSON.parse(response);
        collection = new GroupedTimeseriesCollection();
        collection.options = _.extend(collection.options, collection_config_options);
        var fetch_method_returning_response = function(options) {
          options = options ? _.clone(options) : {};
          if (options.parse === void 0) options.parse = true;
          var success = options.success;
          var collection = this;
          var method = options.reset ? 'reset' : 'set';
          collection[method](json_response, options);
          if (success) success(collection, json_response, options);
          collection.trigger('sync', collection, json_response, options);
        };
        collection.fetch = fetch_method_returning_response;
        //var parsed_response = collection.parse(json_response);
        //may not be nesc 
        //spyOn(GroupedTimeseriesCollection.prototype, 'parse').andReturn(parsed_response);

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
          expect(table_view.$("th[scope='col']:contains('England')").length).toEqual(1);
          expect(table_view.$("th[scope='col']:contains('Scotland')").length).toEqual(1);
          expect(table_view.$("th[scope='col']:contains('Northern Ireland')").length).toEqual(1);
          expect(table_view.$("th[scope='col']:contains('Wales')").length).toEqual(1);
          expect(table_view.$("tr").length).toEqual(11);
          expect(table_view.$("td[scope='row']").length).toEqual(10);
          expect(table_view.$("td[scope='row']:eq(0)").text()).toEqual("December 2012");
          expect(table_view.$("td[scope='row']:eq(9)").text()).toEqual("September 2013");
          expect(table_view.$("td").length).toEqual(5 * 10);
        }, this);
        collection.fetch();
      });

    });
    describe("when the collection is a flat (normal) collection", function() {

    });
  });

});
