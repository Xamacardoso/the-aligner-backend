import { mysqlTable, varchar, tinyint, char, date, text, serial, decimal, mysqlEnum, int } from "drizzle-orm/mysql-core";

export const tipoUsuario = mysqlTable('tipo_usuario', {
    id: int('id').primaryKey().autoincrement(),
    descricao: varchar('descricao', { length: 45 }).notNull(),
});

// Tabela de Usuários (Base para Auth via Clerk)
export const usuarios = mysqlTable('usuarios', {
    cpf: varchar('cpf', { length: 11 }).primaryKey(),
    nome: varchar('nome', { length: 45 }).notNull(),
    senha: varchar('senha', { length: 32 }).notNull(),
    tipoUsuarioId: int('tipo_usuario_id').notNull().references(() => tipoUsuario.id),
});

// Tabela de Parceiros (Dentistas)
export const parceiros = mysqlTable('parceiros', {
    cpf: varchar('cpf', { length: 11 }).primaryKey().references(() => usuarios.cpf),
    cro: varchar('cro', { length: 20 }).notNull(),
    croUf: char('cro_uf', { length: 2 }).notNull(),
    email: varchar('email', { length: 45 }).notNull(),
    telefone: varchar('telefone', { length: 11 }),
    especialidadeId: int('especialidade_id').references(() => especialidades.id),
    titulacaoId: int('titulacao_id').references(() => titulacoes.id),

    // Dados do Estabelecimento
    cnpj: varchar('estabelecimento_cnpj', { length: 14 }),
    razaoSocial: varchar('estabelecimento_razao_social', { length: 100 }),
    endereco: varchar('estabelecimento_endereco', { length: 200 }),
    telefone_estabelecimento: varchar('telefone_estabelecimento', { length: 11 }),
    complemento: varchar('complemento', { length: 100 }),
    cep: varchar('cep', { length: 8 }),
    bairro: varchar('bairro', { length: 100 }),
    cidade: varchar('cidade', { length: 100 }),
    uf_estabelecimento: varchar('uf_estabelecimento', { length: 2 }),
});

// Tabela de Pacientes (Vinculados a um Parceiro)
export const pacientes = mysqlTable('pacientes', {
    cpf: varchar('cpf', { length: 11 }).primaryKey(),
    nome: varchar('nome', { length: 45 }).notNull(),
    nascimento: date('nascimento'),

    // Dentista parceiro associado
    cpfParceiro: varchar('cpf_parceiro', { length: 11 }).references(() => parceiros.cpf),

    queixaPrincipal: text('queixa_principal'),
    descricaoCaso: text('descricao_caso'),
    descricaoObjetivosTratamento: text('descricao_objetivos_tratamento'),
    observacoes: text('observacoes'),
    inicioTratamento: date('inicio_tratamento'),
});

// Tabela de Orçamentos
export const orcamentos = mysqlTable('orcamentos', {
    id: serial('id').primaryKey(),
    pacienteCpf: varchar('paciente_cpf', { length: 11 }).references(() => pacientes.cpf),
    valor: decimal('valor', { precision: 10, scale: 2 }),
    status: mysqlEnum('status', ['pendente', 'aprovado', 'declinado', 'cancelado']).default('pendente'),
    descricao: text('descricao_tratamento'),
    dataCriacao: date('data_criacao'),
});

export const especialidades = mysqlTable('especialidades', {
    id: int('id').primaryKey().autoincrement(),
    nome: varchar('nome', { length: 45 }).notNull(),
});

export const titulacoes = mysqlTable('titulacoes', {
    id: int('id').primaryKey().autoincrement(),
    nome: varchar('nome', { length: 45 }).notNull(),
});