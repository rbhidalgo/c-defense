import React, { useState, useEffect } from "react";
import profiles from '../data/profiles';
import './profiles.css';

const Profiles = () => {
  const [card, setCard] = useState(false);
  const [cardData, setCardData] = useState(null);
  function displayCard(data) {
    setCardData(data);
    setCard(!card);
  }
  // useEffect(()  => {
  //   if(!card) {
  //     document.body.classList.remove('active-card')
  //   } 
  //   return () => {
  //     document.body.classList.add('active-card')
  //   }
  // });
  useEffect(()  => {
    if(!card) {
      document.querySelector("html").classList.remove('active-card')
    } 
    return () => {
      document.querySelector("html").classList.add('active-card')
    }
  });

  return <>
    {profiles.map((data, i) => (
    <div className={"profile-card__wrapper" + `${data.archived ? " archived" : ""}`} onClick={() => displayCard(data)} key={data.lastName}>
        <div className="profile-card__img"><img src={data.image} alt="" className="obj-img" /></div>
        <div className="profile-card__name">
            <h2 className="heading-sm">{data.firstName} {data.lastName}</h2>
        </div>
    </div>
    ))}
    { card &&
    <div className="card-data">
      <div className="profile-card__data">
        <div className="profile-card__img"><img src={cardData.image} alt="" className="obj-img" /></div>
        <div className="profile-card__details">
          <div className="profile-card__data-name bg-primary">
            <h2 className="heading white mb0">{cardData.firstName} <br />{cardData.lastName}</h2>
            <span className="close-btn" onClick={displayCard}><img src="/img/icon-close.png" alt="" /></span>
          </div>
            <h2>TIER {cardData.tier}</h2>
            <p><span className="white">Height:</span> {cardData.height}</p>
            <p><span className="white">Weight:</span> {cardData.weight}</p>
            <p><span className="white">Age:</span> {cardData.age}</p>
            <p><span className="white">Ethnicity:</span> {cardData.race}</p>
            <p><span className="white">Languages:</span> {cardData.languages}</p>
            <p><span className="white">Certifications:</span> {cardData.certifications}</p>
            <p><span className="white">Special Skills:</span> {cardData.specialSkills}</p>
            <h2 className="heading white">BIO</h2>
            <div class="profile-card__data-bio">
              <p>{cardData.bio}</p>
              <div className="profile-card__data-icon"><img src="/img/cda-shield.png" alt="CDA shield logo icon"/></div>
            </div>
        </div>
        </div>
      </div>
    }
  </>;
}

export default Profiles;