let enemyGold = 1000;
let enemyWood = 1000;
let enemyFood = 1000;
let enemyPopulation = 50;

function updateEnemyHTML() {
  document.querySelector(
    "#enemyGoldHTML span"
  ).textContent = `Enemy Gold: ${Math.floor(enemyGold)}`;
  document.querySelector(
    "#enemyWoodHTML span"
  ).textContent = `Enemy Wood: ${Math.floor(enemyWood)}`;
  document.querySelector(
    "#enemyFoodHTML span"
  ).textContent = `Enemy Food: ${Math.floor(enemyFood)}`;
  document.querySelector(
    "#enemyPopHTML span"
  ).textContent = `Enemy Population: ${Math.floor(enemyPopulation)}`;
}

function increaseEnemyResources() {
  enemyGold += 10;
  enemyWood += 10;
  enemyFood += 10;
  enemyPopulation += 1.2;
  updateEnemyHTML();
}

updateEnemyHTML();
setInterval(increaseEnemyResources, 60000);
