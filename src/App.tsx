import { mockMovies } from "./data/mockMovies";
import { getPosterUrl, logMovie } from "./utils/movieHelper";

const App = () => {
  mockMovies.map(logMovie);
  console.log(getPosterUrl(mockMovies[0]));
};

export default App;
