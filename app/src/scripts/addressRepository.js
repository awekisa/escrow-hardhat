import server from './server';

async function persist(signerAddress, contractAddress) {
    await server.post('add', {
        address: signerAddress,
        contract: contractAddress
      });
}

async function fetch(address) {
    const { 
        data: { addresses },
      } = await server.post(`escrows`, {
        address: address
      });

      return addresses;
}

export { persist, fetch }