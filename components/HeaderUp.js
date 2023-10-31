import { Icon, Header} from "semantic-ui-react";
import { useState, useEffect } from "react";

const HeaderUp = (props) => {

  const [overviewGame, setOverviewGame] = useState("Welcome!!!");
  const [overviewGame2, setOverviewGame2] = useState("Connect Metamask (Poligon)");

  useEffect(() => {
    (async () => {
    if(props.isConnected) {
      setOverviewGame("Play in game with Chainlink!");  
      setOverviewGame2("Deposit or bet and win x2!")  
  }
    })();
  }, [props.isConnected]);

  return (
    <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='gem' circular />
      <Header.Content>{overviewGame}</Header.Content>
      <Header.Content>{overviewGame2}</Header.Content>
    </Header>
  </div>

  );
};
export default HeaderUp;