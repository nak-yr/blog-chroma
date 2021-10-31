import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import sharedStyles from '../styles/shared.module.css'

export default function Index() {
  return (
    <>
      <Header titlePre="Home" />
      <div className={sharedStyles.layout}>
        <img
          src="/vercel-and-notion.png"
          height="85"
          width="250"
          alt="Vercel + Notion"
        />
        <h1>Chroma</h1>
        <h2>
          Blazing Fast Notion Blog with Next.js'{' '}
          <ExtLink
            href="https://github.com/vercel/next.js/issues/9524"
            className="dotted"
            style={{ color: 'inherit' }}
          >
            SSG
          </ExtLink>
        </h2>

        <Features />

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
