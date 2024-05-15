// enemy.js

// Initialize enemy resources and attack power
let enemyGold = 1000;
let enemyWood = 1000;
let enemyFood = 1000;
let enemyPopulation = 50;
let enemyAttackPower = 50;

// Function to update the enemy's HTML elements
function updateEnemyHTML() {
  document.querySelector("#enemyGoldHTML span").textContent = `Enemy Gold: ${Math.floor(enemyGold)}`;
  document.querySelector("#enemyWoodHTML span").textContent = `Enemy Wood: ${Math.floor(enemyWood)}`;
  document.querySelector("#enemyFoodHTML span").textContent = `Enemy Food: ${Math.floor(enemyFood)}`;
  document.querySelector("#enemyPopHTML span").textContent = `Enemy Population: ${Math.floor(enemyPopulation)}`;
  document.querySelector("#attackPowerHTML span").textContent = `Attack Power: ${Math.floor(enemyAttackPower)}`;
}

// Example function to simulate an enemy attack
function enemyAttack() {
  console.log("Enemy is attacking!");
  // Add your enemy attack logic here
}

// Initialize enemy state
updateEnemyHTML();
