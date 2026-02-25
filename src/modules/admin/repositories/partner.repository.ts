import { Inject, Injectable } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DB_CONNECTION } from "src/core/database/database.module";
import * as schema from "src/core/database/schema";
import { CreatePartnerDto } from "../dto/create-partner.dto";
import { eq } from "drizzle-orm";

@Injectable()
export class PartnerRepository {
    constructor(
        @Inject(DB_CONNECTION) private readonly db: MySql2Database<typeof schema>
    ) { }

    async findByCpf(cpf: string) {
        return this.db.query.parceiros.findFirst({
            where: eq(schema.parceiros.cpf, cpf)
        })
    }

    async createPartnerWithUser(partner: CreatePartnerDto) {
        return await this.db.transaction(async (tx) => {
            // criando usuario base
            await tx.insert(schema.usuarios).values({
                cpf: partner.cpf,
                nome: partner.nome,
                senha: partner.senha,
                tipoUsuarioId: 2,
            })

            // criando parceiro
            await tx.insert(schema.parceiros).values({
                cpf: partner.cpf,
                cro: partner.cro,
                croUf: partner.croUf,
                email: partner.email,
                telefone: partner.telefone,
                especialidadeId: partner.especialidadeId,
                titulacaoId: partner.titulacaoId,
                cnpj: partner.cnpj,
                razaoSocial: partner.razaoSocial,
                endereco: partner.endereco,
                telefone_estabelecimento: partner.telefone_estabelecimento,
                complemento: partner.complemento,
                cep: partner.cep,
                bairro: partner.bairro,
                cidade: partner.cidade,
                uf_estabelecimento: partner.uf_estabelecimento,
            })
        })
    }

    async findAll() {
        return this.db.query.parceiros.findMany({
            // Precisa configurar as relations no schema
            with: {
                especialidade: true,
                titulacao: true,
            }
        })
    }
}