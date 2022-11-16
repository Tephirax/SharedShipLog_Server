import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import ShipLog from '../../models/ShipLog'

/* Allows you to view shiplog info */
const ShipLogPage = ({ shiplog }) => {
  const router = useRouter()
  
  return (
    
    <div key={shiplog._twitchID}>
      <h1 className="_twitchID">Ship Log for {shiplog._twitchID}</h1>
      
        { shiplog.entry.map((entries, entryindex) => { 
          return (
            <div key={entryindex} className={entries._astroObjectID}>
              <h3>{entries._entryName}</h3>
              { entries.entryContents.map((facts, factindex) => {
                return (
                  <h5 key={factindex}> {facts._text}</h5>
                );}
              )}
            </div>
          );}
        )}
    </div>
  )
}


function renderEntry({ entries_, entryindex}) {
  return (
    <div key={entryindex} classname={entries._astroObjectID}>
      <h3>{entries._entryName}</h3>
      { entries.entryContents.map((facts, factindex) => {
        return (
          <h5 key={factindex}> {facts._text}</h5>
        );}
      )}
    </div>
  );
}



export async function getServerSideProps({ params }) {
  await dbConnect()

  const query = { "_twitchID": params.id }
  const shiplog = await ShipLog.findOne(query).lean()
  
  return { props: { shiplog: JSON.parse(JSON.stringify(shiplog)) } }
}

export default ShipLogPage
