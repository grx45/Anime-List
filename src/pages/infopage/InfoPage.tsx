import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { FetchSingleAnime } from "../../hooks/useFetchSingleAnime";
import { setupAnimeData } from "../../utils/animeUtils";
import { AiOutlineHome, AiOutlineClockCircle, AiFillStar } from 'react-icons/ai'
import "../../Animepage.css"
import Tags from '../../components/tags/Tags'

function InfoPage() {
    const params = useParams()
    const title = params.title
    const { loading, error, data } = FetchSingleAnime(title)
    console.log(data)
    const { name, demographic, banner, description, cover, lastUpdatedAt, airingDate, score, id, episodes, source, status, studio, genres } = setupAnimeData(data)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function printGenres(): any {

        return genres?.map((val) => {
            return (
                <Tags tag={val} />
            )
        })

    }

    return (
        <>
            {
                loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error : {error.message}</p>
                ) : (
                    <>
                        <div className="banner-section" style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "50% 0%" }}>
                            <div className="gradient-overlay"></div>
                        </div>
                        <div className="container header">
                            <div className="image-container">
                                <img src={cover} alt="cover" />
                            </div>

                            <div className="info-section">
                                <h3 className="anime-heading">{title}</h3>
                                <div>
                                    <AiOutlineHome className="icon" />
                                    <p>{studio}</p>
                                </div>
                                <div>
                                    <AiOutlineClockCircle className="icon" />
                                    <p>{status}</p>
                                </div>
                                <div>
                                    <AiFillStar className="star icon" />
                                    <p>{score} / 5.0</p>
                                </div>
                                <div className="big-media">

                                </div>
                            </div>

                        </div>
                        <div className="container genre-list">
                            {printGenres()}
                        </div>

                    </>
                )
            }
        </>
    );
}

export default InfoPage;