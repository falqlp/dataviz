function updateGraph3(marque){
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svgExists = d3.select(".graph3").select("svg");
    if (!svgExists.empty()) {
        svgExists.remove();
    }

    var svg = d3.select(".graph3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    let dataBis = data.filter((d)=>{
        return d.Marque === marque
    })
    dataBis.push({Nom: 'origin', parent:'', indicateur:null})
    var root = d3.stratify()
        .id(function(d) { return d.Nom; })
        .parentId(function(d) { return d.parent; })
        (dataBis);
    root.sum(function(d) { return d.indicateur })

    d3.treemap()
        .size([width, height])
        .padding(4)
        (root)

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
        .style("fill", "#87ceeb");

    // and to add the text labels
    svg.selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function(d) { return d.x0 + 10; })
        .attr("y", function(d) { return d.y0 + 20; })
        .attr("fill", "white")
        .attr("font-size", "15px")
        .each(function(d) {
            var text = d3.select(this),
                lines = `${d.data.Nom}\nScore: ${Math.floor(d.data.indicateur)}`.split(/\n/);

            lines.forEach(function (line, i) {
                text.append("tspan")
                    .attr("x", d.x0 + 10)
                    .attr("y", d.y0 + 20 + i * 20)
                    .text(line);
            });
        });

}
updateGraph3('Dacia')
