function spawnItem(imageName, positionx, positiony, timeout){
  setTimeout( () => {
    var item = items.create(positionx, positiony, imageName);
    item.setBounce(0);
    item.allowGravity = true;
    item.type = imageName;
  }, timeout);
}

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
  item.destroy();
}
