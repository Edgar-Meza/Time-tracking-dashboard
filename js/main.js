function getAll(){
    fetch(window.location.href+'data.json')
    .then(res=>res.json())
    .then(data => console.log(data));
}
getAll();