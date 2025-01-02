import { useEffect, useRef, useState } from "react";
import { Box, Container, VStack, Input, HStack} from "@chakra-ui/react";
import { Button } from "./components/ui/button";
import Message from "./Component/Message";
import {app} from "./firebase";
import {onAuthStateChanged,getAuth,GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth"
import {getFirestore,addDoc, collection} from "firebase/firestore"
import { serverTimestamp,onSnapshot,query,orderBy } from "firebase/firestore";

const auth=getAuth(app);
const db=getFirestore(app);


const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider)
};

const logoutHandler = () =>  signOut(auth);

function App() {
  const q = query(collection(db,"Messages"),orderBy("createdAt","asc"))
  const [user,setUser] = useState(false);
  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);

const divForScroll = useRef(null);

  const submitHandler = async(e) =>{
    e.preventDefault()
    try {
      setMessage("");
      await addDoc(collection(db,"Messages"),{
        text:message,
        uid:user.uid,
        uri:user.photoURL,
        createdAt:serverTimestamp()
      });
  
  divForScroll.current.scrollIntoView();
    } catch (error) {
      alert(error)
    }
  }
  


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(data)=>{
      setUser(data);
    });

  const unsubscribeForMessage = onSnapshot(q,(snap)=>{
       setMessages( snap.docs.map((item) => {
          const id = item.id;
          return{id, ...item.data()};
        }));
      });

    return () => {
      unsubscribe();
      unsubscribeForMessage();
    };
  },[q]);
  return (
    <Box bg={"red.50"}>
     {
      user ? ( <Container h={"100vh"} bg={"white"}>
        <VStack h="full" paddingY={"4"}>
          <Button onClick={logoutHandler} colorPalette="red" w={"full"}>
            Logout
          </Button>
          <VStack h="full" w="full" overflowY="auto" css={{"&::-webkit-scrollbar":{display:"none"}}}>
          { messages.map((item)=>(
            <Message key={item.id} user={item.uid===user.uid?"me":"other"} text={item.text} uri={item.uri}/>
          ))} <div ref={divForScroll}>

          </div>
          </VStack>
         
          <form onSubmit={submitHandler} style={{width:"100%",color:"black"}}>
            <HStack>
              <Input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Enter a Message...."/>
              <Button colorPalette={"purple"} type="submit"> Send</Button>
            </HStack>         
          </form>
        </VStack>
      </Container>):(
      <VStack h="100vh" justifyContent={"center"} >
        <Button onClick={loginHandler} colorPalette={"green"} >sing in with Google</Button>
      </VStack>)
     }
    </Box>
  );
}

export default App;
