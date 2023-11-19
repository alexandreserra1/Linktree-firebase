import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FormEvent, useState, useEffect } from "react";
import { FiTrash } from 'react-icons/fi';
import { db } from "../../services/firebaseConection";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState('#a1a1aa');

  const [ links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const linksRef = collection(db, 'links');
    const queryRef = query(linksRef, orderBy('created', 'asc'));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        });
      });

      setLinks(lista)

    });

    return () => unsub(); // Remover o listener quando o componente for desmontado
  }, []); // Certifique-se de incluir a dependência vazia para executar apenas uma vez

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === '' || urlInput === '') {
      alert('Preencha todos os campos');
      return;
    }

    addDoc(collection(db, 'links'), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    })
      .then(() => {
        setNameInput('');
        setUrlInput('');
        console.log('cadastrado com sucesso');
      })
      .catch((error) => {
        console.log('ERRO AO CADASTRAR NO BANCO' + error);
      });
  }

  async function handleDeleteLink (id: string){
      const docRef = doc(db,'links', id)
      await deleteDoc(docRef)//deletar os documentos
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl " onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-2">
          Nome do link
        </label>
        <Input
          id="nameInput"
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">
          Url do link
        </label>
        <Input
          id="urlInput"
          type="url"
          placeholder="Digite a url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2" htmlFor="textColorInput">
              Cor do link
            </label>
            <input
              id="textColorInput"
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2" htmlFor="backgroundColorInput">
              Fundo do link
            </label>
            <input
              id="backgroundColorInput"
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== '' && (
          <div className=" flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">
              Veja como esta ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
            >
              <p className=" font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button type="submit" className="mb-7 bg-pink-800 h-9 rounded-md text-white font-semibold gap-4 flex justify-center items-center">
          Cadastrar
        </button>

      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">
        Meus links
      </h2>

    {links.map( (link) => (
        <article 
        key={link.id}
        className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
        style={{ backgroundColor: link.bg, color: link.color }}
      >
        <p>{link.name}</p>
        <div>
          <button aria-label="Excluir" title="Excluir"
            className="border border-dashed p-1 rounded bg-neutral-900"
          onClick={() => handleDeleteLink (link.id) }
          >
            <FiTrash size={18} color='#fff' />
          </button>
        </div>
      </article>
    ))}
    </div>
  );
}
