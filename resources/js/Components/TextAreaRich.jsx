import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextAreaRich = forwardRef(({ initialValue = '', onChange, styles = {}, name }, ref) => {
    const [text, setText] = useState(initialValue);

    const handleChange = (value) => {
        setText(value);
        if (onChange) {
            onChange(value); // Llama al callback con el nuevo valor
        }
    };

    useImperativeHandle(ref, () => ({
        getValue: () => text,
    }));

    return (
        <div style={styles}>
            <ReactQuill
                value={text}
                onChange={handleChange}
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['link', 'image'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['clean']
                    ],
                }}
                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-3xl shadow-sm"
            />
            <input type="hidden" name={name} value={text} />
        </div>
    );
});

export default TextAreaRich;