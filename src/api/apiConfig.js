const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'f6631314124f4a56ca1ff1c6da351144',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,

}

export default apiConfig