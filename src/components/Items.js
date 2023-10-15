import React from 'react';
import Item from "./Item";

const Items = ({itemLang, setMinDay, items, onAdd, onShowItem, onDelete, addQuantity, page, isPostsLoading, setIsPostsLoading}) => {


    return (
        <main>
            {
                items.map((el) => {
                    if(el.active == 1) {
                        try {
                            return (
                                <Item itemLang={itemLang} setMinDay={setMinDay} addQuantity={addQuantity} onDelete={onDelete} onShowItem={onShowItem} key={el.id}
                                      item={el} onAdd={onAdd}/>
                            )
                        } catch (e) {
                            console.log(e)
                        }
                    }
                })
            }
        </main>
    );
};

export default Items;