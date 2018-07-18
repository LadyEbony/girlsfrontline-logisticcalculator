var logisticChapters = [true, true, true, true, true, true, true, false, false, false, false]; 
var logisticMissionList = []
var logisticMissionListParsed = []
var logisticMissionCombinations = []

var logisticMissionsMaxResources = []

var weightInputs = []

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
	document.getElementById('WInput').cells[0].addEventListener('click', parseLogisticMissionList)
	weightInputs.push(document.getElementById('ManpowerInput'));
	weightInputs.push(document.getElementById('AmmoInput'));
	weightInputs.push(document.getElementById('RationInput'));
	weightInputs.push(document.getElementById('PartsInput'));
	weightInputs.push(document.getElementById('TotalResourcesInput'));
	weightInputs.push(document.getElementById('TDollInput'));
	weightInputs.push(document.getElementById('EquipmentInput'));
	weightInputs.push(document.getElementById('QuickProductionInput'));
	weightInputs.push(document.getElementById('QuickRepairInput'));
	weightInputs.push(document.getElementById('TokenInput'));
	
	// Create
	createLogisticMissionList();
	createLogisticMissionCombination();
	
	// Parse
	parseLogisticMissionList();
}

// Logistic Chapters Selection (->html)
function createLogisticChapterElement(mainRow, logisticID){
	var td = document.createElement('td');
	
	// Set div and its attributes
	var but = document.createElement('button');
	if (logisticChapters[logisticID])
		but.className = 'button logisticButton';
	else
		but.className = 'button logisticButton logisticButtonDisabled';
	but.textContent = parseLogisticID(logisticID);
	but.addEventListener('click', onLogisticChapterClick);
	
	td.appendChild(but);
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

// Logistic Mission and Parser (internal)
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

function parseLogisticMissionList(){
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
	
	console.log(logisticMissionListParsed);
	
	getCombinations(4);
	getLogisticMissionMaxResources();
	sortLogisticMissionCombinations(createWeights());
	fillLogisticMissionCombinations(document.getElementById('CTable'), 10);
}

function parseSingleLogisticM(logMission){
	return {id: logMission.id, resources: logMission.resources.map(function(data) {return data / logMission.time})}
}

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

function sumofArrays(data){
	
	array = Array(data[0].length).fill(0);
	for(var i = 0; i < data.length; i++){
		for (var j = 0; j < data[i].length; j++){
			array[j] += data[i][j];
		}
	}
	return array;
}

// Logistic Mission Combinations (->html)
function createLogisticMissionCombination(){
	var table = document.getElementById('CTable');
	for(var i = 0; i < 10; i++){
		createLogisticMissionCombinationRow(table);
	}
}

function createLogisticMissionCombinationRow(table){
	var tr = document.createElement('tr');
	createLogisticMissionCombinationColumn(tr);
	for (var i = 0; i < 10; i++)
		createLogisticMissionCombinationColumn(tr);
	table.appendChild(tr);
}

function createLogisticMissionCombinationColumn(row, data){
	var td = document.createElement('td');
	td.textContent = "";
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

// Sort
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

function getLogisticMissionMaxResources(){
	logisticMissionsMaxResources = []
	for(var i = 0; i < logisticMissionCombinations[0].resources.length; i++){
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

function sortLogisticMissionCombinations(weights){
	if (weights.length == 0)
		weights.push(createWeight(4, 1));
	
	logisticMissionCombinations.sort(function(a,b) {
		var value = 0;
		for(var i = 0; i < weights.length; i++){
			value += (b.resources[weights[i].index] - a.resources[weights[i].index])
					* weights[i].weight / logisticMissionsMaxResources[weights[i].index]
		}
		return value;
	})
}