console.log("app.js loaded");
//import data
// data = import data.csv

data = [{
    state: "state",
    abbr: "AA",
    poverty: 0.15,
    age: 39.8,
    income: 50000,
    healthcare: .15,
    obesity: 0.15,
    smoking: 0.15,
}
];

console.log("data.csv loaded");

// read data into separate variable and 
// declare variables for use in chart titles
// poverty 4
var state = data[1];
var stateLabel = "state";
console.log(`${stateLabel}: ${state}`);

var abbr = data[2];
var abbrLabel = "abbreviation";
console.log(`${abbrLabel}: ${abbr}`);

// poverty 4
var poverty = data[3];
var povertyLabel = "Percent of population who live in poverty";
console.log(`${povertyLabel}: ${poverty}`);

// age 6
var age = data[5];
var ageLabel = "Median age of population";
console.log(`${ageLabel}: ${age}`);

// income 8
var income = data[7];
var incomeLabel = "Median income of population";
console.log(`${incomeLabel}: ${income}`);

// healthcare 10
var healthcare = data[9];
var healthcareLabel = "Percent of population who lack heathcare coverage";
console.log(`${healthcareLabel}: ${healthcare}`);

// obesity 13
var obesity = data[12];
var obesityLabel = "Percent of population who are obese";
console.log(`${obesityLabel}: ${obesity}`);

// smoking 15
var smoking = data[14];
var smokingLabel = "Percent of population who smoke";
console.log(`${smokingLabel}: ${smoking}`);



d3.select("tbody")
  .selectAll("tr")
  .data(data)
  .enter()
  .append("tr")
  .html(function(d) {
    return `
    <td>${d.state}</td>
    <td>${d.poverty}</td>
    <td>${d.age}</td>
    <td>${d.income}</td>
    <td>${d.healthcare}</td>
    <td>${d.obesity}</td>
    <td>${d.smoking}</td>
    `;
  });
