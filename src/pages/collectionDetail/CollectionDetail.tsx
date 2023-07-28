import { useParams } from "react-router-dom";
import { changeBack } from "../../helpers/AnimePageFunction";
import { useEffect, useState } from "react";
import "./DetailStyling.css"
import CollectionCards from "../../components/cards/CollectionCards";
import { useSubModal } from "../../context/SubModalContext";
import ModalDelete from "../../components/modal/ModalDelete";


interface localStorageItems {
    CollectionName?: string;
    CollectionImage?: string;
    Content: { Name?: string; Image?: string }[];
}

function CollectionDetail() {
    const [AllCollection, setAllCollection] = useState<localStorageItems[]>([])
    const [collection, setCollection] = useState<localStorageItems | null>(null)
    const [toDelete, setToDelete] = useState<string | undefined>("")
    const [activeModal, setActiveModal] = useState<"delete" | null>(null);
    const { setIsSubModalOpen } = useSubModal()
    const params = useParams()
    const nameOfCollection = changeBack(params.name)

    function printCards() {
        return collection?.Content.map((val, idx) => {
            return (
                <CollectionCards cardName={val.Name} image={val.Image} setToDelete={setToDelete} key={idx} onDeleteClick={() => openModal("delete")} />
            )
        })
    }

    function openModal(modalType: "delete") {
        setActiveModal(modalType);
        setIsSubModalOpen(true);
    }

    function closeModal() {
        setActiveModal(null);
        setIsSubModalOpen(false);
    }

    function removeAnime() {

        const copyOfCollection = { ...collection }

        const changedArray = copyOfCollection.Content?.filter((val) => val.Name !== toDelete)

        if (changedArray) {
            const updatedCollection = { ...copyOfCollection, Content: changedArray }
            setCollection(updatedCollection)

            // update AllCollection whose collectionName === nameOfCollection to reflect changes made to collection
            const indexToUpdate = AllCollection.findIndex((item) => item.CollectionName === nameOfCollection);
            if (indexToUpdate !== -1) {

                // make a copy of all collection
                const updatedAllCollection = [...AllCollection];


                // make the changes in the found index of all collection
                updatedAllCollection[indexToUpdate] = updatedCollection;

                setAllCollection(updatedAllCollection);

                localStorage.setItem("collections", JSON.stringify(updatedAllCollection));
            }
        }

        closeModal()
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        const storedCollections = localStorage.getItem("collections");
        if (storedCollections) {
            setAllCollection(JSON.parse(storedCollections));
        }
    }, [])

    useEffect(() => {
        const foundCollection = AllCollection.find(
            (item) => item.CollectionName === nameOfCollection
        );
        setCollection(foundCollection || null);
    }, [AllCollection])

    return (
        <div className="container">
            {activeModal === "delete" && (
                <ModalDelete deleteFunction={removeAnime} closeFunction={closeModal} />
            )}
            <h1 className="headers">{nameOfCollection}</h1>
            <div className="details-container">

                {printCards()}
            </div>
        </div>
    );
}

export default CollectionDetail;