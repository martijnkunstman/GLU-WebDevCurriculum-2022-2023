let dataObject;
let year = 0;
let app = document.getElementById('app');
fetch("data.json")
    .then(data => data.text())
    .then(text => createDataObject(text));

function createDataObject(text) {
    dataObject = JSON.parse(text);
    app.innerHTML += '<div id="title">Cohort ' + dataObject.planning.curricula[0].cohort.join("-") + '</div>';
    dataObject.planning.curricula[0].scedule.map(createSceduleItem);
}

function createSceduleItem(item) {
    if (item.year != year) {
        year++;
        app.innerHTML += '<div id="subtitle">Leerjaar ' + (dataObject.planning.curricula[0].cohort[0] + (year - 1)) + '</div>';
    }
    app.innerHTML += '<div id="scedule-item' + item.id + '"></div>';
    let itemElement = document.getElementById('scedule-item' + item.id);
    itemElement.classList.add('scedule-item');
    itemElement.classList.add('scedule-item-type' + item.typeId);
    itemElement.classList.add('scedule-item-width' + item.weeks.length);
    itemElement.innerHTML += '<div class="scedule-item-title">' + item.note + '</div>'
    itemElement.innerHTML += '<div class="scedule-item-weeks">' + (item.weeks.length > 1 ? 'weken' : 'week') + ' ' + item.weeks.join(",") + '</div>'
    if (item.typeId == 1) {
        itemElement.innerHTML += '<div class="scedule-item-tech"></div>';
    }
}

function createProjectItem(item) {

}