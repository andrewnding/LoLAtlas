import React from 'react';

const LoadingScreen = () => {
  return (
    <div className='loading-container'>
      <div>
        <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
      </div>
      <span>Loading Game...</span>
    </div>
  )
}

export default LoadingScreen