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
const launchAttackBtn = document.getElementById("launchAttackBtn");
const playerAttackHTML = document.getElementById("playerAttackHTML");
const buildTownHallButton = document.querySelector("#buildTownHall");
const startButton = document.getElementById("startButton");
const gameContainer = document.getElementById("gameContainer");
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const endMessage = document.getElementById("endMessage");
const restartButton = document.getElementById("restartButton");

let gold = 200;
let wood = 200;
let food = 200;
let population = 30;
let defense = 0;
let isTower1 = false;
let isMill1 = false;
let isTower2 = false;
let isMill2 = false;
let isTower3 = false;
let isTower4 = false;
let isTownHall = false;
let isCastle = false;
let goldPerSec = population / 4;
let popPerSec = 0.1;
let woodPerSec = 0.5;
let foodPerSec = 0.5;
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
let attackCountdown;
let attackBonus = 0;
let baseTowerAttackBonus = 0.15;
let upgradeTowerAttackBonus = 0.05;
let costOfVillagerFood = 10;
let isPaused = false;
let gameIntervals = [];
let startTime, endTime, countdownInterval;

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
document.addEventListener("keydown", togglePause);

function startGame() {
  startScreen.classList.add("d-none");
  gameContainer.classList.remove("d-none");
  startTime = new Date();
  initializeGame();
}

function endGame(playerWon) {
  endTime = new Date();
  let totalTime = ((endTime - startTime) / 1000).toFixed(1);
  endMessage.textContent = `Total time: ${totalTime} seconds!`;

  const endTitle = document.querySelector("#endScreen h1");
  if (playerWon) {
    endTitle.textContent = "You Won!";
  } else {
    endTitle.textContent = "You Lose!";
  }

  gameContainer.classList.add("d-none");
  endScreen.classList.remove("d-none");
}

function restartGame() {
  location.reload(); // Reload the page to reset the game
}

function togglePause(event) {
  if (event.key === "Enter") {
    isPaused = !isPaused;
    if (isPaused) {
      gameIntervals.forEach((interval) => clearInterval(interval));
      clearInterval(countdownInterval);
      clearInterval(attackCountdown); // Clear the player attack countdown interval
    } else {
      startIntervals();
      // Restart the attack countdown if it was in progress before pausing
      if (attackInProgress) {
        startAttackCountdown();
      }
    }
  }
}

function startIntervals() {
  gameIntervals.push(setInterval(addGold, 1000));
  gameIntervals.push(setInterval(addWood, 1000));
  gameIntervals.push(setInterval(addFood, 1000));
  gameIntervals.push(setInterval(updateHTML, 1000));
  gameIntervals.push(setInterval(updateEnemyHTML, 1000));

  countdownInterval = setInterval(() => {
    if (!isPaused) {
      updateCountdown();
    }
  }, 1000);
}

function initializeGame() {
  updateHTML();
  updateEnemyHTML();
  setTimeout(calculateAttack, attackInterval);
  startIntervals();
}

function startAttackCountdown() {
  // Clear any existing countdown interval
  clearInterval(attackCountdown);

  // Set the countdown timer for 30 seconds
  let countdownTime = 30;

  // Start the countdown
  attackCountdown = setInterval(() => {
    countdownTime--;
    updatePlayerAttackCountdown(countdownTime);

    if (countdownTime <= 0) {
      clearInterval(attackCountdown);
      launchAttack(); // Process the attack after countdown completes
      // Re-enable the button after the attack is completed
      launchAttackBtn.classList.remove("disabled");
      trainKnightsBtn.classList.remove("disabled");
      launchAttackBtn.textContent = "Launch attack";
      attackInProgress = false; // Reset the flag
    }
  }, 1000); // Update every second
}

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
  ).textContent = `Defense Power: ${Math.floor(defense)}`;
  document.querySelector(
    "#attackHTML span"
  ).textContent = `Next attack in: ${Math.round(timeUntilNextAttack / 1000)}s`;
  document.querySelector(
    "#attackPowerHTML span"
  ).textContent = `Attack Power: ${Math.floor(totalKnights)}`;

  buildTownHallButton.setAttribute(
    "aria-label",
    `Train villagers, 50G, ${costOfVillagerFood.toFixed(
      1
    )}Food. Gives gold per second`
  );
  trainTroopsBtn.setAttribute(
    "aria-label",
    `Train troops for defense. ${costOfTroop.toFixed(
      1
    )}G, ${costOfTroopFood.toFixed(1)}Food.`
  );
}

