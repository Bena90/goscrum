import React from 'react';

export const Card = ({editCardStatus, deleteCard, data}) =>{
    const [showMore, setShowMore] = React.useState(false);

    const limitString = (str) => {
        if (str.length > 150) return { string: str.slice(0, 147).concat('...'), addButton: true }
        return { string: str, addButton: false }
    }

    const datetime = new Date (data.createdAt).toLocaleString() + ' hs.';

    return (
        <div className="card">
            <div className="close"onClick={() => deleteCard(data._id)}>X</div>
            <h3>{data.title}</h3>
            <h6>{datetime}</h6>
            <h5> {data.user.userName}</h5>
            <button
                className={data.status.toLowerCase()}
                type="button"
                onClick={()=> editCardStatus(data)}
            >
                {data.status}
            </button>
            <button className={data.importance.toLowerCase()} type="button" > {data.importance} </button>
            {!showMore && <p>{limitString (data.description).string} </p>}
            {
                showMore && 
                <>
                    <p>{data.description}</p>
                    <button type="button" onClick={()=>setShowMore(false)}> Ver menos </button>
                </>
            }
            { 
                !showMore && (limitString(data.description).addButton) && 
                <button type="button" onClick={()=>setShowMore(true)}> Ver más </button>
            }
        </div>
    )
}
