const API_ACCESS_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTMyNWY2NzlhMGVlYjQ3M2ZjYTJhZDM1ZmVkMjdlNCIsIm5iZiI6MTc1ODc2MTY2My4zNTIsInN1YiI6IjY4ZDQ5MmJmODM4N2FkYzZjOTkxMzkxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z-aSlS1E83jzYdGMnJQptk1KUqkj3Uyg5_cUHTJMrLA';

const BASE_URL = 'https://api.themoviedb.org';

export class MovieApi {
  private async sendRequest(payload: object, url: string, method: string) {
    const options: RequestInit = {
      method,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${API_ACCESS_KEY}`,
      },
    };

    if (method !== 'GET') {
      options.body = JSON.stringify(payload);
    }

    const response: Response = await fetch(url, options);
    return response;
  }

  async getData(payload: object) {
    // const url = `${BASE_URL}/3/movie/286217`;
    const url = 'https://api.themoviedb.org/3/movie/286217/images';
    const response = await this.sendRequest(payload, url, 'GET');

    if (response.status !== 200) {
      throw new Error(`Failed to get data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
}
