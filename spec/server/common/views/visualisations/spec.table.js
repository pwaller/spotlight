define([
  'common/views/visualisations/table',
  'extensions/collections/collection',
  'extensions/collections/matrix',
  'common/collections/grouped_timeseries',
  'common/collections/completion_rate',
  'common/collections/completion_numbers',
  'common/collections/multi_stats',
  'common/collections/availability',
  'extensions/models/model',
  'path',
  'fs'
],
function (
  TableView, 
  Collection, 
  MatrixCollection, 
  GroupedTimeseriesCollection, 
  CompletionRateCollection, 
  CompletionNumbersCollection, 
  MultiStatsCollection, 
  AvailabilityCollection, 
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
    describe("when the collection is a matrix collection", function() {
      describe("GroupedTimeseriesCollection", function() {
        var model, collection;
        beforeEach(function () {
          var collection_config_options = {
            "category": "geography",
            "period": "month",
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
          collection = collectionWithStubbedFetchResponse(GroupedTimeseriesCollection, collection_config_options, json_response);

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

      describe("CompletionRateCollection", function() {
        var model, collection;
        beforeEach(function () {
          var collection_config_options = {
            "page-type": "module",
            "module-type": "completion_rate",
            "title": "Completion rate",
            "description": "",
            "data-group": "deposit-foreign-marriage",
            "data-type": "journey",
            "column_meta": [
              { "title": "Completion rate", "valueAttr": "completion", "period": "week" }
            ],
            "info": [
              "Info text line 1",
              "Info text line 2"
            ],
            "start-matcher": "start$",
            "end-matcher": "done$"
          };
          var table_options = {
            "column_meta": [
              { "title": "Completion rate", "valueAttr": "completion", "period": "week" }
            ]
          };
          var response = fs.readFileSync(path.join('app/support/backdrop_stub/responses/journey-with-missing-data.json'));
          var json_response = JSON.parse(response);
          collection = collectionWithStubbedFetchResponse(CompletionRateCollection, collection_config_options, json_response);

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
            expect(table_view.$("th[scope='col']:contains('Completion rate')").length).toEqual(1);
            expect(table_view.$("tr").length).toEqual(10);
            expect(table_view.$("td[scope='row']").length).toEqual(9);
            expect(table_view.$("td[scope='row']:eq(0)").text()).toEqual("15 to 21 July 2013");
            expect(table_view.$("td[scope='row']:eq(8)").text()).toEqual("9 to 15 Sep 2013");
            expect(table_view.$("td").length).toEqual(2 * 9);
          }, this);
          collection.fetch();
        });
      });
      describe("CompletionNumbersCollection", function() {
        var model, collection;
        beforeEach(function () {
          var collection_config_options = {
            "module-type": "completion_numbers",
            "title": "Completed applications",
            "description": "",
            "data-group": "deposit-foreign-marriage",
            "data-type": "journey",
            "info": [
              "Info text line 1",
              "Info text line 2"
            ],
            "start-matcher": "start$",
            "end-matcher": "done$"
          };
          var table_options = {
            "column_meta": [
              { "title": "Done", "valueAttr": "uniqueEvents", "period": "week" }
            ]
          };
          var response = fs.readFileSync(path.join('app/support/backdrop_stub/responses/journey-with-missing-data.json'));
          var json_response = JSON.parse(response);
          collection = collectionWithStubbedFetchResponse(CompletionNumbersCollection, collection_config_options, json_response);

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
            expect(table_view.$("th[scope='col']:contains('Done')").length).toEqual(1);
            expect(table_view.$("tr").length).toEqual(10);
            expect(table_view.$("td[scope='row']").length).toEqual(9);
            expect(table_view.$("td[scope='row']:eq(0)").text()).toEqual("15 to 21 July 2013");
            expect(table_view.$("td[scope='row']:eq(8)").text()).toEqual("9 to 15 Sep 2013");
            expect(table_view.$("td").length).toEqual(2 * 9);
          }, this);
          collection.fetch();
        });
      });
      describe("MultiStatsCollection", function() {
        var model, collection;
        beforeEach(function () {
          var collection_config_options = {
            "module-type": "multi_stats",
            "title": "Average first mortgage",
            "description": "A range of factors indicative of the state of the housing market for first-time buyers",
            "data-group": "housing-policy",
            "data-type": "first-time-buyer",
            "period": "month",
            "stats": [
              {
                "title": "Median size of mortgage",
                "attr": "median_advance_sterling",
                "format": "£{{ value }}"
              },
              {
                "title": "Median advance",
                "attr": "median_percentage_advance",
                "format": "{{ value }}%"
              }
            ]
          };
          var table_options = {
            "period": "month",
            "column_meta": [
              { "title": "MultiStats", "column_header": "Median advance", "valueAttr": "median_advance_sterling" },
              { "title": "MultiStats", "column_header": "Median size of mortgage", "valueAttr": "median_percentage_advance" }
            ]
          };
          var response = fs.readFileSync(path.join('app/support/backdrop_stub/responses/housing-first-time-buyer.json'));
          var json_response = JSON.parse(response);
          collection = collectionWithStubbedFetchResponse(MultiStatsCollection, collection_config_options, json_response);

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
            expect(table_view.$("th[scope='col']:contains('Median advance')").length).toEqual(1);
            expect(table_view.$("th[scope='col']:contains('Median size of mortgage')").length).toEqual(1);
            expect(table_view.$("tr").length).toEqual(26);
            expect(table_view.$("td[scope='row']").length).toEqual(25);
            expect(table_view.$("td[scope='row']:eq(0)").text()).toEqual("July to Sep 2007");
            expect(table_view.$("td[scope='row']:eq(24)").text()).toEqual("July to Sep 2013");
            expect(table_view.$("td").length).toEqual(3 * 25);
          }, this);
          collection.fetch();
        });
      });
      describe("AvailabilityCollection", function() {
        var model, collection;
        beforeEach(function () {
          var collection_config_options = {
            "module-type": "availability",
            "title": "Service availability",
            "description": "",
            "data-group": "deposit-foreign-marriage",
            "data-type": "monitoring",
            "info": [
              "Info text line 1",
              "Info text line 2"
            ],
            "tabs": [
              {"id": "day", "name": "30 days"},
              {"id": "hour", "name": "24 hours"}
            ],
            "tabbed_attr": "period"
          };
          var table_options = {
            "column_meta": [
              { "title": "Availability", "column_header": "Page load time", "valueAttr": "avgresponse" },
              { "title": "Availability", "column_header": "Uptime", "valueAttr": "uptimeFraction" }
            ]
          };
          var response = fs.readFileSync(path.join('app/support/backdrop_stub/responses/deposit_foreign_marriage_monitoring_day.json'));
          var json_response = JSON.parse(response);
          collection = collectionWithStubbedFetchResponse(AvailabilityCollection, collection_config_options, json_response);

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
            expect(table_view.$("th[scope='col']:contains('Page load time')").length).toEqual(1);
            expect(table_view.$("th[scope='col']:contains('Uptime')").length).toEqual(1);
            expect(table_view.$("tr").length).toEqual(31);
            expect(table_view.$("td[scope='row']").length).toEqual(30);
            expect(table_view.$("td[scope='row']:eq(0)").text()).toEqual("15 Oct 2013");
            expect(table_view.$("td[scope='row']:eq(29)").text()).toEqual("13 Nov 2013");
            expect(table_view.$("td").length).toEqual(3 * 30);
          }, this);
          collection.fetch();
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
            expect(table_view.$("th[scope='col']:contains('Page load time')").length).toEqual(1);
            expect(table_view.$("th[scope='col']:contains('Uptime')").length).toEqual(1);
            expect(table_view.$("tr").length).toEqual(31);
            expect(table_view.$("td[scope='row']").length).toEqual(30);
            expect(table_view.$("td[scope='row']:eq(0)").text()).toEqual("12am to 12am, 15 October 2013");
            expect(table_view.$("td[scope='row']:eq(29)").text()).toEqual("12am to 12am, 13 November 2013");
            expect(table_view.$("td").length).toEqual(3 * 30);
          }, this);
          collection.query.set('period', 'hour')
        });
      });
    });
    describe("when the collection is a flat (normal) collection", function() {

    });
  });

});
