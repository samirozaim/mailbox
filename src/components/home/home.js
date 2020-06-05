import React from 'react'

const Home = () => {

    localStorage.removeItem('token');

    return (
        <div className='container d-flex flex-column align-items-center justify-content-center flex-fill '>
            <img src='https://thumbs.gfycat.com/UniqueBiodegradableGartersnake-size_restricted.gif' alt='welcome' />
            <h3>Log in to access the dashboard ...</h3>
        </div>
    )
}

export default Home