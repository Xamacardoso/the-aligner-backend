import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { PatientRepository } from './repositories/patient.repository';
import { PartnerRepository } from '../admin/repositories/partner.repository';
import { StorageModule } from 'src/core/storage/storage.module';

@Module({
  providers: [PartnerService, PatientRepository, PartnerRepository],
  controllers: [PartnerController],
  imports: [StorageModule]
})
export class PartnerModule { }
