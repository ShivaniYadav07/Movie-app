import React, { useEffect } from 'react';
import "../../Components/Home/Home.scss";
import axios from "axios";
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaPlayCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Header from '../Header/Header'
// import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';





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
    <div key={movie.id} style={{ textAlign: 'center' }}>
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
      <h3 style={{ textAlign: 'center', color: 'white', marginTop: '5px' }}>{movie.original_title}</h3>
      <button style={{ borderRadius: '30px', backgroundColor: '#ed4545',width: '40%', border: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', margin: '10px auto'}}>
        <FaPlayCircle style={{ color: 'white', marginLeft: '5px', fontSize: '20px' }} />
        <a href="/" style={{ fontSize: '20px', textDecoration: 'none', color: 'white', marginLeft: '5px' }}>Watch Trailer</a>
      </button>
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
const Genre = "genre"
const genreses = "https://api.themoviedb.org/3"
const Card = ({img}) => (
  <img className='card' src={img} alt="cover" />
)


const Row = ({ id, title, arr }) => (
  <div className='row' id={id}>
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <div key={index}>
          <Card img={`${imgUrl}/${item.poster_path}`} />
          {item.original_title && (
            <h4>{item.original_title}</h4>
          )}
        </div>
      ))}
    </div>
  </div>
);



const Home = () => {

  const [popularMovie, setPopularMovie] = useState([]);
  const [upComingrMovie, setUpComingMovie] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [playingMovie, setPlayingMovie] = useState([]);
  const [genre, setGenreMovie] = useState([]);

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
    const getAllGenre = async() => {
     const {data : {genres}, } = await axios.get(`${genreses}/${Genre}/movie/list?api_key=${apiKey}`)
     setGenreMovie(genres);

    }

    fetchPopular();
    fetchUpcoming();
    fetchTopRated();
    fetchPlaying();
    getAllGenre();
}, [])



  return (
    <section className='home'>
      <Header />
      <div className='banner'>
      {popularMovie.length > 0 && (
            <>
            <Carousel  movies={popularMovie.slice(0, 5)} />
            </>
        )}



      </div>
      
<div className='genreBox'>
      {Array.isArray(genre) && genre.map((item, index) => (
    <Link key={index} to={`/genre/${item.id}`}>
      {item.name}
    </Link>
  ))}
</div>

<Row id='row1' title={"Popular"} arr={popularMovie}/>
<Row id='row2' title={"Upcoming"} arr={upComingrMovie}/>
<Row id='row3' title={"Classics"} arr={topRatedMovie}/>
<Row id='row4' title={"Top 10"} arr={playingMovie}/>

    </section>
  )
}

export default Home
