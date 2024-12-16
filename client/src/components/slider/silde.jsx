import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { StartSlider } from '../../until/slideshow';

export default function Silde() {
 StartSlider();

  return (
    <Fragment>
       <section class="homepage-banner">
            <section>
                <div class="banner-slide"> 
                  <Link to={'/datlich'}>
                    <img  class="slide-img" src="../Images/Screenshot 2024-09-30 202652_upscayl_4x_ultrasharp.png" alt="slide" />
                  </Link>
    
                    <img  class="slide-img" src="../Images/Screenshot 2024-09-30 210207_upscayl_4x_ultrasharp.png" alt="slide"/>
      
                </div>
            </section>
        </section>
    </Fragment>
  )
}

