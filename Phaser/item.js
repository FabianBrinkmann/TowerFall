function spawnItem(imageName, positionx, positiony){
  var item = items.create(positionx, positiony, imageName);
  item.setBounce(0);
  item.allowGravity = true;
  item.type = imageName;
}

function hitItem(player, item){
  switch (item.type) {
    case 'heart':
      player.lifes += 1;
      player.alpha = 0.5;
      break;
    default:
  }
  item.destroy();
}
