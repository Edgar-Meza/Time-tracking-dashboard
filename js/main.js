function getAll(){
    fetch(window.location.href+'data.json')
    .then(res=>res.json())
    .then(data => {
        var container = document.getElementById('container');
        for (var item in data) {
            console.log(data[item]);
            var classelement = data[item].title;
            var class_element = classelement.toLowerCase().replace(" ","-");
            var current = data[item].timeframes.daily.current;
            var previous = data[item].timeframes.daily.previous;
            var element = '<section class="card-stat '+class_element+'"><div class="info-card"><div class="title-card"><h2>'+data[item].title+'</h2><img src="images/icon-ellipsis.svg" alt="puntos"></div><span class="actual">'+current+'hrs</span><span class="pasado">Last Week - '+previous+'hrs</span></div></section>';
            container.innerHTML = container.innerHTML+element;
        }
    });
}
getAll();

function getByTime(time) {
    var container = document.getElementById('container');
    container.innerHTML = '<section class="card-user"><div class="head-user-card"><img src="images/image-jeremy.png" alt="people"><div class="data-user"> <span>Report for</span><h1>Jeremy Robson</h1></div></div><div class="range"><span onclick="getByTime(\'daily\')">Daily</span><span onclick="getByTime(\'weekly\')">Weekly</span><span onclick="getByTime(\'monthly\')">Monthly</span></div></section>';
    fetch(window.location.href+'data.json')
    .then(res=>res.json())
    .then(data => {
        var container = document.getElementById('container');
        for (var item in data) {
            console.log(data[item]);
            var classelement = data[item].title;
            var class_element = classelement.toLowerCase().replace(" ","-");
            var current = data[item].timeframes[time].current;
            var previous = data[item].timeframes[time].previous;
            var element = '<section class="card-stat '+class_element+'"><div class="info-card"><div class="title-card"><h2>'+data[item].title+'</h2><img src="images/icon-ellipsis.svg" alt="puntos"></div><span class="actual">'+current+'hrs</span><span class="pasado">Last Week - '+previous+'hrs</span></div></section>';
            container.innerHTML = container.innerHTML+element;
        }
    });
}