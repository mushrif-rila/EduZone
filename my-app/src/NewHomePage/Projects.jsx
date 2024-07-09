import React, { useState } from 'react';
import {data } from './data';

const Projects = () => {
  //   console.log(data);
  const [foods, setProjects] = useState(data);

  //   Filter Type burgers/pizza/etc
  const filterCategory = (category) => {
    setProjects(
      data.filter((item) => {
        return item.category === category;
      })
    );
  };

  //   Filter by price
  const filterDuration = (price) => {
    setProjects(
      data.filter((item) => {
        return item.price === price;
      })
    );
  };



  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='text-black font-bold text-4xl text-center'>
        Projects
      </h1>

      {/* Filter Row */}
      <div className='flex flex-col lg:flex-row justify-between'>
        {/* Fliter Type */}
        <div>
          <p className='font-bold text-gray-700'>Filter Category</p>
          <div className='flex justfiy-between flex-wrap'>
            <button
              onClick={() => setProjects(data)}
              style={{border: '0.1rem solid #000',
                borderRadius: '8px',
                marginRight: 5,
                marginLeft: 5,
                padding: '2px 5px 2px 5px',
                backgroundColor: '#ffff',
                color: '#000',}}
            >
              All
            </button>
            <button
              onClick={() => filterCategory('ML & AI')}               
              style={{border: '0.1rem solid #000',
                borderRadius: '8px',
                marginRight: 5,
                marginLeft: 5,
                padding: '2px 5px 2px 5px',
                backgroundColor: '#ffff',
                color: '#000',}}
            >
              ML & AI
            </button>
            <button
              onClick={() => filterCategory('Software')}
              style={{border: '0.1rem solid #000',
                borderRadius: '8px',
                marginRight: 5,
                marginLeft: 5,
                padding: '2px 5px 2px 5px',
                backgroundColor: '#ffff',
                color: '#000',}}
            >
              Software
            </button>            <button
              onClick={() => filterCategory('Network')}
              style={{border: '0.1rem solid #000',
                borderRadius: '8px',
                marginRight: 5,
                marginLeft: 5,
                padding: '2px 5px 2px 5px',
                backgroundColor: '#ffff',
                color: '#000',}}
            >
              Network
            </button>
            <button
              onClick={() => filterCategory('Telecommuniaction')}
              style={{border: '0.1rem solid #000',
                borderRadius: '8px',
                marginRight: 5,
                marginLeft: 5,
                padding: '2px 5px 2px 5px',
                backgroundColor: '#ffff',
                color: '#000',}}
            >
              Telecommuniaction
            </button>
          </div>
        </div>

        {/* Filter Price */}
        <div>
          <p className='font-bold text-gray-700'>Filter Duration (Months) </p>
          <div className='flex justify-between max-w-[390px] w-full'>
            <button
              onClick={() => filterDuration('1 month')}
              style={{border: '0.1rem solid #000',
                borderRadius: '8px',
                marginRight: 5,
                marginLeft: 5,
                padding: '2px 10px 2px 10px',
                backgroundColor: '#ffff',
                color: '#000',}}
            >
              1 
            </button>
            <button
              onClick={() => filterDuration('2 months')}
              style={{border: '0.1rem solid #000',
                borderRadius: '8px',
                marginRight: 5,
                marginLeft: 5,
                marginLeft: 5,
                padding: '2px 10px 2px 10px',
                backgroundColor: '#ffff',
                color: '#000',}}
            >
              2
            </button>
            <button
              onClick={() => filterDuration('3 months')}
              style={{border: '0.1rem solid #000',
                borderRadius: '8px',
                marginRight: 5,
                marginLeft: 5,
                marginLeft: 5,
                padding: '2px 10px 2px 10px',
                backgroundColor: '#ffff',
                color: '#000',}}
            >
              3
            </button>
            <button
              onClick={() => filterDuration('4 months')}
              style={{border: '0.1rem solid #000',
                borderRadius: '8px',
                marginRight: 5,
                marginLeft: 5,
                marginLeft: 5,
                padding: '2px 10px 2px 10px',
                backgroundColor: '#ffff',
                color: '#000',}}
            >
              4
            </button>
          </div>
        </div>
      </div>

      {/* Display foods */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
        {foods.map((item, index) => (
          <div
            key={index}
            className='border shadow-lg rounded-lg hover:scale-105 duration-300'
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-full h-[200px] object-cover rounded-t-lg'
            />
            <div className='flex justify-between px-2 py-4'>
              <p className='font-bold'>{item.name}</p>
              <p>
                <span className='bg-black text-white p-1 rounded-full'>
                  {item.price}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
