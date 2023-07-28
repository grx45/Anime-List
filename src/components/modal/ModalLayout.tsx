
import { useModal } from '../../context/ModalContext';
import { AiOutlineClose } from 'react-icons/ai'
import { ReactNode } from 'react';

interface ModalLayoutProps {
    children: ReactNode;
    title: string
}

function ModalLayout({ children, title }: ModalLayoutProps) {

    const { isModalOpen, setIsModalOpen } = useModal()

    return (
        <>
            <div className={`modal-overlay ${isModalOpen ? "active" : ""}`} onClick={() => setIsModalOpen(!isModalOpen)} />
            <div className={`modal ${isModalOpen ? "active" : ""}`}>
                <div className="modal-box">
                    <div className='modal-header-container'>
                        <span>{title}</span>
                        <AiOutlineClose className='close' onClick={() => setIsModalOpen(false)} />
                    </div>
                    <div className='modal-content'>
                        {children} {/* content sohuld be customisable */}
                    </div>

                </div>
            </div>
        </>
    );
}

export default ModalLayout;