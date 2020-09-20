
const baseURL = 'https://chroniclingamerica.loc.gov/search/'

const APIStrings = {
  newsListAPI: baseURL + 'titles/results/?year1=1900&year2=2019&rows=20&format=json',
  searchArticleAPI: baseURL + 'pages/results/?&rows=20&format=json'
};

export default APIStrings;
