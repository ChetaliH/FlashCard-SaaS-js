'use client'
import { use, useEffect, useState } from "react"
import { CollectionReference, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"

export default function Flashcards(){
    const[flashcards, setFlashcards] = useState([])

    useEffect(()=>{
        async function getFlashcards(){
            const docRef = doc(collection(db,'users'))
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            }else{
                await setDoc(docRef, {flashcards: []}) 
            }
        }
        getFlashcards()
    }, [])
}