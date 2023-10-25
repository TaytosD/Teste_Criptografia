const crypto = require('crypto');
const alg = 'aes-256-ctr';
const senha = 'abcdabcdabcdabcdabcdabcdabcdabcd';

function crypt(name){
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(alg, senha, iv);
    const crypted = cipher.update(name, 'utf-8', 'hex') + cipher.final('hex');
    return iv.toString('hex')+':'+crypted;
}

function decrypt(name){
    const parts = name.split(':')
    const decipher = crypto.createDecipheriv(alg, senha, new Buffer(parts[0], 'hex'));
    const plain = decipher.update(parts[1], 'hex', 'utf-8') + decipher.final('utf-8');
    return plain;
}

const name = 'Davi Samuel Costa';
const curso = 'Análise e Desenvolvimento de Sistemas';
const meta = 'Receber R$ 15K'
const criptografado = crypt(name);
const cursocript = crypt(curso);
const metacript = crypt(meta);

console.log(name, '<< criptografado >>', criptografado);
console.log(criptografado, '<< em texto >>', decrypt(criptografado));
console.log('');
console.log(curso, '<< criptografado >>', cursocript);
console.log(cursocript, '<< em texto >>', decrypt(cursocript));
console.log('');
console.log(meta,  '<< criptografado >>', metacript);
console.log(metacript, '<< em texto >>', decrypt(metacript));
console.log('');