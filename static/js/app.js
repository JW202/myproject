
function buildCharts(state, year) {


    d3.json("covid.json").then((data => {

       
        var state = data.state
        var year = [2020,2021,2022]
        var sex = data.sex
        var age_group = data.age_group

        var filteredData = data.filter(stateinfo => (stateinfo.state == state) & (stateinfo.year == year))[0]

      
        // https://plotly.com/javascript/bar-charts/
        
        var trace1 = {
            x: ['age group'],
            y: ['deaths'],
            name: 'sex' == 'male',
            type: 'bar'
          };
          
          var trace2 = {
            x: ['age group'],
            y: ['deaths'],
            name: 'sex' == 'female',
            type: 'bar'
          };
          
          var bar_data = [trace1, trace2];
          
    
       
        var bar_layout = {
            title: "COVID Death by State",
            xaxis: { title: "Age Group" },
            yaxis: { title: "Deaths #" },
            barmode: 'group'
        };

        
        Plotly.newPlot('bar', bar_data, bar_layout)

        
    
    }))


};



function populateDemoInfo(state) {

    var demographicInfoBox = d3.select("#sample-metadata");

    d3.json("covid.json").then(data => {
        // var metadata = data.metadata
        // var filteredMetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]
        var filteredData = data.filter(stateinfo => (stateinfo.state == state) & (stateinfo.year == year))[0]

        console.log(filteredData)
        Object.entries(filteredData).forEach(([key, value]) => {
            demographicInfoBox.append("p").text(`${key}: ${value}`)
        })


    })
}


function optionChanged(year) {
    console.log(year);
    buildCharts(year);
    populateDemoInfo(year);
}




function optionChanged(state) {
    console.log(state);
    buildCharts(state);
    populateDemoInfo(state);
}


function initDashboard() {
    var dropdown = d3.select("#selDataset")
    d3.json("covid.json").then(data => {
        var year = [2020, 2021, 2022]; 
        
        state.forEach(state => {
            dropdown.append("option").text(state).property("value", state)
        })
        buildCharts(state[0]);
        populateDemoInfo(state[0]);
    });
};

initDashboard();