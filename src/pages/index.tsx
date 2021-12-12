import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import sharedStyles from '../styles/shared.module.css'

export default function Index() {
  return (
    <>
      <Header titlePre="Home" />
      <div className={sharedStyles.layout}>
        <h1>Chroma</h1>
        <h2>技術系の話題を中心に書いていく個人ブログ</h2>

        {/*<Features />*/}

        <div className="explanation">
          <p>
            NotionをHeadless
            CMSとして利用し、フロントエンドはNext.jsを用いたSSRで作成しようとしているブログです。
          </p>
        </div>
      </div>
    </>
  )
}
