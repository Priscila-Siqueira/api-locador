//é só para desenvolvimento local.
//No projeto final, o token virá do Auth/Login pelo Gateway.

require('dotenv/config');

const jwt = require('jsonwebtoken');

const segredoJwt = process.env.JWT_SECRET;

if (!segredoJwt) {
  console.error('JWT_SECRET não encontrada no arquivo .env.');
  process.exit(1);
}

const payload = {
  sub: 1,
  email: 'corretor.teste@api-locador.local',
  role: 'USER',
};

const token = jwt.sign(payload, segredoJwt, {
  expiresIn: '1d',
});

console.log('\nToken JWT de desenvolvimento:\n');
console.log(token);

console.log('\nPayload usado:');
console.log(payload);