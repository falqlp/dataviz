function graph(data) {
    let margin = {top: 30, right: 30, bottom: 90, left: 65},
        width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    let svg = d3.select(".graph1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    data.sort(function(b, a) {
        return b.value - a.value;
    });

    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.marque; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    var y = d3.scaleLinear()
        .domain([140, 240])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.marque); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "#87ceeb")

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", - margin.left)
        .attr("x",- (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Consomation (Wh/km)");

}

graph(moyennePrixArray)

