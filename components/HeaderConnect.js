import { Button, Menu, Icon } from "semantic-ui-react";

const HeaderConnect = (props) => {

  const miniNumber = Number(props.balanceAcc).toFixed(3);
  const miniNumberContract = Number(props.balanceOfContract).toFixed(3);
  const miniText = (props.account).substring(0, 2) + '...' + (props.account).slice(38);
  return (
    <>
    <Menu size='small' style={{marginTop: "20px"}}>

        <Menu.Menu position='right'>    
         <Menu.Item>
            {!props.account ? <Button color='orange'>Funds in game</Button> 
            :
             <Button color='orange' animated='fade'>
             <Button.Content visible> <Icon name='ethereum' /> {miniNumberContract}</Button.Content>
             <Button.Content hidden>Full bank</Button.Content>
             </Button>}
          </Menu.Item>
          
          <Menu.Item>
          {!props.account ? <Button primary style={{marginRight: "15px"}}>Yours</Button>
           : 
           <Button primary style={{marginRight: "15px"}} animated='fade'>
            <Button.Content visible><Icon name='ethereum' />{miniNumber}</Button.Content>
            <Button.Content hidden>Yours</Button.Content>
            </Button>}

            {!props.account ? <Button primary onClick={props.onInitConnection}>Connect</Button>
             :
            <Button primary>{miniText}
            </Button>}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      </>
  );
};
export default HeaderConnect;