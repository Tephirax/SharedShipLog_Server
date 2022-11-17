import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import ShipLog from '../../models/ShipLog.js'

/* Allows you to view shiplog info */
const ShipLogPage = ({ twitchID, shiplog }) => {
  const router = useRouter()
  if (shiplog == null) {
    return <div className="_twitchID"> Ship Log not found for hatchling { twitchID } </div>
  } else
  {
    return (
      <div key={twitchID}>
        <h1 className="_twitchID">Ship Log for {twitchID}</h1>
          { shiplog.astralBodies.map((astralBodies, astralindex) => {
            return (
              <div key={astralindex} className="astralbodydiv">
              <h2> {astralBodies._astroObjectID}</h2>
              { astralBodies.entry.map((entries, entryindex) => { 
                return (
                  <div key={entryindex} className="entrydiv">
                    <h3>{entries._rumor && <span>Rumor: </span>}{entries._entryName}</h3>
                    { entries.entryContents.map((facts, factindex) => {
                      return (
                        <div key={factindex} className="facts"> {facts._text}</div>
                      );}
                    )}
                    {entries._moreToExplore && <p className="moretoexplore">There's more to explore here.</p>}
                  </div>
                );}
              )}
              </div>
            );}
          )}
      </div>
    )
  }
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const query = { "_twitchID": params.id }
  const shiplog = await ShipLog.findOne(query).lean()
  
  return { props: { twitchID: params.id, shiplog: JSON.parse(JSON.stringify(shiplog)) } }
}

export default ShipLogPage
