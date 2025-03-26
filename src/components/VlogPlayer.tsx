
'use client'
import { useEffect, useRef, useState } from "react"
import useWindowListener from "@/hooks/useWindowListener"

export default function vlogPlayer({vdoSrc,isPlaying}:{vdoSrc:string,isPlaying:boolean}){

    const vdoRef=useRef<HTMLVideoElement>(null)

    useEffect(()=>{
       //alert('width is '+ vdoRef.current?.videoWidth)
        if(isPlaying){
            // alert('play')
            vdoRef.current?.play();
        }else{
            // alert('pause')
            vdoRef.current?.pause();
        } 
    },[isPlaying])
    
    
    useWindowListener("resize",(e)=>{
        alert('window width is '+(e.target as Window).innerWidth )
    });

    const [isMounted, setIsMounted] = useState(false);

    // Ensure the component is mounted before rendering the video element
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null; // or a loading spinner if you want to show a loading state
    }
    
    return( 
           <video className="w-[40%] " src={vdoSrc} ref={vdoRef} controls loop muted/> 
    )
}