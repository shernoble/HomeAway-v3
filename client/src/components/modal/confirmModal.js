import React from 'react';

export function Modal({title,desc,show, handleClose, onConfirm}){

    const modalStyle = {
        display: show ? 'block' : 'none',
    };
    return (
        <div className="modal" style={modalStyle} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
                <p>{desc}</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>
                Close
                </button>
                <button type="button" className="btn btn-outline-danger" onClick={onConfirm}>
                Confirm
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};
