import { HiOutlineCog, HiOutlineLink } from "react-icons/hi"
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
          type: 'string'
        },
        {
          name: 'links',
          title: 'Links',
          type: 'array',
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
                  options: {
                    list: [
                      { value: 'faTwitter', title: 'Twitter' },
                      { value: 'faInstagram', title: 'Instagram' },
                      { value: 'faDiscord', title: 'Discord' },
                      { value: 'faGithub', title: 'GitHub' }
                    ]
                  }
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url'
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
      name: 'titleTemplate',
      title: 'Title Template',
      description: 'use %s for page title',
      type: 'string'
    },
    {
      name: 'defaultTitle',
      title: 'Default Title',
      type: 'string'
    },
    {
      name: 'defaultDescription',
      title: 'Default Description',
      type: 'string'
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
          type: 'string'
        },
        {
          name: 'defaultImage',
          title: 'Default image',
          type: 'image',
        },
        {
          name: 'defaultImageAlt',
          title: 'Default Image Alt',
          type: 'string'
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
