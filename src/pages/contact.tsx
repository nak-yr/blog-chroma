import Header from '../components/header'
import ExtLink from '../components/ext-link'

import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'

import GitHub from '../components/svgs/github'
import Twitter from '../components/svgs/twitter'
import Envelope from '../components/svgs/envelope'
import LinkedIn from '../components/svgs/linkedin'

const contacts = [
  {
    Comp: GitHub,
    alt: 'github icon',
    link: 'https://github.com/nak-yr',
  },
  {
    Comp: LinkedIn,
    alt: 'linkedin icon',
    link: 'http://example.com',
  },
  {
    Comp: Envelope,
    alt: 'envelope icon',
    link: 'mailto:nkwork874@gmail.com?subject=Notion Blog',
  },
]

export default function Contact() {
  return (
    <>
      <Header titlePre="Contact" />
      <div className={sharedStyles.layout}>
        <div className={contactStyles.avatar}>
          <img src="/myavatar.jpg" alt="avatar with letters JJ" height={60} />
        </div>
        <h1 style={{ marginTop: 0 }}>Contact</h1>

        <div className={contactStyles.name}>Nakayama</div>

        <div className={contactStyles.links}>
          {contacts.map(({ Comp, link, alt }) => {
            return (
              <ExtLink key={link} href={link} aria-label={alt}>
                <Comp height={32} />
              </ExtLink>
            )
          })}
        </div>
      </div>
    </>
  )
}
