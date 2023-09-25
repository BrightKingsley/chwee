import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ClientOnlyPortal({children,selector}:{children:React.ReactNode; selector:any}) {
const ref = useRef()
const [mounted, setMounted] = useState(false)

useEffect(()=>{
ref.current = document.querySelector(selector)

setMounted(true)
},[selector])

  return  mounted && ref.current? createPortal(children, ref.current) : null
}
