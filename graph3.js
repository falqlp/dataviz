function updateGraph3(marque){
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svgExists = d3.select(".graph3").select("svg");
    if (!svgExists.empty()) {
        svgExists.remove();
    }

// append the svg object to the body of the page
    var svg = d3.select(".graph3")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Read data
    let dataBis = data.filter((d)=>{
        return d.Marque === marque
    })
    dataBis.push({Nom: 'origin', parent:'', indicateur:null})
    // stratify the data: reformatting for d3.js
    var root = d3.stratify()
        .id(function(d) { return d.Nom; })   // Name of the entity (column name is name in csv)
        .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
        (dataBis);
    root.sum(function(d) { return d.indicateur })   // Compute the numeric value for each entity

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
        .style("fill", "#87ceeb");

    // and to add the text labels
    svg.selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", function(d) { return d.x0 + 10; }) // Position X pour le texte
        .attr("y", function(d) { return d.y0 + 20; }) // Position Y initiale pour le texte
        .attr("fill", "white")
        .attr("font-size", "15px")
        .each(function(d) {
            var text = d3.select(this),
                lines = `${d.data.Nom}\nRapport performance/prix: ${Math.floor(d.data.indicateur)}`.split(/\n/);

            lines.forEach(function (line, i) {
                text.append("tspan")
                    .attr("x", d.x0 + 10) // Position X pour chaque tspan
                    .attr("y", d.y0 + 20 + i * 20) // Position Y ajustée pour chaque tspan
                    .text(line);
            });
        });

}
updateGraph3('Dacia')
