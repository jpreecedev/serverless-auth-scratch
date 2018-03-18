import React from 'react'
import styles from './styles'

import { auth, authenticateUser } from '../../firebase'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      accessToken: null,
      refreshToken: null
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          displayName: user.displayName,
          refreshToken: user.refreshToken,
          accessToken: null
        })
      }
    })
  }

  authenticate = () => {
    authenticateUser().then(result => {
      this.setState({
        displayName: result.user.displayName,
        accessToken: result.credential.accessToken,
        refreshToken: null
      })
    })
  }

  render() {
    const { displayName } = this.state

    return (
      <header>
        <h1>Firebase Authentication</h1>
        <button onClick={this.authenticate}>Authenticate</button>
        {displayName && <p>{displayName}</p>}
      </header>
    )
  }
}

export default App
