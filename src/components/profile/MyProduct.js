import React from 'react'; 
import {
    Tabs,
    TabList,
    Tab,
    TabButton,
    TabPanel,
  } from '../layout/Tabs';

const MyProduct = (props) => {
 
    return(
        <div className="wrap-right-content">
            <div>
            <h3>My Product</h3>
            </div>
            <div className="rc-center" id="my-order">
            <Tabs selected={ 0 }>
                <TabList>
                <Tab>
                    <TabButton>All items</TabButton>
                </Tab>
                <Tab>
                    <TabButton>Sould out</TabButton>
                </Tab>
                <Tab>
                    <TabButton>Arcived</TabButton>
                </Tab>
                </TabList>
    
                <TabPanel>
                <p>All items</p>
                </TabPanel>
                <TabPanel>
                <p>Sould paid</p>
                </TabPanel>
                <TabPanel>
                <p>Arcived</p>
                </TabPanel>
            </Tabs>
            </div>
        </div>
    )
}

export default MyProduct
