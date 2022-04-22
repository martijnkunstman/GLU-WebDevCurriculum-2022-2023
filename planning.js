let planningData;
let planningConfig;
let app = document.getElementById('app');

function init() {
    fetch("planning_data.json").then(data => data.text()).then(text => createPlanningData(text));
}

function createPlanningData(text) {
    planningData = JSON.parse(text);
    planningData = planningData[0];
    fetch("planning_config.json").then(data => data.text()).then(text => createPlanningConfig(text));
}

function createPlanningConfig(text) {
    planningConfig = JSON.parse(text);
    app.innerHTML += '<div id="title">Cohort ' + planningData.cohort + '</div>';
    createPlanningMap();
}

function createPlanningMap() {
    for (let i = 0; i < planningData.schoolYearIds.length; i++) {
        let schoolYear = planningConfig.schoolYears.find(schoolYear => schoolYear.id === planningData.schoolYearIds[i]);
        app.innerHTML += '<div id="subtitle">Leerjaar ' + (i + 1) + ' - ' + schoolYear.years.join("-") + '</div>';
        let start = schoolYear.quarters[0][0]-1;
        let end = schoolYear.quarters[schoolYear.quarters.length - 1][1]+52;
        for (let j = start; j < end; j++) {
            app.innerHTML += '<div id="scedule-item">|' + (j%52 + 1) + '|</div>';
        }
    }
}


init();