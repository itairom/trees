import React from 'react'
import { ImageUpload } from '../cmps/ImageUpload'
import { Sheet } from '../cmps/Sheet'
import { TreesForm } from '../cmps/TreesForm'


export const Home = () => {




    return (
        <section className="main-container">
            <h1>Home</h1>

            <ImageUpload />

            <TreesForm />
        </section>
    )
}