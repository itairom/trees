import React from 'react'

export default function FormModal({ HandleiIsModalShown, modal, imgSrc }) {
    return (
        <div
            onClick={() => HandleiIsModalShown(modal.type, !modal.isShowen)}
            className="form-modal health-modal" >
            <div className="modal-container ">
                <img src={imgSrc} alt="מקרא" />
            </div>
        </div>
    )
}