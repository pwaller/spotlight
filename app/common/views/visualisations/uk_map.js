define([
  'extensions/views/graph/graph',
  'extensions/views/view',
  'vendor/topojson',
  'uk'
],
function (Graph, View, topojson, uk) {
  var UkMap = Graph.extend({

    topojson: topojson,

    renderContent: function(uk) {
      console.log(uk);

      //data
      var subunits = this.topojson.feature(uk, uk.objects.subunits);

      //projection
      var projection = d3.geo.albers()
          .center([0, 55.4])
          .rotate([4.4, 0])
          .parallels([50, 60])
          .scale(6000)
          .translate([width / 2, height / 2]);

      //path
      var path = d3.geo.path()
        .projection(projection);

      //render
    /*svg.append("path")*/
    /*.datum(subunits)*/
      /*.attr("d", path);*/

      //render and
      //subunit classes for styling
      svg.selectAll(".subunit")
          .data(topojson.feature(uk, uk.objects.subunits).features)
        .enter().append("path")
          .attr("class", function(d) { 
            return "subunit " + d.id; 
          })
          .attr("d", path);

      //borders
      svg.append("path")
        .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
        .attr("d", path)
        .attr("class", "subunit-boundary");

      //borders ireland
      svg.append("path")
        .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
        .attr("d", path)
        .attr("class", "subunit-boundary IRL");

      //places
      //filtered when json created
      svg.append("path")
        .datum(topojson.feature(uk, uk.objects.places))
        .attr("d", path)
        .attr("class", "place");

      //labels
      //transform gets position
      svg.selectAll(".place-label")
        .data(topojson.feature(uk, uk.objects.places).features)
      .enter().append("text")
        .attr("class", "place-label")
        .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.properties.name; });

      //right-aligned labels on the left side of the map, and left-aligned labels on the right side of the map, here using 1°W as the threshold
      svg.selectAll(".place-label")
          .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
          .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });

      //countries
      svg.selectAll(".subunit-label")
          .data(topojson.feature(uk, uk.objects.subunits).features)
        .enter().append("text")
          .attr("class", function(d) { return "subunit-label " + d.id; })
          .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.properties.name; });

      //colours
      d3.select(".subunit.SCT").style('fill', '#ddc');
      d3.select(".subunit.WLS").style('fill', '#cdd');
      d3.select(".subunit.NIR").style('fill', '#cdc');
      d3.select(".subunit.ENG").style('fill', '#dcd');
      d3.select(".subunit.IRL").style('display', 'none');
    },

    render: function () {
      if (isServer) {
        return;
      }

      //do this later with graph parent class to get axis, labels etc if needed
      View.prototype.render.apply(this, arguments);
      
      /*d3.json("uk.json", function(error, uk) {*/
      /*});*/

      var width = 960,
          height = 1160;

      //create svg
      var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height);

      this.renderContent(uk);
    }


//    initialize: function (options) {
//      Graph.prototype.initialize.apply(this, arguments);
//      if (this.model && this.model.get('value-attr')) {
//        this.valueAttr = this.model.get('value-attr');
//      }
//    },
//
//    interactiveFunction: function (e) {
//      if (this.graph.lineLabelOnTop()) {
//        return e.slice >= 3;
//      } else {
//        return e.slice % 3 !== 2;
//      }
//    },
//    
//    components: function () {
//      var labelComponent, labelOptions, stackOptions;
//
//      if (this.showLineLabels()) {
//        labelComponent = this.sharedComponents.linelabel;
//        labelOptions = {
//          showValues: true,
//          showValuesPercentage: true,
//          showSummary: true,
//          showTimePeriod: true,
//          attachLinks: this.model.get('line-label-links')
//        };
//        stackOptions = {
//          selectGroup: false,
//          allowMissingData: true,
//          drawCursorLine: true,
//          interactive: this.interactiveFunction
//        };
//      } else {
//        labelComponent = this.sharedComponents.callout;
//      }
//
//      return [
//        { view: this.sharedComponents.xaxis },
//        { view: this.sharedComponents.yaxis },
//        { view: this.sharedComponents.stack, options: stackOptions },
//        { view: labelComponent, options: labelOptions },
//        { view: this.sharedComponents.hover }
//      ];
//    },
//
//    getConfigNames: function () {
//      return ['stack', this.collection.query.get('period') || 'week'];
//    }
  });
  
  return UkMap;
});
