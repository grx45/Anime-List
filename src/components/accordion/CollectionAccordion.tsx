import { useState } from 'react'
import { BsPlus, BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { AiOutlineCheck } from 'react-icons/ai'
import { useModal } from '../../context/ModalContext'


type AccordionProps = {
    title?: string;
    availableIn: any[]
}

function CollectionAccordion({ title, availableIn }: AccordionProps) {

    const [isOpen, setIsOpen] = useState(false)
    const { setIsModalOpen, isModalOpen } = useModal()

    function ShowCollections(): any {
        if (availableIn.length === 0) {
            return null
        } else {
            return availableIn.map((val, idx) => {
                return (
                    <h4 key={idx}>{val}</h4>
                )
            })
        }

    }

    return (
        <div className={`Accordion-container ${isOpen ? "active" : ""}`} style={{ flexDirection: "row" }} >
            <div className="button-group">
                <div onClick={() => setIsModalOpen(!isModalOpen)} className="add-button" >
                    {
                        availableIn.length === 0 ? (
                            <>
                                <BsPlus className="icon" />
                                {title}
                            </>
                        ) :
                            (
                                <>
                                    <AiOutlineCheck className="icon" style={{ color: "green" }} />
                                    Already in Collection
                                </>

                            )
                    }

                </div>
                {
                    isOpen === false ? (
                        <button className='Accordion-expand' onClick={() => setIsOpen(!isOpen)}><BsChevronDown /></button>
                    ) : (
                        <button className='Accordion-expand' onClick={() => setIsOpen(!isOpen)}><BsChevronUp /></button>
                    )
                }
            </div>
            <div className='accordion-content'>
                {ShowCollections()}
            </div>

        </div>

    );
}

export default CollectionAccordion;
