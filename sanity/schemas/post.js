import rs from 'randomstring';

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      description: 'URL of the post',
      type: 'slug',
      options: {
        source: () => rs.generate({ length: 12, readable: true, charset: 'alphanumeric', capitalization: 'lowercase' }),
        maxLength: 32
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'publish',
      title: 'Publish',
      description: 'Whether the post should be publicly availible',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: Rule => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'copyright',
      title: 'Image Copyright',
      description: 'Activites fields to type in copyright licenses',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'copyBy',
      title: 'Copyright By',
      type: 'string',
      hidden: ({document}) => !document?.copyright
    },
    {
      name: 'copyUrl',
      title: 'Copyright Url',
      type: 'url',
      hidden: ({document}) => !document?.copyright
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: Rule => Rule.required(),
    },
    {
      name: 'project',
      title: 'Assosiated Project',
      type: 'reference',
      to: {type: 'project'},
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },

  initialValue: () => ({
    publishedAt: (new Date()).toISOString(),
    publish: false,
    copyright: false,
  })
}
