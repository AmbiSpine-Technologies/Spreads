import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endDate: {
    type: Date
  },
  endTime: {
    type: String
  },
  location: {
    type: String
  },
  eventType: {
    type: String,
    enum: ['In Person', 'Virtual'],
    required: true
  },
  visibility: {
    type: String,
    enum: ['Public', 'Private'],
    required: true
  },
  host: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    profile: {
      type: String, 
      required: true
    }
  },
  coHosts: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    profile: {
      type: String
    }
  }],
  additionalSettings: {
    type: Map,
    of: Schema.Types.Mixed
  },
  details: {
    type: String
  },
}, {
  timestamps: true
});

const Event = model('Event', eventSchema);

export default Event;
