import React from 'react';

const groupItems = (items) => {
    return items.reduce((acc, item) => {
        const key = item.category;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
};

const Menu = ({ items, addItemToCart }) => {
    const groupedItems = groupItems(items);

    return (
        <div className="menu-grid">
            {Object.keys(groupedItems).map(category => (
                <div key={category} className="menu-card">
                    <h3 className="menu-category-title">
                        {category}
                    </h3>
                    
                    <ul className="menu-list">
                        {groupedItems[category].map(item => (
                            <li key={item.id}>
                                <button 
                                    className="menu-item-btn"
                                    onClick={() => addItemToCart(item)}
                                >
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-price gold-text">${item.price.toFixed(2)}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Menu;