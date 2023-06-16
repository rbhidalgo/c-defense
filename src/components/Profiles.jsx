import React, { useState, useEffect, useRef } from 'react'
import ReactToPrint from 'react-to-print';
import profilesData from '../data/profiles'
import './profiles.css'

const Profiles = () => {
	const [card, setCard] = useState(false)
	const [cardData, setCardData] = useState(null)
	const [profileData, setProfileData] = useState(profilesData)
	const [hideArchive, sethideArchive] = useState(true)
	const [expandedContainer, setExpandedContainer] = useState(null)
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState('')
	const [selectedSortOption, setSelectedSortOption] = useState('')
	const [printCards, setPrintCards] = useState(true)
  const [openFilters, setOpenFilters] = useState(false)
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const exportWrapperRef = useRef(null);

	const checkboxRef = useRef(null)
	const filterRef = useRef(null)
  const printRef = useRef();


	const optionsRefs = {
		activeDuty: useRef(null),
		certifications: useRef(null),
		height: useRef(null),
		language: useRef(null),
		location: useRef(null),
		passport: useRef(null),
		race: useRef(null),
		tier: useRef(null),
		weight: useRef(null),
		travel: useRef(null),
		education: useRef(null),
	}

	const checkboxRefs = {
		nameAscending: useRef(null),
		nameDescending: useRef(null),
		ageAscending: useRef(null),
		ageDescending: useRef(null),
		heightTallest: useRef(null),
		heightShortest: useRef(null),
		hireDateOldest: useRef(null),
		hireDateNewest: useRef(null),
		tierAscending: useRef(null),
		tierDescending: useRef(null),
	}

	const handleCheckboxChange = event => {
		const { name } = event.target
		setSelectedSortOption(name)
	}

	const toggleOptions = containerId => {
		setExpandedContainer(prevExpandedContainer => (prevExpandedContainer === containerId ? null : containerId))
	}

  const toggleFilters = () => {
    setOpenFilters(!openFilters);
    if (openFilters) {
      setSidebarOpen(false);
    }
  };


	function displayCard(data) {
		setCardData(data)
		setCard(!card)
	}

  useEffect(() => {
    const exportWrapperElement = exportWrapperRef.current;
    const sidebarElement = exportWrapperElement.parentElement.parentElement;
  
    if (isSidebarOpen) {
      const sidebarWidth = exportWrapperElement.offsetWidth;
      sidebarElement.style.transform = `translateX(0)`;
    } else {
      const sidebarWidth = exportWrapperElement.offsetWidth;
      sidebarElement.style.transform = `translateX(${sidebarWidth}px)`;
    }
  
    if (!card) {
      document.querySelector('html').classList.remove('active-card');
    }
  
    return () => {
      document.querySelector('html').classList.add('active-card');
    };
  }, [isSidebarOpen, card]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


	const handleSubmit = e => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const checkedValues = []

		for (let [key, value] of formData.entries()) {
			if (value !== '') {
				checkedValues.push(value)
			}
		}

		// if (checkedValues.length === 0) {
		//   // No values selected, handle accordingly
		//   return;
		// }

		let filteredData = profilesData.filter(item => {
			let isMatch = true

			for (let value of checkedValues) {
				if (
					value !== item.activeDuty &&
					!(value === 'archived' && checkboxRef.current.checked && item.archived) &&
					!item.certifications?.includes(value) &&
					!(value === 'average' && item.height <= 5.9) &&
					!(value === 'tall' && item.height >= 5.91 && item.height <= 6.2) &&
					!(value === 'tallest' && item.height >= 6.3) &&
					value !== item.languages &&
					value !== item.location &&
					value !== item.passaport &&
					value !== item.education &&
					value !== item.race &&
					value !== item.tier &&
					!(parseFloat(value) === 175 && item.weight < 175) &&
					!(parseFloat(value) === 200 && item.weight >= 175 && item.weight < 200) &&
					!(parseFloat(value) === 225 && item.weight >= 200 && item.weight < 225) &&
					!(parseFloat(value) === 250 && item.weight >= 225 && item.weight < 250) &&
					!(parseFloat(value) === 275 && item.weight >= 250 && item.weight < 275) &&
					!(parseFloat(value) === 275.1 && item.weight > 275) &&
					value !== item.travel
				) {
					isMatch = false
					break
				}
			}
			return isMatch
		})

		let newSortBy = ''

		if (checkboxRefs.ageAscending.current.checked || (!checkedValues.length && checkboxRefs.ageAscending.current.checked)) {
			newSortBy = 'AGE-ASCENDING'
		} else if (checkboxRefs.ageDescending.current.checked || (!checkedValues.length && checkboxRefs.ageDescending.current.checked)) {
			newSortBy = 'AGE-DESCENDING'
		} else if (checkboxRefs.heightTallest.current.checked || (!checkedValues.length && checkboxRefs.heightTallest.current.checked)) {
			newSortBy = 'HEIGHT-TALLEST'
		} else if (checkboxRefs.heightShortest.current.checked || (!checkedValues.length && checkboxRefs.heightShortest.current.checked)) {
			newSortBy = 'HEIGHT-SHORTEST'
		} else if (checkboxRefs.hireDateOldest.current.checked || (!checkedValues.length && checkboxRefs.hireDateOldest.current.checked)) {
			newSortBy = 'HIRE-DATE-OLDEST'
		} else if (checkboxRefs.hireDateNewest.current.checked || (!checkedValues.length && checkboxRefs.hireDateNewest.current.checked)) {
			newSortBy = 'HIRE-DATE-NEWEST'
		} else if (checkboxRefs.tierAscending.current.checked || (!checkedValues.length && checkboxRefs.tierAscending.current.checked)) {
			newSortBy = 'TIER-ASCENDING'
		} else if (checkboxRefs.tierDescending.current.checked || (!checkedValues.length && checkboxRefs.tierDescending.current.checked)) {
			newSortBy = 'TIER-DESCENDING'
		} else if (checkboxRefs.nameAscending.current.checked || (!checkedValues.length && checkboxRefs.nameAscending.current.checked)) {
			newSortBy = 'NAME-ASCENDING'
		} else if (checkboxRefs.nameDescending.current.checked || (!checkedValues.length && checkboxRefs.nameDescending.current.checked)) {
			newSortBy = 'NAME-DESCENDING'
		}

		if ((!checkedValues.length && checkboxRefs.nameAscending.current.checked) || newSortBy) {
			setSortBy(newSortBy || 'ASCENDING')
		}

		setProfileData(filteredData)

		if (checkedValues.includes('archived') && checkboxRef.current.checked) {
			sethideArchive(false)
		} else {
			sethideArchive(true)
		}
	}

	const resetProfileData = () => {
		setProfileData(profilesData)
		setSortBy('')
		setSelectedSortOption('')
    setSearchQuery('')
	}

	const handleSearchChange = e => {
		const query = e.target.value
		setSearchQuery(query)

		if (query === '') {
			setProfileData(profilesData)
			return
		}

		const filteredData = profilesData.filter(item => {
			const fullName = `${item.firstName} ${item.lastName}`.toLowerCase()
			return fullName.includes(query.toLowerCase())
		})

		setProfileData(filteredData)
	}

  function tierCompare(a, b) {
    const tierOrder = { I: 1, II: 2, III: 3 };
  
    if (a === null && b === null) {
      return 0;
    } else if (a === null) {
      return 1; // Move null to the end
    } else if (b === null) {
      return -1; // Move null to the end
    }
  
    return tierOrder[a] - tierOrder[b];
  }

  const [checkedOptions, setCheckedOptions] = useState({});

  const options = [
    'AGE',
    'BIO',
    'HEADSHOT',
    'HEIGHT',
    'NAME',
    'PHONE NUMBER',
    'WEIGHT',
  ];

  const handleExportCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckedOptions((prevOptions) => ({
      ...prevOptions,
      [value]: checked,
    }));
  };

  const isAgeChecked = checkedOptions['AGE'];
  const isBioChecked = checkedOptions['BIO'];
  const isHeadshotChecked = checkedOptions['HEADSHOT'];
  const isHeightChecked = checkedOptions['HEIGHT'];
  const isNameChecked = checkedOptions['NAME'];
  const isPhoneNumberChecked = checkedOptions['PHONE NUMBER'];
  const isWeightChecked = checkedOptions['WEIGHT'];

	return (
		<>
			<div className='filter-sidebar'>
				<div className={`heading-sm refine-heading ${openFilters ? 'expanded' : ''}`} onClick={toggleFilters}>
					REFINE
				</div>
				<div className="filter-sidebar__container">
          <div className={`refine-wrapper`} ref={filterRef} style={{
              maxHeight: openFilters ? filterRef.current?.scrollHeight + 100 : 0,
                      paddingBottom:  openFilters ? '75px' : 0,
            }}
          >
            <div className='filter-sidebar__search-download'>
              <div className="search-bar">
                        <img src="/img/icon-search.png" alt="" />
                        <input type='text' value={searchQuery} onChange={handleSearchChange} />
                        </div>
                      <button className="pdf-down" onClick={toggleSidebar}><span className="pdf-down__tooltip">EXPORT TO PDF</span><img src="/img/icon-pdf.png" alt="" /></button>
            </div>
            <div className='filter-sidebar_options'>
              <form onSubmit={handleSubmit}>
                <h2 className='heading'>FILTER BY</h2>
                <div className={`selection__container ${expandedContainer === 'active-duty' ? 'is-open' : ''}`}>
                  <p className={`${expandedContainer === 'active-duty' ? 'expanded' : ''}`} onClick={() => toggleOptions('active-duty')}>
                    ACTIVE-DUTY EXPERIENCE
                  </p>
                  <div
                    className={`selection__options`}
                    ref={optionsRefs.activeDuty}
                    style={{
                      maxHeight: expandedContainer === 'active-duty' ? optionsRefs.activeDuty.current?.scrollHeight : 0,
                    }}
                  >
                    <div className="checkbox-wrapper">
                              <input type='checkbox' id='lawEnforcement' name='activeDuty' value='LAW ENFORCEMENT' />
                              <label htmlFor='lawEnforcement'> LAW ENFORCEMENT</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='formerLawEnforcement' name='activeDuty' value='FORMER LAW ENFORCEMENT' />
                    <label htmlFor='formerLawEnforcement'> FORMER LAW ENFORCEMENT</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='military' name='activeDuty' value='MILITARY' />
                    <label htmlFor='military'> MILITARY</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='formerMilitary' name='activeDuty' value='FORMER MILITARY' />
                    <label htmlFor='formerMilitary'> FORMER MILITARY</label>
                            </div>
                  </div>
                </div>
                <div className='selection__container no-cursor'>
                  <label htmlFor='archived'>
                    {' '}
                    ARCHIVED
                  </label>
                  <input type='checkbox' defaultChecked={false} ref={checkboxRef} id='archived' name='archived' value='archived' />
                </div>
                <div className={`selection__container ${expandedContainer === 'certifications' ? 'is-open' : ''}`}>
                  <p
                    className={`${expandedContainer === 'certifications' ? 'expanded' : ''}`}
                    onClick={() => toggleOptions('certifications')}
                  >
                    CERTIFICATIONS
                  </p>
                  <div
                    className={`selection__options`}
                    ref={optionsRefs.certifications}
                    style={{
                      maxHeight: expandedContainer === 'certifications' ? optionsRefs.certifications.current?.scrollHeight : 0,
                    }}
                  >
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='AED' name='AED' value='AED' />
                    <label htmlFor='AED'> AED</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='BLS' name='BLS' value='BLS' />
                    <label htmlFor='BLS'> BLS</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='CCW' name='CCW' value='CCW' />
                    <label htmlFor='CCW'> CCW</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='CONFINED' name='CONFINED' value='CONFINED SPACE RESCUE' />
                    <label htmlFor='CONFINED'>CONFINED SPACE RESCUE</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='CPR' name='CPR' value='CPR' />
                    <label htmlFor='CPR'>CPR</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='EMR' name='EMR' value='EMR' />
                    <label htmlFor='EMR'>EMR</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='EMT' name='EMT' value='EMT' />
                    <label htmlFor='EMT'>EMT</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='EXECUTIVE' name='EXECUTIVE' value='EXECUTIVE PROTECTION' />
                    <label htmlFor='EXECUTIVE'>EXECUTIVE PROTECTION</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='GUARDCARD' name='GUARDCARD' value='GUARD CARD' />
                    <label htmlFor='GUARD CARD'>GUARD CARD</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='HIGH' name='HIGH' value='HIGH/LOW ANGLE RESCUE' />
                    <label htmlFor='HIGH'>HIGH/LOW ANGLE RESCUE</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='HAZMAT' name='HAZMAT' value='OPERATIONAL HAZMAT' />
                    <label htmlFor='HAZMAT'>OPERATIONAL HAZMAT</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='TCCC' name='TCCC' value='TCCC' />
                    <label htmlFor='TCCC'>TCCC</label>
                            </div>
                  </div>
                </div>
                <div className={`selection__container ${expandedContainer === 'height' ? 'is-open' : ''}`}>
                  <p className={`${expandedContainer === 'height' ? 'expanded' : ''}`} onClick={() => toggleOptions('height')}>
                    HEIGHT
                  </p>
                  <div
                    className={`selection__options`}
                    ref={optionsRefs.height}
                    style={{
                      maxHeight: expandedContainer === 'height' ? optionsRefs.height.current?.scrollHeight : 0,
                    }}
                  >
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='average' name='average' value='average' />
                    <label htmlFor='average'>5'9" AND BELOW</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='tall' name='tall' value='tall' />
                    <label htmlFor='tall'>5'10" - 6'2"</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='tallest' name='tallest' value='tallest' />
                    <label htmlFor='tallest'>6'3" AND ABOVE</label>
                            </div>
                  </div>
                </div>
                <div className={`selection__container ${expandedContainer === 'language' ? 'is-open' : ''}`}>
                  <p
                    className={`${expandedContainer === 'language' ? 'expanded' : ''}`}
                    onClick={() => toggleOptions('language')}
                  >
                    LANGUAGE(S) SPOKEN (OTHER THAN ENGLISH)
                  </p>
                  <div
                    className={`selection__options`}
                    ref={optionsRefs.language}
                    style={{maxHeight: expandedContainer === 'language' ? optionsRefs.language.current?.scrollHeight : 0,}}
                  > 
                            <div className="checkbox-wrapper">
                    <input type='checkbox' id='SPANISH' name='SPANISH' value='SPANISH' />
                    <label htmlFor='SPANISH'>SPANISH</label>
                            </div>
                  </div>
                </div>
                <div className={`selection__container ${expandedContainer === 'location' ? 'is-open' : ''}`}>
                  <p className={`${expandedContainer === 'location' ? 'expanded' : ''}`} onClick={() => toggleOptions('location')}>
                    LOCATION
                  </p>
                  <div
                    className={`selection__options`}
                    ref={optionsRefs.location}
                    style={{
                      maxHeight: expandedContainer === 'location' ? optionsRefs.location.current?.scrollHeight : 0,
                    }}
                  >
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='LAC' name='LAC' value='LOS ANGELES COUNTY' />
                    <label htmlFor='LAC'>LOS ANGELES COUNTY</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='OC' name='OC' value='ORANGE COUNTY' />
                    <label htmlFor='OC'>ORANGE COUNTY</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='RIV' name='RIV' value='RIVERSIDE COUNTY' />
                    <label htmlFor='RIV'>RIVERSIDE COUNTY</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='SBC' name='SBC' value='SAN BERNARDINO COUNTY' />
                    <label htmlFor='SBC'>SAN BERNARDINO COUNTY</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='VC' name='VC' value='VENTURA COUNTY' />
                    <label htmlFor='VC'>VENTURA COUNTY</label>
                            </div>
                  </div>
                </div>
                <div className={`selection__container ${expandedContainer === 'passport' ? 'is-open' : ''}`}>
                  <p className={`${expandedContainer === 'passport' ? 'expanded' : ''}`} onClick={() => toggleOptions('passport')}>
                    PASSPORT
                  </p>
                  <div
                    className={`selection__options`}
                    ref={optionsRefs.passport}
                    style={{
                      maxHeight: expandedContainer === 'passport' ? optionsRefs.passport.current?.scrollHeight : 0,
                    }}
                  >
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='YES' name='YES' value='YES' />
                    <label htmlFor='YES'>YES</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='NO' name='NO' value='NO' />
                    <label htmlFor='NO'>NO</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='UNKNOWN' name='UNKNOWN' value='UNKNOWN' />
                    <label htmlFor='UNKNOWN'>UNKNOWN</label>
                            </div>
                  </div>
                </div>
                <div className={`selection__container ${expandedContainer === 'education' ? 'is-open' : ''}`}>
                  <p className={`${expandedContainer === 'education' ? 'expanded' : ''}`} onClick={() => toggleOptions('education')}>
                    POST-SECONDARY EDUCATION
                  </p>
                  <div
                    className={`selection__options`}
                    ref={optionsRefs.education}
                    style={{
                      maxHeight: expandedContainer === 'education' ? optionsRefs.education.current?.scrollHeight : 0,
                    }}>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='SOME COLLEGE' name='SOME COLLEGE' value='SOME COLLEGE' />
                    <label htmlFor='SOME COLLEGE'>SOME COLLEGE</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='YES' name='YES' value='YES' />
                    <label htmlFor='YES'>YES</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='NO' name='NO' value='NO' />
                    <label htmlFor='NO'>NO</label>
                            </div>
                  </div>
                </div>
                <div className={`selection__container ${expandedContainer === 'race' ? 'is-open' : ''}`}>
                  <p className={`${expandedContainer === 'race' ? 'expanded' : ''}`} onClick={() => toggleOptions('race')}>
                    RACE
                  </p>
                  <div
                    className={`selection__options`}
                    ref={optionsRefs.race}
                    style={{
                      maxHeight: expandedContainer === 'race' ? optionsRefs.race.current?.scrollHeight : 0,
                    }}>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='NATIVE' name='NATIVE' value='AMERICAN INDIAN OR ALASKAN NATIVE' />
                    <label htmlFor='NATIVE'>AMERICAN INDIAN OR ALASKAN NATIVE</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='ASIAN' name='ASIAN' value='ASIAN' />
                    <label htmlFor='ASIAN'>ASIAN</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='BLACK' name='BLACK' value='BLACK OR AFRICAN AMERICAN' />
                    <label htmlFor='BLACK'>BLACK OR AFRICAN AMERICAN</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='HISPANIC' name='HISPANIC' value='HISPANIC' />
                    <label htmlFor='HISPANIC'>HISPANIC</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='ISLANDER' name='ISLANDER' value='NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER' />
                    <label htmlFor='ISLANDER'>NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='WHITE' name='WHITE' value='WHITE' />
                    <label htmlFor='WHITE'>WHITE</label>
                            </div>
                  </div>
                </div>
                <div className={`selection__container ${expandedContainer === 'tier' ? 'is-open' : ''}`}>
                  <p className={`${expandedContainer === 'tier' ? 'expanded' : ''}`} onClick={() => toggleOptions('tier')}>
                    TIER
                  </p>
                  <div
                    className={`selection__options`}
                    ref={optionsRefs.tier}
                    style={{
                      maxHeight: expandedContainer === 'tier' ? optionsRefs.tier.current?.scrollHeight : 0,
                    }}
                  >
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='tier-1' name='tier-1' value='I' />
                    <label htmlFor='tier-1'>I</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='tier-2' name='tier-2' value='II' />
                    <label htmlFor='tier-2'>II</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='tier-3' name='tier-3' value='III' />
                    <label htmlFor='tier-3'>III</label>
                            </div>
                  </div>
                </div>
                <div className={`selection__container ${expandedContainer === 'weight' ? 'is-open' : ''}`}>
                  <p className={`${expandedContainer === 'weight' ? 'expanded' : ''}`} onClick={() => toggleOptions('weight')}>
                    WEIGHT
                  </p>
                  <div
                    className={`selection__options`}
                    ref={optionsRefs.weight}
                    style={{
                      maxHeight: expandedContainer === 'weight' ? optionsRefs.weight.current?.scrollHeight : 0,
                    }}
                  >
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='175' name='175' value='175' />
                    <label htmlFor='175'>&lt;175 LBS</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='200' name='200' value='200' />
                    <label htmlFor='200'>175 - 200 LBS</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='225' name='225' value='225' />
                    <label htmlFor='225'>200 - 225 LBS</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='250' name='250' value='250' />
                    <label htmlFor='250'>225 - 250 LBS</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='275' name='275' value='275' />
                    <label htmlFor='275'>250 - 275 LBS</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='275-1' name='275-1' value='275.1' />
                    <label htmlFor='275-1'>275+ LBS</label>
                            </div>
                  </div>
                </div>
                <div className={`selection__container no-border ${expandedContainer === 'travel' ? 'is-open' : ''}`}>
                  <p className={`${expandedContainer === 'travel' ? 'expanded' : ''}`} onClick={() => toggleOptions('travel')}>
                    WILLING TO TRAVEL
                  </p>
                  <div
                    className={`selection__options`}
                    ref={optionsRefs.travel}
                    style={{
                      maxHeight: expandedContainer === 'travel' ? optionsRefs.travel.current?.scrollHeight : 0,
                    }}
                  >
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='NO-TRAVEL' name='NO-TRAVEL' value='NO-TRAVEL' />
                    <label htmlFor='NO-TRAVEL'>NO</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='MAYBE-TRAVEL' name='MAYBE-TRAVEL' value='MAYBE-TRAVEL' />
                    <label htmlFor='MAYBE-TRAVEL'>MAYBE</label>
                            </div>
                    <div className="checkbox-wrapper">
                            <input type='checkbox' id='UNKNOWN-TRAVEL' name='UNKNOWN-TRAVEL' value='UNKNOWN-TRAVEL' />
                    <label htmlFor='UNKNOWN-TRAVEL'>UNKNOWN</label>
                            </div>
                  </div>
                </div>
                <div className="selection__buttons">
                          <button type='reset' onClick={resetProfileData}><img src="/img/icon-reset.png" alt="" /></button>
                          <button type='submit' className='heading'>SUBMIT</button>
                        </div>
              </form>
            </div>
            <div className='sorting-container'>
              <h2 className='heading'>SORT BY</h2>
              <div className='sorting-options'>
                <div className='sorting-option'>
                  <input
                    type='checkbox'
                    id='ascending'
                    name='ascending'
                    value='ascending'
                    ref={checkboxRefs.nameAscending}
                    checked={selectedSortOption === 'ascending'}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor='ascending'>A-Z</label>
                </div>
                <div className='sorting-option'>
                  <input
                    type='checkbox'
                    id='descending'
                    name='descending'
                    value='descending'
                    ref={checkboxRefs.nameDescending}
                    checked={selectedSortOption === 'descending'}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor='descending'>Z-A</label>
                </div>
                <div className='sorting-option'>
                  <input
                    type='checkbox'
                    id='age-ascending'
                    name='age-ascending'
                    value='age-ascending'
                    ref={checkboxRefs.ageAscending}
                    checked={selectedSortOption === 'age-ascending'}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor='age-ascending'>Age - Youngest to Oldest</label>
                </div>
                <div className='sorting-option'>
                  <input
                    type='checkbox'
                    id='age-descending'
                    name='age-descending'
                    value='age-descending'
                    ref={checkboxRefs.ageDescending}
                    checked={selectedSortOption === 'age-descending'}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor='age-descending'>Age - Oldest to Youngest</label>
                </div>
                <div className='sorting-option'>
                  <input
                    type='checkbox'
                    id='height-tallest'
                    name='height-tallest'
                    value='height-tallest'
                    ref={checkboxRefs.heightTallest}
                    checked={selectedSortOption === 'height-tallest'}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor='height-tallest'>Height - Tallest to Shortest</label>
                </div>
                <div className='sorting-option'>
                  <input
                    type='checkbox'
                    id='height-shortest'
                    name='height-shortest'
                    value='height-shortest'
                    ref={checkboxRefs.heightShortest}
                    checked={selectedSortOption === 'height-shortest'}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor='height-shortest'>Height - Shortest to Tallest</label>
                </div>
                <div className='sorting-option'>
                  <input
                    type='checkbox'
                    id='hire-date-oldest'
                    name='hire-date-oldest'
                    value='hire-date-oldest'
                    ref={checkboxRefs.hireDateOldest}
                    checked={selectedSortOption === 'hire-date-oldest'}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor='hire-date-oldest'>Hire Date - Oldest to Newest</label>
                </div>
                <div className='sorting-option'>
                  <input
                    type='checkbox'
                    id='hire-date-newest'
                    name='hire-date-newest'
                    value='hire-date-newest'
                    ref={checkboxRefs.hireDateNewest}
                    checked={selectedSortOption === 'hire-date-newest'}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor='hire-date-newest'>Hire Date - Newest to Oldest</label>
                </div>
                <div className='sorting-option'>
                  <input
                    type='checkbox'
                    id='TIER-I-TO-III'
                    name='TIER-I-TO-III'
                    value='TIER-I-TO-III'
                    ref={checkboxRefs.tierAscending}
                    checked={selectedSortOption === 'TIER-I-TO-III'}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor='TIER-I-TO-III'>Tier - I to III</label>
                </div>
                <div className='sorting-option'>
                  <input
                    type='checkbox'
                    id='TIER-III-TO-I'
                    name='TIER-III-TO-I'
                    value='TIER-III-TO-I'
                    ref={checkboxRefs.tierDescending}
                    checked={selectedSortOption === 'TIER-III-TO-I'}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor='TIER-III-TO-I'>Tier - III to I</label>
                </div>
              </div>
            </div>
          </div>
          <div ref={exportWrapperRef} className={`export-wrapper ${isSidebarOpen ? 'open' : ''}`}>
            {options.map((option) => (
              <div key={option} className='checkbox-wrapper'>
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  checked={checkedOptions[option] || false}
                  onChange={handleExportCheckboxChange}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
            <ReactToPrint
              removeAfterPrint
              trigger={() => <button className="pdf-export heading-sm">EXPORT TO PDF</button>}
              content={() => printRef.current
              }
            />
          </div>
        </div>
			</div>
			<div className='profile-container'>
				{profileData
					.sort((a, b) => {
						switch (sortBy) {
							case 'NAME-DESCENDING':
								return b.lastName.localeCompare(a.lastName)
							case 'NAME-ASCENDING':
								return a.lastName.localeCompare(b.lastName)
							case 'AGE-ASCENDING':
								return a.age - b.age
							case 'AGE-DESCENDING':
								return b.age - a.age
							case 'HEIGHT-TALLEST':
								return b.height - a.height
							case 'HEIGHT-SHORTEST':
								return a.height - b.height
							case 'HIRE-DATE-OLDEST':
								return new Date(a.hireDate) - new Date(b.hireDate)
							case 'HIRE-DATE-NEWEST':
								return new Date(b.hireDate) - new Date(a.hireDate)
							case 'TIER-ASCENDING':
								return tierCompare(a.tier, b.tier)
							case 'TIER-DESCENDING':
								return tierCompare(b.tier, a.tier)
							default:
								return a.lastName.localeCompare(b.lastName)
						}
					})
					.map((data, i) => (
						<div
							className={'profile-card__wrapper' + `${hideArchive && data.archived ? ' archived' : ''}`}
							onClick={() => displayCard(data)}
							key={data?.lastName}
						>
							<div className='profile-card__img'>
								<img src={data?.image} alt='' className='obj-img' />
							</div>
							<div className='profile-card__name'>
								<h2 className='heading-sm'>
									{data?.firstName} {data?.lastName}
								</h2>
							</div>
						</div>
					))}

				{/* Render Printed Profile Cards */}
				{printCards && (
					<div className='print-container' id='pdf' ref={printRef}>
						<div className='print-container__logo'>
							<img src='/img/logo-bw.svg' alt='confidentaial defense agency logo' style={{ maxHeight: '50px' }} />
						</div>
						<div className='print-wrapper'>
							{profileData.map((data, i) => (
								<div className={'profile-card-print__wrapper' + `${hideArchive && data.archived ? ' archived' : ''}`} key={data?.lastName}>
									<div className={'profile-card-print__img' + `${isHeadshotChecked ? ' exportChecked' : ''}`}>
										<img src={data?.image} alt='' />
									</div>
									<div className='profile-card-data'>
										<div className='profile-card-data-wrapped'>
											<h2 className={'heading-sm' + `${isNameChecked ? 'exportChecked' : ''}`}>
												{data?.firstName} {data?.lastName}
											</h2>
											{data?.tier != null && <p>TIER {data?.tier}</p>}
											{data?.height != null && <p className={isHeightChecked ? 'exportChecked' : ''}>Height: {data?.height} ft</p>}
											{data?.weight != null && <p className={isWeightChecked ? 'exportChecked' : ''}>Weight: {data?.weight} lbs</p>}
											{data?.age != null && <p className={isAgeChecked ? 'exportChecked' : ''}>Age: {data?.age}</p>}
											{data?.phoneNumber != null && <p className={isPhoneNumberChecked ? 'exportChecked' : ''}>Phone Number: {data?.phoneNumber}</p>}
											{data?.email != null && <p>Email: {data?.email}</p>}
											{data?.hireDate != null && <p>Hire Date: {data?.hireDate}</p>}
											{data?.race != null && <p>Ethnicity: {data?.race}</p>}
											{data?.languages != null && <p>Languages: {data?.languages}</p>}
											{cardData?.passport != null && <p>Passport: {cardData?.passport}</p>}
											{cardData?.education != null && <p>Education: {cardData?.education}</p>}
											{cardData?.travel != null && <p>Travel: {cardData?.travel}</p>}
											{data?.certifications != null && <p>Certifications: {data?.certifications.join(', ')}</p>}
											{data?.specialSkills != null && (
												<ul>
													{data?.specialSkills.map((skill, i) => (
														<li key={skill}>
															Special Skill {i + 1}: {skill}
														</li>
													))}
												</ul>
											)}
											{data?.bio && <p className={isBioChecked ? 'exportChecked' : ''}>BIO: {data?.bio}</p>}
										</div>
									</div>
								</div>

							))}
						</div>
					</div>
				)}

				{card && (
					<div className='card-data'>
						<div className='profile-card__data'>
							<div className='profile-card__img'>
								<img src={cardData.image} alt='' className='obj-img' />
							</div>
							<div className='profile-card__details'>
								<div className='profile-card__data-name bg-primary'>
									<h2 className='heading white mb0'>
										{cardData.firstName} <br />
										{cardData.lastName}
									</h2>
									<span className='close-btn' onClick={displayCard}>
										<img src='/img/icon-close.png' alt='' />
									</span>
								</div>
								{cardData.tier != null && <h2 className='profile-card__data-tier'>TIER {cardData.tier}</h2>}
								{cardData.height != null && (
									<p>
										<span className='white'>Height:</span>{' '}
										{cardData.height.toString().includes('.')
											? cardData.height.toString().replace('.', 'ft ') + 'in'
											: cardData.height.toString() + 'ft'}
									</p>
								)}
								{cardData.weight != null && (
									<p>
										<span className='white'>Weight:</span> {cardData.weight.toString() + 'lbs'}
									</p>
								)}
								{cardData.age != null && (
									<p>
										<span className='white'>Age:</span> {cardData.age}
									</p>
								)}
								{cardData.hireDate != null && (
									<p>
										<span className='white'>Hire Date:</span> {cardData.hireDate}
									</p>
								)}
								{cardData.race != null && (
									<p>
										<span className='white'>Ethnicity:</span> {cardData.race}
									</p>
								)}
								{cardData.languages != null && (
									<p>
										<span className='white'>Languages:</span> {cardData.languages}
									</p>
								)}
								{cardData.certifications != null && (
									<p>
										<span className='white'>Certifications:</span> {cardData.certifications.join(', ')}
									</p>
								)}
								{cardData.specialSkills != null && (
									<>
										{/* <h2 className='heading white'>Special Skills</h2> */}
										<ul className='profile-card__data-skills'>
											{cardData.specialSkills.map((skill, i) => (
												<li key={skill}>
													<span className='white'>Special Skill {i + 1}:</span> {skill}
												</li>
											))}
										</ul>
									</>
								)}
								<h2 className='heading white'>BIO</h2>
								<div className='profile-card__data-bio'>
									<p>{cardData.bio}</p>
									<div className='profile-card__data-icon'>
										<img src='/img/cda-shield.png' alt='CDA shield logo icon' />
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default Profiles
