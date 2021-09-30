import { HiOutlineExclamation } from "react-icons/hi"
import React from "react"

export const mainSettings = {
  name: 'mainSettings',
  title: 'Main Settings',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  type: 'document',
  fields: [
    {
      name: 'homePage',
      title: 'Home Page',
      type: 'object',
      options: {
        collapsible: false
      },
      fields: [
        {
          name: 'description',
          title: 'Description',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          validation: Rule => Rule.required(),
          options: {
            editModal: 'dialog'
          },
          of: [
            {
              title: 'Link',
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  validation: Rule => Rule.required(),
                  options: {
                    list: [
                      { value: 'faTwitter', title: 'Twitter' },
                      { value: 'faInstagram', title: 'Instagram' },
                      { value: 'faDiscord', title: 'Discord' },
                      { value: 'faGithub', title: 'GitHub' },
                      { value: 'faFacebook', title: 'Facebook' },
                      { value: 'faYoutube', title: 'YouTube' },
                      { value: 'faReddit', title: 'Reddit' },
                      { value: 'faTwitch', title: 'Twitch' },
                      { value: 'hiLink', title: 'Link' },
                      { value: 'hiGlobe', title: 'Globe' },
                    ]
                  }
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: Rule => Rule.required(),
                }
              ],
              preview: {
                select: {
                  title: 'icon',
                  subtitle: 'url',
                }
              },
            }
          ]
        },
        {
          name: 'bgImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true
          },
          validation: Rule => Rule.required(),
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Main Settings',
      }
    }
  },
}

export const seoSettings = {
  name: 'seoSettings',
  title: 'Seo Settings',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  type: 'document',
  fields: [
    {
      name: 'note',
      type: 'note',
      options: {
        icon: HiOutlineExclamation,
        headline: 'Needs a rebuild',
        message: <span>Changing and publishing settings here will need a rebuild/restart of the app, in order to take affect. Rebuild  on the <a href="https://dashboard.mc-mineserver.de/update/" rel="noopener noreferrer" target="_blank">API Dashboard</a> by clicking <code>Update DerLev</code>.</span>,
        tone: 'caution',
      }
    },
    {
      name: 'titleTemplate',
      title: 'Title Template',
      description: 'use %s for page title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'defaultTitle',
      title: 'Default Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'defaultDescription',
      title: 'Default Description',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'og',
      title: 'Open Graph Settings',
      type: 'object',
      options: {
        collapsible: false
      },
      fields: [
        {
          name: 'siteName',
          title: 'Site Name',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'defaultImage',
          title: 'Default image',
          type: 'image',
          validation: Rule => Rule.required(),
        },
        {
          name: 'defaultImageAlt',
          title: 'Default Image Alt',
          type: 'string',
          validation: Rule => Rule.required(),
        },
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Seo Settings',
      }
    }
  },
}

export const linktreeSettings = {
  name: 'linktreeSettings',
  title: 'Linktree Settings',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  type: 'document',
  fields: [
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      validation: Rule => Rule.required(),
      options: {
        editModal: 'dialog'
      },
      of: [
        {
          title: 'Link',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              validation: Rule => Rule.required(),
              options: {
                list: [
                  { value: 'faTwitter', title: 'Twitter' },
                  { value: 'faInstagram', title: 'Instagram' },
                  { value: 'faDiscord', title: 'Discord' },
                  { value: 'faGithub', title: 'GitHub' },
                  { value: 'faFacebook', title: 'Facebook' },
                  { value: 'faYoutube', title: 'YouTube' },
                  { value: 'faReddit', title: 'Reddit' },
                  { value: 'faTwitch', title: 'Twitch' },
                  { value: 'hiLink', title: 'Link' },
                  { value: 'hiGlobe', title: 'Globe' },
                ]
              }
            },
            {
              name: 'title',
              title: 'Link Title',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: Rule => Rule.required(),
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url',
            }
          },
        }
      ]
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Linktree Settings',
      }
    }
  },
}
