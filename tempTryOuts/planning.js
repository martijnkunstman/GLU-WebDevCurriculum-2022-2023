let planningData;
let planningConfig;
let app = document.getElementById('app');
let quarterNow = 0;

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
        let start = schoolYear.quarters[0][0] - 1;
        let end = schoolYear.quarters[schoolYear.quarters.length - 1][1] + 52;
        for (let j = start; j < end; j++) {
            let quarter = findQuarterByWeek((j % 52 + 1), schoolYear.quarters, i);
            let holiday = findHolidays((j % 52 + 1), schoolYear.holidays);
            quarterText = "";
            if (quarter != quarterNow) {
                quarterNow++;
                quarterText = " - <b>P" + quarter + "</b>";
            }

            app.innerHTML += '<div id="syid-'+planningData.schoolYearIds[i]+'|w-'+(j % 52 + 1)+'" class="scedule-item" style="width:80px;" data-week="' + (j % 52 + 1) + '" data-schoolyearId="' + planningData.schoolYearIds[i] + '" data-quarter="' + quarter + '"><div class="scedule-item-week">' + (j % 52 + 1) + quarterText + '</div><div class="scedule-item-holiday">' + holiday + '</div></div>';
        }
    }
    createPeriods();
}

function createPeriods() {
    for (let i = 0; i < planningData.periods.length; i++) {
        let startWeek = document.getElementById("syid-" + planningData.periods[i].schoolYearId + "|w-" + planningData.periods[i].period[0]);
        startWeek.innerHTML += '<div class="project project-width-'+planningData.periods[i].period.length+'">' + planningData.periods[i].note + '-'+planningData.periods[i].period.length+'</div>';
        //week.innerHTML += '<div class="project">111</div>';
   
    }
}

function findHolidays(week, holidays) {
    for (let i = 0; i < holidays.length; i++) {
        for (let j = 0; j < holidays[i].weeks.length; j++) {
            if (week === holidays[i].weeks[j]) {
                ;
                return planningConfig.holidays.find(x => x.id === holidays[i].id).name;
            }
        }
    }
    return "";
}

function findQuarterByWeek(week, quarters, year) {
    for (let i = 0; i < quarters.length; i++) {
        if (week >= quarters[i][0] && week <= quarters[i][1]) {
            return (i + 1 + year * 4);
        }
    }
    return (2 + year * 4);
}

init();


/*
planning:

create
delete
move
swap
resize
insert between

edit (type)
*/