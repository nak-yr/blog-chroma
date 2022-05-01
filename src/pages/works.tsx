import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Link from 'next/link'
import sharedStyles from '../styles/shared.module.css'

import { Box, Grid, Heading, Paragraph, Button } from 'grommet'

const myworks: {
  title: string
  siteuri: string
  ghuri: string
  description: string
  topic: string[]
}[] = [
  {
    title: '1ページPDFをPNG形式に変換するツール',
    siteuri: '',
    ghuri: 'https://github.com/nak-yr/convert_pdf-to-png',
    description:
      'PDF形式で出力される画像データは、パワーポイント等に貼ろうとすると難儀するので、PNG形式に変換するために作成しました。Pythonスクリプトで、単一ページPDFの場合にのみ使用可能です。ソースコードをGitHubに公開しています。',
    topic: ['python'],
  },
  {
    title: '簡易的なコロナ情報サイト',
    siteuri: 'https://simpleinfo-covid19.web.app',
    ghuri: 'https://github.com/nak-yr/simpleinfo-covid19',
    description:
      '国が公開しているjson形式のコロナ関連の情報を、わかりやすい指標でまとめたサイトです。',
    topic: ['React', 'firebase', 'hosting'],
  },
]

export default function Works() {
  return (
    <>
      <Header titlePre="Works" />

      <div className={sharedStyles.works}>
        <Heading
          color="neutral-3"
          margin="medium"
          size="large"
          textAlign="center"
        >
          My Works
        </Heading>
        <Box
          align="center"
          direction="row-responsive"
          pad="medium"
          gap="medium"
          justify="center"
        >
          {myworks.map(({ title, siteuri, ghuri, description, topic }) => (
            <Box
              key={title}
              align="center"
              alignSelf="start"
              border={{
                size: 'small',
                style: 'solid',
                color: 'dark-4',
              }}
              pad="medium"
              round
            >
              <Heading level={2} size="medium">
                {title}
              </Heading>
              {/*要素が存在すれば描画する*/}
              {topic && (
                <Paragraph
                  textAlign="center"
                  size="large"
                  margin="medium"
                  color="dark-3"
                >
                  {topic.join(' / ')}
                </Paragraph>
              )}
              {description && (
                <Paragraph
                  textAlign="center"
                  size="large"
                  margin="medium"
                  color="dark-3"
                >
                  {description}
                </Paragraph>
              )}
              <Heading level="3" alignSelf="center" color="dark-4">
                View on
              </Heading>
              <Box align="center" direction="row" gap="medium">
                {siteuri && (
                  <Link href={siteuri}>
                    <Button label="site" margin="auto" />
                  </Link>
                )}
                {ghuri && (
                  <Link href={ghuri}>
                    <Button label="GitHub" margin="auto" />
                  </Link>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </div>
    </>
  )
}
