import { ethToWei, weiToEth } from './ethConverter';
import approve from './approve';

export default function createEscrow(
    address,
    arbiter,
    beneficiary,
    value,
    escrowContract,
    signer, 
    isApproved
  ) {
    return {
      address: address,
      arbiter: arbiter,
      beneficiary: beneficiary,
      value: ethToWei(value),
      isApproved: isApproved,
      handleApprove: async (e) => {
        try {
          escrowContract.on('Approved', () => {
            if (e) {
                e.currentTarget.disabled = true;
            }
            document.getElementById(address).className =
              'complete';
            document.getElementById(address).innerText =
              "✓ It's been approved!";
          });
    
          await approve(escrowContract, signer);
        } catch {
          alert('Transaction failed!');
        }
      }
    };    
  }