import React from 'react';
import '../App.css';


export default function Section({ id, title, children, bg }) {
    return (
        <section id={id} className={`section bg-${bg}`}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}