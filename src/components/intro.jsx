import React from 'react';

function Intro() {
    return (
        <div className='flex items-center justify-center flex-col text-center pt-20 pb-6'>
            <h1 className='text-4xl md:text-7xl dark:text-white mb-1 md:mb-3 font-bold'>MotorTruck1221</h1>
            <p className='text-base md:text-xl mb-3 font-medium'>Hobbyist Programmer/Full Stack Developer</p>
            <p className='text-sm max-w-xl mb-6 font-bold'>I'm a 17-year-old full-stack developer with a passion for exploring new technologies. I'm currently working on a few projects such
            as: <a href="https://github.com/ruby-network/ruby" className='text-sky-500 underline' target="_blank">Ruby</a> a performant and simple proxy. I'm also creating a Linux operating system with some friends.
            </p>
        </div>
    );
}

export default Intro;
