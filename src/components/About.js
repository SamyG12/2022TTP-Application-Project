import React, { useState, useEffect } from 'react'
import sanityClient from "../client"
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from "@sanity/block-content-to-react"

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
  return builder.image(source)
}

export default function About() {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "author"]{
                name,
                bio,
                "authorImage": image.asset->url
            }`)
            .then((data) => setAuthor(data))
            .catch(console.error);
    }, [])

    if(!author) return <div>Loading...</div>
    
    return (
        <main className="relative" style={{backgroundColor: "#d6d3d1"}}>
            <div className="p-10 lg:pt-48 container mx-auto relative">
                <section className="bg-gray-50 rounded-lg shadow-2xl lg:flex p-20">
                    {console.log('author: ',author)}
                    <img
                        src={urlFor(author[0].authorImage).url()}
                        className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8"
                        alt={author.name} />
                    <div className="text-lg flex flex-col justify-center">
                        <h1 className="cursive text-6xl text-black-300 mb-4">
                            Hey there. I'm{" "}{author[0].name}
                            <span className="text-green-100"></span>
                        </h1>
                        <div className="prose lg:prose-xl text-black">
                            <BlockContent blocks={author[0].bio} projectId="10drkjrr" dataset="production"  />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
