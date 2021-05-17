import React from 'react'; 
import {
    Tabs,
    TabList,
    Tab,
    TabButton,
    TabPanel,
  } from '../layout/Tabs';
  
const OrderSeller = ({
    selected
}) => {
    return (
      <div className="wrap-right-content">
        <div>
          <h3>My order</h3>
        </div>
        <div className="rc-center" id="my-order">
          <Tabs selected={ selected }>
            <TabList>
              <Tab>
                <TabButton>All items</TabButton>
              </Tab>
              <Tab>
                <TabButton>Get paid</TabButton>
              </Tab>
              <Tab>
                <TabButton>Processed</TabButton>
              </Tab>
              <Tab>
                <TabButton>Sent</TabButton>
              </Tab>
              <Tab>
                <TabButton>Completed</TabButton>
              </Tab>
              <Tab>
                <TabButton>Order cancel</TabButton>
              </Tab>
            </TabList>
  
            <TabPanel>
              <p>All items</p>
            </TabPanel>
            <TabPanel>
              <p>Not yet paid</p>
            </TabPanel>
            <TabPanel>
              <p>Packed</p>
            </TabPanel>
            <TabPanel>
              <p>Sent</p>
            </TabPanel>
            <TabPanel>
              <p>Completed</p>
            </TabPanel>
            <TabPanel>
              <p>Order cancel</p>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    )
  }
export default OrderSeller;  