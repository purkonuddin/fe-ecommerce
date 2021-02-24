import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarComp from "../layout/navbar"; 
import ImageSlider from "../layout/slide"; 
import CategoryComp from "../layout/category";
import '../../styles/home.css'
import { getSlide } from "../../redux/actions/slide";
import { getCategories } from "../../redux/actions/category";


class Home extends Component {
  constructor(props) {
    super(props);

    this.mediaQuery = {
        desktop: 1200,
        tablet: 768,
        phone: 576,
      };

    this.state = { 
      windowWidth: document.body.clientWidth,
    };
  }

  componentDidMount = async () => {
    await this.props.dispatch(getSlide());
    await this.props.dispatch(getCategories());
  }

  render() {
    return (
      <div className='' > 
        <NavbarComp />
        <div>
          {this.props.slide.isFulfilled &&
            <ImageSlider slides={this.props.slide.getSlides.data}/>
          } 
          <div>
          {this.props.category.isFulfilled &&
           <CategoryComp categories={this.props.category.getCategories.data}/>
          } 
          </div>
          <div>
            <p>Content here..</p>
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    slide: state.slide,
    category: state.category
  };
};

export default connect(mapStateToProps)(Home);
