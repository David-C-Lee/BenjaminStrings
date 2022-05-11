import React, { Component } from 'react'
import MetaMaskAuth from "../util/metamask-auth";

class signup extends Component {
    render() {
        return (
            <main>
                <div>
                  <h1>Sign in (MetaMask)</h1>
                </div>
                <div className="logoContainer">
                    {/* <img src={MetaMaskLogo} height={90}/> */}
                </div>
                <MetaMaskAuth onAddressChanged={address => {}}/>
            </main>
        )
    }
}

export default signup