import React from 'react'
import { HStack,Text } from '@chakra-ui/react'
import { Avatar } from '../components/ui/avatar'
const Message = ({text,uri,user="other"}) => {
  return (
    <HStack alignSelf={user==="me"?"flex-end":"flex-start"} bg={"gray.100"} borderRadius={"base"} paddingX={user==="me"?"4":"2"} paddingY={"2"}>
        {
            user==="other" && <Avatar src={uri} /> 
        }
        <Text color={"black"}>{text}</Text>
        {
            user==="me" && <Avatar src={uri} /> 
        }
    </HStack>
  )
}

export default Message