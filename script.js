const goldHTML = document.getElementById("goldHTML");
const woodHTML = document.getElementById("woodHTML");
const foodHTML = document.getElementById("foodHTML");
const populationHTML = document.getElementById("populationHTML");
const defenseHTML = document.getElementById("defenseHTML");
const attackHTML = document.getElementById("attackHTML");
const buildTower1 = document.getElementById("buildTower1");
const buildLumberMill = document.getElementById("buildLumberMill");
const buildTower2 = document.getElementById("buildTower2");
const buildMill = document.getElementById("buildMill");
const buildTower3 = document.getElementById("buildTower3");
const buildTower4 = document.getElementById("buildTower4");
const buildTownHall = document.getElementById("buildTownHall");
const trainTroopsBtn = document.getElementById("trainTroopsBtn");
const buildCastle = document.getElementById("buildCastle");
const upgradeLumberMillBtn = document.getElementById("upgradeLumberMillBtn");
const upgradeMillBtn = document.getElementById("upgradeMillBtn");
const trainKnightsBtn = document.getElementById("trainKnightsBtn");
const upgradeTower1Btn = document.getElementById("upgradeTower1Btn");
const upgradeTower2Btn = document.getElementById("upgradeTower2Btn");
const upgradeTower3Btn = document.getElementById("upgradeTower3Btn");
const upgradeTower4Btn = document.getElementById("upgradeTower4Btn");
const attackPowerHTML = document.getElementById("attackPowerHTML");

let gold = 2000;
let wood = 1000;
let food = 1000;
let population = 100;
let defense = 0;
let isTower1 = false;
let isMill1 = false;
let isTower2 = false;
let isMill2 = false;
let isTower3 = false;
let isTower4 = false;
let isTownHall = false;
let isCastle = false;
let goldPerSec = population / 2;
let popPerSec = 0;
let woodPerSec = 0;
let foodPerSec = 0;
let incomingAttackStrength = 5;
let attackTime = 1;
let attackInterval = 60000;
let timeUntilNextAttack = attackInterval; // Time until next attack
let totalKnights = 0;
let costOfTroop = 50;
let costOfTroopFood = 10;
let costOfKnight = 150;
let defenseBonus = 0;
let resourceProtection = 0; // Initialize resourceProtection

function updateHTML() {
  document.querySelector("#goldHTML span").textContent = `Gold: ${Math.floor(
    gold
  )}`;
  document.querySelector("#woodHTML span").textContent = `Wood: ${Math.floor(
    wood
  )}`;
  document.querySelector("#foodHTML span").textContent = `Food: ${Math.floor(
    food
  )}`;
  document.querySelector(
    "#populationHTML span"
  ).textContent = `Population: ${Math.floor(population)}`;
  document.querySelector(
    "#defenseHTML span"
  ).textContent = `Troops: ${Math.floor(defense)}`;
  document.querySelector(
    "#attackHTML span"
  ).textContent = `Next attack in: ${Math.round(timeUntilNextAttack / 1000)}s`;
  document.querySelector(
    "#attackPowerHTML span"
  ).textContent = `Attack Power: ${Math.floor(totalKnights)}`;
}

function buildTower1Fc() {
  if (gold >= 100 && wood >= 50) {
    gold -= 100;
    wood -= 50;
    isTower1 = true;
    buildTower1.classList.add("d-none");
    upgradeTower1Btn.classList.remove("d-none");
    defenseBonus += 0.2;
    updateHTML();
  }
}

function upgradeTower1() {
  if (gold >= 100 && wood >= 50) {
    gold -= 100;
    wood -= 50;
    defenseBonus += 0.05; // Add 5% defense bonus per upgrade
    updateHTML();
  }
}

function buildTower2Fc() {
  if (gold >= 200 && wood >= 100) {
    gold -= 200;
    wood -= 100;
    isTower2 = true;
    costOfTroop *= 0.8; // Reduces the cost by 20%
    costOfTroopFood *= 0.8; // Reduces the cost by 20%
    buildTower2.classList.add("d-none");
    upgradeTower2Btn.classList.remove("d-none");
    updateHTML();
  }
}

