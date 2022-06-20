// Build Bar Chart 
function buildCharts(yr, st) {


    d3.json("covid.json").then((data => {

       
        var states = new Set();
        data.forEach(data => {
            states.add(data.state)
        });
        states = Array.from(states);

        var years = new Set();
        data.forEach(data => {
            years.add(data.year)
        });
        years = Array.from(years);
        // var state = "state"
        // var year = ["2020","2021","2022"]
        var sex1 = "Male"
        var sex2 = "Female"

        var age_groups = ['All ages', 'Under 1 year', '1-4 years', '5-14 years',
                            '15-24 years', '25-34 years', '35-44 years', '45-54 years',
                            '55-64 years', '65-74 years', '75-84 years', '85 years and over'];

        // var age_group = FilteredAge_group

        var filteredData = data.filter(stateinfo => (stateinfo.state == st) & (stateinfo.year == yr))[0]
       
        


        // https://plotly.com/javascript/bar-charts/
        
        var male = {
            x: age_groups,
            y: ['deaths'],
            name: sex1, 
            type: 'bar'
          };
          
          var female = {
            x: age_groups,
            y: ['deaths'],
            name: sex2,
            type: 'bar'
          };
          
        var bar_data = [male, female];
          
        var bar_layout = {
            title: "COVID Deaths by State",
            xaxis: { title: "Age Group" },
            yaxis: { title: "Deaths #" },
            barmode: 'group'
        };

        
        Plotly.newPlot('bar', bar_data, bar_layout)
 
    
    }))


};



function populateDemoInfo(year,state) {

    var demographicInfoBox = d3.select("#sample-metadata");

    d3.json("covid.json").then(data => {
        // var state = [];
        //     for (let i = 0; i < state.length; i++) {
        //         row = state[i];
        //         if (row.state != i)
        //         row.append(i++)
        //     } 
        // var year = ["2020","2021","2022"]
        
        var states = new Set();
        data.forEach(data => {
            states.add(data.state)
        });
        states = Array.from(states);

        var years = new Set();
        data.forEach(data => {
            years.add(data.year)
        });
        years = Array.from(years);


        var filteredData = data.filter(stateinfo => (stateinfo.state == state) & (stateinfo.year == year))[0]

        console.log(filteredData)
        Object.entries(filteredData).forEach(([key, value]) => {
            demographicInfoBox.append("p").text(`${key}: ${value}`)
        })


    })
}


function optionChanged(year,state) {
    console.log(year, state);
    buildCharts(year, state);
    populateDemoInfo(year, state);
}

// btn.on("click", function handleClick() {
//     var searchYear = document.getElementById("selyear").value;   
//     var searchState = document.getElementById("selstate").value; 
    
//     populateDemoInfo(searchYear, searchState);
//     buildCharts(searchYear, searchState);
    
  
//   });

function initDashboard() {
    var dropdown = d3.select("#selyear");
    var dropdown2 = d3.select("#selstate");

    d3.json("covid.json").then(data => {

        var years = new Set();
        data.forEach(data => {
            years.add(data.year)
        });
        years = Array.from(years);

        var states = new Set();
        data.forEach(data => {
            states.add(data.state)
        });
        states = Array.from(states);

        years.forEach(year => {
            dropdown.append("option").text(year).property("value", year);
        });


        states.forEach(state => {
            dropdown2.append("option").text(state).property("value", state);
        });

        buildCharts(years[0],states[0]);
        populateDemoInfo(years[0], states[0]);
    });
};

initDashboard();