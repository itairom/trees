import React from "react"

export const TreesImages = (...props) => {

    const { trees } = props[0]
    return (
        <section className="trees-images flex">
            {trees?.map((tree) => {
                return (
                    <div key={tree._id} className="image-card pointer">
                        <p >{tree.idx}</p>
                        {tree.imgUrl !== '' && <img key={tree._id} src={tree.imgUrl} alt="tree" />}
                        {tree.imgUrl === '' && <img key={tree._id} src="imgs/tree_silhouette.png" alt="tree" />}
                    </div>
                )
            })}
        </section>

    )
}