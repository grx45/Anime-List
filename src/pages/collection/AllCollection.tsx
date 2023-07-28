import { useEffect, useState } from "react";
import "./CollectionStyling.css"
import CollectionCards from "../../components/cards/CollectionCards";
import { BsPlusLg } from 'react-icons/bs'
import ModalDelete from "../../components/modal/ModalDelete";
import { useSubModal } from "../../context/SubModalContext";
import NewNameModal from "../../components/modal/NewNameModal";

interface localStorageItems {
    CollectionName?: string;
    CollectionImage?: string;
    Content: { Name?: string; Image?: string }[];
}

function AllCollection() {

    const [collections, setCollections] = useState<localStorageItems[]>([]);
    const [toDelete, setToDelete] = useState<string | undefined>("")
    const { isSubModalOpen, setIsSubModalOpen } = useSubModal()
    const [activeModal, setActiveModal] = useState<"delete" | "newName" | null>(null); // State to track the active modal

    useEffect(() => {
        window.scrollTo(0, 0)
        const storedCollections = localStorage.getItem("collections");
        if (storedCollections) {
            setCollections(JSON.parse(storedCollections));
        }

    }, [])

    function removeCollection() {
        const copyOfCollections = [...collections]

        // filter to get all array where collectionName not the same as argument provided name
        let resultArr = copyOfCollections.filter((val) => val.CollectionName !== toDelete)

        // if length 0 means the collections list should be empty so delete from localstorage
        if (resultArr.length === 0) {
            localStorage.removeItem("collections");
            closeModal()
        } else {
            localStorage.setItem("collections", JSON.stringify(resultArr));
            setCollections(resultArr)
        }
        closeModal()
    }

    function openModal(modalType: "delete" | "newName") {
        setActiveModal(modalType);
        setIsSubModalOpen(true);
    }

    function closeModal() {
        setActiveModal(null);
        setIsSubModalOpen(false);
    }

    function printCards() {
        return collections.map((val, idx) => {
            return (
                <CollectionCards cardName={val.CollectionName} image={val.CollectionImage} setToDelete={setToDelete} key={idx} onDeleteClick={() => openModal("delete")} />
            )
        })
    }


    return (
        <div className="container">
            {activeModal === "delete" && (
                <ModalDelete deleteFunction={removeCollection} closeFunction={closeModal} />
            )}
            {activeModal === "newName" && (
                <NewNameModal collections={collections} setCollections={setCollections} closeFunction={closeModal} />
            )}
            <h3 className="headers">Collections</h3>
            <div className="all-collection-container">
                <div onClick={() => openModal("newName")} className="collection-button-container">
                    <BsPlusLg className="big-icon" />
                </div>
                {printCards()}
            </div>
        </div>
    );
}

export default AllCollection;