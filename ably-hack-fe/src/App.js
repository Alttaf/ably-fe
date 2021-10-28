import React, { useState, useEffect, useRef } from "react";
import * as Ably from "ably";
import {
  Container,
  Header,
  Divider,
  Button,
  Grid,
  Segment,
  Image
} from "semantic-ui-react";

const apiKey = "J0HbFg.02ttpg:pJoo1J-jZV2Hym28kvuNKQwopg66c9bB9SIXDUhAMFw";

// Ably Instance
const ably = new Ably.Realtime(apiKey);
const twitterChannel = ably.channels.get("test");


const App = () => {
  const scrollRef = useRef(null); // for getting scroll ref
  const [state, setState] = useState({
    msgs: [],
    newMsgs: []
  }); // to hold all messages and incoming new messages

  let you = {};

  useEffect(() => {
    console.log("user effect")
    // Subscribing for chatMessage
    twitterChannel.subscribe("test", ({data}) => {
      console.log("twitterCdhannel")
      console.log(data)
      var dataObj = JSON.parse(data);


      // Updating the state newMsgs with new incoming message
      setState(prevState => {
        return {
            dataObj
        };
      });
    });
  })

  return (
    <Container textAlign="left" className="App-header">
      <Header as="h1" style={{ color: 'white', textAlign:'center' }}><img style={{ marginTop:"0px" }}src="ably.png"/>Ably GopherCon Hackathon</Header>
      <Divider />
    <Segment style={{ padding: '1em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column>
            <img className="ui fluid image" src="ttext.png"/>
            <p style={{ fontSize: '1.33em' }}>
              This is a Hackathon entry which is based on Teletext, Teletext was a protocol that allowed broadcasters to send text signals to televisions, this hackathon entry is a similar concept, broadcasting social media data in real time via Ably's realtime API.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

      {state.dataObj && state.dataObj.data && state.dataObj.data.length != 0 && (
        <table class="GeneratedTable">
  <thead>
    <tr>
      <th style={{width:"30%"}}>Time</th>
      <th style={{width:"30%"}}>Tweet Count</th>
      <th style={{width:"30%"}}>Gophers</th>
    </tr>
  </thead>
          {
            
            state.dataObj.data.reverse().map((item,idx) =>{
              return (  <tbody>
                <Divider />
                <tr>
                  <td style={{padding:"10px"}}>{item.start.substr(11, 8)}</td>
                  <td style={{padding:"10px"}}>{item.tweet_count}</td>
                  <td style={{padding:"10px"}}>{ [...Array(item.tweet_count)].map((_, i) => <img style={{width:"10px"}} src="gopher.png"/>)}</td>
                </tr>
              </tbody>)
            })
          }
      )
      </table>)}
    </Container>
  );
};

export default App;
