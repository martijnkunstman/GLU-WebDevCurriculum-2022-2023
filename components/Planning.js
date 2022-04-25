import Week from "./Week";
import Project from "./Project";
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Planning(props) {
    const { data, error } = useSWR('/api/planningData', fetcher)
    let planningData;
    let planningConfig;
    let weeks = [];
    let projects = [];
    let quarterNow = 0;
    let counter = 1;
    if (error) return <div>Failed to planningData</div>
    if (data) {
        planningData = data[0];
        planningConfig = props.config;
        console.log(planningData);
        console.log(planningConfig);
        createPlanningMap();        
    }
    function createPlanningMap() {
        for (let i = 0; i < planningData.schoolYearIds.length; i++) {
            let schoolYear = planningConfig.schoolYears.find(schoolYear => schoolYear.id === planningData.schoolYearIds[i]);
            weeks.push(<div id="subtitle">Leerjaar {(i + 1)} - {schoolYear.years.join("-")} </div>);
            let start = schoolYear.quarters[0][0] - 1;
            let end = schoolYear.quarters[schoolYear.quarters.length - 1][1] + 52;
            for (let j = start; j < end; j++) {
                let quarter = findQuarterByWeek((j % 52 + 1), schoolYear.quarters, i);
                let holiday = findHolidays((j % 52 + 1), schoolYear.holidays);
                let quarterText = "";
                if (quarter != quarterNow) {
                    quarterNow++;
                    quarterText = " - P" + quarter + "";
                }
                weeks.push(<Week name={(j % 52 + 1)+quarterText} key={("id"+counter)} style={{width:"80px"}}/>);
                counter++;
                //app.innerHTML += '<div id="syid-'+planningData.schoolYearIds[i]+'|w-'+(j % 52 + 1)+'" class="scedule-item" style="width:80px;" data-week="' + (j % 52 + 1) + '" data-schoolyearId="' + planningData.schoolYearIds[i] + '" data-quarter="' + quarter + '"><div class="scedule-item-week">' + (j % 52 + 1) + quarterText + '</div><div class="scedule-item-holiday">' + holiday + '</div></div>';
            }
        }
        createProjects();
    }

    function createProjects() {
        for (let i = 0; i < planningData.periods.length; i++) {
            //let startWeek = document.getElementById("syid-" + planningData.periods[i].schoolYearId + "|w-" + planningData.periods[i].period[0]);
            //startWeek.innerHTML += '<div class="project project-width-'+planningData.periods[i].period.length+'">' + planningData.periods[i].note + '-'+planningData.periods[i].period.length+'</div>';
            ////week.innerHTML += '<div class="project">111</div>';  
            projects.push(<Project key={("id"+counter)}></Project>);   
            counter++;  
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


    return (
        <div>
            <div>Planning</div>
            <div>{weeks}</div>
            <div>{projects}</div>
        </div>
    );
}

export default Planning;

