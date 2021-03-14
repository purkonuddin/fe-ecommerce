import React from 'react'; 
import {
    Tabs,
    TabList,
    Tab,
    TabButton,
    TabPanel,
  } from '../layout/Tabs';
  
const MyOrder = () => {
    return (
      <div className="wrap-right-content">
        <div>
          <h3>My order</h3>
        </div>
        <div className="rc-center" id="my-order">
          <Tabs selected={ 0 }>
            <TabList>
              <Tab>
                <TabButton>My Order</TabButton>
              </Tab>
              <Tab>
                <TabButton>Process</TabButton>
              </Tab>
              <Tab>
                <TabButton>Received</TabButton>
              </Tab>
              <Tab>
                <TabButton>Received</TabButton>
              </Tab>
              <Tab>
                <TabButton>Received</TabButton>
              </Tab>
            </TabList>
  
            <TabPanel>
              <p>My Order</p>
            </TabPanel>
            <TabPanel>
              <p>Process</p>
            </TabPanel>
            <TabPanel>
              <p>Received</p>
            </TabPanel>
            <TabPanel>
              <p>Received</p>
            </TabPanel>
            <TabPanel>
              <p>Received</p>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    )
  }
export default MyOrder;  