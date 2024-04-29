import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();
const database = new DatabasePostgres();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

server.register(fastifyCors, {
  origin: '*', // Ajustando a URL para remover a barra no final
});

server.addHook('onRequest', (request, reply, done) => {
  reply.header('Access-Control-Allow-Credentials', 'true');
  reply.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  reply.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (request.method === 'OPTIONS') {
    reply.send();
  } else {
    done();
  }
});

// Route to list years
server.get('/ano', async (request) => {
  const search = request.query.search;
  const anos = await database.listAnos(search);
  return anos;
});

// Route to list classes
server.get('/turma', async (request) => {
  const search = request.query.search;
  const turmas = await database.listTurmas(search);
  return turmas;
});

// Route to list students
server.get('/aluno', async (request) => {
  const search = request.query.search;
  const alunos = await database.listAlunos(search);
  return alunos;
});

// Route to register student attendance
server.post('/registrar-presenca', async (request, reply) => {
  const { matricula, presencaRegistrada } = request.body;
  try {
    await database.registrarPresenca(matricula, presencaRegistrada);
    return reply.code(200).send({ message: 'Presença registrada com sucesso' });
  } catch (error) {
    console.error('Error registering student attendance:', error);
    return reply.code(500).send({ message: 'Error registering student attendance' });
  }
});

server.listen(port, (err) => {
  if (err) {
    console.error(err);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
  console.log(`Server is now listening on port ${port}`);
});
