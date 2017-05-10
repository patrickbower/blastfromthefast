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
  let speedCovert = position.coords.speed * 2.2369;
  let speed = Math.round(speedCovert * 100) / 100;
  speedReadOut.innerHTML = speed ? speed + 'mph' : 'fetching';
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
  let speedType = returnSpeedType(topSpeed);

  speedReadOut.innerHTML = 'top speed ' +  topSpeed + 'mph' +
                            '<br/>' +
                            speedType;
}

function calcTopSpeed(speed) {
  if (speed > topSpeed) topSpeed = speed;
}

function returnSpeedType(topSpeed) {
  var x = topSpeed;
  switch (true) {
    case (x < 1):
        return 'what the hell happened out there?';
        break;
    case (x < 2):
        return 'Yo, that was slow bro';
        break;
    case (x < 4):
        return 'you were steady Eddy';
        break;
    case (x < 8):
        return 'you were fast as lightning';
        break;
    default:
        return 'what the hell happened out there?'
        break;
  }
}

document.getElementById('button-start').addEventListener('click', function(event){
  event.target.classList.add('hidden');
  getLocation();
})
