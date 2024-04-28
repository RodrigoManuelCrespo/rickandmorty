import { Card, CardBody } from "@nextui-org/react"
import { useEffect, useState } from "react"
import TitleComponent from "./TitleComponent"

interface Props {
    episodes: Array<string>
    title: string
    share?: boolean
}

const EpisodesComponent: React.FC<Props> = ({ episodes, title, share }: Props) => {
    const [episodesData, setEpisodesData] = useState<Array<EpisodeType>>([]);

    useEffect(() => {
        const fetchCharacterEpisodes = async () => {
            try {
                let episodesFilter: Array<string>

                if (share) {
                    episodesFilter = episodes.filter((elemento, indice) => episodes.indexOf(elemento) !== indice);
                } else {
                    episodesFilter = [...episodes]
                }

                const episodesArray: Array<EpisodeType> = await Promise.all(
                    episodesFilter.map(async (url: any) => {
                        const episodeResponse = await fetch(url);
                        const episodeData = await episodeResponse.json();
                        return episodeData;
                    })
                );

                setEpisodesData(episodesArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCharacterEpisodes();
    }, [episodes, share]);

    return (
        episodesData.length > 0 && <div className="mb-6">
            <TitleComponent title={title} />
            <Card>
                <CardBody>
                    <ul>
                        {episodesData.map(episode => (
                            <li key={episode.id} className='mb-4'>
                                <p>{episode.episode}: <strong>{episode.name}</strong></p>
                                <p className='text-default-500'>{episode.air_date}</p>
                            </li>

                        ))}
                    </ul>
                </CardBody>
            </Card>
        </div>
    )
}

export default EpisodesComponent
