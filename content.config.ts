import { defineCollection, defineContentConfig } from '@nuxt/content';
import { z } from 'zod';

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: '**',
      type: 'page',
      schema: z.object({
          title: z.string(),
          description: z.string(),
          date: z.date().or(z.string()),
          series: z.object({
              title: z.string(),
              part: z.number()
          }).optional()
      })
    }),
    about: defineCollection({
        source: {
            include: '**/*.md',
            repository: 'https://github.com/motortruck1221/motortruck1221'
        },
        type: 'page'
    })
  }
})
