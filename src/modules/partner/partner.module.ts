import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { PatientRepository } from './repositories/patient.repository';
import { PartnerRepository } from '../admin/repositories/partner.repository';

@Module({
  providers: [PartnerService, PatientRepository, PartnerRepository],
  controllers: [PartnerController]
})
export class PartnerModule { }
