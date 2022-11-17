import mongoose from 'mongoose'

// Define structure of mongoDB object
const entryContentsSchema = new mongoose.Schema({
  _factID: Number,
  _text: String
})

const entrySchema = new mongoose.Schema({
  _entryID: String,
  _entryName: String,
  _moreToExplore: Boolean,
  _rumor: Boolean,
  entryContents: [entryContentsSchema]
})

const astralBodySchema = new mongoose.Schema({
  _astroObjectID: String,
  entry: [entrySchema]
})

const ShipLogSchema = new mongoose.Schema({
  _twitchID: String,
  astralBodies: [astralBodySchema]
})

// Convert schema into a model for use
export default mongoose.models.ShipLog || mongoose.model('ShipLog', ShipLogSchema, 'sharedshiplog')