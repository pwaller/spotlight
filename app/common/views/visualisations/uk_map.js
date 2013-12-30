define([
  'extensions/views/graph/graph',
  'extensions/views/graph/legend',
  'extensions/views/view',
  'topojson',
  'uk_countries'
],
function (Graph, Legend, View, topojson, uk_countries) {
  var UkMap = Graph.extend({

    initialize: function (options) {
      Graph.prototype.initialize.apply(this, arguments);
      //this should be taken care of elsewhere
      this.$el.appendTo($('.uk-map'));
    },

    renderContent: function(map) {

      this.resize();
      this.svg.selectAll('*').remove();
      console.log("rerender");
      //data
      var subunits = topojson.feature(map, map.objects.subunits);

      //projection
      console.log(this.width);
      console.log(this.height);
      var projection = d3.geo.albers()
          .center([0, 55.4])
          .rotate([4.4, 0])
          .parallels([50, 60])
          .scale(6000 * (this.width / 954))
          .translate([this.width / 2, this.height / 2]);

      //path
      var path = d3.geo.path()
        .projection(projection);

      //render and
      //subunit classes for styling
      this.svg.selectAll(".subunit")
          .data(topojson.feature(map, map.objects.subunits).features)
        .enter().append("path")
          .attr("class", function(d) { 
            return "subunit " + d.id; 
          })
          .attr("d", path);

      //borders
      this.svg.append("path")
        .datum(topojson.mesh(map, map.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
        .attr("d", path)
        .attr("class", "subunit-boundary");

      //borders ireland
      this.svg.append("path")
        .datum(topojson.mesh(map, map.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
        .attr("d", path)
        .attr("class", "subunit-boundary IRL");

      //places
      //filtered when json created
      this.svg.append("path")
        .datum(topojson.feature(map, map.objects.places))
        .attr("d", path)
        .attr("class", "place");

      //labels
      //transform gets position
      this.svg.selectAll(".place-label")
        .data(topojson.feature(map, map.objects.places).features)
      .enter().append("text")
        .attr("class", "place-label")
        .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.properties.name; });

      //right-aligned labels on the left side of the map, and left-aligned labels on the right side of the map, here using 1°W as the threshold
      this.svg.selectAll(".place-label")
          .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
          .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });

      //countries
      this.svg.selectAll(".subunit-label")
          .data(topojson.feature(map, map.objects.subunits).features)
        .enter().append("text")
          .attr("class", function(d) { return "subunit-label " + d.id; })
          .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.properties.name; });

      d3.select(".subunit.SCT").style('fill', this.getColourStringForRegion('Scotland'));
      d3.select(".subunit.WLS").style('fill', this.getColourStringForRegion('Wales'));
      d3.select(".subunit.NIR").style('fill', this.getColourStringForRegion('Northern_Ireland'));
      d3.select(".subunit.ENG").style('fill', this.getColourStringForRegion('England'));
      d3.select(".subunit.IRL").style('display', 'none');
    },

    getColourStringForRegion: function (region){
      var model = this.collection.find(function(m){
        return m.get('id') == region;
      });

      return this.getHsl(model.get('values').last().get('value:mean'));
    },

    getHsl: function (value){
      return d3.hsl("hsl(0,100%," + this.scale(value) + "%)").toString();
    },

    //this is just here to make graph parent class be nice
    //we do need to scale defined on init though
    //should we pass the value of scale to the legend or just how to work it out?
    //probably how to work it out so collection changes fall through without reinit
    calcXScale: function () {
      //colours
      var collectionMax = this.collection.max(function(m){
        return m.get('values').last().get('value:mean');
      });
      var collectionMin = this.collection.min(function(m){
        return m.get('values').last().get('value:mean');
      });

      this.collectionMax = collectionMax.get('values').last().get('value:mean');
      this.collectionMin = collectionMin.get('values').last().get('value:mean');
      this.scale = d3.scale.linear()
        .domain([this.collectionMin, this.collectionMax])
        .range([80,50]);
      return this.scale;
    },

    render: function () {
      if (isServer) {
        return;
      }

      Graph.prototype.render.apply(this, arguments);
      this.renderContent(uk_countries);
    },

    components: function () {
      return [
        { 
          view: Legend,
          options: {
            calcXScale: this.calcXScale,
            getHsl: this.getHsl
          }
        }
      ];
    }


  });
  
  return UkMap;
});
