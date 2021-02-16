/* eslint no-param-reassign:0*/
import { Document, Schema } from 'mongoose';

export interface ITimeStampedDocument extends Document {
  createdAt: string;
  updatedAt: string;
}

const TimeStampPlugin = function (schema: Schema) {
  schema.add({ createdAt: { type: String, index: true } });
  schema.add({ updatedAt: { type: String, index: true } });

  schema.pre<ITimeStampedDocument>('save', function (next) {
    if (this.isNew) {
      this.createdAt = new Date().toLocaleDateString('pt-br', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('-').reverse()
        .join('-');
    }
    this.updatedAt = new Date().toLocaleDateString('pt-br', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('-').reverse()
      .join('-');
    next();
  });
};

export default TimeStampPlugin;
