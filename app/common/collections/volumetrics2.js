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

    uniqueEventsFor: function (data, matcher) {
      var item = _.find(data, function (d) {
        return d[this.matchingAttribute].match(matcher) !== null;
      }, this);

      if (!item) {
        return 0;
      }

      return item["uniqueEvents:sum"];
    },

    //not done
    findCompletion: function (event) {
      var completion = null;

      if (event != null) {
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

    //not done
    eventsFrom: function (data) {
      var eventsByTimestamp = _.groupBy(data, function (d) { return d._timestamp; });

      return _.map(eventsByTimestamp, function (events) {
        return {
          _timestamp: events[0]._timestamp,
          totalStarted: this.uniqueEventsFor(events, this.startMatcher),
          totalCompleted: this.uniqueEventsFor(events, this.endMatcher)
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
      //not done
      var events = this.eventsFrom(data);

      var weeksWithData = this.availableWeeksInPeriod();

      var earliestEventTimestamp = dateFunctions.earliest(events, function (d) { return moment(d._timestamp); });
      var latestEventTimestamp = dateFunctions.latest(events, function (d) { return moment(d._timestamp); });
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
