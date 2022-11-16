import dbConnect from '../../../lib/dbConnect'
import ShipLog from '../../../models/Shiplog'

export default async function handler(req, res) {
  const { 
    query: { _twitchid }, 
    method 
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const shiplogs = await ShipLog.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: shiplogs })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        console.log(JSON.stringify(req.body));
        const query = {"_twitchID": req.body._twitchID};
        const shiplog = await ShipLog.findOneAndReplace(query, req.body, {upsert:true}); /* create a new model in the database, or replace it if exists*/
        res.status(201).json({ success: true, data: shiplog })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
