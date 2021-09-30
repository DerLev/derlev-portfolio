import S from '@sanity/desk-tool/structure-builder'
import { HiOutlineCog } from 'react-icons/hi'

export default () =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(listItem => !['media.tag', 'mainSettings', 'seoSettings', 'linktreeSettings'].includes(listItem.getId())),
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(HiOutlineCog)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Main Settings')
                .icon(HiOutlineCog)
                .child(
                  S.editor()
                    .schemaType('mainSettings')
                    .documentId('mainSettings'),
                ),
              S.listItem()
                .title('SEO Settings')
                .icon(HiOutlineCog)
                .child(
                  S.editor()
                    .schemaType('seoSettings')
                    .documentId('seoSettings'),
                ),
              S.listItem()
                .title('Linktree Settings')
                .icon(HiOutlineCog)
                .child(
                  S.editor()
                    .schemaType('linktreeSettings')
                    .documentId('linktree'),
                )
            ])
        ),
    ])