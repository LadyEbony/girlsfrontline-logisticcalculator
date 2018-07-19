// Main Variables
var logisticChapters = [true, true, true, true, true, true, true, false, false, false, false]; 

const resourceLength = 10;
var combinationLength = 10;
var amountOfLogisitcMissions = 4;

var logisticMissionList = []
var logisticMissionListParsed = []
var logisticMissionCombinations = []
var logisticMissionsMaxResources = []

var weightInputs = []

// Speeds stuff
var previousLogChapters = []
var cTable = null;

window.onload = function(){
	// Create logistic Chapter toggle buttons
	var table = document.createElement('table');
	table.setAttribute('id', 'LogTable');
	var tr = document.createElement('tr');
	for (var i = 0; i < logisticChapters.length; i++){
		createLogisticChapterElement(tr, i);
	}
	table.appendChild(tr);
	document.getElementById('Logistic_Table').appendChild(table);
	
	// Get weight inputs
	var WInput = document.getElementById('WInput');
	WInput.cells[0].addEventListener('click', mainParser)
	weightInputs = WInput.getElementsByClassName('weightInput');
	
	// Get main table
	cTable = document.getElementById('CTable');
	
	// Create initial Mission List
	createLogisticMissionList();
	
	// Parse
	mainParser();
}

// Logistic Mission Combination Sorter (internal)
function mainParser(){
	// Create the list and combinations
	parseLogisticMissionListAndCombination();
	
	// Sort and create rows
	sortLogisticMissionCombinations(createWeights());
	refreshLogisticMissionCombinationTable(cTable, logisticMissionCombinations);
}

// Logistic Chapters Selection (->html)
function createLogisticChapterElement(mainRow, logisticID){
	var td = document.createElement('td');
	
	// Set div and its attributes
	var buttonElement = document.createElement('button');
	if (logisticChapters[logisticID])
		buttonElement.className = 'button logisticButton';
	else
		buttonElement.className = 'button logisticButton logisticButtonDisabled';
	buttonElement.textContent = parseLogisticID(logisticID);
	buttonElement.addEventListener('click', onLogisticChapterClick);
	
	td.appendChild(buttonElement);
	mainRow.appendChild(td);
}

function onLogisticChapterClick(){
	index = parseInt(this.textContent);
	if(logisticChapters[index])
		this.className = 'button logisticButton logisticButtonDisabled';
	else
		this.className = 'button logisticButton';
	logisticChapters[index] = !logisticChapters[index];
}

function parseLogisticID(ID){
	if (ID < 10)
		return '0' + ID;
	return ID;
}

