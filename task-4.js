const fetch = require("node-fetch");
const fs = require('fs');
const https = require('https');
const path = require('path');

const dirs = {
    imagesDir: __dirname + '/db/images',
    dbDir: __dirname + '/db',
    jsonDir: __dirname + '/db/db.json'
}

function checkOrCreate(dir){
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

checkOrCreate(dirs.dbDir);
checkOrCreate(dirs.imagesDir);

function saveImageToDisk(url, fileName) {
    
    const imgPath = path.join(dirs.imagesDir.toString(), `/${fileName}.jpg`)

    const  file = fs.createWriteStream(imgPath);

    const request = https.get(url, function(response) {
        response.pipe(file);
    });
}

function hashCode(str) {
    return Math.abs(+str.split('').reduce((prevHash, currVal) =>
      (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0));
  }

async function getData(formatUser){
    const ids =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    function fetchData(id){
        return fetch(`https://reqres.in/api/users/${id}`)
            .then(response => response.json())
            .then(user => user.data)
    }

  
    function fetchImg(id){
        return fetch(`https://reqres.in/api/users/${id}`)
        .then(response => response.json())
        .then(user => user.data)
        .then(user => {
            const fileName = `${user.first_name}_${user.last_name}`;
            saveImageToDisk(user.avatar, fileName);
        });
    }
    
    const getDataPromises = ids.map(id => fetchData(id));
    const saveImgPromises = ids.map(id => fetchImg(id));
    
    await Promise.all(saveImgPromises);

    writeStream = fs.createWriteStream(dirs.jsonDir);
    writeStream.write('[\n')

    const promiseResult = await Promise.all(getDataPromises).then( users =>  
        users.map( user => {
        writeStream.write(`{
            id: ${hashCode(user.id + user.first_name + user.last_name + '')},
            name: ${user.first_name}_${user.last_name},
            avatar: ./images/${user.first_name}_${user.last_name}.jpg
        },\n`)
    }));

    writeStream.write(']\n')
    writeStream.end();

    return promiseResult;
}    

getData();
