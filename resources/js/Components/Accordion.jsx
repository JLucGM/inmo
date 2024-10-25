import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

const AccordionItem = ({ name, content, isOpen, onToggle }) => {
    return (
        <div className="accordion-item border rounded-3xl mb-4">
            <div className="accordion-header bordser flex justify-between p-5" onClick={onToggle}>
                <h2>{name}</h2>
                <span>
                    {
                        isOpen
                            ? <ChevronUpIcon className="size-4" />
                            : <ChevronDownIcon className="size-4" />
                    }
                </span>
            </div>
            {isOpen &&
                <div className="accordion-content  p-5">
                    {content}
                </div>
            }
        </div>
    );
};

export default function Accordion({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    name={item.name}
                    content={item.content}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                />
            ))}
        </div>
    );
};