import React from 'react'

import { auth, authenticateUser } from '../../firebase'
import Table from '../Table'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticating: true
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          displayName: user.displayName,
          refreshToken: user.refreshToken,
          accessToken: null,
          isAuthenticating: false
        })
      }
    })
  }

  authenticate = () => {
    this.setState({
      isAuthenticating: true
    })

    authenticateUser().then(result => {
      this.setState({
        displayName: result.user.displayName,
        accessToken: result.credential.accessToken,
        refreshToken: null,
        isAuthenticating: false
      })
    })
  }

  render() {
    const { isAuthenticating, displayName, refreshToken, accessToken } = this.state
    const entries = []

    return (
      <div>
        <header>
          <h1>Firebase Authentication</h1>
        </header>
        {!isAuthenticating && (
          <React.Fragment>
            {!(refreshToken || accessToken) && (
              <button onClick={this.authenticate}>Authenticate</button>
            )}
            {displayName && <p>{displayName}</p>}
            {entries && entries.length > 0 && <Table entries={entries} />}
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default App
