'use client'

import CharacterComponent from "@/components/CharactersComponent";
import ApiService from "@/service/ApiService";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react"
import EpisodesComponent from "@/components/EpisodesComponent";

const episodesData = [
  "https://rickandmortyapi.com/api/episode/1",
  "https://rickandmortyapi.com/api/episode/2",
  "https://rickandmortyapi.com/api/episode/3",
  "https://rickandmortyapi.com/api/episode/4",
  "https://rickandmortyapi.com/api/episode/5",
  "https://rickandmortyapi.com/api/episode/6",
  "https://rickandmortyapi.com/api/episode/7",
  "https://rickandmortyapi.com/api/episode/8",
]

export default function Home() {
  const [characters, setCharacters] = useState<Array<CharacterType>>([])

  useEffect(() => {
    const fetch = async () => {
      const character: any = await ApiService.getInstance().getCharacters()
      setCharacters(character.results)
    }

    fetch()
  }, [])


  return (
    <main className="bg-gradient-to-b from-black to-gray-800">
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
        <div className="gap-10 grid grid-cols-2">
          <CharacterComponent title="Character #1" />
          <CharacterComponent title="Character #2" />
        </div>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3 md:gap-10">
          <EpisodesComponent episodes={episodesData} title="Episodes Character #1" />
          <EpisodesComponent episodes={episodesData} title="Share Episodes #1 & #2" />
          <EpisodesComponent episodes={episodesData} title="Episodes Character #2" />
        </div>
      </div>
    </main>
  );
}
