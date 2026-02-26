import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { StorageService } from 'src/core/storage/storage.service';

@Controller('partners/patients')
export class PartnerController {
    constructor(
        private readonly partnerService: PartnerService,
        private readonly storageService: StorageService
    ) { }

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

    // Frontend pede URL de upload
    @Post(':cpfPaciente/documents/request-upload')
    async requestDocumentUpload(
        @Param('cpfPaciente') cpfPaciente: string,
        @Body() body: {
            nomeOriginal: string,
            contentType: string,
        }
    ) {
        const { uploadUrl, r2key } = await this.storageService.generatePresignedUrl(cpfPaciente, body.nomeOriginal, body.contentType);

        return { uploadUrl, r2key };
    }

    // Frontend avisa que o upload foi concluído
    @Post(':cpfPaciente/documents/confirm-upload')
    async confirmDocumentUpload(
        @Param('cpfPaciente') cpfPaciente: string,
        @Body() body: {
            nomeOriginal: string,
            r2key: string,
        }
    ) {
        const formato = body.nomeOriginal.split('.').pop() || 'unknown';

        await this.partnerService.savePatientFile({
            pacienteCpf: cpfPaciente,
            formato,
            nomeOriginal: body.nomeOriginal,
            r2key: body.r2key,
        });

        return { message: 'Arquivo salvo com sucesso', nomeOriginal: body.nomeOriginal };
    }

    // Listar todos os arquivos de um paciente
    @Get(':cpfPaciente/documents')
    async getPatientDocuments(@Param('cpfPaciente') cpfPaciente: string) {
        return this.partnerService.getPatientFiles(cpfPaciente);
    }

    // TODO: Implementar delete de arquivos
}