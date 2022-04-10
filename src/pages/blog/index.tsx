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
import { useRouter } from 'next/router'

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
  const router = useRouter()

  const handleClick = (as) => {
    let url = '/blog/[slug]'
    // preventDefaultを使いたいのでeventを引数にしたい。
    // でも112行目でeventをどう関数に渡せばいいのかわからないので、その方法を調べる。
    // (preventDefaultがないとなんかページ遷移が遅い気がする)
    //e.preventDefault()
    router.push(url, as)
  }

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
        <Box margin="auto" direction="column" gap="medium">
          {posts.length === 0 && (
            <p className={blogStyles.noPosts}>There are no posts yet</p>
          )}
          {posts.map((post) => {
            return (
              <Box
                border={{
                  size: 'small',
                  style: 'solid',
                  color: 'light-6',
                }}
                margin="auto"
                pad="small"
                width="large"
                round
                focusIndicator={false}
                hoverIndicator={{
                  background: {
                    color: 'background-contrast',
                  },
                  elevation: 'small',
                }}
                onClick={() => {
                  handleClick(getBlogLink(post.Slug))
                }}
                key={post.Slug}
              >
                <Heading
                  level="3"
                  size="medium"
                  textAlign="start"
                  margin="medium"
                  color="dark-3"
                >
                  <span className={blogStyles.titleContainer}>
                    {!post.Published && (
                      <span className={blogStyles.draftBadge}>Draft</span>
                    )}
                    {post.Page}
                  </span>
                </Heading>
                {post.Authors.length > 0 && (
                  <div className="authors">By: {post.Authors.join(' ')}</div>
                )}
                {post.Date && (
                  <Text color="dark-3" margin="xsmall" size="small">
                    {getDateStr(post.Date)}
                  </Text>
                )}
                <Text color="dark-3" margin="xsmall" size="small">
                  {(!post.preview || post.preview.length === 0) &&
                    'No preview available'}
                  {(post.preview || []).map((block, idx) =>
                    textBlock(block, true, `${post.Slug}${idx}`)
                  )}
                </Text>
              </Box>
            )
          })}
        </Box>
      </div>
    </>
  )
}

export default Index