// Logistic Mission Creation (internal)
function createLogisticMissionList(){
	// There is probably a much smarter method but give me a break
	logisticMissionList = []
	
	//												name, hour, mp, am, rt, pt, t-d, eup, qp, qr, tk
	// name, hour, manpower, ammo, rations, parts, t-doll, equipment, quick production, quick repair, token
	logisticMissionList.push(createSingleLogisticM('0-1', 50 / 60, 0, 145, 145, 0, 0, 0, 1, 1, 0))
	logisticMissionList.push(createSingleLogisticM('0-2', 3, 550, 0, 0, 350, 1, 0, 0, 0, 0))
	logisticMissionList.push(createSingleLogisticM('0-3', 12, 900, 900, 900, 250, 0, 1, 0, 1, 0))
	logisticMissionList.push(createSingleLogisticM('0-4', 24, 0, 1200, 800, 750, 0, 0, 0, 0, 1))

	logisticMissionList.push(createSingleLogisticM('1-1', 0.25, 10, 30, 15, 0, 0, 0, 0, 0, 0))
	logisticMissionList.push(createSingleLogisticM('1-2', 0.5, 0, 40, 60, 0, 0, 0, 0, 0, 0))
	logisticMissionList.push(createSingleLogisticM('1-3', 1, 30, 0, 30, 10, 0, 0, 0, 1, 0))
	logisticMissionList.push(createSingleLogisticM('1-4', 2, 160, 160, 0 ,0, 1, 0, 0, 0, 0))
	
	logisticMissionList.push(createSingleLogisticM('2-1', 40 / 60, 100, 0, 0, 30, 0, 0, 0, 0, 0))
	logisticMissionList.push(createSingleLogisticM('2-2', 1.5, 60, 200, 80, 0, 0, 0, 0, 1, 0))
	logisticMissionList.push(createSingleLogisticM('2-3', 4, 10, 10, 10, 230, 0, 0, 1, 1, 0))
	logisticMissionList.push(createSingleLogisticM('2-4', 6, 0, 250, 600 ,60, 1, 0, 0, 0, 0))
	
	logisticMissionList.push(createSingleLogisticM('3-1', 20 / 60, 50, 0, 75, 0, 0, 0, 0, 0, 0))
	logisticMissionList.push(createSingleLogisticM('3-2', 0.75, 0, 120, 70, 30, 0, 0, 0, 0, 0))
	logisticMissionList.push(createSingleLogisticM('3-3', 1.5, 0, 300, 0, 0, 0, 0, 1, 1, 0))
	logisticMissionList.push(createSingleLogisticM('3-4', 5, 0, 0, 300 ,300, 1, 1, 0, 0, 0))
	
	logisticMissionList.push(createSingleLogisticM('4-1', 1, 0, 185, 185, 0, 0, 1, 0, 0, 0))
	logisticMissionList.push(createSingleLogisticM('4-2', 2, 0, 0, 0, 210, 0, 0, 1, 0, 0))
	logisticMissionList.push(createSingleLogisticM('4-3', 6, 800, 550, 0, 0, 1, 0, 0, 1, 0))
	logisticMissionList.push(createSingleLogisticM('4-4', 8, 400, 400, 400, 150, 0, 0, 1, 0, 0))
	
	logisticMissionList.push(createSingleLogisticM('5-1', 0.5, 0, 0, 100, 45, 0, 0, 0, 0, 0))
	logisticMissionList.push(createSingleLogisticM('5-2', 2.5, 0, 600, 300, 0, 0, 0, 0, 1, 0))
	logisticMissionList.push(createSingleLogisticM('5-3', 4, 800, 400, 400, 0, 0, 1, 0, 0, 0))
	logisticMissionList.push(createSingleLogisticM('5-4', 7, 100, 0, 0, 700, 1, 0, 0, 0, 0))
	
	logisticMissionList.push(createSingleLogisticM('6-1', 2, 300, 300, 0, 100, 0, 0, 0, 0, 0))
	logisticMissionList.push(createSingleLogisticM('6-2', 3, 0, 200, 550, 100, 0, 0, 1, 1, 0))
	logisticMissionList.push(createSingleLogisticM('6-3', 5, 0, 0, 200, 500, 0, 1, 0, 0, 0))
	logisticMissionList.push(createSingleLogisticM('6-4', 12, 800, 800, 800, 0, 0, 0, 0, 0, 1))
	
	//console.log(logisticMissionList);
}

function createSingleLogisticM(id, time, manpower, ammo, ration, parts, 
								tdoll, equipment, quickproduction, quickrepair, token){
	return {id: id, time: time, resources: [manpower, ammo, ration, parts, manpower + ammo + ration + parts,
			tdoll, equipment, quickproduction, quickrepair, token]}
}

// Logistic Mission Parser (internal)
function parseLogisticMissionListAndCombination(){
	// Check if Log Chapter Sequence hasn't changed
	// If not, no need to change combination
	if (previousLogChapters.length == logisticChapters.length){
		var isEqual = true;
		for(var p = 0; p < logisticChapters.length; p++){
			if (previousLogChapters[p] ^ logisticChapters[p]){
				isEqual = false;
				break;
			}
		}
		if (isEqual)
			return;
	}
	previousLogChapters = logisticChapters.slice(0);
	
	// Create new Parsed List
	logisticMissionListParsed = []
	for(var i = 0; i < logisticChapters.length; i++){
		if (logisticChapters[i]){
			if (logisticMissionList[i * 4] == undefined)
				break;
			
			for (var j = 0; j < 4; j++){	
				logisticMissionListParsed.push(parseSingleLogisticM(logisticMissionList[(i * 4) + j]));
			}
		}
	}
	
	// Create new combinations and max resources lists
	getCombinations(amountOfLogisitcMissions);
	getLogisticMissionMaxResources();
}

