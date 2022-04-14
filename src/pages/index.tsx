import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
//import Features from '../components/features'
import sharedStyles from '../styles/shared.module.css'

import {
  getBlogLink,
  getDateStr,
  normalizeSlug,
  postIsPublished,
} from '../lib/blog-helpers'
import { textBlock } from '../lib/notion/renderers'
import getNotionUsers from '../lib/notion/getNotionUsers'
import getBlogIndex from '../lib/notion/getBlogIndex'

import { Box, Button, Heading, Text } from 'grommet'

import blogStyles from '../styles/blog.module.css'
import { useRouter } from 'next/router'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map((slug, index) => {
      const post = postsTable[slug]

      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      // 記事数が3以上の場合、新規に記事を格納しない
      if (index > 2) {
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

export default function Index({ posts = [], preview }) {
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
      <Header titlePre="Home" />
      <div className={sharedStyles.layout}>
        <Heading
          margin="medium"
          color="neutral-3"
          size="large"
          textAlign="center"
        >
          Chroma
        </Heading>

        {/*<Features />*/}

        <Text
          color="dark-3"
          margin="large"
          textAlign="center"
          as="div"
          size="large"
        >
          興味のある技術を使って作成している個人的なブログです。
          <br />
          バックエンドにNotion、フロントエンドにNext.jsを使用しています。
          <br />
          デザインフレームワークはGrommetを用いています。
        </Text>

        <Heading level={2} margin="medium" size="large" textAlign="center">
          Recent Posts
        </Heading>

        {preview && (
          <div className={blogStyles.previewAlertContainer}>
            <div className={blogStyles.previewAlert}>
              <b>Note:</b>
              {` `}Viewing in preview mode{' '}
              <Link href={`/api/clear-preview`}>
                <button className={blogStyles.escapePreview}>
                  Exit Preview
                </button>
              </Link>
            </div>
          </div>
        )}
        <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
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
                    color: 'dark-4',
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
          </Box>{' '}
          <Box margin="large" alignSelf="center">
            <Button
              secondary
              focusIndicator={false}
              hoverIndicator={{
                background: {
                  color: 'neutral-3',
                },
                elevation: 'none',
              }}
              label="More Posts"
              margin="auto"
              color="neutral-3"
              href="/blog"
            ></Button>
          </Box>
        </div>
      </div>
    </>
  )
}
