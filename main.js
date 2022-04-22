let dataObject;
let app = document.getElementById('app');
fetch("data.json")
.then(data => data.text())
.then(text => createDataObject(text));

function createDataObject(text)
{
    dataObject=JSON.parse(text);
    dataObject.planning.curricula[0].scedule.map(createSceduleItem);
}

function createSceduleItem(item)
{
    app.innerHTML+='<div id="scedule-item'+item.id+'">'+item.id+'</div>';
    let itemElement = document.getElementById('scedule-item'+item.id);
    itemElement.classList.add('scedule-item');
    itemElement.classList.add('scedule-item-type'+item.typeId);
    itemElement.classList.add('scedule-item-width'+item.weeks.length);
}