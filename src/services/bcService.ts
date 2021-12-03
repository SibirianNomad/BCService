import Web3 from 'web3'
import * as config from '../config'
import abi from '../../contracts/contract'
// import abi_token from '../../contracts/contract_token'

export const Web3Http = new Web3(new Web3.providers.HttpProvider(config.BcVariable.http_provider))

export const Web3Wss = new Web3(new Web3.providers.WebsocketProvider(config.BcVariable.wss_provider))

export const Contract = new Web3Wss.eth.Contract(abi as any, config.BcVariable.contract_address)

// export const ContractToken = new Web3Wss.eth.Contract(abi_token as any, '0x465aA465A465A465A132a68A132A468a132A6813')
