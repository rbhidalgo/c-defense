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
            {cardData.tier != null ? <h2 className="profile-card__data-tier">TIER {cardData.tier}</h2> : null}
            {cardData.height != null ? <p><span className="white">Height:</span> {cardData.height.toString().includes(".") ? cardData.height.toString().replace(".", "ft ") + 'in' : cardData.height.toString() + "ft"}</p> : null}
            {cardData.weight != null ? <p><span className="white">Weight:</span> {cardData.weight.toString() + "lbs"}</p> : null}
            {cardData.age != null ? <p><span className="white">Age:</span> {cardData.age}</p> : null}
            {cardData.hireDate != null ? <p><span className="white">Hire Date:</span> {cardData.hireDate}</p> : null}
            {cardData.race != null ? <p><span className="white">Ethnicity:</span> {cardData.race}</p> : null}
            {cardData.languages != null ? <p><span className="white">Languages:</span> {cardData.languages}</p> : null}
            {cardData.certifications != null ? <p><span className="white">Certifications:</span> {cardData.certifications.join(', ')}</p> : null}
            {cardData.specialSkills != null ? <ul className="profile-card__data-skills">{cardData.specialSkills.map((skill, i) => (
              <li key={skill}><span className="white">Special Skill {i+1}:</span> {skill}</li>
            ))}</ul> : null}
            <h2 className="heading white">BIO</h2>
            <div className="profile-card__data-bio">
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