import { ConflictException, Injectable } from '@nestjs/common';
import { PartnerRepository } from './repositories/partner.repository';
import { CreatePartnerDto } from './dto/create-partner.dto';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(
        private readonly partnerRepository: PartnerRepository
    ) { }

    async createPartner(partner: CreatePartnerDto) {
        const existingPartner = await this.partnerRepository.findByCpf(partner.cpf);
        
        if (existingPartner) {
            throw new ConflictException('Parceiro já cadastrado');
        }

        // partner.senha = await bcrypt.hash(partner.senha, 10);
        
        await this.partnerRepository.createPartnerWithUser(partner);

        return {
            message: 'Parceiro cadastrado com sucesso'
        }
    }

    async findAllPartners() {
        return this.partnerRepository.findAll();
    }

    async deletePartner(cpf: string) {
        const existingPartner = await this.partnerRepository.findByCpf(cpf);

        if (!existingPartner) {
            throw new ConflictException('Parceiro não encontrado');
        }

        await this.partnerRepository.deletePartner(cpf);

        return {
            message: 'Parceiro deletado com sucesso'
        }
    }
}