function upgradeTower2() {
  if (gold >= 200 && wood >= 100) {
    gold -= 200;
    wood -= 100;
    costOfTroop *= 0.95; // Reduces the cost by 5%
    costOfTroopFood *= 0.95; // Reduces the cost by 5%
    updateHTML();
  }
}

function buildTower3Fc() {
  if (gold >= 300 && wood >= 150) {
    gold -= 300;
    wood -= 150;
    isTower3 = true;
    resourceProtection += 0.2; // Initial 20% resource protection
    buildTower3.classList.add("d-none");
    upgradeTower3Btn.classList.remove("d-none");
    updateHTML();
  }
}

function upgradeTower3() {
  if (gold >= 150 && wood >= 75) {
    gold -= 150;
    wood -= 75;
    resourceProtection += 0.05; // Additional 5% resource protection per upgrade
    updateHTML();
  }
}
function buildTower4Fc() {
  if (gold >= 400 && wood >= 200) {
    gold -= 400;
    wood -= 200;
    isTower4 = true;
    buildTower4.classList.add("d-none");
    upgradeTower4Btn.classList.remove("d-none");
    updateHTML();
  }
}

function upgradeTower4() {
  if (gold >= 400 && wood >= 200) {
    gold -= 400;
    wood -= 200;
    updateHTML();
  }
}

function upgradeMill() {
  if (gold >= 200 && wood >= 100) {
    gold -= 200;
    wood -= 100;
    foodPerSec += 0.5;
    updateHTML();
  }
}

function upgradeLumberMill() {
  if (gold >= 200 && wood >= 100) {
    gold -= 200;
    wood -= 100;
    woodPerSec += 0.5;
    updateHTML();
  }
}

function addGold() {
  gold += goldPerSec;
  updateHTML();
}

function addWood() {
  wood += woodPerSec;
  updateHTML();
}

function addFood() {
  food += foodPerSec;
  updateHTML();
}

function trainTroops() {
  if (gold >= costOfTroop && population > defense) {
    //increase costOfTroop by 1%
    costOfTroop += costOfTroop / 100;
    costOfTroopFood += costOfTroopFood / 100;
    console.log(costOfTroop);
    gold -= costOfTroop;
    food -= costOfTroopFood;
    defense += 1;
    updateHTML();
  }
}

function trainKnights() {
  if (gold >= 150 && population > (defense && totalKnights)) {
    gold -= 150;
    totalKnights += 1;
    console.log(totalKnights);
    updateHTML();
  }
}

function trainVillagers() {
  if (gold >= 50 && food >= 20) {
    gold -= 50;
    food -= 20;
    population += 1;
    goldPerSec = population / 2; // Update goldPerSec whenever population changes
    updateHTML();
  }
}

function buildLumberMillFc() {
  if (gold >= 200 && wood >= 100) {
    gold -= 200;
    wood -= 100;
    isMill1 = true;
    woodPerSec += 0.5; // Add wood production
    buildLumberMill.classList.add("d-none");
    upgradeLumberMillBtn.classList.remove("d-none");
    updateHTML();
  }
}

function buildMillFc() {
  if (gold >= 200 && wood >= 100) {
    gold -= 200;
    wood -= 100;
    isMill2 = true;
    foodPerSec += 0.5; // Add food production
    buildMill.classList.add("d-none");
    upgradeMillBtn.classList.remove("d-none");
    updateHTML();
  }
}

function buildCastleFc() {
  if (gold >= 500 && wood >= 200 && food >= 300 && population >= 50) {
    gold -= 500;
    wood -= 200;
    food -= 300;
    population -= 50;
    isCastle = true;
    buildCastle.classList.add("d-none");
    trainKnightsBtn.classList.remove("d-none");
    updateHTML();
  }
}

function updateCountdown() {
  if (timeUntilNextAttack > 0) {
    timeUntilNextAttack -= 1000; // Reduce by 1 second
  }
  updateHTML();
}

