import React, { useEffect } from 'react';
import "../Components/Home.scss";
import axios from "axios";
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaPlayCircle } from "react-icons/fa";




const Carousel = ({ movies }) => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    nextArrow: <></>,
    centerMode: true,
    centerPadding: '0',

  };

  return (
    <Slider {...settings}>
    {movies.map((movie) => (
      <div key={movie.id} style={{display: 'flex', alignItems: 'end'}}>
        <img
          src={`${imgUrl}/${movie.poster_path}`}
          alt={movie.original_title}
          style={{
            height: '400px',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            borderRadius: '40px',
            margin: 'auto',
          }}
        />
        <h3 style={{textAlign: 'center', color: 'white', marginTop: '5px'}}>{movie.original_title}</h3>
        <button style={{borderRadius: '30px', textAlign: 'center', backgroundColor: '#ed4545',border: '0', display: 'flex', alignItems: 'center'}}> <FaPlayCircle style={{color: 'white', marginLeft: '5px', fontSize: '20px'}}/>  <a href="/" style={{fontSize: '20px', textDecoration: 'none',color: 'white', margin: '10px'}}>Watch Trailer</a></button>
      </div>
    ))}
  </Slider>
  );
};

const apiKey = "8008e45d3e228930755799d0f0c32cf7";
const url  = "https://api.themoviedb.org/3/movie";
const imgUrl = "https://image.tmdb.org/t/p/original"
const popular = "popular"
const Upcoming = "upcoming"
const TopRated = "top_rated"
const Playing = "now_playing"
const Card = ({img}) => (
  <img className='card' src={img} alt="cover" />
)

const Row = ({title, arr = [{
  img : "https://th.bing.com/th/id/R.547ee821146e7cc244354be3931a7a3f?rik=d%2fp84MguFALXNg&riu=http%3a%2f%2fwww.knowitalljoe.com%2fwp-content%2fuploads%2f2014%2f05%2fposter-for-a-million-ways-to-die-in-the-west.jpg&ehk=uTa16%2bq%2fqHGPxJRVWffy0DLui9tDmuC%2bdkng1jjxGGo%3d&risl=&pid=ImgRaw&r=0"

},
],
}) => (

<div className='row'>

<h2>{title}</h2>
<div>

  {
    arr.map((item,index) => (
      <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
    ))
  }
</div>
</div>
)

const Home = () => {

  const [popularMovie, setPopularMovie] = useState([]);
  const [upComingrMovie, setUpComingMovie] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [playingMovie, setPlayingMovie] = useState([]);

  useEffect(() => {
    const fetchPopular = async() => {
     const {data : {results}, } = await axios.get(`${url}/${popular}?api_key=${apiKey}`)
      setPopularMovie(results);

    }
    const fetchUpcoming = async() => {
     const {data : {results}, } = await axios.get(`${url}/${Upcoming}?api_key=${apiKey}`)
     setUpComingMovie(results);

    }
    const fetchTopRated = async() => {
     const {data : {results}, } = await axios.get(`${url}/${TopRated}?api_key=${apiKey}`)
     setTopRatedMovie(results);

    }
    const fetchPlaying = async() => {
     const {data : {results}, } = await axios.get(`${url}/${Playing}?api_key=${apiKey}`)
     setPlayingMovie(results);

    }

    fetchPopular();
    fetchUpcoming();
    fetchTopRated();
    fetchPlaying();
}, [])


  return (
    <section className='home'>
      <div className='banner'>
      {popularMovie.length > 0 && (
            <>
            <Carousel  movies={popularMovie.slice(0, 5)} />
            </>
        )}



      </div>
      <Row title={"Popular"} arr={popularMovie}/>
      <Row title={"Upcoming"} arr={upComingrMovie}/>
      <Row title={"Classics"} arr={topRatedMovie}/>
      <Row title={"Top 10"} arr={playingMovie}/>
    </section>
  )
}

export default Home