function buildTower1Fc() {
  if (gold >= 200 && wood >= 200) {
    gold -= 200;
    wood -= 200;
    isTower1 = true;
    buildTower1.classList.add("d-none");
    upgradeTower1Btn.classList.remove("d-none");
    defenseBonus += 0.2;
    updateHTML();
  } else {
    showToast("Not enough resources to build tower");
  }
}

function upgradeTower1() {
  if (gold >= 200 && wood >= 200) {
    gold -= 200;
    wood -= 200;
    defenseBonus += 0.05; // Add 5% defense bonus per upgrade
    updateHTML();
  } else {
    showToast("Not enough resources to upgrade tower");
  }
}

function buildTower2Fc() {
  if (gold >= 200 && wood >= 200) {
    gold -= 200;
    wood -= 200;
    isTower2 = true;
    costOfTroop *= 0.8; // Reduces the cost by 20%
    costOfTroopFood *= 0.8; // Reduces the cost by 20%
    buildTower2.classList.add("d-none");
    upgradeTower2Btn.classList.remove("d-none");
    updateHTML();
  } else {
    showToast("Not enough resources to build tower");
  }
}

function upgradeTower2() {
  if (gold >= 200 && wood >= 200) {
    gold -= 200;
    wood -= 200;
    costOfTroop *= 0.95; // Reduces the cost by 5%
    costOfTroopFood *= 0.95; // Reduces the cost by 5%
    updateHTML();
  } else {
    showToast("Not enough resources to upgrade tower");
  }
}

function buildTower3Fc() {
  if (gold >= 300 && wood >= 200) {
    gold -= 300;
    wood -= 200;
    isTower3 = true;
    resourceProtection += 0.2; // Initial 20% resource protection
    buildTower3.classList.add("d-none");
    upgradeTower3Btn.classList.remove("d-none");
    updateHTML();
  } else {
    showToast("Not enough resources to build tower");
  }
}

function upgradeTower3() {
  if (gold >= 200 && wood >= 200) {
    gold -= 200;
    wood -= 200;
    resourceProtection += 0.05; // Additional 5% resource protection per upgrade
    updateHTML();
  } else {
    showToast("Not enough resources to upgrade tower");
  }
}
function buildTower4Fc() {
  if (gold >= 400 && wood >= 300) {
    gold -= 400;
    wood -= 300;
    isTower4 = true;
    attackBonus += baseTowerAttackBonus; // Add the base attack bonus
    buildTower4.classList.add("d-none");
    upgradeTower4Btn.classList.remove("d-none");
    updateHTML();
  } else {
    showToast("Not enough resources to build tower");
  }
}

function upgradeTower4() {
  if (gold >= 400 && wood >= 300) {
    gold -= 400;
    wood -= 300;
    attackBonus += upgradeTowerAttackBonus; // Add the upgrade attack bonus
    updateHTML();
  } else {
    showToast("Not enough resources to upgrade tower");
  }
}

function upgradeMill() {
  if (gold >= 250 && wood >= 100) {
    gold -= 250;
    wood -= 100;
    foodPerSec += 1;
    updateHTML();
  } else {
    showToast("Not enough resources to upgrade mill");
  }
}

