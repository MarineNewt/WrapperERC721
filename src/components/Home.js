import React, { Component } from 'react'
import HSection from './HSection';


class Home extends Component {
  render() {
    return (
        <div className="" >
          <div className='centerit'>{/*Compbox removed */}
            <HSection 
                    section={this.props.section}
                    sectionTier={this.props.sectionTier}
                    deploy={this.props.deploy}/>
                    <br></br>
          </div>
          <br></br>
        </div>
    );
  }
}

export default Home;