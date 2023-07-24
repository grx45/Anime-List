import { shortenString } from "../../helpers/useShortenTitle"

type CardProps = {
    large?: string
    episodes?: number
    english?: string
    romaji?: string
}


function VerticalRectangle({ large, episodes, english, romaji }: CardProps) {
    return (
        <div className="card-container">
            <img className="cover" src={large} />
            <p className="title">{english ? shortenString(english) : shortenString(romaji)}</p>
            <span className="episodes">{episodes ? episodes + " Episodes" : "-"}</span>
        </div>
    );
}

export default VerticalRectangle;