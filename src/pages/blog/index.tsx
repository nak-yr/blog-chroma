import Link from 'next/link'
import Header from '../../components/header'

import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'

import {
  getBlogLink,
  getDateStr,
  postIsPublished,
} from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'

import { Box, Heading, Text } from 'grommet'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map((post) => {
    post.Authors = post.Authors.map((id) => users[id].full_name)
  })

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

const Index = ({ posts = [], preview }) => {
  return (
    <>
      <Header titlePre="Blog" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <Heading
          color="neutral-3"
          size="large"
          margin="medium"
          textAlign="center"
        >
          Blog
        </Heading>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map((post, counter) => {
          return (
            <Box margin="auto" pad="small" width="large" key={post.Slug}>
              <Heading level="3" textAlign="start">
                <span className={blogStyles.titleContainer}>
                  {!post.Published && (
                    <span className={blogStyles.draftBadge}>Draft</span>
                  )}
                  <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                    <a color="black">{post.Page}</a>
                  </Link>
                </span>
              </Heading>
              {post.Authors.length > 0 && (
                <div className="authors">By: {post.Authors.join(' ')}</div>
              )}
              {post.Date && (
                <div className="posted">
                  <Text color="dark-3">{getDateStr(post.Date)}</Text>
                </div>
              )}
              {(!post.preview || post.preview.length === 0) && (
                <Text color="dark-3">No preview available</Text>
              )}
              {(post.preview || []).map((block, idx) =>
                textBlock(block, true, `${post.Slug}${idx}`)
              )}
            </Box>
          )
        })}
      </div>
    </>
  )
}

export default Index
