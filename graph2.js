function doSVG(){
    const margin = {top: 20, right: 30, bottom: 40, left: 65},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// Création de l'élément SVG
    const svg = d3.select(".graph2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const prix = data.map(d => {
        return typeof d.Prix === 'string' ? +d.Prix.replace(/,/g, '') : d.Prix;
    });

    const efficacites = data.map(d => d.Efficacite);
    const regressionCoefficients = linearRegression(prix, efficacites);
    const slope = regressionCoefficients[0];
    const intercept = regressionCoefficients[1];



    const groupKeys = ["Groupe1", "Groupe2", "Groupe3"]; // Remplacez par vos critères de regroupement
    const regressions = groupKeys.map(key => {
        const groupData = data.filter(d => d.groupKey === key); // Filtrer les données par groupe
        const xValues = groupData.map(d => d.Efficacite);
        const yValues = groupData.map(d => +d.Prix.replace(/,/g, ''));
        return linearRegression(yValues, xValues);
    });

    function predictY(x) {
        return slope * x + intercept;
    }


    const x = d3.scaleLinear()
        .domain([150, 250]) // Plage d'efficacité (modifiable selon les données)
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
        .domain([20, 220]) // Plage de prix (modifiable selon les données)
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.Efficacite))
        .attr("cy", d => y(d.Prix))
        .attr("r", 5)
        .style("fill", "#87ceeb");

    svg.append("line")
        .attr("x1", x(d3.min(efficacites)))
        .attr("y1", y(predictY(d3.min(efficacites))))
        .attr("x2", x(d3.max(efficacites)))
        .attr("y2", y(predictY(d3.max(efficacites))))
        .attr("stroke", "red")
        .attr("stroke-width", 2);

    regressions.forEach((coefficients, index) => {
        const [slope, intercept] = coefficients;

    });
    svg.append("text")
        .attr("transform", `translate(${width/2}, ${height + margin.top + 20})`)
        .style("text-anchor", "middle")
        .text("Consomation (Wh/km)");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", - margin.left)
        .attr("x",- (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Prix (k  €)");
}

function linearRegression(y, x){
    const n = y.length;
    let sum_x = 0, sum_y = 0, sum_xy = 0, sum_xx = 0;
    for (let i = 0; i < y.length; i++){
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += (x[i] * y[i]);
        sum_xx += (x[i] * x[i]);
    }
    const slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    const intercept = (sum_y - slope * sum_x) / n;
    return [slope, intercept];
}

doSVG()
