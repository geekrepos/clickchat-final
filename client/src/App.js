import {useEffect, useState} from "react";
import './App.css';
import LoginScreen from "./LoginScreen";
import background from "./images/background.png";
import {ChakraProvider, Icon, Box} from '@chakra-ui/react'
import SignUpScreen from "./SignUpScreen";
import io from 'socket.io-client';
import ChatScreen from "./pages/ChatScreen";

const socket  = io.connect("http://localhost:5700");

// socket.on()

function App() {
    const [showLogin, setShowLogin] = useState(true);
    const [loggedStatus, setLoggedStatus] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        isLoggedIn();
    }, []);

    function isLoggedIn(){
        const user = window.localStorage.getItem('clickchat-user');
        if(user){
            setUser(user);
            setLoggedStatus(true);
        } else {
            setLoggedStatus(false);
        }
    }

  return (
      <ChakraProvider>
          <div style={{display: 'flex', height: window.innerHeight}}>
              <img src={background} style={{position: 'absolute', height: '100%', width: '100%', zIndex: -1}} />
              {
                  loggedStatus?
                      <ChatScreen userid={user} />:
                      loggedStatus == false?
                  showLogin?
                      <LoginScreen showSignUp={()=>setShowLogin(!showLogin)}/>:
                      <SignUpScreen showSignIn={()=>setShowLogin(!showLogin)}/>:
                          <Box bg={"white"}>
                              Loading
                          </Box>
              }
          </div>
      </ChakraProvider>
  )
}

export default App;
