import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSiteDto {
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsUrl()
  url: string;
  @IsBoolean()
  isActive: boolean;
}
