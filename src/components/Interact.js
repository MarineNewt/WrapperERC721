import React, { Component } from 'react'




class Interact extends Component {
  
  render() {
    return (
        <div className='section' style={{}}>
           {(this.props.LoadedAddress === '0x0000000000000000000000000000000000000000' || !this.props.WrapperOrigin) && <div className="centerit" style={{}}>
            <h1 className="centerit" style={{}}>Load Wrapper</h1>
            <br></br>
            <form onSubmit={(event) => {
            event.preventDefault()
            let ContractTL = this.input1.value.toString()
            this.props.loadContract(ContractTL)}}>
              
            <div className='input-group mt-1 centerit' style={{width: '50vw'}}>
              <input
                type="text"
                ref={(input) =>  { this.input1 = input }}
                className="form-control form-control-lg"
                placeholder="Wrapper to Load"
                required
                style={{height: "calc(.5vw + 35px)"}} />
            </div>
                  <br></br>
               <button type="submit" className='inputbtn centerit' style={{background: ''}}>Load</button>
            </form>
            <br></br>
          </div>}
          {this.props.LoadedAddress !== '0x0000000000000000000000000000000000000000' && this.props.WrapperOrigin && <div className="centerit"><h1>Wrapper: {this.props.LoadedAddress}</h1><h2>Wrapped Contract: {this.props.WrapperOrigin}</h2><br></br>
            <form onSubmit={(event) => {
            event.preventDefault()
            let token = this.input2.value
            this.props.WrapUnwrap(true, token)}}>
              
            <div className='input-group mt-1 centerit' style={{width: '40vw'}}>
              <input
                type="number"
                ref={(input) =>  { this.input2 = input}}
                className="form-control form-control-lg"
                placeholder="Token ID"
                required
                style={{height: "calc(.5vw + 35px)" }}/>
                <button type="submit" className='inputbtn centerit' style={{background: ''}}>Wrap</button>
            </div>
            </form>
            <form onSubmit={(event) => {
            event.preventDefault()
            let token = this.input3.value
            this.props.WrapUnwrap(false, token)}}>
              
            <div className='input-group mt-1 centerit' style={{width: '40vw'}}>
              <input
                type="number"
                ref={(input) =>  { this.input3 = input }}
                className="form-control form-control-lg"
                placeholder="Token ID"
                required
                style={{height: "calc(.5vw + 35px)" }}/>
                <button type="submit" className='inputbtn centerit' style={{background: ''}}>Unwrap</button>
            </div>
            </form>
          </div>}
        </div>
    );
  }
}

export default Interact;