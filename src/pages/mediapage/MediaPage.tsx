import { useParams } from "react-router-dom";


function MediaPage() {
    const params = useParams()

    console.log("dari parameters:", params)
    return (
        <div>{params.title}</div>
    );
}

export default MediaPage;