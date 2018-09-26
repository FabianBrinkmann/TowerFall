// This file is used to implement items into the game.
// The items will spawn randomly after a few seconds.
// Notable as well: There will only be one item at a time

// Listing every item into an array
// Sets a random number to randomly pick an item that will appear
const itemList = ['heart', 'ammo'];
let itemAvailable = false;
let rnd = function () {
  return Math.floor((Math.random() * itemList.length) + 1);
};

// Spawns the item
function spawnItem(){
  let imageName = itemList[rnd() -1];
  if (!itemAvailable) {
      let item = items.create(525, 100, imageName);
      item.setBounce(0);
      item.allowGravity = true;
      item.type = imageName;
      itemAvailable = true;
  }
}

// Effects that occure after collecting an item
function hitItem(player, item){
  switch (item.type) {
    case 'heart':
      player.lifes += 1;
      player.alpha = 0.5;
      break;
    case 'ammo':
      player.ammo += 2;
      break;
    default:
  }
  itemAvailable = false;
  item.destroy();
}
