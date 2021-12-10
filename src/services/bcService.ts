import Web3 from 'web3'
import * as config from '../config'
import abi from '../../contracts/contract'
import abi_token from '../../contracts/contract_token'

export const Web3Http = new Web3(new Web3.providers.HttpProvider(config.BcVariable.http_provider))

export const Web3Wss = new Web3(new Web3.providers.WebsocketProvider(config.BcVariable.wss_provider))

export const Contract = new Web3Wss.eth.Contract(abi as any, config.BcVariable.contract_address)

interface TokenData {
  symbol: string;
  name: string;
  decimals: string;
  totalSupply: string;
}

export const checkApiPayload = async (token_id:string, address:string):Promise<string> => {
  const list_tokens = await Contract.methods.getListTokens().call()
  const check_token = list_tokens.some((element) => element === token_id)
  const check_address = Web3Http.utils.isAddress(address)

  if (!check_address) {
    return 'incorrect wallet'
  }
  if (!check_token) {
    return 'incorrect token id'
  }
}

export const getTokenInfo = async (token_id:string):Promise<TokenData> => {
  const contract = new Web3Wss.eth.Contract(abi_token as any, token_id)
  const [symbol, name, decimals, totalSupply] = await Promise.all([
    contract.methods.symbol().call(),
    contract.methods.name().call(),
    contract.methods.decimals().call(),
    contract.methods.totalSupply().call()
  ])
  return { symbol, name, decimals, totalSupply }
}

export const initTokenContract = async (token_id:string, private_key:string):Promise<any> => {
  const acc = await initAccountWithPrivateKey(private_key)
  return new Web3Http.eth.Contract(abi_token as any, token_id, { from: acc.address })
}

export const initContract = async (private_key:string):Promise<any> => {
  const acc = await initAccountWithPrivateKey(private_key)
  return new Web3Http.eth.Contract(abi as any, config.BcVariable.contract_address, { from: acc.address })
}

export const initAccountWithPrivateKey = async (private_key:string):Promise<any> => {
  const account = Web3Http.eth.accounts.privateKeyToAccount(private_key)
  return Web3Http.eth.accounts.wallet.add(account)
}
