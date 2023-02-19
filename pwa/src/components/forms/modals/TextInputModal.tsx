import { Field, Form, Formik } from "formik";
import { useState } from "react";
import PrimaryButton from "../../PrimaryButton";

export default function TextInputModal({ id, onSave }: { id: string, onSave: (id: string, values: any) => void }) {
    const [label, setLabel] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    function handleSubmit() {
        onSave(id, {
            "label": label,
            "placeholder": placeholder
        });
    }
    return (
        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id={id + "-modal"} tabIndex={-1} aria-labelledby={id + "-modal"} aria-hidden="true">
            <div className="modal-dialog relative w-auto pointer-events-none">
                <div
                    className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <div
                        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 className="text-xl font-medium leading-normal text-gray-800" id={id + "-modal"}>Edycja pola tekstowego</h5>
                        <button type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body relative p-4">
                        <label htmlFor="label">Label</label>
                        <input name="label" onChange={(e) => { setLabel(e.target.value) }} />
                        <label htmlFor="placeholder">Placeholder</label>
                        <input name="placeholder" onChange={(e) => { setPlaceholder(e.target.value) }} />
                        <PrimaryButton type="button" className="mt-2" onClick={() => handleSubmit()}>Zapisz</PrimaryButton>
                    </div>

                </div>
            </div>
        </div>
    );
}
