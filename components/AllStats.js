import { Menu, Icon, Label, Segment, Dropdown } from "semantic-ui-react";

const AllStats = (props) => {

    const miniTokenPrice = Number(props.stopSupply).toFixed(4);
    const miniTolalTokens = Number(props.totalTokens).toFixed(2);
    const miniUserTokens = Number(props.userTokens).toFixed(2);
    const miniNumberRewards = Number(props.userReward).toFixed(4);

    return ( 
      <>
    <Segment color='violet' textAlign='center'>
    <Menu compact>

     <Menu.Item as='a'>
     <Icon name='dollar' /> Token <br></br> price
     <Label color='red' floating>
       {miniTokenPrice}
     </Label>
   </Menu.Item>
   <Menu.Item as='a'>
     <Icon name='users' /> Total <br></br> tokens
     <Label color='orange' floating>
       {miniTolalTokens}
     </Label>
   </Menu.Item>
   <Menu.Item as='a'>
     <Icon name='male' /> Your <br></br> tokens 
     <Label color='teal' floating>
       {miniUserTokens}
     </Label>
   </Menu.Item>
 
  </Menu> 
 </Segment>

 <Segment color='green' textAlign='center'>
    <Menu compact>
    <Menu.Item as='a'>
     <Icon name='ethereum' /> Your LP 
     {props.isConnected && props.userTokens > 0 ? <Label color='green' floating> {miniNumberRewards} </Label>
      :
      <Label color='green' floating> 0 </Label> }
   </Menu.Item>

{props.userTokens > 0 ?
  <Menu vertical>
    <Dropdown
    disabled={props.isActiveShowButton}
    text='Claim LP rewards'
    floating
    labeled
    button
    style={{margin: "10px"}}
    icon='angle double down'
    className='icon'
  >
    <Dropdown.Menu>
      <Dropdown.Header icon='ethereum' size='big' content={miniNumberRewards} />
      <Dropdown.Divider />
      <Dropdown.Item as='a' onClick={props.onHandleClaimRewards25} description='25%' text='A little bit' />
      <Dropdown.Item as='a' onClick={props.onHandleClaimRewards50} description='50%' text='Halving' />
      <Dropdown.Item as='a' onClick={props.onHandleClaimRewards100} description='100%' text='Full balance' />
    </Dropdown.Menu>
  </Dropdown>
  </Menu>
  : ""
 }
  </Menu> 
 </Segment>
 </>
    )
};
export default AllStats;