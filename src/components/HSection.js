import React, { Component } from 'react'




class HSection extends Component {
  
  render() {
    return (
        <div className='section' style={{}}>
          <div className="centerit" style={{}}>
            <h1 className="centerit" style={{}}>Contract Wrapper</h1>
            <br></br>
            <div className="flex">
              <form className="fitcontent" onSubmit={(event) => { event.preventDefault();this.props.setCType(721)}}> {this.props.contractType === 721 && <button className="typeButtonA submit" >ERC721</button>} {this.props.contractType !== 721 && <button className="typeButton submit" >ERC721</button>}</form>
              <form className="fitcontent" onSubmit={(event) => { event.preventDefault();this.props.setCType(1155)}}> {this.props.contractType === 1155 && <button className="typeButtonA submit" >ERC1155</button>} {this.props.contractType !== 1155 && <button className="typeButton submit" >ERC1155</button>} </form>
            </div>
            <form onSubmit={(event) => {
            event.preventDefault()
            let ContractTBW
            let TokenName
            let TokenSYM
            ContractTBW = this.input1.value.toString()
            TokenName = this.input2.value.toString()
            TokenSYM = this.input3.value.toString()
            this.props.deploy(ContractTBW, TokenName, TokenSYM)}}>
              
            <div className='input-group mt-1 centerit' style={{width: '50vw'}}>
              <input
                type="text"
                ref={(input) =>  { this.input1 = input }}
                className="form-control form-control-lg"
                placeholder="Contract to Wrap"
                required
                style={{height: "calc(.5vw + 35px)"}} />
              <input
                type="text"
                ref={(input) =>  { this.input2 = input }}
                className="form-control form-control-lg"
                placeholder="Token Name"
                required
                style={{height: "calc(.5vw + 35px)", marginLeft: '5px'}} />
              <input
                type="text"
                ref={(input) =>  { this.input3 = input }}
                className="form-control form-control-lg"
                placeholder="Token Symbol"
                required
                style={{height: "calc(.5vw + 35px)", marginLeft: '5px'}} />
            </div>
                  <br></br>
               <button type="submit" className='inputbtn centerit' style={{background: ''}}>Deploy</button>
            </form>
          </div>
        </div>
    );
  }
}

export default HSection;