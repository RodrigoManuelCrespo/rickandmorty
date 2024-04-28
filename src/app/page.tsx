'use client'

import CharacterComponent from "@/components/CharactersComponent";
import ApiService from "@/service/ApiService";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react"

export default function Home() {
  const [characters, setCharacters] = useState<Array<any>>([])

  useEffect(() => {
    const fetch = async () => {
      const character: any = await ApiService.getInstance().getCharacters()
      console.log(character);

      setCharacters(character.results)
    }

    fetch()
  }, [])


  return (
    <main className="bg-black">
      <div className="max-w-[1200px] m-auto px-4">
        <div className="flex item-center justify-center py-10">
          <Image
            shadow="none"
            radius="none"
            width={600}
            height={200}
            alt="Logo"
            className="w-full object-cover"
            src={'logo.png'}
          />
        </div>
        <div className="gap-20 grid grid-cols-2">
          <CharacterComponent characters={characters} />
          <CharacterComponent characters={characters} />
        </div>
      </div>
    </main>
  );
}
