import React from 'react'; 
import {SideBottom, SideUp} from '../../assets/properties';

class MyTabs extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected,
            selectedTab: this.props.selectedTab
        }
    }
    
    // let tab = 0

    setSelected(selected) {
        if (selected !== this.state.selected) {
          this.setState({ selected })
        }
    }
    
    handleClick(tab) {
        // console.log(tab, 'selected==> ', this.state.selected);
        return () => this.setSelected(tab)
    }

    renderMySubTab(child, setTab) {
        let tab = 0
    
        return React.cloneElement(child, {
          children: React.Children.map(child.props.children, (childTab) => {
            if (childTab.type.name === "MySubTab") {
              tab++
              const _id = `${setTab}${tab}`
            //   console.log('B MySubTab', _id);
              const _isActive = (tab === this.state.selected)
              const _onClick = this.handleClick(_id)
            //   console.log('MySubTabList==>', child.props.parentname, '_show ', _show);
    
              return React.cloneElement(childTab, {_isActive, _onClick, _id})
            } 
            return childTab
          }),
        })
    }

    setSelectedTab(selectedTab) {
        // console.log(selectedTab); 
        if (selectedTab !== this.state.selectedTab) {
            this.setState({ selectedTab })
        }else{
            this.setState({ selectedTab: null })
        }
    }

    handleSelectedTab(selectedTab) {
        return () =>this.setSelectedTab(selectedTab)
    }

    sleep(milliseconds){
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    renderMySubTabList(child, setTab){
        let tab = setTab
        return React.cloneElement(child, {
          children: React.Children.map(child.props.children, (childTab) => {
            if (childTab.type.name === "Tab") {
              const _isActive = (tab === this.state.selected)
              const _onClick = this.handleClick(tab)
              tab++
            //   console.log('tab_renderSubTabList', tab);
              return React.cloneElement(childTab, { _isActive, _onClick })
            }
            if (childTab.type.name === "MySubTabList") {
                const _show = childTab.props.parentname === this.state.selectedTab

                // console.log('ul >>', childTab.props.parentname, _show);
                if(_show){
                    return this.renderMySubTab(childTab, tab)
                }

                return null
            }

            if(childTab.type.name === "MyButton"){ 
                // console.log("childTab==>", childTab.props);
                const _name = childTab.props.name
                const _icon = childTab.props.icon 
                const _onClick = this.handleSelectedTab(_name)
                this.sleep(5000)
                const _tabactive = this.state.selectedTab

                return React.cloneElement(childTab, { _name, _icon, _tabactive, _onClick })
            }
            return childTab
          }),
        })
    }

    renderMyTabList(child) {
        let tab = 0
    
        return React.cloneElement(child, {
          children: React.Children.map(child.props.children, (childTab) => {
            if (childTab.type.name === "Tab") {
              const _isActive = (tab === this.state.selected)
              const _onClick = this.handleClick(tab)
              tab++
                // console.log('A tab', tab);
              return React.cloneElement(childTab, { _isActive, _onClick })
            }

            if (childTab.type.name === "MyTab") {
                tab++
                // console.log('A MyTab', tab);
                return this.renderMySubTabList(childTab, tab)
            }
    
            return childTab
          }),
        })
    }

    renderChildren(children) {
        return React.Children.map(children, (child) => {
            if (child.type.name === "MyTabList") {
                return this.renderMyTabList(child)
            }
            if (child.type.name === "TabPanel") {
                const _isActive = (child.props._id === this.state.selected)
                // console.log('_isActive ',child.props._id, this.state.selected, _isActive);
                return React.cloneElement(child, { _isActive })
            }
            return child
        })
    }

    render() {
        // console.log('selectedTab=> ', this.state.selected);
        return (
          <div className="Tabs" style={this.props._style}>
            { this.renderChildren(this.props.children) }
          </div>
        )
    }
}

const MyTabList = ({ children }) => (
    <ul className="TabList pl-lg-5">
      { children }
    </ul>
)

const MySubTabList = ({ 
    children,
    _show,
}) => (
    <ul className="">
      { children }
    </ul>
)

const MyTab = ({ 
    children
  }) => (
    <li
      className={ `Tab is-active Button`}>
      { children }
    </li>
)

const MySubTab = ({
    _id,
    _onClick,
    _isActive,
    children,
  }) => (
    <li
      className={ `Tab  ${ _isActive ? "is-active" : "" }` }
      onClick={ _onClick }>
      { children }
    </li>
  )

const MyTabButton = ({ children }) => (
    <button className="btn btn-link">
      { children }
    </button>
)

const MyButton = ({ 
    _icon,
    _name,
    _onClick, 
    _tabactive,
    children,
  }) => (
    <>
        <img src={_icon} alt="asdf" width="32" height="32"/><span> {children} </span>
        <button 
            onClick={_onClick}
            type="button" 
            className="btn btn-link" 
            key="1" 
            name="store">
            <img src={_name===_tabactive? SideBottom : SideUp} alt="asdf" width="10" height="6.18"/>
        </button>
    </>
)

export {
    MyTabs, 
    MyTabList,
    MyTab,
    MySubTabList,
    MySubTab,
    MyTabButton,
    MyButton
}