import React from 'react'
import Globalize from 'globalize'
import Router from 'next/router'
import Link from 'next/link'
import { NextAuth } from 'next-auth-client'
import { messageFormatter as t } from 'globalize'
import Page from '../client/site/components/page'
import Head from '../client/site/components/head'
import Header from '../client/site/components/header'
import PostGrid from '../client/site/components/post-grid'
import { t, setLocale } from '../client/i18n'

export default class extends Page {
  static async getInitialProps ({ req }) {
    return {
      session: await NextAuth.init({ req }),
      locale: 'es'
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      posts: []
    }
    this.handleSignOutSubmit = this.handleSignOutSubmit.bind(this)
    setLocale(this.props.locale)
  }

  handleSignOutSubmit (event) {
    event.preventDefault()
    NextAuth.signout()
      .then(() => {
        Router.push('/auth/callback')
      })
      .catch(() => {
        Router.push('/auth/error?action=signout')
      })
  }

  render () {
    return (
      <div className='container'>
        <Head {...this.props} />
        <Header
          settings={this.props.settings}
          session={this.props.session} />
        <div className='text-center'>
          <h1 className="display-4 mt-3 mb-3">{t('index/title')}</h1>
          <p className='lead mt-3 mb-3'>Work in progress.</p>
        </div>
        <PostGrid />
      </div>
    )
  }
}

// export class SignInMessage extends React.Component {
//   render () {
//     if (this.props.session.user) {
//       return (
//         <React.Fragment>
//           <p><Link href='/auth'><a className='btn btn-secondary'>Manage Account</a></Link></p>
//           <form id='signout' method='post' action='/auth/signout' onSubmit={this.handleSignOutSubmit}>
//             <input name='_csrf' type='hidden' value={this.props.session.csrfToken} />
//             <button type='submit' className='btn btn-outline-secondary'>Sign out</button>
//           </form>
//         </React.Fragment>
//       )
//     } else {
//       return (
//         <React.Fragment>
//           <p><Link href='/auth'><a className='btn btn-primary'>Sign in</a></Link></p>
//         </React.Fragment>
//       )
//     }
//   }
// }
