import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreatePropertyDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsNotEmpty()
    @IsPositive({ message: 'Area cannot be negative' })
    price: number;
}