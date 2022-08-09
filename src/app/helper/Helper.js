export const getRandomIntWithOneExclusion = (lengthOfArray, indexToExclude) => {
    var rand = null;  //an integer
  
      while(rand === null || rand === indexToExclude){
         rand = Math.round(Math.random() * (lengthOfArray - 1));
      }
    
    return rand;
}

export const getRandomInt = (lengthOfArray) => {
  return Math.round(Math.random() * (lengthOfArray - 1));
}

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Tạo mảng chứa index của playlistContent được shuffle nhưng vị trí idx được đưa lên đầu
export const createRandArr = (arrLen, idx) => {
  var randArr = [...Array(arrLen).keys()]
  shuffleArray(randArr)
  randArr.unshift(idx)
  randArr = [... new Set(randArr)]
  // console.log(randArr)
  // [randArr[0], randArr[idx]] = [randArr[idx], randArr[0]]

  // Swap
  // var temp = randArr[0]
  // randArr[0] = randArr[idx]
  // randArr[idx] = temp

  // console.log(randArr)
  return randArr
}