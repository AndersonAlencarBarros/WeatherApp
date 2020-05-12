window.addEventListener("load", ()=> {
	const temperatureDescription = document.querySelector(".temperature-description"); 
	const temperatureDegree = document.querySelector(".temperature-degree"); 
	const locationTimezone = document.querySelector(".location-timezone"); 
	const degreeSection = document.querySelector(".degree-section");
	const temperatureSpan = document.querySelector(".degree-section span");

	if (navigator.geolocation) {
		// Apenas funciona em https
		// navigator.geolocation.getCurrentPosition(position => {
		// 	long = position.coords.longitude;
		// 	lat = position.coords.latitude;
		// });	
		
		// A definição do link da API deveria ser definida quando obter a localização
		const api = "http://api.openweathermap.org/data/2.5/weather?q=santa+maria+da+boa+vista&units=metric&lang=pt_br&appid=da44eac59949dfcc8bc76b59055a9b2b"
		fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
				// Da API para a DOM
				updateDomWithApiData(data);
				// Definir Icone
				changeIcon();
				// Celcius para Farenheit e vice-versa
				convertCelcioustoFarenheit(data);
			})		
	}

function updateDomWithApiData(data) {
	console.log(data);
	const {temp} = data.main;
	const {description} = data.weather[0];
	temperatureDegree.textContent = temp;
	temperatureDescription.textContent = description;
	locationTimezone.textContent = data.name;
}

function changeIcon() {
	// Não foi possível alterar o ícone dependendo da condição do tempo
	// Para fazer isso basta relacionar cada código do "icon" da API
	// com cada condição do tempo do Skycons
	const skycons = new Skycons({"color": "white"});
	skycons.play();
	skycons.set(document.querySelector(".icon"), Skycons.PARTLY_CLOUDY_NIGHT);
}

function convertCelcioustoFarenheit(data) {
	const {temp} = data.main;
	let farenheit = (temp * 9/5) + 32;
	degreeSection.addEventListener("click", () => {
		if (temperatureSpan.textContent === "ºC") {
			temperatureDegree.textContent = Math.floor(farenheit).toFixed(2);
			temperatureSpan.textContent = "ºF";
		} else {
			temperatureDegree.textContent = temp;
			temperatureSpan.textContent = "ºC";
		}

	});
}
	
});