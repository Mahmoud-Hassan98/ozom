import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export interface FileUploadConfig {
  uploadDir: string;
  maxFileSize: number;
  allowedMimeTypes: string[];
}

@Injectable()
export class FileUploadService {
  private readonly defaultConfig: FileUploadConfig = {
    uploadDir: 'uploads',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
    ],
  };

  uploadFile(file: UploadedFile, config?: Partial<FileUploadConfig>): { filename: string; url: string; size: number } {
    const finalConfig = { ...this.defaultConfig, ...config };
    
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (file.size > finalConfig.maxFileSize) {
      throw new BadRequestException(`File size exceeds ${finalConfig.maxFileSize / 1024 / 1024}MB limit`);
    }

    if (!finalConfig.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('File type not allowed');
    }

    this.ensureUploadDirectory(finalConfig.uploadDir);

    const fileExtension = path.extname(file.originalname);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(finalConfig.uploadDir, uniqueFilename);

    fs.writeFileSync(filePath, file.buffer);

    return {
      filename: uniqueFilename,
      url: `/${finalConfig.uploadDir}/${uniqueFilename}`,
      size: file.size,
    };
  }

  deleteFile(filename: string, uploadDir?: string): void {
    const dir = uploadDir || this.defaultConfig.uploadDir;
    const filePath = path.join(process.cwd(), dir, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      throw new BadRequestException('File not found');
    }
  }

  deleteFileByUrl(fileUrl: string, uploadDir?: string): void {
    const filename = path.basename(fileUrl);
    this.deleteFile(filename, uploadDir);
  }

  private ensureUploadDirectory(uploadDir: string): void {
    const uploadPath = path.join(process.cwd(), uploadDir);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
  }

  getUploadConfig(config?: Partial<FileUploadConfig>) {
    const finalConfig = { ...this.defaultConfig, ...config };
    return {
      dest: finalConfig.uploadDir,
      limits: {
        fileSize: finalConfig.maxFileSize,
      },
      fileFilter: (req: any, file: { mimetype: string }, cb: any) => {
        if (finalConfig.allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('File type not allowed'), false);
        }
      },
    };
  }
} 