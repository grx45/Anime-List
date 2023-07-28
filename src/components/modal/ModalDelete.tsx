
import SubModalLayout from "./SubModalLayout";
import { useSubModal } from "../../context/SubModalContext";

interface ModalDeleteProps {
    deleteFunction: () => void
    closeFunction: () => void
}

function ModalDelete({ deleteFunction, closeFunction }: ModalDeleteProps) {

    return (
        <SubModalLayout title="Confirm Delete ">
            <div className="delete-group">
                <button className="cancel" onClick={closeFunction}>Cancel</button>
                <button className="delete" onClick={deleteFunction} >Delete</button>
            </div>
        </SubModalLayout>
    );
}

export default ModalDelete;
