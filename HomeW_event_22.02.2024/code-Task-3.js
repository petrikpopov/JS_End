const trafficLight = document.getElementById('traffic-light');
const changeButton = document.getElementById('change-button');

const lights = ['red', 'yellow', 'green'];
let currentLightIndex = 0;

changeButton.addEventListener('click', function() {
    const currentLight = lights[currentLightIndex];
    trafficLight.querySelector(`.${currentLight}`).style.backgroundColor = 'gray';
    currentLightIndex = (currentLightIndex + 1) % lights.length;
    const nextLight = lights[currentLightIndex];
    trafficLight.querySelector(`.${nextLight}`).style.backgroundColor = nextLight;
});
