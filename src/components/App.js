import React, { Component } from 'react';
import NavBar from './NavBar.js';
import Home from './Home.js';
import Interact from './Interact.js';
import Web3 from 'web3';
import './App.css';
import {
  solidityCompiler,
} from '@agnostico/browser-solidity-compiler';
import NFTcon from '../contracts/Wrapper.json';
import content from '../InitContract/Wrapper.sol';
import Axios from "axios";



class App extends Component {

  async UNSAFE_componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    setInterval(() => {
      this.loadBlockchainData();
    }, 20000);
  }


  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-ethereum browser detected. Metamask install is recommended.')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId() 
    let blockNumber = await web3.eth.getBlockNumber()
    this.setState({ blockNumber: blockNumber })
    let block = await web3.eth.getBlock(blockNumber)
    if(block){
      let blocktime = block['timestamp']
      this.setState({ blocktime: blocktime })}
    if(this.state.NFTContract._address === undefined){const NFTContractData = NFTcon.networks[networkId]
      if(NFTContractData) {
        const NFTContract = new web3.eth.Contract(NFTcon.abi, NFTContractData.address)
        this.setState({ NFTContract })
        this.setState({ LoadedContract: NFTContract._address})
        }
      else {
        window.alert('Please switch to the Ethereum Network ')
        }
    }
    this.setState({ loading: false })
  }

  loadWallet = () => {
    if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    window.ethereum.enable()}
    else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)}
    else {
    window.alert('Non-ethereum browser detected. Metamask install is recommended.')
    }
    setInterval(() => {
      this.loadBlockchainData();
    }, 15000);
  }
  loadContract = (ContractAddress) => {
    this.setState({ loading: true })
    const web3 = window.web3
    const NFTContract = new web3.eth.Contract(NFTcon.abi, ContractAddress)
    this.setState({ NFTContract })
    NFTContract.methods.WrappedContract().call().then((res) => {this.setState({ WrapperOrigin: res });})
    this.setState({ loading: false })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deploy = (ContractTBW, TokenName, TokenSYM) => {
    if(this.state.account === '0x0'){this.loadWallet(); return}
    Axios(content).then((response) => {
      response.data = response.data.replace("///TokenName", TokenName)
      response.data = response.data.replace('///TokenSYM', TokenSYM)
    console.log(response.data)
    solidityCompiler({ 
      version: 'https://binaries.soliditylang.org/bin/soljson-v0.8.17+commit.8df45f5f.js',
       contractBody: response.data,
      }).then((res) => {console.log(res.contracts.Compiled_Contracts.Wrapper.evm.bytecode.object);

    this.state.NFTContract.deploy({
      data: res.contracts.Compiled_Contracts.Wrapper.evm.bytecode.object,
      arguments: [ContractTBW]
    }).send({from: this.state.account }).then(function(newContractInstance){
      console.log(newContractInstance.options.address) // instance with the new contract address
      });

    })})
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  page = (pageselect) => {
    this.setState({ pageTier: pageselect})
  }
  section = (sectionselect) => {
    if(sectionselect === 1){sectionselect = this.state.sectionTier + 1}
    if(sectionselect === 0){sectionselect = this.state.sectionTier - 1}
    //overflows rotate
    if(sectionselect === 0){sectionselect = 3}
    if(sectionselect === 4){sectionselect = 1}
    this.setState({ sectionTier: (sectionselect)})
  }
  sectionDirect = (sectionselect) => {
    this.setState({ sectionTier: (sectionselect)})
    if(sectionselect > 1){
      this.setState({loading: true})
      setTimeout(() => {
        this.setState({loading: false})
      }, 3000);
    }
  }

  WrapUnwrap = (wrap, token) => {
    if(this.state.account === '0x0'){this.loadWallet(); return}
    this.setState({loading: true})
    console.log(token)
    if(wrap){this.state.NFTContract.methods.Wrap(token).send({ from: this.state.account, }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })}
    else{this.state.NFTContract.methods.UnWrap(token).send({ from: this.state.account, }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })}
  }



  

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      NFTContract: {},
      WrapperOrigin: '',
      NFTContractSupply: 0,
      NFTContractBalance: 0,
      pageTier: 1,
      sectionTier: 1,
      blockNumber: 0,
      blocktime: 0,
      loading: false
    }
  }
  
  render() {
    let content
    if (this.state.pageTier === 1) {
      content = <Home   
                  deploy={this.deploy}   
                  />}   
    if (this.state.pageTier === 2) {
      content = <Interact   
                  loadContract={this.loadContract}
                  WrapUnwrap={this.WrapUnwrap}
                  LoadedAddress={this.state.NFTContract._address}
                  WrapperOrigin={this.state.WrapperOrigin}
                  />}   
    if (this.state.loading === true) {
      content = <div className="loading-icon centerit"></div>
    }  
    return (
      <div className="backgrounder">
        <NavBar 
          account = {this.state.account}
          page={this.page}
          style={{zIndex: 99}}/>
        <div className="contentboxer">{content}</div>
      </div>
  );}}

export default App;
