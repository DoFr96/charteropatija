// scripts/export-gallery.ts
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'

async function exportGallery() {
  const payload = await getPayload({ config })

  const boats = await payload.find({
    collection: 'boats',
    limit: 100,
    depth: 0,
  })

  const data = boats.docs.map((boat) => ({
    boatId: boat.id,
    boatName: boat.name,
    galleryImageIds: boat.gallery?.map((g: any) => g.image) || [],
  }))

  fs.writeFileSync('gallery-backup.json', JSON.stringify(data, null, 2))
  console.log('Exported:', data)
  process.exit(0)
}

exportGallery()
