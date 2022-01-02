import Header from '../components/header'
import sharedStyles from '../styles/shared.module.css'

export default function Me() {
  return (
    <>
      <Header titlePre="Me" />
      <div className={sharedStyles.layout}>
        <h1>About Me</h1>
      </div>
    </>
  )
}
