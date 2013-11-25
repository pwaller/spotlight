define([
  'common/collections/volumetrics2',
  'moment'
],
function (VolumetricsCollection, moment) {
    var someFakeFCOTransactionDataLabel = [
      {
        "_count": 3.0, 
        "_group_count": 3, 
        "eventLabel": "deposit-foreign-marriage_begin", 
        "uniqueEvents:sum": 2498.0, 
        "values": [
          {
            "_count": 1.0, 
            "_end_at": "2013-11-11T00:00:00+00:00", 
            "_start_at": "2013-11-04T00:00:00+00:00", 
            "uniqueEvents:sum": 319.0
          }, 
          {
            "_count": 1.0, 
            "_end_at": "2013-11-18T00:00:00+00:00", 
            "_start_at": "2013-11-11T00:00:00+00:00", 
            "uniqueEvents:sum": 307.0
          }, 
          {
            "_count": 1.0, 
            "_end_at": "2013-11-25T00:00:00+00:00", 
            "_start_at": "2013-11-18T00:00:00+00:00", 
            "uniqueEvents:sum": 253.0
          }
        ]
      },
      {
        "_count": 3.0, 
        "_group_count": 3, 
        "eventLabel": "deposit-foreign-marriage_end", 
        "uniqueEvents:sum": 161.0, 
        "values": [
          {
            "_count": 1.0, 
            "_end_at": "2013-11-11T00:00:00+00:00", 
            "_start_at": "2013-11-04T00:00:00+00:00", 
            "uniqueEvents:sum": 22.0
          }, 
          {
            "_count": 1.0, 
            "_end_at": "2013-11-18T00:00:00+00:00", 
            "_start_at": "2013-11-11T00:00:00+00:00", 
            "uniqueEvents:sum": 14.0
          }, 
          {
            "_count": 1.0, 
            "_end_at": "2013-11-25T00:00:00+00:00", 
            "_start_at": "2013-11-18T00:00:00+00:00", 
            "uniqueEvents:sum": 8.0
          }
        ]
      } 
    ];

    var someFakeFCOTransactionDataCategory = [
      {
        "_count": 3.0, 
        "_group_count": 3, 
        "eventCategory": "deposit-foreign-marriage:start", 
        "uniqueEvents:sum": 2498.0, 
        "values": [
          {
            "_count": 1.0, 
            "_end_at": "2013-11-11T00:00:00+00:00", 
            "_start_at": "2013-11-04T00:00:00+00:00", 
            "uniqueEvents:sum": 319.0
          }, 
          {
            "_count": 1.0, 
            "_end_at": "2013-11-18T00:00:00+00:00", 
            "_start_at": "2013-11-11T00:00:00+00:00", 
            "uniqueEvents:sum": 307.0
          }, 
          {
            "_count": 1.0, 
            "_end_at": "2013-11-25T00:00:00+00:00", 
            "_start_at": "2013-11-18T00:00:00+00:00", 
            "uniqueEvents:sum": 253.0
          }
        ]
      },
      {
        "_count": 3.0, 
        "_group_count": 3, 
        "eventCategory": "deposit-foreign-marriage:done", 
        "uniqueEvents:sum": 161.0, 
        "values": [
          {
            "_count": 1.0, 
            "_end_at": "2013-11-11T00:00:00+00:00", 
            "_start_at": "2013-11-04T00:00:00+00:00", 
            "uniqueEvents:sum": 22.0
          }, 
          {
            "_count": 1.0, 
            "_end_at": "2013-11-18T00:00:00+00:00", 
            "_start_at": "2013-11-11T00:00:00+00:00", 
            "uniqueEvents:sum": 14.0
          }, 
          {
            "_count": 1.0, 
            "_end_at": "2013-11-25T00:00:00+00:00", 
            "_start_at": "2013-11-18T00:00:00+00:00", 
            "uniqueEvents:sum": 8.0
          }
        ]
      } 
    ];

    describe("FCO volumetrics collections", function () {

      sharedBehaviourForVolumetrics({
        data: someFakeFCOTransactionDataCategory,
        start_matcher: /start$/,
        start_matcher_suffix: "start",
        end_matcher: /done$/,
        matching_attribute: "eventCategory"
      });

      sharedBehaviourForVolumetrics({
        data: someFakeFCOTransactionDataLabel,
        start_matcher: /_begin$/,
        start_matcher_suffix: "_begin",
        end_matcher: /_end$/,
        matching_attribute: "eventLabel"
      });

      function sharedBehaviourForVolumetrics(context) {

        var volumetricsCollection = undefined,
            collectionFor = function (data) {
              collection = new VolumetricsCollection({}, {
                "data-group": 'notARealFCOTransaction',
                "data-type": 'journey',
                startMatcher: context.start_matcher,
                endMatcher: context.end_matcher,
                matchingAttribute: context.matching_attribute
              });
              collection.backdropUrl = '//testdomain/{{ data-group }}/{{ data-type }}';
              return collection;
            };

        beforeEach(function () {
          volumetricsCollection = collectionFor({data: context.data});
        });

        it("should query backdrop for journey data for the specified service", function () {
          expect(volumetricsCollection.url()).toContain("journey");
          expect(volumetricsCollection.url()).toContain("notARealFCOTransaction");
          expect(volumetricsCollection.url()).toContain("collect=uniqueEvents%3Asum");
          expect(volumetricsCollection.url()).toContain("period=week");
          expect(volumetricsCollection.url()).toContain("group_by=eventCategory");
        });

        it("should count the total number of people starting the transaction", function () {
          volumetricsCollection.data = context.data;
          expect(volumetricsCollection.numberOfJourneyStarts()).toEqual(2498);
        });

        it("should count the total number of people completing the transaction", function () {
          volumetricsCollection.data = context.data;
          expect(volumetricsCollection.numberOfJourneyCompletions()).toEqual(161);
        });

        it("should give the total completion rate as a percentage", function () {
          volumetricsCollection.data = context.data;
          expect(volumetricsCollection.completionRate()).toBeCloseTo(0.0644, 3);
        });

      }

    });
  }
);
