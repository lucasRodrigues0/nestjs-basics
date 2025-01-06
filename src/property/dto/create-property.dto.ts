import { IsInt, IsString } from "class-validator";

export class CreatePropertyDTO {
    @IsString()
    name: string;
    @IsString() 
    description: string;
    @IsInt()
    area: number;
}