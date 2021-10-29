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


const callTwitter = (twitterQueryIn = "google")=>{
  console.log("user effect")
  fetch("https://calm-island-77794.herokuapp.com/hello/"+twitterQueryIn)
.then(res => res.json())
.catch(e =>{
  console.error("there was an error:",e)
})
}

const DataTable = () =>{
  useEffect(callTwitter, [])

  useEffect(() => {

    // Subscribing for chatMessage
    twitterChannel.subscribe("test", ({data}) => {
      var dataObj = JSON.parse(data);
      // Updating the state newMsgs with new incoming message
      setDataObj(dataObj);
    });
  }, [])

  const [dataObj, setDataObj] = useState(); // to hold all messages and incoming new messages
 return ( <div>
  {dataObj && dataObj.data && dataObj.data.length != 0 && (
    <table className="GeneratedTable">
<thead>
<tr>
  <th style={{width:"30%"}}>Time (GMT)</th>
  <th style={{width:"30%"}}>Tweet Count</th>
  <th style={{width:"30%"}}>Tweet Count in Gophers</th>
</tr>
</thead>
      {
        
        dataObj.data.reverse().map((item,idx) =>{
          return (  <tbody>
            <Divider />
            <tr key={()=>"e"+idx+new Date().getTime()}>
              <td key={()=>"a"+idx+new Date().getTime()} style={{padding:"10px"}}>{item.start.substr(11, 8)}</td>
              <td key={()=>"b"+idx+new Date().getTime()} style={{padding:"10px"}}>{item.tweet_count}</td>
              <td key={()=>"c"+idx+new Date().getTime()} style={{padding:"10px"}}>{ [...Array(item.tweet_count)].map((_, i) => <img key={idx+i} style={{width:"10px"}} src="gopher.png"/>)}</td>
            </tr>
          </tbody>)
        })
      }
  )
  </table>)}
  </div>)
}
const App = () => {
  const scrollRef = useRef(null); // for getting scroll ref
  
  const [value, setValue] = useState("");
  const queryRef = React.useRef();

  const handleSubmit = e => {
    e.preventDefault();
    queryRef.current.value && callTwitter(queryRef.current.value)
  };
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
            <form onSubmit={handleSubmit}>
        <input type="text" ref={queryRef} id="query" placeholder="Twitter hashtag" name="query" style={{width:"200px"}}/>
        <button type="submit" style={{padding:"10px", marginLeft:"20px", width:"60px"}}className="bluebg yellow">Update</button>
        
    </form>
          </Grid.Column>
        </Grid.Row>
       
      </Grid>
    </Segment>
     <DataTable/>
    </Container>
  );
};

export default App;
