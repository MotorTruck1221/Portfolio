import React from 'react';
import Title from './Title.jsx';

function PortfolioItem({title, imgUrl, stack, link, description}) {
    return (
        <a href={link} target="_blank" className='transition ease-in-out border-2 border-stone-900 rounded-md overflow-hidden dark:border-white hover:scale-105 active:scale-95'>
            <img src={imgUrl} 
                alt="Image Url of Project" 
                className='w-full h-36 md:h-48 object-cover cursor-pointer' 
            />
            <div className='w-full p-4'>
                <h3 className='text-lg md:text-xl mb-2 md:mb-3 font-semibold dark:text-white'>{title}</h3>
                <p className='text-sm mb-2 md:mb-3 dark:text-white'>{description}</p>
                <p className='flex flex-wrap gap-2 flex-row-items-center justify-start text-xs md:text-sm dark:text-white'>
                    {stack.map (item => (
                        <span className='inline-block px-2 py-1 font-semibold border-2 border-stone-900 rounded-md dark:border-white'>
                           {item}
                        </span>
                    ))}
                </p>
            </div>
        </a>
    );
}

export default PortfolioItem;
