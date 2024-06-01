/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { Navigate } from "react-router-dom"

interface HasAcces{
    children:React.ReactNode
}
const HasAccess:React.FC<HasAcces> = ({children}) => {
    
    
   
    const [hasAccess, setHasAccess] = useState<boolean>(true)

    if(hasAccess){
        return( children)
    }
    return <Navigate to='/app' replace />
    
}

export default HasAccess