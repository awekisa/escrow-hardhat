import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { fetch } from './scripts/addressRepository';
import getDeploydContract from './scripts/getDeploydContract';
import Escrow from './components/Escrow';
import DeployPanel from './components/DeployPanel';

const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    async function getEscrows() {
      let mappedEscrows = [];
      const deployedAddresses = await fetch(await signer.getAddress());
      for(let index in deployedAddresses) {
          const escrow = await getDeploydContract(deployedAddresses[index], signer, provider);
        mappedEscrows.push(escrow);
      }

      setEscrows(mappedEscrows);
    }

    getAccounts();

    if (escrows.length === 0 && signer) {
      getEscrows();
    }
  }, [account]);

  return (
    <>
      <DeployPanel signer={signer} escrows={escrows} setEscrows={setEscrows} />

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          }).toReversed()}
        </div>
      </div>
    </>
  );
}

export default App;
