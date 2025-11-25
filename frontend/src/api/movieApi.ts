import type { FilterType } from '../types/movieTypes';

const API_ACCESS_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTMyNWY2NzlhMGVlYjQ3M2ZjYTJhZDM1ZmVkMjdlNCIsIm5iZiI6MTc1ODc2MTY2My4zNTIsInN1YiI6IjY4ZDQ5MmJmODM4N2FkYzZjOTkxMzkxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z-aSlS1E83jzYdGMnJQptk1KUqkj3Uyg5_cUHTJMrLA';

export class MovieApi {
  private async sendRequest(url: string, method: string, payload?: object) {
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

    if (!response.ok) {
      throw new Error(`Failed to get data: ${response.statusText}`);
    }

    return await response.json();
  }

  async getMovie(url: string) {
    const data = await this.sendRequest(url, 'GET');
    return data;
  }
}
