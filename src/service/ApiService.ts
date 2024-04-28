import axios from "axios";

export class ApiService {
    private static instance: ApiService;

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    public async getCharacters(page?: string): Promise<void> {
        try {
            const url = new URL('https://rickandmortyapi.com/api/character')
            page && url.searchParams.append('page', page);
            const characters: any = await axios(url.toString())
            return characters.data
        } catch (error) {
            throw error;
        }
    }

    public async getEpisodes(number?: string): Promise<void> {
        try {
            const url = new URL('https://rickandmortyapi.com/api/episode')
            number && url.searchParams.append('page', number);
            const episode: any = await axios(url.toString())
            console.log(episode);
            return episode.data
        } catch (error) {
            throw error;
        }
    }
}

export default ApiService;