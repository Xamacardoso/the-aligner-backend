import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('partners/patients')
export class PartnerController {
    constructor(private readonly partnerService: PartnerService) { }

    @Post()
    @UsePipes(new ValidationPipe)
    async createPatient(@Body() patient: CreatePatientDto) {
        return this.partnerService.createPatient(patient);
    }

    // Rota pro dentista listar seus pacientes
    @Get('dentist/:partnerCpf')
    async getPatientsByPartner(@Param('partnerCpf') partnerCpf: string) {
        return this.partnerService.getPatientsByPartner(partnerCpf);
    }

    // Rota pro dentista buscar um paciente pelo cpf
    @Get(':cpf')
    async getPatientByCpf(@Param('cpf') cpf: string, @Query('partnerCpf') partnerCpf: string) {
        return this.partnerService.getPatientByCpfForPartner(cpf, partnerCpf);
    }

    // Rota pro dentista deletar um paciente
    @Delete(':cpf')
    async deletePatient(@Param('cpf') cpf: string, @Query('partnerCpf') partnerCpf: string) {
        return this.partnerService.deletePatient(cpf, partnerCpf);
    }
}