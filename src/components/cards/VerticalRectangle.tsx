import { useNavigate } from "react-router-dom"
import { shortenString } from "../../helpers/useShortenTitle"


type CardProps = {
    large?: string
    episodes?: number
    english?: string
    romaji?: string
}


function VerticalRectangle({ large, episodes, english, romaji }: CardProps) {
    const navigate = useNavigate()

    function handleLinkClick(url: string | undefined) {
        if (!url) {
            return null
        }
        let replacedString = encodeURIComponent(url)
        navigate(`/info/${replacedString}`);
    }

    return (
        <div className="card-container">
            <img className="cover" src={large} onClick={() => handleLinkClick(english || romaji)} />
            <p className="title" onClick={() => handleLinkClick(english || romaji)}>{english ? shortenString(english) : shortenString(romaji)}</p>
            <span className="episodes-home">{episodes ? episodes + " Episodes" : "-"}</span>
        </div>
    );
}

export default VerticalRectangle;