import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { PartnerModule } from './modules/partner/partner.module';
import { StorageModule } from './core/storage/storage.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [AdminModule, PartnerModule, StorageModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
