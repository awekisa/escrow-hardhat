import { ethers } from 'ethers';
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow.json';
import createEscrow from './createEscrow';

export default async function getDeploydContract(address, signer, provider) {
  const escrowContract = new ethers.Contract(
    address,
    Escrow.abi,
    signer
  );
  
  const isApproved = await escrowContract.isApproved();
  const arbiter = await escrowContract.arbiter();
  const beneficiary = await escrowContract.beneficiary();
  const value = isApproved ? await escrowContract.lockedValue() : await provider.getBalance(escrowContract.address);

  return createEscrow(
    escrowContract.address,
    arbiter, 
    beneficiary, 
    value,
    escrowContract, 
    signer, 
    isApproved);
}