function upgradeLumberMill() {
  if (gold >= 250 && wood >= 100) {
    gold -= 250;
    wood -= 100;
    woodPerSec += 1;
    updateHTML();
  } else {
    showToast("Not enough resources to upgrade lumber mill");
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
  if (
    gold >= costOfTroop &&
    food >= costOfTroopFood &&
    defense + totalKnights < population
  ) {
    // Increase costOfTroop by 1%
    costOfTroop += costOfTroop / 100;
    costOfTroopFood += costOfTroopFood / 100;
    // console.log(costOfTroop);
    gold -= costOfTroop;
    food -= costOfTroopFood;
    defense += 1;
    updateHTML();
  } else {
    showToast("Not enough resources or population to train troops.");
  }
}

function trainKnights() {
  if (gold >= 150 && wood >= 50 && defense + totalKnights < population) {
    gold -= 150;
    wood -= 50;
    totalKnights += 1;
    // console.log(totalKnights);
    updateHTML();
  } else {
    showToast("Not enough resources or population to train knights.");
  }
}

function trainVillagers() {
  if (gold >= 50 && food >= costOfVillagerFood) {
    costOfVillagerFood += costOfVillagerFood / 100; // Increase by 10%
    // console.log("New cost of villager food: " + costOfVillagerFood);
    // console.log(costOfVillagerFood);
    gold -= 50;
    food -= costOfVillagerFood;
    population += 1;
    goldPerSec = population / 2; // Update goldPerSec whenever population changes
    updateHTML();
  } else {
    showToast("Not enough resources to train villagers.");
  }
}

function buildLumberMillFc() {
  if (gold >= 200 && wood >= 100) {
    gold -= 200;
    wood -= 100;
    isMill1 = true;
    woodPerSec += 2; // Add wood production
    buildLumberMill.classList.add("d-none");
    upgradeLumberMillBtn.classList.remove("d-none");
    updateHTML();
  } else {
    showToast("Not enough resources to build lumber mill");
  }
}

function buildMillFc() {
  if (gold >= 200 && wood >= 100) {
    gold -= 200;
    wood -= 100;
    isMill2 = true;
    foodPerSec += 2; // Add food production
    buildMill.classList.add("d-none");
    upgradeMillBtn.classList.remove("d-none");
    updateHTML();
  } else {
    showToast("Not enough resources to build mill");
  }
}

function buildCastleFc() {
  if (gold >= 500 && wood >= 200 && food >= 300 && population >= 50) {
    gold -= 500;
    wood -= 200;
    food -= 300;
    isCastle = true;
    buildCastle.classList.add("d-none");
    trainKnightsBtn.classList.remove("d-none");
    updateHTML();
  } else {
    showToast("Not enough resources to build castle");
  }
}

function updateCountdown() {
  if (!isPaused && timeUntilNextAttack > 0) {
    timeUntilNextAttack -= 1000; // Reduce by 1 second
  }
  updateHTML();
}

let attackInProgress = false; // Flag to prevent multiple intervals

function initiateAttack() {
  if (totalKnights <= 0) {
    showToast("Train knights before attacking...");
    return;
  }

  if (attackInProgress) {
    return; // Prevent multiple intervals
  }

  attackInProgress = true; // Set the flag
  // console.log("Preparing to attack...");

  // Disable the launch attack button to prevent multiple attacks
  launchAttackBtn.classList.add("disabled");
  trainKnightsBtn.classList.add("disabled");
  launchAttackBtn.textContent = "Launching attack...";

  startAttackCountdown();
}

function updatePlayerAttackCountdown(time) {
  playerAttackHTML.querySelector(
    "span"
  ).textContent = `You attacking in: ${time}s`;
}

function launchAttack() {
  // console.log("Attacking the enemy!");

  let playerAttackPower = totalKnights;
  playerAttackPower *= 1 + attackBonus; // Apply the attack bonus

  let enemyDefensePower = enemyPopulation; // Make sure this variable exists and is correctly set

  // console.log("Player Attack Power:", playerAttackPower);
  // console.log("Enemy Defense Power:", enemyDefensePower);

  // Calculate the outcome
  let attackOutcome = calculateBattleOutcome(
    playerAttackPower,
    enemyDefensePower
  );

  // console.log("Attack Outcome:", attackOutcome);

  if (attackOutcome.playerWins) {
    // Player wins, loot 30% of enemy resources
    let lootPercentage = 0.3;
    let lootedGold = enemyGold * lootPercentage;
    let lootedWood = enemyWood * lootPercentage;
    let lootedFood = enemyFood * lootPercentage;

    gold += lootedGold;
    wood += lootedWood;
    food += lootedFood;

    enemyGold -= lootedGold;
    enemyWood -= lootedWood;
    enemyFood -= lootedFood;

    showToast(
      `You won the attack! Looted resources - Gold: ${Math.floor(
        lootedGold
      )}, Wood: ${Math.floor(lootedWood)}, Food: ${Math.floor(lootedFood)}`
    );
  } else {
    showToast("Your attack was unsuccessful.");
  }

  // Update the enemy population based on losses
  enemyPopulation -= attackOutcome.enemyLosses;
  totalKnights -= attackOutcome.playerLosses;

  // Ensure no negative values
  enemyPopulation = Math.max(0, enemyPopulation);
  totalKnights = Math.max(0, totalKnights);

  // console.log("Remaining Knights:", totalKnights);

  // Check if enemy is defeated
  if (enemyPopulation <= 1) {
    showToast("The enemy has been defeated. Congratulations!");
    endGame(true); // Player won
    isPaused = true;
    if (isPaused) {
      gameIntervals.forEach((interval) => clearInterval(interval));
      clearInterval(countdownInterval);
      clearInterval(attackCountdown); // Clear the player attack countdown interval
    }
  }

  updateHTML();
  updateEnemyHTML();
}

function calculateBattleOutcome(playerAttackPower, enemyDefensePower) {
  // Calculate the relative strength of the attacker
  let attackerStrength = playerAttackPower / enemyDefensePower;

  // Calculate the attacker's win probability
  let attackerWinProbability = Math.max(0, Math.min(1, attackerStrength * 0.5)); // Adjusted factor to balance the win probability

  // Calculate the defender's win probability
  let defenderWinProbability = 1 - attackerWinProbability;

  // Calculate proportional losses with added randomness
  let playerLosses = Math.max(
    1,
    Math.floor(
      playerAttackPower *
        defenderWinProbability *
        0.9 *
        (0.9 + Math.random() * 0.2)
    )
  ); // Adding randomness and ensuring at least 1 loss
  let enemyLosses = Math.max(
    1,
    Math.floor(
      enemyDefensePower *
        attackerWinProbability *
        0.7 *
        (0.9 + Math.random() * 0.2)
    )
  ); // Adding randomness and ensuring at least 1 loss

  let playerWins = playerAttackPower > enemyDefensePower;

  return {
    playerWins: playerWins,
    playerLosses: playerLosses,
    enemyLosses: enemyLosses,
  };
}

// Function to calculate the outcome of an attack
function calculateAttack() {
  // console.log("Defense:", defense);
  // console.log("Incoming Attack Strength:", incomingAttackStrength);

  // Calculate total defense including the defense bonus
  let totalDefense = defense + defense * defenseBonus;

  // Calculate the relative strength of the defender
  let defenderStrength = totalDefense / incomingAttackStrength;

  // Calculate the defender's win probability
  let defenderWinProbability = Math.max(0, Math.min(1, defenderStrength * 0.8));

  // Calculate the attacker's win probability
  let attackerWinProbability = 1 - defenderWinProbability;

  let randomFactor = Math.random(); // Random number between 0 and 1

  if (randomFactor < attackerWinProbability) {
    // console.log("Attack successful");
    // Calculate protected resources
    let protectedGold = gold * resourceProtection;
    let protectedWood = wood * resourceProtection;
    let protectedFood = food * resourceProtection;

    // Attack successful, reduce resources
    gold = Math.max(
      0,
      gold - (gold - protectedGold) * (0.3 + Math.random() * 0.2)
    ); // 30% to 50% loss
    wood = Math.max(
      0,
      wood - (wood - protectedWood) * (0.3 + Math.random() * 0.2)
    );
    food = Math.max(
      0,
      food - (food - protectedFood) * (0.3 + Math.random() * 0.2)
    );
    population -= population * (0.3 + Math.random() * 0.2);

    // Defender's losses based on attacker's win probability
    let defenseLoss = Math.floor(
      defense *
        Math.min(
          1,
          attackerWinProbability * (1 + incomingAttackStrength / totalDefense)
        )
    );
    defense -= defenseLoss;
    if (population <= 1) {
      showToast("Game Over");
      endGame(false); // Player lost
      isPaused = true;
      if (isPaused) {
        gameIntervals.forEach((interval) => clearInterval(interval));
        clearInterval(countdownInterval);
        clearInterval(attackCountdown); // Clear the player attack countdown interval
      }
      return;
    }

    showToast(
      `Enemy attack successful, you lost some resources and ${defenseLoss} units of defense.`
    );
  } else {
    // console.log("Defense successful");
    // Defense successful, but reduce defense as some defenders are lost
    let defenseLoss = Math.floor(
      defense *
        Math.min(
          1,
          defenderWinProbability *
            (1 + incomingAttackStrength / totalDefense) *
            0.3
        )
    );
    defense -= defenseLoss;
    showToast(
      `You defended against the enemy attack, but lost ${defenseLoss} units of defense.`
    );
  }

  // Ensure no negative values
  gold = Math.max(0, gold);
  wood = Math.max(0, wood);
  food = Math.max(0, food);
  population = Math.max(0, population);
  defense = Math.max(0, defense);

  // Increase attack strength by 30% and increase interval by 20%
  incomingAttackStrength *= 1.5;
  attackInterval *= 1.2;

  // Reset time until next attack
  timeUntilNextAttack = attackInterval;

  // Schedule the next attack
  setTimeout(calculateAttack, attackInterval);
  updateHTML();
}

// Attach event listener to the train troops button
trainTroopsBtn.addEventListener("click", () => {
  // console.log("Train troops button clicked.");
  trainTroops();
});

buildTownHall.addEventListener("click", () => {
  // console.log("villagers button clicked.");
  trainVillagers();
});

buildLumberMill.addEventListener("click", () => {
  // console.log("build lumber mill button clicked.");
  buildLumberMillFc();
});

buildMill.addEventListener("click", () => {
  // console.log("build mill button clicked.");
  buildMillFc();
});

upgradeMillBtn.addEventListener("click", () => {
  // console.log("upgrade mill button clicked.");
  upgradeMill();
});

upgradeLumberMillBtn.addEventListener("click", () => {
  // console.log("upgrade lumber mill button clicked.");
  upgradeLumberMill();
});

buildCastle.addEventListener("click", () => {
  // console.log("build castle button clicked.");
  buildCastleFc();
});

trainKnightsBtn.addEventListener("click", () => {
  // console.log("train knights button clicked.");
  trainKnights();
});

buildTower1.addEventListener("click", () => {
  // console.log("build tower1 button clicked.");
  buildTower1Fc();
});

buildTower2.addEventListener("click", () => {
  // console.log("build tower2 button clicked.");
  buildTower2Fc();
});

buildTower3.addEventListener("click", () => {
  // console.log("build tower3 button clicked.");
  buildTower3Fc();
});

buildTower4.addEventListener("click", () => {
  // console.log("build tower4 button clicked.");
  buildTower4Fc();
});

upgradeTower1Btn.addEventListener("click", () => {
  // console.log("upgrade tower1 button clicked.");
  upgradeTower1();
});

upgradeTower2Btn.addEventListener("click", () => {
  // console.log("upgrade tower2 button clicked.");
  upgradeTower2();
});

upgradeTower3Btn.addEventListener("click", () => {
  // console.log("upgrade tower3 button clicked.");
  upgradeTower3();
});

upgradeTower4Btn.addEventListener("click", () => {
  // console.log("upgrade tower4 button clicked.");
  upgradeTower4();
});

launchAttackBtn.addEventListener("click", () => {
  // console.log("Launch attack button clicked.");
  initiateAttack();
});

function showToast(message) {
  // Create toast element
  const toastEl = document.createElement("div");
  toastEl.classList.add(
    "toast",
    "align-items-center",
    "text-bg-secondary",
    "border-0"
  ); // Additional classes for styling
  toastEl.setAttribute("role", "alert");
  toastEl.setAttribute("aria-live", "assertive");
  toastEl.setAttribute("aria-atomic", "true");
  toastEl.innerHTML = `
      <div class="d-flex">
          <div class="toast-body">
              ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
  `;

  // Append toast to toast container
  document.getElementById("toastContainer").appendChild(toastEl);

  // Initialize and show the toast with auto-hide and delay options
  const toast = new bootstrap.Toast(toastEl, {
    autohide: true,
    delay: 3000, // 3 seconds
  });
  toast.show();

  // Automatically remove the toast after it hides
  toastEl.addEventListener("hidden.bs.toast", function () {
    toastEl.remove();
  });
}

// Initialize game state and start the first attack
updateHTML();
// setInterval(addGold, 1000); // Add gold every second
// setInterval(addWood, 1000); // Add wood every second
// setInterval(addFood, 1000);
// setTimeout(calculateAttack, attackInterval); // Schedule the first attack
// setInterval(updateCountdown, 1000);
