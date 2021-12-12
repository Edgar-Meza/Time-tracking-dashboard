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
            var item_title_s = item_title.replace(" ", "-");
            container.innerHTML = container.innerHTML+'<section class="card-stat '+class_element+'"><div class="info-card"><div class="title-card"><h2 id="title-'+item_title_s+'"></h2><img src="images/icon-ellipsis.svg" alt="puntos" onclick="getIndividual(\''+item_title+'\')"><div class="individual" id="unique-'+item_title+'"><span onclick="getUnique(\''+item_title+'\', \'daily\')">daily</span><span onclick="getUnique(\''+item_title+'\', \'weekly\')">weekly</span><span onclick="getUnique(\''+item_title+'\', \'monthly\')">monthly</span></div></div><span class="actual" id="actual-'+item_title_s+'"></span><span class="pasado" id="pasado-'+item_title_s+'"></span></div></section>';
        }
        for (var item in data) {
            var tit, act, pas;
            var item_title = data[item].title;
            var item_title_s = item_title.replace(" ", "-");
            tit = document.getElementById('title-'+item_title_s);
            act = document.getElementById('actual-'+item_title_s);
            pas = document.getElementById('pasado-'+item_title_s);
            tit.innerHTML = data[item].title;
            act.innerHTML = data[item].timeframes.daily.current+'hrs';
            pas.innerHTML = 'Last day - '+data[item].timeframes.daily.previous+'hrs';
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
            var tit, act, pas, tim;
            if (time == 'daily') {
                tim = 'day';
            } else if (time == 'weekly') {
                tim = 'week';
            } else {
                tim = 'month';
            }
            var item_title = data[item].title;
            var item_title_s = item_title.replace(" ", "-");
            tit = document.getElementById('title-'+item_title_s);
            act = document.getElementById('actual-'+item_title_s);
            pas = document.getElementById('pasado-'+item_title_s);
            tit.innerHTML = data[item].title;
            act.innerHTML = data[item].timeframes[time].current+'hrs';
            pas.innerHTML = 'Last '+tim+' - '+data[item].timeframes[time].previous+'hrs';
        }
    });
}

function getIndividual(option) {
    if(document.getElementById('unique-'+option).style.opacity == '0') {
        document.getElementById('unique-'+option).style.opacity = '1';
    } else {
        document.getElementById('unique-'+option).style.opacity = '0';
    }
}

function getUnique(element, time) {
    fetch(window.location.href+'data.json')
    .then(res=>res.json())
    .then(data => {
        for (var item in data) {
            var tit, act, pas, tim;
            if (time == 'daily') {
                tim = 'day';
            } else if (time == 'weekly') {
                tim = 'week';
            } else {
                tim = 'month';
            }
            if (data[item].title == element) {
                var item_title = data[item].title;
                var item_title_s = item_title.replace(" ", "-");
                tit = document.getElementById('title-'+item_title_s);
                act = document.getElementById('actual-'+item_title_s);
                pas = document.getElementById('pasado-'+item_title_s);
                tit.innerHTML = data[item].title;
                act.innerHTML = data[item].timeframes[time].current+'hrs';
                pas.innerHTML = 'Last '+tim+' - '+data[item].timeframes[time].previous+'hrs';
            }
        }
    });
    document.getElementById('unique-'+element).style.opacity = '0';
}