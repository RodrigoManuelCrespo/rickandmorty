'use client'

import CharacterComponent from "@/components/CharactersComponent";
import { Image } from "@nextui-org/react"
import EpisodesComponent from "@/components/EpisodesComponent";
import { useAppSelector } from "@/redux/hook";

export default function Home() {
  const firstcharacter: CharacterType | null = useAppSelector((state: any) => state.character.firstCharacter);
  const secondCharacter: CharacterType | null = useAppSelector((state: any) => state.character.secondCharacter);

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
          <CharacterComponent title="Character #1" characterNumber={'firstCharacter'} />
          <CharacterComponent title="Character #2" characterNumber={'secondCharacter'} />
        </div>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3 md:gap-10">
          {firstcharacter && <EpisodesComponent episodes={firstcharacter?.episode} title="Episodes Character #1" />}
          {firstcharacter && secondCharacter && <EpisodesComponent episodes={[...firstcharacter.episode, ...secondCharacter.episode]} title="Share Episodes #1 & #2" share={true} />}
          {secondCharacter && <EpisodesComponent episodes={secondCharacter?.episode} title="Episodes Character #2" />}
        </div>
        <div>
          <p className="text-gray-500 text-center py-14">© 2024 · Rodrigo Crespo</p>
        </div>
      </div>
    </main >
  );
}
