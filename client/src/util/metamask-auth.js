import React, { useEffect, useState } from "react";
import styles from "./metamask-auth.module.css";

// import PropTypes from 'prop-types';
// import { loginUser } from '../redux/actions/userActions';
import store from '../redux/store';
import { SET_AUTHENTICATED } from '../redux/types';
import { getUserData, loginUser } from '../redux/actions/userActions';

async function connect(onConnected) {
    if (!window.ethereum) {
      alert("Get MetaMask!");
      return;
    }
  
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  
    onConnected(accounts[0]);    
}

async function checkIfWalletIsConnected(onConnected) {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
  
      if (accounts.length > 0) {
        const account = accounts[0];
        onConnected(account);

        //// store.dispatch(getUserData());
        //// loginUser();

        return;
      }
    }
}


export default function MetaMaskAuth({ onAddressChanged }) {
    const [userAddress, setUserAddress] = useState("");
  
    useEffect(() => {
      checkIfWalletIsConnected(setUserAddress);
    }, []);
  
    useEffect(() => {
      onAddressChanged(userAddress);
    }, [userAddress]);
  
    console.log(userAddress);

    if(userAddress.length > 0) {
        const fetch = require("node-fetch");

        var strContractAddress = "0x4509355a7B63c9235138640CF0bC5648e3B5bEDA"; //TODO: change from Pepper Pass

        fetch("https://polygon-mainnet.g.alchemyapi.io/v2/demo/getNFTs/?owner=" + userAddress + "&contractAddresses[]=" + strContractAddress, {
            method : "GET"
        }).then(
            response => response.json()
        ).then(json => {
            // console.log(json.ownedNfts[0].balance);
            if (json.totalCount > 0)
            {
                console.log(json + " test")
                store.dispatch({ type: SET_AUTHENTICATED });
            }
        });
    }


    return userAddress ? (
      <div>
        Connected with <Address userAddress={userAddress} />
      </div>
      // TODO: set authenticated
    ) : (
       <Connect setUserAddress={setUserAddress}/>
    );
}


function Connect({ setUserAddress }) {
  return (
    <button className={styles.button} onClick={() => connect(setUserAddress)}>
      Connect with MetaMask
    </button>
  );
}


function Address({ userAddress }) {
  return (
    <span className={styles.address}>{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>
  );
}


// const mapStateToProps = (state) => ({
//     user: state.user,
//     UI: state.UI
// });

// const mapActionsToProps = {
//     loginUser
// }

// export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));