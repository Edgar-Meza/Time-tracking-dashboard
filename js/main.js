function getAll(){
    fetch(window.location.href+'data.json')
    .then(res=>res.json())
    .then(data => {
        var container = document.getElementById('container');
        container.innerHTML = '<section class="card-user"><div class="head-user-card"><img src="images/image-jeremy.png" alt="people"><div class="data-user"> <span>Report for</span><h1>Jeremy Robson</h1></div></div><div class="range"><span class="active" onclick="getByTime(\'daily\')" id="daily">Daily</span><span onclick="getByTime(\'weekly\')" id="weekly">Weekly</span><span onclick="getByTime(\'monthly\')" id="monthly">Monthly</span></div></section>';
        for (var n_element in data) {
            var classelement = data[n_element].title;
            var class_element = classelement.toLowerCase().replace(" ","-");
            var item_title = data[n_element].title;
            container.innerHTML = container.innerHTML+'<section class="card-stat '+class_element+'"><div class="info-card"><div class="title-card"><h2 id="title-'+item_title+'"></h2><img src="images/icon-ellipsis.svg" alt="puntos"></div><span class="actual" id="actual-'+item_title+'"></span><span class="pasado" id="pasado-'+item_title+'"></span></div></section>';
        }
        for (var item in data) {
            var tit, act, pas;
            tit = document.getElementById('title-'+data[item].title);
            act = document.getElementById('actual-'+data[item].title);
            pas = document.getElementById('pasado-'+data[item].title);
            tit.innerHTML = data[item].title;
            act.innerHTML = data[item].timeframes.daily.current+'hrs';
            pas.innerHTML = 'Last Week - '+data[item].timeframes.daily.previous+'hrs';
        }
    });
}
getAll();

function getByTime(time) {
    var ranges = ["daily", "weekly", "monthly"];
    for (var i=0; i<ranges.length; i++) {
        document.getElementById(ranges[i]).classList.remove('active');
    }
    document.getElementById(time).classList.add('active');
    fetch(window.location.href+'data.json')
    .then(res=>res.json())
    .then(data => {
        for (var item in data) {
            var tit, act, pas;
            tit = document.getElementById('title-'+data[item].title);
            act = document.getElementById('actual-'+data[item].title);
            pas = document.getElementById('pasado-'+data[item].title);
            tit.innerHTML = data[item].title;
            act.innerHTML = data[item].timeframes[time].current+'hrs';
            pas.innerHTML = 'Last Week - '+data[item].timeframes[time].previous+'hrs';
        }
    });
}