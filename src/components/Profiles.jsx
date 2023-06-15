import React, { useState, useEffect, useRef } from 'react'
import html2pdf from 'html2pdf.js'
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

	const checkboxRef = useRef(null)

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

	const [progressState, setProgressState] = useState('')

	const createPDF = () => {
		// setProgressState('Working...');
		// if(!document.getElementById('pdf')) {
		//   setPrintCards(true)
		// }

		// Choose the element that our invoice is rendered in.
		const element = document.getElementById('pdf')

		// clone the element
		var clonedElement = element.cloneNode(true)

		// change display of cloned element
		clonedElement.style.display = 'block'

		// Choose the clonedElement and save the PDF for our user.
		// html2pdf(clonedElement);

		// remove cloned element
		// clonedElement.remove();

		// const element = document.getElementById('pdf');
		const options = {
			margin: [0, 0, 0, 0], // Adjust the margin as per your requirement
			filename: 'profiles.pdf',
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 1.5 }, // Adjust the scale as per your requirement
			jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' },
		}
		// html2pdf().from(clonedElement).set(options).save();
		html2pdf()
			.from(clonedElement)
			.set(options)
			.toContainer()
			.toCanvas()
			.toImg()
			.toPdf()
			.save()
			.then(
				function (pdf) {
					//Success here
					setProgressState('Downloaded')
				},
				function () {
					//Error Here
					setProgressState('Error Try Again...')
				}
			)
		// html2pdf().from(element).set(options).save();
		// setProgressState('Done');
		// setPrintCards(false)
		clonedElement.remove()
	}

	// Update the handleCheckboxChange function to handle checkbox selection
	const handleCheckboxChange = event => {
		const { name } = event.target
		setSelectedSortOption(name)
	}

	const toggleOptions = containerId => {
		setExpandedContainer(prevExpandedContainer => (prevExpandedContainer === containerId ? null : containerId))
	}

	function displayCard(data) {
		setCardData(data)
		setCard(!card)
	}

	useEffect(() => {
		if (!card) {
			document.querySelector('html').classList.remove('active-card')
		}
		return () => {
			document.querySelector('html').classList.add('active-card')
		}
	})

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
		const tierOrder = { I: 1, II: 2, III: 3 }
		return tierOrder[a] - tierOrder[b]
	}

	return (
		<>
			<div className='filter-sidebar'>
				<div className='filter-sidebar__search-download'>
					<input type='text' value={searchQuery} onChange={handleSearchChange} />
					<button onClick={createPDF}>{progressState || 'Export to PDF'}</button>
				</div>
				<div className='filter-sidebar_options'>
					<form onSubmit={handleSubmit}>
						<h2 className='heading'>FILTER BY</h2>
						<div className='selection__container'>
							<h2 className={`heading-sm ${expandedContainer === 'active-duty' ? 'expanded' : ''}`} onClick={() => toggleOptions('active-duty')}>
								ACTIVE-DUTY EXPERIENCE
							</h2>
							<div
								className={`selection__options`}
								ref={optionsRefs.activeDuty}
								style={{
									maxHeight: expandedContainer === 'active-duty' ? optionsRefs.activeDuty.current?.scrollHeight : 0,
								}}
							>
								<input type='checkbox' id='lawEnforcement' name='activeDuty' value='LAW ENFORCEMENT' />
								<label htmlFor='lawEnforcement'> LAW ENFORCEMENT</label>
								<input type='checkbox' id='formerLawEnforcement' name='activeDuty' value='FORMER LAW ENFORCEMENT' />
								<label htmlFor='formerLawEnforcement'> FORMER LAW ENFORCEMENT</label>
								<input type='checkbox' id='military' name='activeDuty' value='MILITARY' />
								<label htmlFor='military'> MILITARY</label>
								<input type='checkbox' id='formerMilitary' name='activeDuty' value='FORMER MILITARY' />
								<label htmlFor='formerMilitary'> FORMER MILITARY</label>
							</div>
						</div>
						<div className="selection_container">
              <label htmlFor='archived' className='heading-sm'> ARCHIVED</label>
              <input type='checkbox' defaultChecked={false} ref={checkboxRef} id='archived' name='archived' value='archived' />
            </div>
						<div className='selection__container'>
							<h2
								className={`heading-sm ${expandedContainer === 'certifications' ? 'expanded' : ''}`}
								onClick={() => toggleOptions('certifications')}
							>
								CERTIFICATIONS
							</h2>
							<div
								className={`selection__options`}
								ref={optionsRefs.certifications}
								style={{
									maxHeight: expandedContainer === 'certifications' ? optionsRefs.certifications.current?.scrollHeight : 0,
								}}
							>
								<input type='checkbox' id='AED' name='AED' value='AED' />
								<label htmlFor='AED'> AED</label>
								<input type='checkbox' id='BLS' name='BLS' value='BLS' />
								<label htmlFor='BLS'> BLS</label>
								<input type='checkbox' id='CCW' name='CCW' value='CCW' />
								<label htmlFor='CCW'> CCW</label>
								<input type='checkbox' id='CONFINED' name='CONFINED' value='CONFINED SPACE RESCUE' />
								<label htmlFor='CONFINED'>CONFINED SPACE RESCUE</label>
								<input type='checkbox' id='CPR' name='CPR' value='CPR' />
								<label htmlFor='CPR'>CPR</label>
								<input type='checkbox' id='EMR' name='EMR' value='EMR' />
								<label htmlFor='EMR'>EMR</label>
								<input type='checkbox' id='EMT' name='EMT' value='EMT' />
								<label htmlFor='EMT'>EMT</label>
								<input type='checkbox' id='EXECUTIVE' name='EXECUTIVE' value='EXECUTIVE PROTECTION' />
								<label htmlFor='EXECUTIVE'>EXECUTIVE PROTECTION</label>
								<input type='checkbox' id='GUARDCARD' name='GUARDCARD' value='GUARD CARD' />
								<label htmlFor='GUARD CARD'>GUARD CARD</label>
								<input type='checkbox' id='HIGH' name='HIGH' value='HIGH/LOW ANGLE RESCUE' />
								<label htmlFor='HIGH'>HIGH/LOW ANGLE RESCUE</label>
								<input type='checkbox' id='HAZMAT' name='HAZMAT' value='OPERATIONAL HAZMAT' />
								<label htmlFor='HAZMAT'>OPERATIONAL HAZMAT</label>
								<input type='checkbox' id='TCCC' name='TCCC' value='TCCC' />
								<label htmlFor='TCCC'>TCCC</label>
							</div>
						</div>
						<div className='selection__container'>
							<h2 className={`heading-sm ${expandedContainer === 'height' ? 'expanded' : ''}`} onClick={() => toggleOptions('height')}>
								HEIGHT
							</h2>
							<div
								className={`selection__options`}
								ref={optionsRefs.height}
								style={{
									maxHeight: expandedContainer === 'height' ? optionsRefs.height.current?.scrollHeight : 0,
								}}
							>
								<input type='checkbox' id='average' name='average' value='average' />
								<label htmlFor='average'>5'9" AND BELOW</label>
								<input type='checkbox' id='tall' name='tall' value='tall' />
								<label htmlFor='tall'>5'10" - 6'2"</label>
								<input type='checkbox' id='tallest' name='tallest' value='tallest' />
								<label htmlFor='tallest'>6'3" AND ABOVE</label>
							</div>
						</div>
						<div className='selection__container'>
							<h2
								className={`heading-sm {
                    expandedContainer === 'language' ? 'expanded' : ''
                  }`}
								onClick={() => toggleOptions('language')}
							>
								LANGUAGE(S) SPOKEN (OTHER THAN ENGLISH)
							</h2>
							<div
								className={`selection__options`}
								ref={optionsRefs.language}
								style={{
									maxHeight: expandedContainer === 'language' ? optionsRefs.language.current?.scrollHeight : 0,
								}}
							>
								<input type='checkbox' id='SPANISH' name='SPANISH' value='SPANISH' />
								<label htmlFor='SPANISH'>SPANISH</label>
							</div>
						</div>
						<div className='selection__container'>
							<h2 className={`heading-sm ${expandedContainer === 'location' ? 'expanded' : ''}`} onClick={() => toggleOptions('location')}>
								LOCATION
							</h2>
							<div
								className={`selection__options`}
								ref={optionsRefs.location}
								style={{
									maxHeight: expandedContainer === 'location' ? optionsRefs.location.current?.scrollHeight : 0,
								}}
							>
								<input type='checkbox' id='LAC' name='LAC' value='LOS ANGELES COUNTY' />
								<label htmlFor='LAC'>LOS ANGELES COUNTY</label>
								<input type='checkbox' id='OC' name='OC' value='ORANGE COUNTY' />
								<label htmlFor='OC'>ORANGE COUNTY</label>
								<input type='checkbox' id='RIV' name='RIV' value='RIVERSIDE COUNTY' />
								<label htmlFor='RIV'>RIVERSIDE COUNTY</label>
								<input type='checkbox' id='SBC' name='SBC' value='SAN BERNARDINO COUNTY' />
								<label htmlFor='SBC'>SAN BERNARDINO COUNTY</label>
								<input type='checkbox' id='VC' name='VC' value='VENTURA COUNTY' />
								<label htmlFor='VC'>VENTURA COUNTY</label>
							</div>
						</div>
						<div className='selection__container'>
							<h2 className={`heading-sm ${expandedContainer === 'passport' ? 'expanded' : ''}`} onClick={() => toggleOptions('passport')}>
								PASSPORT
							</h2>
							<div
								className={`selection__options`}
								ref={optionsRefs.passport}
								style={{
									maxHeight: expandedContainer === 'passport' ? optionsRefs.passport.current?.scrollHeight : 0,
								}}
							>
								<input type='checkbox' id='YES' name='YES' value='YES' />
								<label htmlFor='YES'>YES</label>
								<input type='checkbox' id='NO' name='NO' value='NO' />
								<label htmlFor='NO'>NO</label>
								<input type='checkbox' id='UNKNOWN' name='UNKNOWN' value='UNKNOWN' />
								<label htmlFor='UNKNOWN'>UNKNOWN</label>
							</div>
						</div>
						<div className='selection__container'>
							<h2 className={`heading-sm ${expandedContainer === 'education' ? 'expanded' : ''}`} onClick={() => toggleOptions('education')}>
								POST-SECONDARY EDUCATION
							</h2>
							<div
								className={`selection__options`}
								ref={optionsRefs.education}
								style={{
									maxHeight: expandedContainer === 'education' ? optionsRefs.education.current?.scrollHeight : 0,
								}}
							>
								<input type='checkbox' id='SOME COLLEGE' name='SOME COLLEGE' value='SOME COLLEGE' />
								<label htmlFor='SOME COLLEGE'>SOME COLLEGE</label>
								<input type='checkbox' id='YES' name='YES' value='YES' />
								<label htmlFor='YES'>YES</label>
								<input type='checkbox' id='NO' name='NO' value='NO' />
								<label htmlFor='NO'>NO</label>
							</div>
						</div>
						<div className='selection__container'>
							<h2 className={`heading-sm ${expandedContainer === 'race' ? 'expanded' : ''}`} onClick={() => toggleOptions('race')}>
								RACE
							</h2>
							<div
								className={`selection__options`}
								ref={optionsRefs.race}
								style={{
									maxHeight: expandedContainer === 'race' ? optionsRefs.race.current?.scrollHeight : 0,
								}}
							>
								<input type='checkbox' id='NATIVE' name='NATIVE' value='AMERICAN INDIAN OR ALASKAN NATIVE' />
								<label htmlFor='NATIVE'>AMERICAN INDIAN OR ALASKAN NATIVE</label>
								<input type='checkbox' id='ASIAN' name='ASIAN' value='ASIAN' />
								<label htmlFor='ASIAN'>ASIAN</label>
								<input type='checkbox' id='BLACK' name='BLACK' value='BLACK OR AFRICAN AMERICAN' />
								<label htmlFor='BLACK'>BLACK OR AFRICAN AMERICAN</label>
								<input type='checkbox' id='HISPANIC' name='HISPANIC' value='HISPANIC' />
								<label htmlFor='HISPANIC'>HISPANIC</label>
								<input type='checkbox' id='ISLANDER' name='ISLANDER' value='NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER' />
								<label htmlFor='ISLANDER'>NATIVE HAWAIIAN OR OTHER PACIFIC ISLANDER</label>
								<input type='checkbox' id='WHITE' name='WHITE' value='WHITE' />
								<label htmlFor='WHITE'>WHITE</label>
							</div>
						</div>
						<div className='selection__container'>
							<h2 className={`heading-sm ${expandedContainer === 'tier' ? 'expanded' : ''}`} onClick={() => toggleOptions('tier')}>
								TIER
							</h2>
							<div
								className={`selection__options`}
								ref={optionsRefs.tier}
								style={{
									maxHeight: expandedContainer === 'tier' ? optionsRefs.tier.current?.scrollHeight : 0,
								}}
							>
								<input type='checkbox' id='tier-1' name='tier-1' value='I' />
								<label htmlFor='tier-1'>I</label>
								<input type='checkbox' id='tier-2' name='tier-2' value='II' />
								<label htmlFor='tier-2'>II</label>
								<input type='checkbox' id='tier-3' name='tier-3' value='III' />
								<label htmlFor='tier-3'>III</label>
							</div>
						</div>
						<div className='selection__container'>
							<h2 className={`heading-sm ${expandedContainer === 'weight' ? 'expanded' : ''}`} onClick={() => toggleOptions('weight')}>
								WEIGHT
							</h2>
							<div
								className={`selection__options`}
								ref={optionsRefs.weight}
								style={{
									maxHeight: expandedContainer === 'weight' ? optionsRefs.weight.current?.scrollHeight : 0,
								}}
							>
								<input type='checkbox' id='175' name='175' value='175' />
								<label htmlFor='175'>&lt;175 LBS</label>
								<input type='checkbox' id='200' name='200' value='200' />
								<label htmlFor='200'>175 - 200 LBS</label>
								<input type='checkbox' id='225' name='225' value='225' />
								<label htmlFor='225'>200 - 225 LBS</label>
								<input type='checkbox' id='250' name='250' value='250' />
								<label htmlFor='250'>225 - 250 LBS</label>
								<input type='checkbox' id='275' name='275' value='275' />
								<label htmlFor='275'>250 - 275 LBS</label>
								<input type='checkbox' id='275-1' name='275-1' value='275.1' />
								<label htmlFor='275-1'>275+ LBS</label>
							</div>
						</div>
						<div className='selection__container'>
							<h2 className={`heading-sm ${expandedContainer === 'travel' ? 'expanded' : ''}`} onClick={() => toggleOptions('travel')}>
								WILLING TO TRAVEL INTERNATIONALLY
							</h2>
							<div
								className={`selection__options`}
								ref={optionsRefs.travel}
								style={{
									maxHeight: expandedContainer === 'travel' ? optionsRefs.travel.current?.scrollHeight : 0,
								}}
							>
								<input type='checkbox' id='NO-TRAVEL' name='NO-TRAVEL' value='NO-TRAVEL' />
								<label htmlFor='NO-TRAVEL'>NO</label>
								<input type='checkbox' id='MAYBE-TRAVEL' name='MAYBE-TRAVEL' value='MAYBE-TRAVEL' />
								<label htmlFor='MAYBE-TRAVEL'>MAYBE</label>
								<input type='checkbox' id='UNKNOWN-TRAVEL' name='UNKNOWN-TRAVEL' value='UNKNOWN-TRAVEL' />
								<label htmlFor='UNKNOWN-TRAVEL'>UNKNOWN</label>
							</div>
						</div>
						<button type='reset' onClick={resetProfileData}>
							Reset
						</button>
						<button type='submit'>Submit</button>
					</form>
				</div>

				<div className='sorting-container'>
					<h3 className='sorting-heading'>Sorting</h3>
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
							<label htmlFor='ascending'>Ascending</label>
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
							<label htmlFor='descending'>Descending</label>
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
      <div class="profile-container">
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
				<div className='print-container' id='pdf'>
					<div className='print-container__logo'>
						<img src='/img/logo-bw.svg' alt='confidentaial defense agency logo' style={{ maxHeight: '50px' }} />
					</div>
					<div className='print-wrapper'>
						{profileData.map((data, i) => (
							<div className={'profile-card-print__wrapper' + `${hideArchive && data.archived ? ' archived' : ''}`} key={data?.lastName}>
								<div className='profile-card-print__img'>
									<img src={data?.image} alt='' className='obj-img' />
								</div>
								<div className='profile-card-data'>
									<div className='profile-card-data-wrapped'>
										<h2 className='heading-sm'>
											{data?.firstName} {data?.lastName}
										</h2>
										{data?.tier != null && <p>TIER {data?.tier}</p>}
										{data?.height != null && <p>Height: {data?.height} ft</p>}
										{data?.weight != null && <p>Weight: {data?.weight} lbs</p>}
										{data?.age != null && <p>Age: {data?.age}</p>}
										{data?.phoneNumber != null && <p>Phone Number: {data?.phoneNumber}</p>}
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
										{data?.bio && <p>BIO: {data?.bio}</p>}
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
