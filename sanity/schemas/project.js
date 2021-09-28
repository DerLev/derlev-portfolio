import moment from 'moment';
import { HiOutlineCode } from 'react-icons/hi';

export default {
  name: 'project',
  title: 'Project',
  icon: HiOutlineCode,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { value: 'planned', title: 'Planned' },
          { value: 'dev', title: 'Development' },
          { value: 'done', title: 'Done & Maintenance' },
          { value: 'archive', title: 'Archived' },
        ]
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'private',
      title: 'Private',
      description: 'Whether the project is private',
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
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    },
    {
      name: 'url',
      title: 'GitHub URL',
      type: 'url',
      hidden: ({document}) => document?.private
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        { type: 'string' }
      ],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
      validation: Rule => Rule.required(),
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
    publishedAt: moment().format('YYYY-MM-DD'),
    private: false,
  })
}
