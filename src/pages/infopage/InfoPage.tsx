import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { FetchSingleAnime } from "../../hooks/useFetchSingleAnime";
import { setupAnimeData } from "../../utils/animeUtils";
import { AiOutlineHome, AiOutlineClockCircle, AiFillStar, AiTwotoneCalendar } from 'react-icons/ai'
import { CgStack } from 'react-icons/cg'
import { BsPlus } from 'react-icons/bs'
import "../../Animepage.css"
import Tags from '../../components/tags/Tags'
import { changeBack } from "../../helpers/AnimePageFunction";

function InfoPage() {

    const params = useParams()
    const title = changeBack(params.title)
    const { loading, error, data } = FetchSingleAnime(title)
    console.log(data)
    const { name, banner, description, cover, lastUpdatedAt, airingDate, score, id, episodes, source, status, studio, genres } = setupAnimeData(data)

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
                                <h3 className="anime-heading">{name}</h3>
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
                                    {score ? <p> {score}/ 5.0</p> : <p> REVIEWS_PENDING</p>}
                                </div>
                                <div>
                                    <AiTwotoneCalendar className="icon" />
                                    {airingDate}
                                </div>
                                <div>
                                    <CgStack className="icon" />
                                    <p >{episodes} Episodes</p>
                                </div>
                                <div>
                                    <CgStack className="icon" style={{ visibility: "hidden" }} />
                                    <p style={{ position: "absolute", marginLeft: "10px" }}><span style={{ marginRight: "10px" }}>Original:</span>{source} </p>
                                </div>
                                <div className="big-media">
                                    <div className="genre-list">
                                        {printGenres()}
                                    </div>
                                    {description && (
                                        <div >
                                            <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
                                        </div>
                                    )}
                                    <div className="collection-button">
                                        <BsPlus className="icon" />
                                        Add to Collections

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container" style={{ marginBottom: "60px" }}>
                            Additional Info Pending
                        </div>

                        <div className="container mobile-section">
                            <div className="genre-list">
                                {printGenres()}
                            </div>
                            <div className="collection-button">
                                <BsPlus className="icon" />
                                Add to Collections

                            </div>
                            {description && (
                                <div className="description">
                                    <div dangerouslySetInnerHTML={{ __html: description }} />
                                </div>
                            )}
                        </div>

                    </>
                )
            }
        </>
    );
}

export default InfoPage;