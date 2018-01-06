import React from 'react';

const LoadingScreen = () => {
  return (
    <div className='loading-container'>
      <div>
        <i className="fa fa-spinner fa-spin fa-5x fa-fw"></i>
      </div>
      <span className="loading-game-text">Loading Game...</span>
    </div>
  )
}

export default LoadingScreen