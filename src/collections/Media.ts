import type { CollectionConfig } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

const revalidateMedia = async () => {
  revalidateTag('boats')
  revalidatePath('/')
  revalidatePath('/boats/[slug]', 'page')
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateMedia],
    afterDelete: [revalidateMedia],
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
