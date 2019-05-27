function formatData(objects){
  const formatCard = (card) => {
    return `${card.slice(0,4)} **** **** ${card.slice(12)}`
    }

  const formatMoney = (currency, amount) => {
    let [wholePart, fraction] = amount.split('.');
    const wholePartArr = wholePart.split('');
    fraction = fraction ? `.${fraction}` : '';

    for(let i = wholePartArr.length; i > 0; i-=3){
      if(i !== wholePartArr.length){
        wholePartArr.splice(i, 0, ',');
      }
    }
    const number = wholePartArr.join('') + fraction ;
    return `${currency + number}`
  }

  const formatDate = (date) => {
    let [ddmmyy, time] = date.split('T');

    ddmmyy = ddmmyy.split('-').reverse().join('.');

    let [hh, mm, ssmm] = time.split(':');
    const newHh = parseInt(hh, 10) + 5 
    hh = newHh < 10 ? '0' + newHh + ':' + mm : newHh.toString() + ':' + mm;

    return ddmmyy + ' ' + hh;
  }

  const answer = objects.map( el => 
    ` Имя покупателя: ${el.name}
      Номер карты: ${formatCard(el.cardNumber)}
      Дата и время операции: ${formatDate(el.date)}
      Сумма операции: ${formatMoney(el.currency, el.amount)}`
  );

  return answer;
}

const test = [
{
"name": "Ashlynn Hartmann",
"cardNumber": "4929289137092267",
"date": "2019-01-24T17:39:07.347Z",
"amount": "579.63",
"currency": "$"
},
{
"name": "Philip Stoltenberg",
"cardNumber": "4916258329158678",
"date": "2018-09-07T02:21:03.144Z",
"amount": "10472.99",
"currency": "$"
}
];

console.log(formatData(test));
