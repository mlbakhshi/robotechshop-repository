
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Welcom =() =>{
const [showWelcom , setShowWelcom] = useState(true)
useEffect(()=>{
   const data = localStorage.getItem("show_app_intro") 
   setShowWelcom(JSON.parse(data) ?? true)
},[])
const onHideWelcome=()=>{
   setShowWelcom(false)
   localStorage.setItem("show_app_intro", JSON.stringify(false) )
}

return(
   <Container> {/* استفاده از کامپوننت Container */}
   {showWelcom && (
     <div className="bg-primary text-white my-3">
       <FontAwesomeIcon
         icon={faXmark} 
         style={{ float: "right", margin: "5px", cursor: "pointer" }}
         onClick={onHideWelcome} 
       />
       <div>
         Welcome
       </div>
     </div>
   )}
 </Container>
)
}
export default Welcom;