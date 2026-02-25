import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';

@Module({
  providers: [PartnerService]
})
export class PartnerModule {}
