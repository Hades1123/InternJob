import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class JobPosition {
  @Prop({ required: true })
  title: string;

  @Prop([String])
  techStack: string[];

  @Prop()
  requirements: string;

  @Prop()
  description: string;
}

@Schema({ _id: false })
class CompanyFile {
  @Prop({ required: true })
  path: string;

  @Prop()
  name: string;

  @Prop({ enum: ['pdf', 'docx', 'image'], default: 'pdf' })
  fileType: string;

  @Prop({ default: false })
  isProcessed: boolean;

  @Prop()
  processedAt?: Date;
}

@Schema({ timestamps: true })
export class Company extends Document {
  @Prop({ required: true, unique: true, index: true })
  companyId: string;

  @Prop()
  companyIcon: string;

  @Prop({ required: true })
  shortName: string;

  @Prop()
  fullName: string;

  @Prop()
  address: string;

  @Prop({ type: [SchemaFactory.createForClass(CompanyFile)] })
  files: CompanyFile[];

  @Prop({ type: Object })
  stat: {
    maxAcceptedStudent: number;
    maxRegister: number;
    adminMaxRegister: number;
    acceptedIntern: boolean;
    studentRegister: number;
    studentAccepted: number;
  };

  @Prop({
    type: {
      positions: [SchemaFactory.createForClass(JobPosition)],
      generalNotes: String,
      updatedAt: { type: Date, default: Date.now },
    },
  })
  GeminiSumary: {
    positions: JobPosition[];
    generalNotes: string;
    updatedAt: Date;
  };

  @Prop({ type: [String], default: [] })
  allTechStacks: string[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
