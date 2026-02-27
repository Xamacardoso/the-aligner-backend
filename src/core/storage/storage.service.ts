import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
    private s3Client: S3Client;
    private bucketName = process.env.R2_BUCKET_NAME!;

    constructor() {
        this.s3Client = new S3Client({
            region: 'auto',
            endpoint: process.env.R2_ENDPOINT,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID!,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
            },
        });
    }

    // Gera uma URL pro frontend fazer upload direto pro r2
    async generatePresignedUrl(pacienteCpf: string, fileName: string, contentType: string){
        try {
            const fileExtension = fileName.split('.').pop();
            const fileKey = `pacientes/${pacienteCpf}/${uuidv4()}.${fileExtension}`;

            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
                ContentType: contentType,
                // ACL: 'public-read',
            });

            const uploadUrl = await getSignedUrl(this.s3Client, command, {
                expiresIn: 900, // 15 minutos
            });
            
            return { uploadUrl, r2key: fileKey };

        } catch (error) {
            throw new InternalServerErrorException('Erro ao gerar URL de upload');   
        }
    }

    // Gerando URL temporaria para visualizar e baixar o arquivo 
    async getPresignedDownloadUrl(r2key: string){
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: r2key,
            });

            const downloadUrl = await getSignedUrl(this.s3Client, command, {
                expiresIn: 3600, // 1 hora
            });

            return downloadUrl;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao gerar URL de download');
        }
    }
}
