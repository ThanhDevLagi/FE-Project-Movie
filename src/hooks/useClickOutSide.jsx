import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(dom = "button"){
    const [show, setShow] = useState(false);
    const nodeRef = useRef(null);
    useEffect(()=>{
        function HandleClickOut(e){
            if(nodeRef.current && !nodeRef.current.contains(e.target) && !e.target.matches(dom)) {
                setShow(false);
            }
        }
        document.addEventListener('click', HandleClickOut); 
        return () => {
            document.removeEventListener('click', HandleClickOut);
        }
    },[dom])
    return {
        show,
        setShow,
        nodeRef,
    }
}