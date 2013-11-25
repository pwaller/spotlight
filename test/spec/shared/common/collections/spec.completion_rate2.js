define([
  'common/collections/completion_rate2',
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

    var missingDataLabel = [
      {
        "_count": 2.0, 
        "_group_count": 2, 
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
            "uniqueEvents:sum": null
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
        "_count": 2.0, 
        "_group_count": 2, 
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
            "uniqueEvents:sum": null
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

    var missingDataCategory = [
      {
        "_count": 2.0, 
        "_group_count": 2, 
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
            "uniqueEvents:sum": null
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
        "_count": 2.0, 
        "_group_count": 2, 
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
            "uniqueEvents:sum": null
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
        end_matcher_suffix: "done",
        matching_attribute: "eventCategory"
      });

      sharedBehaviourForVolumetricsWithMissingData({
        data: missingDataCategory,
        start_matcher: /start$/,
        start_matcher_suffix: "start",
        end_matcher: /done$/,
        end_matcher_suffix: "done",
        matching_attribute: "eventCategory"
      });

      sharedBehaviourForVolumetrics({
        data: someFakeFCOTransactionDataLabel,
        start_matcher: /_begin$/,
        start_matcher_suffix: "_begin",
        end_matcher: /_end$/,
        end_matcher_suffix: "_end",
        matching_attribute: "eventLabel"
      });

      sharedBehaviourForVolumetricsWithMissingData({
        data: missingDataLabel,
        start_matcher: /_begin$/,
        start_matcher_suffix: "_begin",
        end_matcher: /_end$/,
        end_matcher_suffix: "_end",
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

        it("should give a series for completion rate", function () {
          var parse = volumetricsCollection.parse({data: context.data});
          expect(parse.title).toBe("Completion rate");
          expect(parse.id).toBe("completion");
          expect(parse.weeks.total).toBe(3);
          expect(parse.weeks.available).toBe(3);
          expect(parse.totalCompletion).toBeCloseTo(0.0644, 3);
          expect(parse.values.length).not.toBeUndefined();
        });

        it("should map completion rates to completion series", function () {
          var firstValue = volumetricsCollection.parse({data: context.data}).values[6];
          expect(firstValue.get('_start_at')).toBeMoment(moment("2013-06-10T01:00:00+01:00"));
          expect(firstValue.get('_end_at')).toBeMoment(moment("2013-06-17T01:00:00+01:00"));
          expect(firstValue.get('completion')).toBeCloseTo(0.06, 1);
          var secondValue = volumetricsCollection.parse({data: context.data}).values[7];
          expect(secondValue.get('_start_at')).toBeMoment(moment("2013-06-17T01:00:00+01:00"));
          expect(secondValue.get('_end_at')).toBeMoment(moment("2013-06-24T01:00:00+01:00"));
          expect(secondValue.get('completion')).toBeCloseTo(0.045, 1);
          var thirdValue = volumetricsCollection.parse({data: context.data}).values[8];
          expect(thirdValue.get('_start_at')).toBeMoment(moment("2013-06-24T01:00:00+01:00"));
          expect(thirdValue.get('_end_at')).toBeMoment(moment("2013-07-01T01:00:00+01:00"));
          expect(thirdValue.get('completion')).toBeCloseTo(0.031, 1);
        });

        it("should query for 9 weeks of data for completion series", function () {
          expect(volumetricsCollection.parse({data: context.data}).values.length).toBe(9);
        });

        it("should pad out missing data for completions series", function () {
          var paddedValue = volumetricsCollection.parse({data: context.data}).values[5];
          expect(paddedValue.get('_start_at')).toBeMoment(moment("2013-06-03T01:00:00+0100"));
          expect(paddedValue.get('_end_at')).toBeMoment(moment("2013-06-10T01:00:00+01:00"));
          expect(paddedValue.get('completion')).toBe(null);
        });

        it("should have a completion rate of 0 when there's no done event for the timestamp", function () {
          var data = [ 
            {
              "_count": 3.0, 
              "_group_count": 3, 
              "uniqueEvents:sum": 2498.0, 
              "values":[ 
                {
                  _end_at: "2013-06-09T23:00:00+00:00", 
                  "uniqueEvents:sum": null
                }
              ] 
            },
            {
              "_count": 3.0, 
              "_group_count": 3, 
              "uniqueEvents:sum": 2498.0, 
              "values":[ 
                {
                  _end_at: "2013-06-09T23:00:00+00:00", 
                  "uniqueEvents:sum": 5
                }
              ] 
            }
          ]

          data[0][context.matching_attribute] = "fco-transaction-name" + context.start_matcher_suffix;
          data[1][context.matching_attribute] = "fco-transaction-name" + context.end_matcher_suffix;

          var events = { data: data };

          var noDoneEventVolumetricsCollection = function () { 
            collection = new VolumetricsCollection({}, {
              "data-group": 'notARealFCOTransaction',
              "data-type": 'journey',
              startMatcher: context.start_matcher,
              endMatcher: context.end_matcher,
              matchingAttribute: context.matching_attribute
            });
            collection.backdropUrl = '//testdomain/{{ data-group }}/{{ data-type }}';
            return collection;
          }();

          expect(noDoneEventVolumetricsCollection.parse(events).values[8].get('completion')).toBe(0);
        });
      }

      function sharedBehaviourForVolumetricsWithMissingData(context) {

        var volumetricsCollection = undefined,
            collectionFor = function (data) {
              collection  = new VolumetricsCollection({}, {
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

        it("should ignore missing data for completion rate", function () {
          var parse = volumetricsCollection.parse({data: context.data});

          expect(parse.weeks.total).toBe(3);
          expect(parse.weeks.available).toBe(2);
          expect(parse.totalCompletion).toBeCloseTo(0.5, 0.01);
        });
        
        it("should have null completion rate for missing data", function () {
          var completionWithMissingData = volumetricsCollection.parse({data: context.data}).values;
          var missingValue = completionWithMissingData[7];

          expect(missingValue.get('_start_at')).toBeMoment(moment("2013-06-17T01:00:00+01:00"));
          expect(missingValue.get('_end_at')).toBeMoment(moment("2013-06-24T01:00:00+01:00"));
          //is this assumption - never return empty week - correct?
          expect(missingValue.get('completion')).toBe(0);
        });
        
      }

    });
  }
);
