// set the dimensions and margins of the graph
function getTreeMap(){
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 445 - margin.left - margin.right,
        height = 445 - margin.top - margin.bottom;

// append the svg object to the body of the page
    var svg = d3.select(".graph3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Read data
        console.log(data)
        // stratify the data: reformatting for d3.js
        var root = d3.stratify()
            .id(function(d) { return d.Nom; })   // Nom of the entity (column Nom is Nom in csv)
            .parentId(function(d) { return d.parent; })   // Nom of the parent (column Nom is parent in csv)
            (data);
        root.sum(function(d) { return +d.indicateur })   // Compute the numeric indicateur for each entity
        console.log(root)

        // Then d3.treemap computes the position of each element of the hierarchy
        // The coordinates are added to the root object above
        d3.treemap()
            .size([width, height])
            .padding(4)
            (root)

        // use this information to add rectangles:
        svg
            .selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("stroke", "black")
            .style("fill", "#69b3a2");

        // and to add the text labels
        svg
            .selectAll("text")
            .data(root.leaves())
            .enter()
            .append("text")
            .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
            .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
            .text(function(d){ return d.data.Nom})
            .attr("font-size", "15px")
            .attr("fill", "white")
}
getTreeMap()
