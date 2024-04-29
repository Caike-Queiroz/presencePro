import { sql } from "./db.js";

export class DatabasePostgres {
  async listAnos(search) {  
    const anos = search ?
      await sql`SELECT * FROM ano WHERE id ILIKE ${'%' + search + '%'} OR ano ILIKE ${'%' + search + '%'} OR turmas ILIKE ${'%' + search + '%'}` :
      await sql`SELECT * FROM ano`;
    return anos;
  }
  
  async listTurmas(search) {  
    const turmas = search ?
      await sql`SELECT * FROM turma WHERE id_turma ILIKE ${'%' + search + '%'} OR nome ILIKE ${'%' + search + '%'} OR descricao ILIKE ${'%' + search + '%'}` :
      await sql`SELECT * FROM turma`;
    return turmas;
  }

  async listAlunos(search) {  
    const alunos = search ?
      await sql`SELECT * FROM aluno WHERE 
                 matricula ILIKE ${'%' + search + '%'} OR 
                 nome ILIKE ${'%' + search + '%'} OR 
                 npresenca ILIKE ${'%' + search + '%'} OR 
                 status ILIKE ${'%' + search + '%'} OR 
                 contatoresponsavel ILIKE ${'%' + search + '%'} OR 
                 id_turma ILIKE ${'%' + search + '%'}` :
      await sql`SELECT * FROM aluno`;
    return alunos;
  }

  async atualizarPresencaEStatus(matricula, presencaRegistrada) {
    try {
      const totalAulas = 300;

      // Recuperar presença anterior do banco de dados e converter para número
      const presencaAnteriorResult = await sql`SELECT npresenca FROM aluno WHERE matricula = ${matricula}`;
      const presencaAnterior = presencaAnteriorResult.rows[0] ? parseInt(presencaAnteriorResult.rows[0].npresenca) : 0;

      // Calcular nova presença
      const novaPresenca = Math.min(presencaAnterior + presencaRegistrada, totalAulas);

      // Verificar se o aluno atingiu 80% de presença
      const percentualPresenca = (novaPresenca / totalAulas) * 100;
      const novoStatus = percentualPresenca >= 80 ? 'Aprovado' : 'Reprovado';

      // Atualizar presença e status do aluno no banco de dados
      await sql`UPDATE aluno SET npresenca = ${novaPresenca}, status = ${novoStatus} WHERE matricula = ${matricula}`;

      console.log(`Presença do aluno com matrícula ${matricula} atualizada para ${novaPresenca} e status atualizado para ${novoStatus}`);
    } catch (error) {
      console.error('Erro ao atualizar presença e status do aluno:', error);
      throw error;
    }
  }

  async registrarPresenca(matricula, presencaRegistrada) {
    try {
      // Atualizar presença e status do aluno
      await this.atualizarPresencaEStatus(matricula, presencaRegistrada);
      console.log(`Presença do aluno com matrícula ${matricula} registrada com sucesso`);
    } catch (error) {
      console.error('Erro ao registrar presença do aluno:', error);
      throw error;
    }
  }
}
