// 1 assign labels for the data to variables
var povertyLabel = "Pct of pop. living in poverty";
var ageLabel = "Avg. age";
var incomeLabel = "Avg income";
var healthcareLabel = "Pct of pop. lacking healthcare coverage";
var obesityLabel = "Pct of pop. who are obese";
var smokesLabel = "Pct of pop. who smoke";


// 2  set up chart dimensions and chart

  // give it a width
  var svgWidth = 1000;

   // give it a height
  var svgHeight = 500;

  // calculate aspect ratio
  aspectRatio = svgWidth / svgHeight;

  // set vertical margin as a proportion of height (here 5%)
  vMargin = svgWidth / 10;

  // calculate horizontal margin in proportion to aspect ratio
  hMargin = vMargin * aspectRatio;

  console.log(`SVG dimensions of ${svgWidth}:${svgHeight} pxs is an aspect ratio of ${Math.round((aspectRatio * 100)) / 100}:1.`);

  // calculate chart width and height
  var width = svgWidth - (hMargin * 2);
  var height = svgHeight - (vMargin * 2);

  console.log(`Chart dimensions of ${width}:${height} pxs is an aspect ratio of ${Math.round((width / height * 100)) / 100}:1.`);


// 3 create SVG wrapper
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${hMargin}, ${vMargin})`);

// 4 import data
d3.csv("assets/data/data.csv").then(function(healthRiskData) {
  // the data table has these headers:
    // id
    // state
    // abbr        *******
    // poverty     *******
    // povertyMoe
    // age             ***
    // ageMoe
    // income          ***
    // incomeMoe
    // healthcare  *******
    // healthcareLow
    // healthcareHigh
    // obesity         ***
    // obesityLow
    // obesityHigh
    // smokes          ***
    // smokesLow
    // smokesHigh

var poverty = [];
var healthcare = [];

// 5 parse data: format and convert to ints
  healthRiskData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
    // and make one array of poverty...
    poverty.push(data.poverty);
    // ...and another of healthcare for linear regression (below):
    healthcare.push(data.healthcare);    
  });

console.log("here's the data:");
console.log(healthRiskData);

// 6 create chart scales
  var xScale = d3.scaleLinear()
     .domain(d3.extent(healthRiskData, d => d.poverty))
     .range([0, width]);

  // console.log("Here's xScale...");
  // console.log(xScale);

  var yScale = d3.scaleLinear()
    .domain(d3.extent(healthRiskData, d => d.healthcare))
    .range([height, 0]);

  //  console.log("...and here's yScale:");
  //  console.log(yScale);
  
  
  // 7a find min and max values for poverty
  var xMin = d3.min(healthRiskData, d => d.poverty);
  var xMax = d3.max(healthRiskData, d => d.poverty);
  console.log(`${povertyLabel}: ${xMin} to ${xMax}`);

  // 7b find max value for healthcare 
  var yMin = d3.min(healthRiskData, d => d.healthcare);
  var yMax = d3.max(healthRiskData, d => d.healthcare);
  console.log(`${healthcareLabel}: ${yMin} to ${yMax}`);

  // 7c use xMin and xMax values to set the xScale domain
  xScale.domain([Math.round(xMin-1), Math.round(xMax+1)]);

  // 7c use yMin and yMax values to set the yScale domain
  yScale.domain([Math.round(yMin-2), Math.round(yMax+2)]);


// 8 create each axis
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

//  console.log("Here's the x axis...");
//  console.log(bottomAxis);

//  console.log("...and here's the y axis:");
//  console.log(leftAxis);


// 9 append axes to chartGroup
     // a add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

     // b add y-axis
  chartGroup.append("g").call(leftAxis);


// 10 add titles to each axis
chartGroup.append("text")
.attr("transform", `translate(${width / 6.25 * -1}, ${height / 2})`)
.attr("text-anchor", "center")
.attr("transform", "translate(-50 280) rotate(-90)")
.attr("font-size", "16px")
.text(healthcareLabel);

chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + vMargin - 50})`)
.attr("text-anchor", "middle")
.attr("font-size", "16px")
.text(povertyLabel);


// 11 set up generator and append SVG path

// 1st try
// All this commented-out business makes a very funny shape
// but at least lets me know my code is plotting something:
  // line generator for data
  var line = d3.line()
    .x(d => xScale(d.poverty))
    .y(d => yScale(d.healthcare));

// console.log("Here are the contents of the variable called points:");
// console.log(points);

      
      // append circles
      var circlesGroup = chartGroup.selectAll(null)
        .data(healthRiskData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", width / 45)
        .attr("fill", "lightblue")
        .attr("stroke-width", .5)
        .attr("stroke", "steelblue")

        var circlesGroup = chartGroup.selectAll(null)
        .data(healthRiskData)
        .enter()
        .append("text")
        .attr("dx", d => xScale(d.poverty)-7)
        .attr("dy", d => yScale(d.healthcare)+4)
        .attr("font-size", "12px")
        .attr("font-color", "black")
        .text(function(d){return d.abbr});

// If I wanted to draw a trend line in Python, I would do something like this: 
// (slope, intercept, rvalue, pvalue, stderr) = linregress(xValues, yValues)
// to plot y = m * x + b (where m is slope and b is intercept)
// I wonder what does the same thing in JavaScript or perhaps specifically in D3?
var x = poverty; 
var y = healthcare;

function linearRegression(y, x) {
  var lr = {};
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;

  for (var i = 0; i < y.length; i++) {

      sum_x += x[i];
      sum_y += y[i];
      sum_xy += (x[i]*y[i]);
      sum_xx += (x[i]*x[i]);
      sum_yy += (y[i]*y[i]);
  } 

  lr["slope"] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
  lr["intercept"] = (sum_y - lr.slope * sum_x) / n;
  lr["r2"] = Math.pow((n * sum_xy - sum_x * sum_y)/Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)),2);

  return lr;



};

console.log(`slope: ${lr.slope}`);
console.log(`intercept: ${lr.intercept}`);
console.log(`r2: ${lr.r2}`);


}).catch(function(error) {
  console.log(error);
});
