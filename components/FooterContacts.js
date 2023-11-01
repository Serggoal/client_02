import {React, useState} from 'react'
import { List, Modal, Button } from 'semantic-ui-react'

const FooterContacts = () => {
const [openModalRules, setOpenModalRules] = useState(false);
  // show the rules
  const handleShowRules = () => {
    setOpenModalRules(true);
  }
  return (
    <>
<List style={{padding: "20px"}}>
<List.Item>
  <List.Icon name='game' />
  <List.Content>
  <a onClick={handleShowRules}>How to play</a>
  </List.Content>
</List.Item>
<List.Item>
  <List.Icon name='users' />
  <List.Content>
  <a target='_blank' href="https://www.gamelp.bet">Home</a>
  </List.Content>
</List.Item>
<List.Item>
  <List.Icon name='mail' />
  <List.Content>
    <a href='mailto:gamelpbet@gmail.com'>gamelpbet@gmail.com</a>
  </List.Content>
</List.Item>
<List.Item >
  <List.Icon name='linkify' />
  <List.Content>
    <a target='_blank' href="https://telegra.ph/GameFi-Liquidity-Providing-10-17">More about GameFi Liquidity Providing</a>
  </List.Content>
</List.Item>
<List.Item >
  <List.Icon name='hand point down outline' />
  <List.Content>
    All contracts are verified / open source:
  </List.Content>
</List.Item>
<List.Item >
  <List.Icon name='check' />
  <List.Content>
    <a target='_blank' href="https://polygonscan.com/address/0xa4F89aCbF9f1ff14dDddAfe87fb766Af8C593176">Chainlink: 0xa4F89a...C593176</a>
  </List.Content>
</List.Item>
<List.Item >
  <List.Icon name='check' />
  <List.Content>
    <a target='_blank' href="https://polygonscan.com/address/0xD534125EA08F59857E176e401a3D303f4Bd0E67a">$GAMELP: 0xD534125...4Bd0E67a</a>
  </List.Content>
</List.Item>
<List.Item >
  <List.Icon name='check' />
  <List.Content>
    <a target='_blank' href="https://polygonscan.com/address/0xB7EB3A80028202a20d5F180a5D08F442ad8f4BA9">StoneGame: 0xB7EB3A...ad8f4BA9</a>
  </List.Content>
</List.Item>
<List.Item>
  <List.Icon name='copyright outline' />
  <List.Content>
    All Rights Reserved. 2023
  </List.Content>
</List.Item>
</List>

 {/* PopUp Rules */}
 <Modal
      centered={false}
      open={openModalRules}
      >
      <Modal.Header>Welcome to the Game LP!</Modal.Header>
      <Modal.Content>
        <Modal.Description style={{wordBreak: 'break-word'}}>
          Please, connect Metamask to deposit or play game. <br></br><br></br>
           First of all you can get LP ($GAMELP) - just make a deposit. <p></p>

           Secondly, play the game "rock - paper - scissors" <br></br>
           to get x2 to your bet. <br></br>
           NOTICE: Each game makes a request to the Chainlink,<br></br>
           the response comes within 15-20 seconds. Therefore, at the moment<br></br>
           we cannot serve several people at the same time. Only in turn.<p></p>

           Third, when you receive LP ($GAMELP) <br></br>
           you can return your liquidity and <br></br>
           bank/casino income at ANY TIME!<p></p>

           Need to know: <br></br>
           when you are with GAMELP - <br></br>
           YOU ARE THE PART OF BANK !!! <p></p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpenModalRules(false)}>OK</Button>
      </Modal.Actions>
     </Modal>
</>
   )
  }

export default FooterContacts;