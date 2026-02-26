import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DB_CONNECTION } from "src/core/database/database.module";
import * as schema from "src/core/database/schema";
import { CreatePatientDto } from "../dto/create-patient.dto";

@Injectable()
export class PatientRepository {
    constructor(
        @Inject(DB_CONNECTION) private readonly db: MySql2Database<typeof schema>,
    ) { }

    async findAllByPartner(cpfParceiro: string) {
        return await this.db.query.pacientes.findMany({
            where: eq(schema.pacientes.cpfParceiro, cpfParceiro),
            with: {
                orcamentos: true,
            }
        });
    }

    async findByCpf(cpf: string) {
        return this.db.query.pacientes.findFirst({
            where: eq(schema.pacientes.cpf, cpf)
        });
    }

    async create(patient: CreatePatientDto) {
        await this.db.insert(schema.pacientes).values({
            cpf: patient.cpfPaciente,
            nome: patient.nomePaciente,
            nascimento: new Date(patient.dataNascimento),

            cpfParceiro: patient.cpfParceiro,
            cnpjParceiro: patient.cnpjParceiro,

            queixaPrincipal: patient.descricaoQueixaPrincipal,
            descricaoCaso: patient.descricaoObservacoes,
            descricaoObjetivosTratamento: patient.descricaoObjetivosTratamento,

            objetivoTratamento: patient.objetivosTratamento,
            apinhamento: patient.apinhamento,

            observacoes: patient.outrasObservacoes,
            inicioTratamento: new Date(),
        });

        return { cpf: patient.cpfPaciente, nome: patient.nomePaciente };
    }

    async delete(cpf: string) {
        await this.db.delete(schema.pacientes).where(eq(schema.pacientes.cpf, cpf));
    }

    // Arquivos do paciente
    async saveDocumentMetadata(data: {
        pacienteCpf: string;
        formato: string;
        nomeOriginal: string;
        r2key: string;
    }) {
        await this.db.insert(schema.arquivosPaciente).values({
            pacienteCpf: data.pacienteCpf,
            formato: data.formato,
            nomeOriginal: data.nomeOriginal,
            r2key: data.r2key,
            dataCriacao: new Date(),
        });
    }

    // TODO: Implementar delete de arquivos
    async deleteDocument(r2key: string) {
        await this.db.delete(schema.arquivosPaciente).where(eq(schema.arquivosPaciente.r2key, r2key));
    }

    async findFilesByPatientCpf(cpf: string) {
        return await this.db.select()
            .from(schema.arquivosPaciente)
            .where(eq(schema.arquivosPaciente.pacienteCpf, cpf));
    }
}
