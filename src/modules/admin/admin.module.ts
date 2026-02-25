import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PartnerRepository } from './repositories/partner.repository';
import { AdminController } from './admin.controller';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PartnerRepository]
})
export class AdminModule { }
