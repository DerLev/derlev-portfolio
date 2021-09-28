import { HiOutlineUser } from "react-icons/hi"

export default {
  name: 'author',
  title: 'Author',
  icon: HiOutlineUser,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'ghUrl',
      title: 'GitHub Profile',
      type: 'url',
      validation: Rule => Rule.required(),
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
