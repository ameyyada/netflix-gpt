
import { Header } from './Header'
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies';
import { MainContainer } from './MainContainer';
import SecondaryContainer from './SecondaryContainer';




export const Browse = () => {
// const dispatch = useDispatch()

useNowPlayingMovies();


  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />


    </div>
  )
}
