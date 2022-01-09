import Header from '../components/header'
import ExtLink from '../components/ext-link'
import sharedStyles from '../styles/shared.module.css'

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
      <div className={sharedStyles.layout}>
        <h1>My Works</h1>
        <hr />
        {myworks.map(({ title, siteuri, ghuri, description }) => (
          <div className={sharedStyles.layout} key={title}>
            <h2>{title}</h2>
            {/*要素が存在すれば描画する*/}
            <center>
              {siteuri && (
                <>
                  <p>Site URI</p>
                  <ExtLink key={ghuri} href={ghuri}>
                    {siteuri}
                  </ExtLink>
                </>
              )}
              {ghuri && (
                <>
                  <p>GitHub URI</p>
                  <ExtLink key={ghuri} href={ghuri}>
                    {ghuri}
                  </ExtLink>
                </>
              )}
              {description && (
                <>
                  <p>Description</p> {description}
                </>
              )}
            </center>
            <hr />
          </div>
        ))}
      </div>
    </>
  )
}
