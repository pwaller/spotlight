define([
  'extensions/collections/matrix',
  'extensions/collections/collection',
  'extensions/models/group',
  'extensions/mixins/date-functions'
],
function (MatrixCollection, Collection, Group, dateFunctions) {

  var VolumetricsCollection = MatrixCollection.extend({
    model: Group,

    initialize: function (models, options) {
      this.startMatcher= options.startMatcher;
      this.endMatcher= options.endMatcher;
      this.matchingAttribute= options.matchingAttribute;
      MatrixCollection.prototype.initialize.apply(this, arguments);
    },

    queryParams: function () {
      return {
        collect: 'uniqueEvents:sum',
        period: 'week',
        group_by: 'eventCategory'
      }
    },

    findItem: function (matcher) {
      return _.find(this.data, function (d) {
        return d[this.matchingAttribute].match(matcher) !== null;
      }, this);
    },

    uniqueEventsFor: function (data, matcher) {
      var item = this.findItem(matcher);

      if (!item) {
        return 0;
      }

      return item["uniqueEvents:sum"];
    },

    //not done
    findCompletion: function (event) {
      var completion;

      if (event == null) {
        completion = null;
      } else if (event.totalStarted == null || event.totalCompleted == null) {
        completion = 0;
      } else {
        completion = event.totalCompleted / event.totalStarted;
      }
      return completion;
    },

    //not done
    getEventForTimestamp: function (events, timestamp) {
      return _.find(events, function (d) {
        return moment(d._timestamp).isSame(timestamp);
      });
    },

    eventsFrom: function (data) {
      //rely on order being the same in backdrop response
      var startsData = this.findItem(this.startMatcher);
      var endsData = this.findItem(this.endMatcher);

      return _.map(startsData.values, function (item, i) {
        return {
          _timestamp: item._end_at,
          totalStarted: item["uniqueEvents:sum"],
          totalCompleted: endsData.values[i]["uniqueEvents:sum"]
        };
      }, this);
    },

    numberOfJourneyStarts: function () {
      var data = this.data;
      return this.uniqueEventsFor(data, this.startMatcher);
    },

    numberOfJourneyCompletions: function () {
      var data = this.data;
      return this.uniqueEventsFor(data, this.endMatcher);
    },

    completionRate: function () {
      return this.numberOfJourneyCompletions() / this.numberOfJourneyStarts();
    },

    totalWeeksInPeriod: function () {
      return this.data[0]["values"].length;
    },

    availableWeeksInPeriod: function () {
      return this.data[0]["_group_count"];
    },

    series: function (config) {
      var data = this.data;
      var events = this.eventsFrom(data);

      var weeksWithData = this.availableWeeksInPeriod();

      //end at is wrong? should be start at?
      var earliestEventTimestamp = moment(_.first(this.data[0].values)._end_at);
      var latestEventTimestamp = moment(_.last(this.data[0].values)._end_at);
      var weekDates = dateFunctions.weeksFrom(latestEventTimestamp, 9);

      var values = _.map(weekDates, function (timestamp) {
        var existingEvent = this.getEventForTimestamp(events, timestamp);
        return _.extend(config.modelAttribute(existingEvent), {
          _start_at: timestamp.clone().add(1, 'hours'),
          _end_at: timestamp.clone().add(1, 'hours').add(1, 'weeks')
        });
      }, this);

      return _.extend(config.collectionAttribute(events), {
        id: config.id,
        title: config.title,
        weeks: {
          total: this.totalWeeksInPeriod(),
          available: this.availableWeeksInPeriod()
        },
        values: new Collection(values).models
      });
    },

  });

  return VolumetricsCollection;
});
