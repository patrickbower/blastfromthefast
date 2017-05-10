let watchId = null;
let topSpeed = 0;
let speedReadOut = document.getElementById("speed");
let longReadOut = document.getElementById("long");
let latReadOut = document.getElementById("lat");
let positionOptions = {
   enableHighAccuracy: true,
   timeout: 100,
   maximumAge: 30000
};

function getLocation() {
  watchId = navigator.geolocation.watchPosition(success, error, positionOptions);
  setTimeout(() => {
    stop();
  }, 30000);
}

function success(position) {
  let speed = Math.round(position.coords.speed * 100) / 100;
  speedReadOut.innerHTML = speed ? (speed * 2.2369) + 'mph' : 'fetching';
  latReadOut.innerHTML = position.coords.latitude ? position.coords.latitude : 'fetching';
  longReadOut.innerHTML = position.coords.longitude ? position.coords.longitude : 'fetching';
  calcTopSpeed(speed);
}

function error(positionError) {
  console.error(positionError);
}

function stop() {
  console.log('stopped');
  navigator.geolocation.clearWatch(watchId);
  speedReadOut.innerHTML = 'top speed ' + (topSpeed * 2.2369) + 'mph';
}

function calcTopSpeed(speed) {
  if (speed > topSpeed) topSpeed = speed;
}

document.getElementById('button-start').addEventListener('click', function(event){
  event.target.classList.add('hidden');
  getLocation();
})
