import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PatientRepository } from './repositories/patient.repository';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PartnerService {
    constructor (private readonly patientRepository: PatientRepository) {}

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

}
