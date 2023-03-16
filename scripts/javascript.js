
var foxArray = [];
var storedBG = [];
var t = 0;


//fetches data and saves it to global variable foxArray
async function getApi(url) {
	const response = await fetch(url);
	var data = await response.json();
	//console.log(data);
	console.log('foxes fetched');
	return data;
}

function delTable() {
	const del = document.getElementById('GeneratedTable-' + (t))
	del.remove();
}



function mainButton(){

changeButton();
genTable();
}

function hideTab() {
	document.getElementById("table-section").classList.toggle("fade");
}


function changeButton() {
	const getButton = document.getElementById("switch-button")
	const getTabSection = document.getElementById("table-section");
	
	getTabSection.classList.toggle("fade");
	getButton.setAttribute("onClick","hideTab()");
	getButton.innerHTML="<span>Toggle Table</span><span>Hide/Reshow the Foxes</span>" 
	//document.getElementById("switch-button").setAttribute("onClick","refreshJSON()"); commented until bugfix comes out
}

function mainTables() {
	
	setTimeout(genTable('data/table-0.json','showFoxes'), 5);
	//setTimeout(t++, 10);
	setTimeout(genTable('data/table-1.json', 'showPlanets'), 15);
	
}


async function genTable(url, tableElementId) {
	//let data = null;
	var data = await getApi(url);
	foxArray = data;
	//console.log(data);
	console.log('data written');
	printTable(tableElementId);
}


//Print the saved array, debugging function
function printJSON() {
	console.log(foxArray.length);
}

var col = [];

//The function responsible for building the table and appending it to the empty HTML element tha receives it
function printTable(tableElementId) {
	var length = foxArray.length;
	var headerLength = --length;
	
	//get data out of foxArray for table header
	for (let i = 0; i < length; i++) {
		for (let key in foxArray[(i + headerLength)]) {
		col.push(key);
		console.log(key);
		}	
	}
	
	//console.log(col);
	const createTable = document.createElement('table');
	createTable.setAttribute('id', 'GeneratedTable-'+ t);

	const tr = createTable.insertRow(-1);

	//Build the header for the table with common name, scientific name, and thumbnail
	console.log('creating table')
	for (let i = 0; i < col.length; i++) {
		let th = document.createElement("th");
		th.innerHTML = col[i];
		tr.appendChild(th);
		}
	

	//add the data from the JSON file as rows to the table being built
	var rowLength = ++length;
	for (let a = 0; a < rowLength; a++) {
			let tr = createTable.insertRow(-1);
			
			for (let j = 0; j < (col.length - 1); j++) {
				let tabCell = tr.insertCell(-1)
				tabCell.innerHTML = foxArray[a][col[j]];
			}
		}

	//thumbnail column handler	
	setTimeout(() => {
		for (let b = 0; b < rowLength; b++) {
			let genTable = document.getElementById('GeneratedTable-' + t);
			let newImg = document.createElement('img');
			let newButton = document.createElement('button');
			
			
			//Create image element to be appended later
			console.log(rowLength);
			newImg.src=foxArray[b]['thumbnail'];
			newImg.setAttribute('id', ('fox-image-' + b));
			newImg.setAttribute('class', 'fox-thumbs');
			console.log(foxArray[b]['thumbnail']);
			
			newButton.setAttribute('id', ('fox-button-' + b));
			newButton.setAttribute('class', 'fox-buttons');
			
			//append images to buttons, delay is added becuse otherwise we get null
			setTimeout( () => {
			document.getElementById('fox-button-' + b).appendChild(newImg);
			//document.getElementById('fox-button-' + b).setAttribute("onClick",`console.log('Button ' + ${b} + ' pressed')`);
			document.getElementById('fox-button-' + b).setAttribute("onClick",`changeBG(${b})`);
			}, '10')
			
			//Generate empty cell with id and class 
			let tabCell = genTable.rows[(1+b)].insertCell(-1);
			tabCell.setAttribute('id', ('fox-thumb-td-' + b));
			tabCell.setAttribute('class', 'fox-thumbs-wrapper');
				
			//append buttons to each new cell element
			document.getElementById('fox-thumb-td-' + b).appendChild(newButton);		
		}
	}, '10')
	//console.log(foxArray[1]['thumbnail']);

	//Actually put the newly-created table into a container elemtn
	const divShowFoxes = document.getElementById(tableElementId);
	divShowFoxes.innerHTML = "";
	divShowFoxes.appendChild(createTable);
	
	setTimeout( () => {
			t++;
			col = [];
			}, '10')
	
	getBG();
}

//Saves backgrounds image data from foxArray to variable for use by user
function getBG() {
	for (i = 0; i < foxArray.length; i++) {
			//console.log("storedBG " + foxArray[i]['thumbnail']);			
			storedBG[i] = foxArray[i]['thumbnail'];
	}
}

//smooth switch handler. Integrates with CSS to create fade-in effect on background change
var bgSwitch = 1;
function changeBG(foxBG) {
	
	const pageBody = document.getElementById('page-body');
	
	if (bgSwitch) {
		pageBody.setAttribute('class', 'bg-switch');
		pageBody.style.backgroundImage = `url(${storedBG[foxBG]})`;
		console.log(`url(${storedBG[foxBG]})`);
		pageBody.classList.add('class', ('bg-' + foxBG));
		bgSwitch--;
	} else {
		document.getElementsByClassName('bg-switch')[0].style.backgroundImage = `url(${storedBG[foxBG]})`;
		pageBody.setAttribute('class', ('bg-' + foxBG));
		console.log(storedBG);
		//document.getElementsByClassName('bg-switch').style.backgroundImage = `url(${storedBG[foxBG]})`;
		bgSwitch++;
	}
}