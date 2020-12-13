import React, {Component} from 'react'
import {CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import './Home.css'
import logo from '../images/jon-snow.jpg'
import logo1 from '../images/Ramsay_S06E09_RESZIED_FOR_INFOBOX.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRadiationAlt, faAtom, faBolt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import { connect } from 'react-redux'
import axios from 'axios'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Swal from 'sweetalert2'
import { bindActionCreators } from 'redux'
import valueAction from '../actions/valueAction'

library.add(faRadiationAlt)
library.add(faAtom)
library.add(faBolt)

class Home extends Component{
  constructor(props) {
    super(props)
    this.state = {data:[]}
  }

  componentDidUpdate() {
    clearTimeout(this.timeout);
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  async componentDidMount() {
    let king=this.props.values.kingsValue
    let types=this.props.values.typesValue
    let location=this.props.values.locationValue

    king = king.slice(0, king.length-1)
    types = types.slice(0, types.length-1)
    location = location.slice(0, location.length-1)
    try{
    const info = await axios.get(`https://backend-assignment-careerninja.herokuapp.com/api/battle/search?king=${king}&type=${types}&location=${location}`)

    console.log(info.data.data)
    this.setState(
      {data:info.data.data}
    )
    }
    catch(e){
      console.log(e)
    }
    
  }

  render() {
    
    if (!this.state.data[0]) {
      this.timeout = setTimeout(() => {
        Swal.fire({
          title: "Invalid data",
          text: "Please provide a valid set of information",
          icon: "error",
        }).then((result) => {
          if (result.value) {
            this.props.valueAction({ optionsKing: [], optionsTypes:[], optionsLocations:[], kingsValue:"", typesValue:"", locationValue:"" })
            this.props.history.goBack()
          }
        })
      }, 10000)

      return(
        <Loader type="Audio" color="black" className="loader" height={200} width={200} />
      )

    }
    else{

    }
    return(
      <div className="jumbotron jumbotron-fluid outer__container">
        <div className="container-fluid inner__container__0" style={{textAlign:"center"}}>
          <div>
          <h1 className="h1__class" style={{color:"white"}}>{this.state.data[0].name}</h1>
          </div>
        </div>
        <div className="card-group container inner__container__1">
          <div className="card inner__card__1">
           <div className="card-body innermost__1">
            <CircularProgressbarWithChildren className="myCircularBar" styles={buildStyles({pathColor: '#41978F', strokeLinecap: 'round', backgroundColor: 'transparent'})} minValue={0} maxValue={100000} background={true} backgroundPadding={30} strokeWidth={1} value={this.state.data[0].attacker_size}>
              <img className="card-img-top" src={logo} alt="doge" />
              <div className="text__1">
                <strong className="text__1__0">{this.state.data[0].attacker_king}</strong>
              </div>
             <div className="div-line"></div>
             <div className="text__2">
                <strong className="text__2__0">{this.state.data[0].attacker_outcome === "win" ? "Win" : "Lose"}</strong>
              </div>
            </CircularProgressbarWithChildren >
           </div>
          </div>
          <div className="card inner__card__2">
            <div className="card-body innermost__2">
              <CircularProgressbarWithChildren  className="myCircularBar" styles={buildStyles({pathColor: '#CD3540', strokeLinecap: 'round', backgroundColor: 'transparent'})} minValue={0} maxValue={100000} background={true} backgroundPadding={30} strokeWidth={1} value={this.state.data[0].defender_size}>
                <img className="card-img-top"  src={logo1} alt="doge" />
                <div className="text__1">
                <strong className="text__1__0">{this.state.data[0].defender_king}</strong>
              </div>
              <div className="div-line"></div>
              <div className="text__2">
                  <strong className="text__2__0">{this.state.data[0].attacker_outcome === "win" ? "Lose" : "Win"}</strong>
                </div>
              </CircularProgressbarWithChildren>
            </div>
        </div>
      </div>
      <div className="card-group container inner__container__2 w-75">
        <div className="card inner__card__3">
          <div>
          <div className="d-flex pt-2">
            <div className="p-2 flex-fill"><FontAwesomeIcon icon="radiation-alt" size="1x"/> 183</div>
            <div className="p-2 flex-fill"><FontAwesomeIcon icon="atom" size="1x"/> 75</div>
            <div className="p-2 flex-fill"><FontAwesomeIcon icon="bolt" size="1x"/> 64%</div>
          </div>
          </div>
        </div>
        <div className="card inner__card__4">
          <div>
          <div className="d-flex pt-2">
            <div className="p-2 flex-fill"><FontAwesomeIcon icon="radiation-alt" size="1x"/> 139</div>
            <div className="p-2 flex-fill"><FontAwesomeIcon icon="atom" size="1x"/> 99</div>
            <div className="p-2 flex-fill"><FontAwesomeIcon icon="bolt" size="1x"/> 89%</div>
          </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    valueAction:valueAction
  }, dispatch)
}
function mapStateToProps(state){
  return(
    {
      values:state.values
    }
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)