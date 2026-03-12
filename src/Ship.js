export function Ship(length, head, direction, name) {
  let hitNum = 0;
  function hit() {
    hitNum++;
  }
  function getHitNum() {
    return hitNum;
  }
  function isSunk() {
    if (hitNum < length) {
      return false;
    } else {
      return true;
    }
  }
  return { length, getHitNum, isSunk, head, direction, name, hit };
}
