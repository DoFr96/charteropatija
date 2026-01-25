import type { CollectionConfig } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

const revalidateBoats = async () => {
  revalidateTag('boats')
  revalidatePath('/')
  revalidatePath('/boats/[slug]', 'page')
}

export const Boats: CollectionConfig = {
  slug: 'boats',
  labels: {
    singular: 'Boat',
    plural: 'Boats',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'capacity', 'year', 'status'],
    description: 'Manage your boat fleet',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateBoats],
    afterDelete: [revalidateBoats],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ==================== BASIC INFO ====================
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                placeholder: 'e.g. Cranchi Z 35',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                position: 'sidebar',
                description: 'URL-friendly name (auto-generated or custom)',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    const format = (str: string) =>
                      str
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '')

                    if (typeof value === 'string' && value.length > 0) return format(value)
                    if (data?.name) return format(data.name)
                    return value
                  },
                ],
              },
            },
            {
              name: 'tagline',
              type: 'text',
              admin: {
                placeholder: 'e.g. Premium day cruiser for unforgettable adventures',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                rows: 6,
                placeholder: 'Detailed description of the boat...',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  required: true,
                  defaultValue: 'motorboat',
                  options: [
                    { label: 'Motorboat', value: 'motorboat' },
                    { label: 'Yacht', value: 'yacht' },
                    { label: 'Sailboat', value: 'sailboat' },
                    { label: 'Catamaran', value: 'catamaran' },
                    { label: 'RIB', value: 'rib' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'status',
                  type: 'select',
                  required: true,
                  defaultValue: 'available',
                  options: [
                    { label: 'Available', value: 'available' },
                    { label: 'Maintenance', value: 'maintenance' },
                    { label: 'Booked', value: 'booked' },
                    { label: 'Hidden', value: 'hidden' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Show this boat prominently on the homepage',
              },
            },
          ],
        },

        // ==================== SPECIFICATIONS ====================
        {
          label: 'Specifications',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'length',
                  type: 'text',
                  admin: {
                    placeholder: '11.70 m',
                    width: '33%',
                  },
                },
                {
                  name: 'width',
                  type: 'text',
                  admin: {
                    placeholder: '3.5 m',
                    width: '33%',
                  },
                },
                {
                  name: 'capacity',
                  type: 'number',
                  required: true,
                  min: 1,
                  max: 100,
                  admin: {
                    placeholder: '12',
                    width: '33%',
                    description: 'Maximum number of guests',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'cabins',
                  type: 'text',
                  admin: {
                    placeholder: '2 (4+2)',
                    width: '50%',
                  },
                },
                {
                  name: 'year',
                  type: 'number',
                  min: 1900,
                  max: 2100,
                  admin: {
                    placeholder: '2022',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'motor',
              type: 'text',
              admin: {
                placeholder: '2x Volvo Penta 270 HP',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'maxSpeed',
                  type: 'text',
                  admin: {
                    placeholder: '35 knots',
                    width: '50%',
                  },
                },
                {
                  name: 'cruisingSpeed',
                  type: 'text',
                  admin: {
                    placeholder: '28 knots',
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'fuelTank',
                  type: 'text',
                  admin: {
                    placeholder: '600 L',
                    width: '33%',
                  },
                },
                {
                  name: 'waterTank',
                  type: 'text',
                  admin: {
                    placeholder: '190 L',
                    width: '33%',
                  },
                },
                {
                  name: 'fuelConsumption',
                  type: 'text',
                  admin: {
                    placeholder: '80 L/hour',
                    width: '33%',
                  },
                },
              ],
            },
          ],
        },

        // ==================== PRICING ====================
        {
          label: 'Pricing',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'priceLow',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: {
                    placeholder: '1200',
                    width: '50%',
                    description: 'Starting price in EUR',
                  },
                },
                {
                  name: 'priceHigh',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: {
                    placeholder: '1600',
                    width: '50%',
                    description: 'Maximum price in EUR',
                  },
                },
              ],
            },
            {
              name: 'priceNote',
              type: 'text',
              admin: {
                placeholder: 'Full day with skipper (09:00 - 18:00)',
                description: 'Additional pricing information',
              },
            },
            {
              name: 'clickandboatUrl',
              type: 'text',
              admin: {
                placeholder: 'https://www.clickandboat.com/...',
                description: 'Link to Click&Boat listing for this boat',
              },
            },
          ],
        },

        // ==================== MEDIA ====================
        {
          label: 'Media',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main image shown in fleet listing',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Gallery Images',
              minRows: 0,
              maxRows: 20,
              admin: {
                description: 'Additional images for the boat detail page',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  admin: {
                    placeholder: 'Optional caption',
                  },
                },
              ],
            },
          ],
        },

        // ==================== REVIEWS ====================
        {
          label: 'Reviews',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'rating',
                  type: 'number',
                  min: 0,
                  max: 5,
                  admin: {
                    placeholder: '4.9',
                    width: '50%',
                    step: 0.1,
                  },
                },
                {
                  name: 'reviewCount',
                  type: 'number',
                  min: 0,
                  admin: {
                    placeholder: '127',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'reviews',
              type: 'array',
              label: 'Featured Reviews',
              minRows: 0,
              maxRows: 5,
              admin: {
                description: 'Hand-picked reviews to display on the website',
              },
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                  admin: {
                    rows: 3,
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'author',
                      type: 'text',
                      required: true,
                      admin: {
                        placeholder: 'Marco T.',
                        width: '50%',
                      },
                    },
                    {
                      name: 'country',
                      type: 'text',
                      admin: {
                        placeholder: 'Italy',
                        width: '50%',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
