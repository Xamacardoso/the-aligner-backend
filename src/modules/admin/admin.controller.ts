import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreatePartnerDto } from "./dto/create-partner.dto";

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('partners')
    @UsePipes(new ValidationPipe())
    async createPartner(@Body() partner: CreatePartnerDto) {
        return this.adminService.createPartner(partner);
    }

    @Get('partners')
    async findAllPartners() {
        return this.adminService.findAllPartners();
    }

    @Delete('partners/:cpf')
    async deletePartner(@Param('cpf') cpf: string) {
        return this.adminService.deletePartner(cpf);
    }
}