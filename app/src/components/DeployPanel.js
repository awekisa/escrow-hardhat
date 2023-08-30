import deploy from '../scripts/deploy';
import createEscrow from '../scripts/createEscrow';
import { weiToEth } from '../scripts/ethConverter';
import { persist } from '../scripts/addressRepository';

export default function DeployPanel({signer, escrows, setEscrows}) {
    async function newContract(e) {
        try {
          const beneficiary = document.getElementById('beneficiary').value;
          const arbiter = document.getElementById('arbiter').value;
      
          const value = weiToEth(document.getElementById('eth').value);
          const escrowContract = await deploy(signer, arbiter, beneficiary, value);
      
          const escrow = createEscrow(escrowContract.address, arbiter, beneficiary, value, escrowContract, signer, false, e);
      
          await persist(await signer.getAddress(), escrow.address);
      
          setEscrows([...escrows, escrow]);      
        } catch {
          alert('Transaction failed!');
        }
      }

    return (
        <div className="contract">
        <h1> New Contract </h1>
        <label>
          Arbiter Address
          <input type="text" id="arbiter" />
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in ETH)
          <input type="text" id="eth" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract(e);
          }}
        >
          Deploy
        </div>
      </div>
    )
}