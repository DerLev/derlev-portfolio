export default {
  widgets: [
    {
      name: 'project-info',
      layout: {
        width: 'medium'
      }
    },
    {
      name: 'document-list',
      options: {
        title: 'Latest Posts',
        order: '_updatedAt desc',
        types: ['post'],
        limit: 5,
        showCreateButton: false
      },
      layout: {
        width: 'large'
      }
    },
    {
      name: 'vercel',
      layout: {
        width: 'full',
      },
    }
  ],
}