import { IsString, IsInt } from "class-validator";

export class AddProductDto {

    @IsString()
    public title: string;

    @IsString()
    public description: string;

    @IsInt()
    public price: string;
}