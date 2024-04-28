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
            console.log(characters);

            return characters.data
        } catch (error) {
            throw error;
        }
    }

    public async getEpisodes(): Promise<void> {
        try {
            // const data: LoginResponse = await this.apiService.post('/auth/login', { username, password }, { requireAuth: false });
            // if (data.token) {
            //     localStorage.setItem('token', data.token);
            // }
            // window.location.href = '/home';
        } catch (error) {
            throw error; // Propagar el error para manejarlo en el componente
        }
    }

}

export default ApiService;