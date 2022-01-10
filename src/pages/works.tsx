import Header from '../components/header'
import ExtLink from '../components/ext-link'
import sharedStyles from '../styles/shared.module.css'

import { Box, Card, CardBody, CardHeader, Grid, Heading } from 'grommet'

const myworks: {
  title: string
  siteuri: string
  ghuri: string
  description: JSX.Element
}[] = [
  {
    title: '1ページPDFをPNG形式に変換するツール',
    siteuri: '',
    ghuri: 'https://github.com/nak-yr/convert_pdf-to-png',
    description: (
      <p>
        PDF形式で出力される画像データは、パワーポイント等に貼ろうとすると難儀するので、PNG形式に変換するために作成しました。
        <br />
        Pythonスクリプトで、単一ページPDFの場合にのみ使用可能です。ソースコードをGitHubに公開しています。
      </p>
    ),
  },
  {
    title: '簡易的なコロナ情報サイト',
    siteuri: 'https://simpleinfo-covid19.web.app',
    ghuri: 'https://github.com/nak-yr/simpleinfo-covid19',
    description: (
      <p>
        国が公開しているjson形式のコロナ関連の情報を、わかりやすい指標でまとめたサイトです。
      </p>
    ),
  },
]

export default function Works() {
  return (
    <>
      <Header titlePre="Works" />

      <div className={sharedStyles.works}>
        <Heading color="brand" margin="medium" size="large" textAlign="center">
          My Works
        </Heading>
        <Box
          align="center"
          animation="fadeIn"
          direction="column"
          pad="medium"
          gap="medium"
        >
          {myworks.map(({ title, siteuri, ghuri, description }) => (
            <Card key={title} background="light-2" height="100%" width="large">
              <CardHeader
                justify="center"
                pad={{ horizontal: 'medium', vertical: 'small' }}
              >
                <Heading level={2} size="medium">
                  {title}
                </Heading>
              </CardHeader>
              {/*要素が存在すれば描画する*/}
              <CardBody pad="medium" align="center">
                {siteuri && (
                  <>
                    Site URI
                    <br />
                    <ExtLink key={siteuri} href={siteuri}>
                      {siteuri}
                    </ExtLink>
                  </>
                )}
                {ghuri && (
                  <>
                    GitHub URI
                    <br />
                    <ExtLink key={ghuri} href={ghuri}>
                      {ghuri}
                    </ExtLink>
                  </>
                )}
                {description && (
                  <>
                    Description
                    <br />
                    {description}
                  </>
                )}
              </CardBody>
            </Card>
          ))}
        </Box>
      </div>
    </>
  )
}
