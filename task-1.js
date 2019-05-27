function addOne(array, number){
  const numbers = [];
  let isCorrectArray = true;

  array.forEach(el => {
    if(!Number.isInteger(el) || el > 9 || el < 0){
      isCorrectArray = false;
    } else {
      numbers.push(el.toString());
    }
  });
  
  const count = parseInt(numbers.join(''), 10);
  const sum = count + number;
  const answer = sum.toString().split('');

  return isCorrectArray ? answer : isCorrectArray;
}

console.log(addOne([1, 3, 7], 1));
