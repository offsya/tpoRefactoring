import React from 'react';


const ItemsToCatalog = ({categories, items, onAdd, onShowItem, onDelete, addQuantity, page, isPostsLoading, setIsPostsLoading, chooseCategory, setCheckCategory}) => {



    return (
        <main className='mainCt'>
            {
                categories.map((el, index) => {
                    try {
                        return (

                            <div className='item itemCt' onClick={() => {chooseCategory(el.key); setCheckCategory(false)}}>
                                <img alt={el.title} src={el.img}/>
                                <h4>{el.title}</h4>
                            </div>
                        )
                    }catch (e){console.log(e)}
                })
            }
        </main>
    );
};

export default ItemsToCatalog;