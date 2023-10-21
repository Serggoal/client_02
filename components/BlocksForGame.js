import React from 'react';
import { Button, Segment, Grid, Divider, Header, Icon, Modal } from "semantic-ui-react";
import Image from 'next/image';
import Stone3 from "../images/27_stone.png";
import Scissors3 from "../images/27_scissors.png";
import Paper3 from "../images/27_paper.png";
import Stone4 from "../images/bot-stone.png";
import Scissors4 from "../images/bot-scissors.png";
import Paper4 from "../images/bot-paper.png";

export default function BlocksForGame(props) {

    const pictures = { stone: Stone3, scissors: Scissors3, paper: Paper3 };
    const picturesBot = { stone: Stone4, scissors: Scissors4, paper: Paper4 };

    return (
      <>
    <Segment placeholder>
    <Grid columns={2} stackable textAlign='center'>
    <Divider vertical> === </Divider>

     {/* human */}

      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
        {!props.human ?
          <Header icon>
            <Icon name='recycle' />
            To play the game, please<br/> select your picture from the dropdown below <br/><br/>
            {props.bet ?
            <select onChange={props.onHumanChange}>
              <option value="">Choose your picture</option>
              <option value="stone">stone</option>
              <option value="scissors">scissors</option>
              <option value="paper">paper</option>
            </select>
            : ""
            }
          </Header>
          :
          <Header icon>
            <Icon name='smile outline' />
            <select>
            <option value="">Choise is done</option>
            </select>
            <br/><br/>
            {!props.human || props.isActiveShowButton ? "" : 
        <Button color="grey" onClick={props.onChangeMyChoose}>Want to change</Button> 
            }
          </Header>
        }

        </Grid.Column>

        {/* human picture */}

        <Grid.Column>
        {!props.human ?
          <Header icon>
            <Icon name='eye' />
            <br/><br/>Your choice will appear here
          </Header>
          :
           <Header size='huge'>
            <Image src={pictures[props.human]} alt='' />
          </Header>
          
        }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>

 {/* bot */}

  <Segment placeholder>
    <Grid columns={2} stackable textAlign='center'>
      <Divider vertical> === </Divider>

      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
        {!props.isActiveShowButton || !props.isConnected ? 
          <Header icon>
            <Icon name='cogs' />
            Run the robot <br/>image selection program <br/><br/>
            {props.bet && props.human ?
            <Button 
            disabled={props.isActiveShowButton} 
            color={props.colorButtonBot} onClick={props.onClickBot}>
              {props.noticeBot}
            </Button> 
            : ""
            }
          </Header>
          :
          <Header icon>
            <Icon name='bug' />
            {props.isShowResult ? "" :
            <Button loading primary> Loading </Button>
            }
          </Header>
        }
        </Grid.Column>

       {/* BOT picture */}
        <Grid.Column>
        {!props.isShowResult ?
          <Header icon>
            <Icon name='eye' />
            <br/><br/>Robot's choice will appear here
          </Header>
          :
          <Header size='huge'>
            <Image src={picturesBot[props.bot]} alt='' />
          </Header>
        }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
  </>
   )
 }