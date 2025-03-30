import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class BookTicketSchema extends Document {
    @Prop({ required: true, type: Types.ObjectId, ref: 'userSchemas' })
    userId: Types.ObjectId;

    @Prop({ required: true })
    busNumber: string;

    @Prop({ required: true })
    Date: string;
}

export const BookTicketSchemaModel = SchemaFactory.createForClass(BookTicketSchema);
