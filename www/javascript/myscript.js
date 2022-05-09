var WeerData;

// De window.onload wordt gebruikt om Javascript uit te voeren NADAT de pagina geladen is
window.onload = (event) =>{
	// Er wordt een HTTP request gemaakt voor buienradar data
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
		showVijfDaagse();
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

function showVijfDaagse(){
	//Bereid een var voor met de vijfdaagse data (puur voor het gemak)
	var data = WeerData.forecast.fivedayforecast;
	//Loop door deze data heen (de vijf dagen)
	for (i = 0; i < data.length; i++){
		document.getElementById('h'+i).innerHTML = data[i].day;
		document.getElementById('d'+i).innerHTML = data[i].weatherdescription;
		document.getElementById('tm'+i).innerHTML = data[i].mintemperature;
		document.getElementById('tM'+i).innerHTML = data[i].maxtemperature;
		document.getElementById('rm'+i).innerHTML = data[i].mmRainMin;
		document.getElementById('rM'+i).innerHTML = data[i].mmRainMax;
		document.getElementById('rC'+i).innerHTML = data[i].rainChance;
		document.getElementById('zC'+i).innerHTML = data[i].sunChance;
		document.getElementById('w'+i).innerHTML = data[i].wind;
		document.getElementById('wR'+i).innerHTML = data[i].windDirection;
	}
}
