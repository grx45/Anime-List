import { useParams } from "react-router-dom";


function InfoPage() {
    const params = useParams()

    console.log("dari parameters:", params)
    return (
        <div>{params.title}</div>
    );
}

export default InfoPage;