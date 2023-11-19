import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FormEvent, useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Networks(){

    const [instagram, setInstagram] = useState('')
    const [linkedin, setLinkedin] = useState ('')
    const [github, setGithub] = useState ('')

    useEffect (() => {
        function loadLinks() {
            const docRef = doc(db, 'social', 'link')
            getDoc (docRef)
            .then((snapshot) =>{
                if(snapshot.data() !== undefined) {
                    setInstagram(snapshot.data()?.instagram)
                    setGithub(snapshot.data()?.github)
                    setLinkedin(snapshot.data()?.linkedin)
                }
                
            })
        }
        loadLinks()
    }, [])

    function handleRegister (e: FormEvent){
        e.preventDefault();

        setDoc(doc(db,'social', 'link'), {
            instagram : instagram,
            linkedin : linkedin,
            github : github
        })
        .then (() => {
            console.log('CADASTRADO COM SUCESSO')
        })
        .catch((error) => {
            console.log('ERRO AO SALVAR' + error)
        })

    }

    return(
        <div className=" flex items-center flex-col min-h-screen pb-7 px-2">
           <Header/>

           <h1 className=" text-white text-2xl font-medium mt-8 mb-4">Minha redes sociais</h1>

          <form className=" flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
            <label className=" text-white font-medium mt-2 mb-3">Link do instagram</label>
            <Input
            type="url"
            placeholder="Digite a url do instagram..."
            value={instagram}
            onChange={ (e) => setInstagram (e.target.value) }
            />

            <label  className=" text-white font-medium mt-2 mb-3">Link do Linkedin</label>
            <Input
            type="url"
            placeholder="Digite a url do linkedin..."
            value={linkedin}
            onChange={ (e) => setLinkedin(e.target.value) }
            />

            <label className=" text-white font-medium mt-2 mb-3">Link do Github</label>
            <Input
            type="url"
            placeholder="Digite a url dao github..."
            value={github}
            onChange={ (e) => setGithub (e.target.value) }
            />  

            <button 
            type="submit"
            className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
            >
            Salvar links
            </button>
          </form>
          
            </div>
    )
}