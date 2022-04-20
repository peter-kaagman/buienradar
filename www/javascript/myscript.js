var WeerData;

// De window.onload wordt gebruikt om Javascript uit te voeren NADAT de pagina geladen is
window.onload = (event) =>{
	// Er wordt een HTTP request gemaakt voor buienradar dat
  var oReq = new XMLHttpRequest();
	// getData is een functie die aangeroepen wordt zodra de request klaar is
  oReq.addEventListener("load", getData);
  oReq.open("GET", "https://data.buienradar.nl/2.0/feed/json");
  oReq.send();
}	

function getData () {
	if(this.readyState == 4){
		// Data opslaan in een globale variable
	  WeerData = JSON.parse(this.response);
		// Console.log wordt her en der gebruikt om informatie te tonen in de de devellopers console
		// vaak tijdelijk en worden ze weer uit gecomment. Dit is een alternatief voor de alert() methode
		// om de waarde van variablen te tonen. De develloper console open je meestal met F12 in de browser.
		console.log(WeerData);
		// Data is binnen, nu kunnen we iets laten zien
		// Dit doe ik door diverse functies daarvoor aan te roepen.
		showIntro();
		showWeerbericht();
		showVerwachting();
		//showVijfDaagse();
// Voeg een eventlistener toe voor de toggle knop
const buttons = document.querySelectorAll(".collapse_button");
for (let i = 0; i < buttons.length; i++){
  buttons[i].addEventListener( "click", function(event) {
		var target_name = event.target.attributes.target.value;
		var target = document.querySelector("#"+target_name);
		if (target.classList.contains("collapsed")){
			// collapsed dus un-collapse
			// Eerst alles collapsen
			var containers = document.querySelectorAll(".collapse");
			console.log(containers)
			containers.forEach(container =>{
				container.classList.add("collapsed");
			});
			// Dan het target un-collapsen
			target.classList.remove("collapsed");
		}else{
			// niet collapsed dus collapse
			target.classList.add("collapsed");
		}
	});
}
	}
}

function showIntro() {
	//Intro
	//Vul de voorbereide SPANs met relevante data
	document.getElementById('sun_up').innerHTML    = WeerData.actual.sunrise;
	document.getElementById('sun_down').innerHTML  = WeerData.actual.sunset;
	document.getElementById('copyright').innerHTML = WeerData.buienradar.copyright;
}

function showWeerbericht(){
	//Weerbericht
	//Vul de voorbereide SPANs met relevante data
	document.getElementById('weerbericht_timestamp').innerHTML = WeerData.forecast.weatherreport.published;
	document.getElementById('weerbericht_author').innerHTML    = WeerData.forecast.weatherreport.author;
	document.getElementById('weerbericht_header').innerHTML    = WeerData.forecast.weatherreport.title;
	document.getElementById('weerbericht_inhoud').innerHTML    = WeerData.forecast.weatherreport.text;
}
function showVerwachting(){
	//De te tonen verwachting is afhankelijk van de keuze gemaakt de select 
	var keuze = document.getElementById("verwachting_periode").value;
	//Bereid een var voor met de keuze
	var data = WeerData.forecast[keuze];
	//console.log("Data");
	//console.log(data);
	//Vul de voorbereide SPANs in met relevante data aan de hand van de keuze gemaakt in de SELECT
	document.getElementById('verwachting_start').innerHTML  = data.startdate;
	document.getElementById('verwachting_einde').innerHTML  = data.enddate;
	document.getElementById('verwachting_inhoud').innerHTML = data.forecast;
}