function parseSingleLogisticM(logMission){
	return {id: logMission.id, resources: logMission.resources.map(function(data) {return data / logMission.time})}
}

// Create combinations
function getCombinations(){
	logisticMissionCombinations = []
	combinationUntil(logisticMissionListParsed, 4, logisticMissionListParsed.length, logisticMissionCombinations, 0, [], 0)
}

function combinationUntil(array, r, n, cArray, index, data, i){
	if (index == r){
		cArray.push(createCombination(data));
		return;
	}
	
	if (i >= n)
        return;
	
	data[index] = array[i];
	combinationUntil(array, r, n, cArray, index + 1, data, i + 1);
	combinationUntil(array, r, n, cArray, index, data, i + 1);
}

function createCombination(data){
	return {combination: data.map(function(dat) {return dat.id}).join(', ')
			, resources: sumofArrays(data.map(function (dat) {return dat.resources}))}
}

// Add combination's values into one 
function sumofArrays(data){
	array = Array(resourceLength).fill(0);
	for(var i = 0; i < data.length; i++){
		for (var j = 0; j < data[i].length; j++){
			array[j] += data[i][j];
		}
	}
	return array;
}

// Get max resources for sort
function getLogisticMissionMaxResources(){
	logisticMissionsMaxResources = []
	for(var i = 0; i < resourceLength; i++){
		logisticMissionsMaxResources.push(-Infinity);
	}
	
	var len = logisticMissionCombinations.length;
	while (len--){
		for(var i = 0; i < logisticMissionsMaxResources.length; i++){
			if (logisticMissionCombinations[len].resources[i] > logisticMissionsMaxResources[i]){
				logisticMissionsMaxResources[i] = logisticMissionCombinations[len].resources[i];
			}
		}
	}
}

// Logistic Mission Combinations (->html)
function refreshLogisticMissionCombinationTable(table, data){
	// Remove all rows
	while(table.rows.length > 2)
		table.removeChild(table.rows[2]);
	
	// Create new rows
	for(var i = 0; i < combinationLength && i < data.length; i++){
		createLogisticMissionCombinationRow(table, data[i]);
	}
}

function createLogisticMissionCombinationRow(table, data){
	var tr = document.createElement('tr');
	createLogisticMissionCombinationColumn(tr, data.combination);
	for (var i = 0; i < data.resources.length; i++)
		createLogisticMissionCombinationColumn(tr, data.resources[i]);
	table.appendChild(tr);
}

function createLogisticMissionCombinationColumn(row, data){
	var td = document.createElement('td');
	if (isNaN(data))
		td.textContent = data;
	else
		td.textContent = parseData(parseFloat(data));
	row.appendChild(td);
}

function parseData(data){
	if (data >= 100)
		return data.toFixed(0);
	return parseFloat(data.toPrecision(3));
}

function fillLogisticMissionCombinations(table, combinationLength){
	for (var r = 0; r < combinationLength; r++){
		table.rows[r + 2].cells[0].innerHTML = logisticMissionCombinations[r].combination;
		for (c = 0; c < logisticMissionCombinations[r].resources.length; c++){
			table.rows[r + 2].cells[c + 1].innerHTML = parseData(logisticMissionCombinations[r].resources[c]);
		}
	}
}

// Sort (internal)
function sortLogisticMissionCombinations(weights){
	logisticMissionCombinations.sort(function(a,b) {
		var value = 0;
		for(var i = 0; i < weights.length; i++){
			value += (b.resources[weights[i].index] - a.resources[weights[i].index])
					* weights[i].weight / logisticMissionsMaxResources[weights[i].index]
		}
		if (value == 0)
			return b.resources[4] - a.resources[4];
		
		return value;
	})
}

// Weights = [ [resourceIndex, weight] ]
function createWeights(){
	weights = []
	
	for(var i = 0; i < weightInputs.length; i++){
		var value = parseInt(weightInputs[i].value);
		if (value != 0 && !isNaN(value)){
			weights.push(createWeight(i, value));
		}			
	}
	
	return weights;
}

function createWeight(index, weight){
	return {index: index, weight: weight}
}

