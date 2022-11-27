import {useEffect, useState} from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement,
    SimpleGrid, HStack, VStack, Text, Center
} from "@chakra-ui/react";
import {FaUserAlt, FaLock} from "react-icons/fa";
import colors from '../colors/login';
import SamplePerson from '../images/sample_person.jpeg';
import axios from "../axios";

export default function ChatScreen({userid}) {
    const [userInfo, setUserInfo] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [activeChat, setActiveChat] = useState(null);
    const [usersList, setUsersList] = useState([]);

    useEffect(()=>{
        if(userid)
            getUserInfo();
    }, [userid]);

    useEffect(()=>{
        if(userInfo){
            setUserImage(userInfo?.profile_picture);
            setUserName(userInfo?.full_name);
            getFriendsList();
        }
    }, [userInfo]);


    function getUserInfo(){
        axios.post(`userinfo`, {
            userid
        })
            .then(res=>res.data)
            .then(data=>{
                setUserInfo(data.data);
            })
    }

    function getFriendsList(){
        axios.post(`getAllUsers`, {
            userid
        })
            .then(res=>res.data)
            .then(data=>{
                if(data?.data?.users){
                    setUsersList(data?.data?.users);
                }
            })
    }

    function getMessages(){
        axios.post(`userinfo`, {
            userid
        })
            .then(res=>res.data)
            .then(data=>{
                setUserInfo(data.data);
            })
    }

    function loadChats(id){
        axios.post(`userinfo`, {
            userid: id
        })
            .then(res=>res.data)
            .then(data=>{
                setUserInfo(data.data);
            })
    }

    return (
        <div style={{flex: 1, border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box height={window.innerHeight*.7} width={'70%'} boxShadow='dark-lg' p={2} rounded='md' bg='white'>
                <HStack spacing={1} height={'100%'}>
                    <Box p={0} width={'30%'} height={'100%'} >
                        <Box h={'10%'} p={0} display={'flex'} alignItems={"center"}>
                            <img src={userImage} style={{height: 50, borderRadius: 60, padding: 10}} />
                            <Text marginLeft={2} fontSize='xl' whiteSpace={"nowrap"}>{userName}</Text>
                        </Box>
                        <Box h={'90%'} p={0} overflow={"auto"} >
                            <ContactList list={usersList} getChatFor={loadChats} />
                        </Box>
                    </Box>
                    <Box p={0} width={'70%'}  height={'100%'} bg={'#e9edef'}>
                        {activeChat?<>
                            <Box h={'15%'} p={0}>
                                <ActiveChat/>
                            </Box>
                            <Box h={'85%'} p={0}>
                                <ChatBox/>
                            </Box>
                        </>:
                        <Box  display={"flex"} flexDirection={"column"} width={'100%'} height={"100%"} alignItems={"center"} justifyContent={"center"}>
                            <Heading>Welcome to ClickChat</Heading>
                            <br/>
                            <Text color={"darkgrey"}>Select any user from list to begin chatting</Text>
                        </Box>
                        }
                    </Box>
                </HStack>
            </Box>
        </div>
    );
}

function Contact({name, onClick, userid, photo}){
    return (
        <Box onClick={onClick} cursor={"pointer"}  display={"flex"} borderBottom={'1px solid #eaeaea'} alignItems={"center"}>
            <img src={photo} style={{height: 50, borderRadius: 60, padding: 10}} />
            <span style={{fontSize: 18}}>{name}</span>
        </Box>
    )
}

function ContactList({list = [], getChatFor}){
    return (
        <div>
            {
                list.map(c=>(
                    <Contact name={c.full_name} photo={c.profile_picture} userid={c.userid} onClick={()=>getChatFor(c.userid)} />
                ))
            }
        </div>
    )
}

function ActiveChat(){
    return (
        <div>
            <Box display={"flex"}>
                <img src={SamplePerson} style={{height: 50, borderRadius: 60, padding: 10}} />
                <span style={{fontSize: 18}}>Ganesh</span>
            </Box>
        </div>
    )
}

function ChatBox(){
    return (
        <Box h={'100%'}>
            <Box h={'90%'} rounded={5} bg={'#efeae2'} border={'1px solid #CCCCCCFF'} overflow={"auto"} marginBottom={1}>
                <Message self={false} content={'Hi'} />
                    <Message content={'Hi'} />
                <Message self={false} content={'Hi'} />
                    <Message content={'Hi'} />
                <Message self={false} content={'Hi'} />
                    <Message content={'Hi'} />
                <Message self={false} content={'Hi'} />
                    <Message content={'Hi'} />
            </Box>
            <Box h={"10%"} display={"flex"}>
                <Input placeholder='Enter message' />
                <Button marginLeft={2} >
                    Send
                </Button>
            </Box>
        </Box>
    )
}

function Message({self = true, content}){
    return (
        <Box display={"flex"} p={2} justifyContent={self?"flex-start":"flex-end"}>
            <Box bg={self?'#FFFFFF':'#d9fdd2'} boxShadow={'1px 1px 2px 0px #868686'} rounded={20} p={2}>
                <Text fontSize='md'>{content}</Text>
            </Box>
        </Box>
    )
}


