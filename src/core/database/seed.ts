import { drizzle } from 'drizzle-orm/mysql2';
import * as mysql from 'mysql2/promise';
import * as schema from './schema';
import { config } from 'dotenv';
import { sql } from 'drizzle-orm';

config();

async function main() {
    console.log('--- Starting Database Seeding ---');

    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined in .env');
    }

    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    const db = drizzle(connection, { schema, mode: 'default' });

    try {
        // 1. Seed tipoUsuario
        console.log('Seeding tipo_usuario...');
        await db.insert(schema.tipoUsuario).values([
            { id: 1, descricao: 'Administrador' },
            { id: 2, descricao: 'Parceiro' },
        ]).onDuplicateKeyUpdate({ set: { descricao: sql`VALUES(descricao)` } });

        // 2. Seed especialidades
        console.log('Seeding especialidades...');
        await db.insert(schema.especialidades).values([
            { id: 1, nome: 'Ortodontia' },
            { id: 2, nome: 'Implantodontia' },
            { id: 3, nome: 'Periodontia' },
            { id: 4, nome: 'Odontopediatria' },
            { id: 5, nome: 'Endodontia' },
        ]).onDuplicateKeyUpdate({ set: { nome: sql`VALUES(nome)` } });

        // 3. Seed titulacoes
        console.log('Seeding titulacoes...');
        await db.insert(schema.titulacoes).values([
            { id: 1, nome: 'Especialista' },
            { id: 2, nome: 'Mestre' },
            { id: 3, nome: 'Doutor' },
            { id: 4, nome: 'Pós-Doutor' },
        ]).onDuplicateKeyUpdate({ set: { nome: sql`VALUES(nome)` } });

        // 4. Seed usuarios
        console.log('Seeding usuarios...');
        await db.insert(schema.usuarios).values([
            { cpf: '11111111111', nome: 'Admin System', senha: '202cb962ac59075b964b07152d234b70', tipoUsuarioId: 1 },
            { cpf: '22222222222', nome: 'Dr. João Silva', senha: '202cb962ac59075b964b07152d234b70', tipoUsuarioId: 2 },
        ]).onDuplicateKeyUpdate({ set: { nome: sql`VALUES(nome)` } });

        // 5. Seed parceiros
        console.log('Seeding parceiros...');
        await db.insert(schema.parceiros).values([
            {
                cpf: '22222222222',
                cro: '123456',
                croUf: 'SP',
                email: 'joao.silva@clinica.com',
                telefone: '11999999999',
                especialidadeId: 1,
                titulacaoId: 2,
                cnpj: '12345678000199',
                razaoSocial: 'Clínica Silva e Filhos',
                endereco: 'Av. Paulista, 1000',
                telefone_estabelecimento: '1133334444',
                complemento: 'Sala 101',
                cep: '01310100',
                bairro: 'Bela Vista',
                cidade: 'São Paulo',
                uf_estabelecimento: 'SP'
            }
        ]).onDuplicateKeyUpdate({ set: { cro: sql`VALUES(cro)` } });

        // 6. Seed pacientes
        // console.log('Seeding pacientes...');
        // await db.insert(schema.pacientes).values({
        //     cpf: '33333333333',
        //     nome: 'Maria Souza',
        //     nascimento: '1990-05-15',
        //     cpfParceiro: '22222222222',
        //     queixaPrincipal: 'Dentes tortos',
        //     descricaoCaso: 'Necessita de aparelho ortodôntico fixo.',
        //     descricaoObjetivosTratamento: 'Alinhamento dos dentes e correção da mordida.',
        //     observacoes: 'Paciente motivado.',
        //     inicioTratamento: '2024-01-10'
        // }).onDuplicateKeyUpdate({ set: { cpf: '33333333333' } });

        // // 7. Seed orcamentos
        // console.log('Seeding orcamentos...');
        // await db.insert(schema.orcamentos).values({
        //     pacienteCpf: '33333333333',
        //     valor: '5000.00',
        //     status: 'pendente',
        //     descricao: 'Aparelho Autoligado',
        //     dataCriacao: new Date('2024-02-25').toISOString().slice(0, 10)
        // }).onDuplicateKeyUpdate({ set: { pacienteCpf: '33333333333' } });


        console.log('--- Database Seeding Completed Successfully ---');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await connection.end();
    }
}

main();
