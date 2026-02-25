import { mysqlTable, varchar, tinyint, char, date, text, serial, decimal, mysqlEnum, int } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

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

// -------- RELACIONAMENTOS ---------

// Um tipo de usuário (Admin, Parceiro) pode estar em vários usuários
export const tipoUsuarioRelations = relations(tipoUsuario, ({ many }) => ({
    usuarios: many(usuarios),
}));

// Um usuário pertence a um tipo e pode ter um perfil de parceiro vinculado
export const usuariosRelations = relations(usuarios, ({ one }) => ({
    tipoUsuario: one(tipoUsuario, {
        fields: [usuarios.tipoUsuarioId],
        references: [tipoUsuario.id],
    }),
    parceiro: one(parceiros),
}));

// Um parceiro é um usuário, tem especialidade e titulação, e atende vários pacientes
export const parceirosRelations = relations(parceiros, ({ one, many }) => ({
    usuario: one(usuarios, {
        fields: [parceiros.cpf],
        references: [usuarios.cpf],
    }),
    especialidade: one(especialidades, {
        fields: [parceiros.especialidadeId],
        references: [especialidades.id],
    }),
    titulacao: one(titulacoes, {
        fields: [parceiros.titulacaoId],
        references: [titulacoes.id],
    }),
    pacientes: many(pacientes),
}));

// Um paciente pertence a um parceiro (dentista) e pode ter vários orçamentos
export const pacientesRelations = relations(pacientes, ({ one, many }) => ({
    parceiro: one(parceiros, {
        fields: [pacientes.cpfParceiro],
        references: [parceiros.cpf],
    }),
    orcamentos: many(orcamentos),
}));

// Um orçamento pertence a apenas um paciente
export const orcamentosRelations = relations(orcamentos, ({ one }) => ({
    paciente: one(pacientes, {
        fields: [orcamentos.pacienteCpf],
        references: [pacientes.cpf],
    }),
}));

// Uma especialidade pode estar presente em vários parceiros
export const especialidadesRelations = relations(especialidades, ({ many }) => ({
    parceiros: many(parceiros),
}));

// Uma titulação pode estar presente em vários parceiros
export const titulacoesRelations = relations(titulacoes, ({ many }) => ({
    parceiros: many(parceiros),
}));
