import { Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';

interface IBillet extends ITimeStampedDocument {
  _id?: string;
  barCode: string;
  amount: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

const schema = new Schema({
  barCode: { type: String, index: true, required: true },
  amount: { type: String, index: true, required: true },
  expirationDate: { type: String, index: true, required: true }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Billet = model<IBillet>('Billet', schema);

export { Billet, IBillet };