// Function to calculate the outcome of an attack
function calculateAttack() {
  console.log(defense);

  if (population <= 1) {
    alert("Game Over");
    return;
  }

  // Calculate total defense including the defense bonus
  let totalDefense = defense + defense * defenseBonus;

  // Determine if the attacker wins based on relative strength and randomness
  let winProbability =
    incomingAttackStrength / (incomingAttackStrength + totalDefense);
  let randomFactor = Math.random();
  let lossPercentage = 0.1 + Math.random() * 0.4; // 10% to 50%

  if (randomFactor < winProbability) {
    console.log("Attack successful");
    // Calculate protected resources
    let protectedGold = gold * resourceProtection;
    let protectedWood = wood * resourceProtection;
    let protectedFood = food * resourceProtection;

    // Attack successful, reduce resources
    gold = Math.max(0, gold - (gold - protectedGold) * lossPercentage);
    wood = Math.max(0, wood - (wood - protectedWood) * lossPercentage);
    food = Math.max(0, food - (food - protectedFood) * lossPercentage);
    population -= population * lossPercentage;
    defense = 0;
  } else {
    console.log("Defense successful");
    // Defense successful, but reduce defense as some defenders are lost
    let defenseLoss = defense * lossPercentage;
    defense -= defenseLoss;
  }

  // Ensure no negative values
  gold = Math.max(0, gold);
  wood = Math.max(0, wood);
  food = Math.max(0, food);
  population = Math.max(0, population);
  defense = Math.max(0, defense);

  // Increase attack strength by 30% and increase interval by 20%
  incomingAttackStrength *= 1.3;
  attackInterval *= 1.2;

  // Reset time until next attack
  timeUntilNextAttack = attackInterval;

  // Schedule the next attack
  setTimeout(calculateAttack, attackInterval);
  updateHTML();
}

// Attach event listener to the train troops button
trainTroopsBtn.addEventListener("click", () => {
  console.log("Train troops button clicked.");
  trainTroops();
});

buildTownHall.addEventListener("click", () => {
  console.log("villagers button clicked.");
  trainVillagers();
});

buildLumberMill.addEventListener("click", () => {
  console.log("build lumber mill button clicked.");
  buildLumberMillFc();
});

buildMill.addEventListener("click", () => {
  console.log("build mill button clicked.");
  buildMillFc();
});

upgradeMillBtn.addEventListener("click", () => {
  console.log("upgrade mill button clicked.");
  upgradeMill();
});

upgradeLumberMillBtn.addEventListener("click", () => {
  console.log("upgrade lumber mill button clicked.");
  upgradeLumberMill();
});

buildCastle.addEventListener("click", () => {
  console.log("build castle button clicked.");
  buildCastleFc();
});

trainKnightsBtn.addEventListener("click", () => {
  console.log("train knights button clicked.");
  trainKnights();
});

buildTower1.addEventListener("click", () => {
  console.log("build tower1 button clicked.");
  buildTower1Fc();
});

buildTower2.addEventListener("click", () => {
  console.log("build tower2 button clicked.");
  buildTower2Fc();
});

buildTower3.addEventListener("click", () => {
  console.log("build tower3 button clicked.");
  buildTower3Fc();
});

buildTower4.addEventListener("click", () => {
  console.log("build tower4 button clicked.");
  buildTower4Fc();
});

upgradeTower1Btn.addEventListener("click", () => {
  console.log("upgrade tower1 button clicked.");
  upgradeTower1();
});

upgradeTower2Btn.addEventListener("click", () => {
  console.log("upgrade tower2 button clicked.");
  upgradeTower2();
});

upgradeTower3Btn.addEventListener("click", () => {
  console.log("upgrade tower3 button clicked.");
  upgradeTower3();
});

upgradeTower4Btn.addEventListener("click", () => {
  console.log("upgrade tower4 button clicked.");
  upgradeTower4();
});

// Initialize game state and start the first attack
updateHTML();
setInterval(addGold, 1000); // Add gold every second
setInterval(addWood, 1000); // Add wood every second
setInterval(addFood, 1000);
setTimeout(calculateAttack, attackInterval); // Schedule the first attack
setInterval(updateCountdown, 1000);
