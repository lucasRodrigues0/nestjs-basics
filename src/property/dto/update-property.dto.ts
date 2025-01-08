import { PartialType } from "@nestjs/mapped-types"
import { CreatePropertyDTO } from "./create-property.dto"

//com o PartialType o UpdatePropertyDTO recebe todos os campos do CreatePropertyDTO, sendo os campos opcionais
export class UpdatePropertyDTO extends PartialType(CreatePropertyDTO) {}