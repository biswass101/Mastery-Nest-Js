import { Prop, Schema } from "@nestjs/mongoose";
import { DbValidationMessageUtil } from "src/common/utils/db-validation-message.util";

@Schema({ _id: false })
export class Size {
    @Prop({
        required: [true, DbValidationMessageUtil.required("height")]
    })
    h!: number;

    @Prop({
        required: [true, DbValidationMessageUtil.required("weight")]
    })
    w!: number;

    @Prop({
        required: [true, DbValidationMessageUtil.required("uom")]
    })
    uom!: string;
}