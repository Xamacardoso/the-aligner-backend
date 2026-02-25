import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PartnerRepository } from './repositories/partner.repository';

@Module({
  providers: [AdminService, PartnerRepository]
})
export class AdminModule {}
