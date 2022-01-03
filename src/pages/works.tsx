import { Http2ServerRequest } from 'http2'
import Header from '../components/header'
import sharedStyles from '../styles/shared.module.css'

const myworks = [
  {
    title: 'sample1',
    uri: 'http://example.com',
    description: 'My work 1',
  },
  {
    title: 'sample2',
    uri: 'http://example.com',
    description: 'My work 2',
  },
  {
    title: 'sample3',
    uri: 'http://example.com',
    description: 'My work 3',
  },
]

export default function Works() {
  return (
    <>
      <Header titlePre="Works" />
      <div className={sharedStyles.layout}>
        <h1>My Works</h1>
        <center>
          {myworks.map(({ title, uri, description }) => (
            <ul key={title}>
              <li>{title}</li>
              <li>{uri}</li>
              <li>{description}</li>
            </ul>
          ))}
        </center>
      </div>
    </>
  )
}
