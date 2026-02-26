import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PatientRepository } from './repositories/patient.repository';
import { CreatePatientDto } from './dto/create-patient.dto';
import { StorageService } from 'src/core/storage/storage.service';

@Injectable()
export class PartnerService {
    constructor(
        private readonly patientRepository: PatientRepository,
        private readonly storageService: StorageService
    ) { }

    async createPatient(patient: CreatePatientDto) {
        const existingPatient = await this.patientRepository.findByCpf(patient.cpfPaciente);

        if (existingPatient) {
            throw new ConflictException('Paciente já cadastrado.');
        }

        const newPatient = await this.patientRepository.create(patient);
        return { message: 'Paciente cadastrado com sucesso!', cpf: newPatient.cpf, nome: newPatient.nome };
    }

    async getPatientsByPartner(cpfParceiro: string) {
        return this.patientRepository.findAllByPartner(cpfParceiro);
    }

    async getPatientByCpfForPartner(cpf: string, partnerCpf: string) {
        const existingPatient = await this.patientRepository.findByCpf(cpf);

        if (!existingPatient) {
            throw new NotFoundException('Paciente não encontrado.');
        }

        if (existingPatient.cpfParceiro !== partnerCpf) {
            throw new ConflictException('Paciente não pertence ao parceiro.');
        }

        return existingPatient;
    }

    async deletePatient(patientCpf: string, partnerCpf: string) {
        const existingPatient = await this.patientRepository.findByCpf(patientCpf);

        if (!existingPatient) {
            throw new NotFoundException('Paciente não encontrado.');
        }

        if (existingPatient.cpfParceiro !== partnerCpf) {
            throw new ConflictException('Paciente não pertence ao parceiro.');
        }

        // Nota: Futuramente, se o paciente tiver arquivos atrelados a ele ou orçamentos 
        // com status aprovado, precisaremos deletá-los primeiro ou não permitir a exclusão.
        await this.patientRepository.delete(patientCpf);

        return { message: 'Paciente deletado com sucesso!' };
    }

    // Arquivos do paciente
    async savePatientFile(data: { pacienteCpf: string, formato: string, nomeOriginal: string, r2key: string }) {
        await this.patientRepository.saveDocumentMetadata(data);
        return { message: 'Arquivo salvo com sucesso!' };
    }

    async getPatientFiles(cpf: string) {
        const files = await this.patientRepository.findFilesByPatientCpf(cpf);

        // Adiciona URL de download temporaria para cada arquivo
        const filesWithUrls = await Promise.all(
            files.map(async (file) => ({
                ...file,
                downloadUrl: await this.storageService.getPresignedDownloadUrl(file.r2key),
            }))
        );

        return filesWithUrls;
    }

    // TODO: Implementar delete de arquivos
}
