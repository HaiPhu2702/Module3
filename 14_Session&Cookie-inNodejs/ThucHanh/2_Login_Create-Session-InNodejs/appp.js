



const possibleCharacter = 'abcdefghiklmnopqwerszx1234567890';
let str='';
for (let i = 0; i <20 ; i++) {
    let randomCharter = possibleCharacter.charAt(Math.floor(Math.random()*possibleCharacter.length));
    str+=randomCharter;
}

console.log(Math.floor(Math.random()*possibleCharacter.length))
console.log(possibleCharacter.length)