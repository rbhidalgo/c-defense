const profiles = [
    {
      image: "/img/profiles/baray-nick.jpg",
      firstName:"NICK",
      lastName: "BARAY",
      tier: "I",
      hireDate: "",
      location: "RIVERSIDE COUNTY",
      phoneNumber: "951-234-4136",
      email: "nickbaray@yahoo.com",
      height: 6.0,
      weight: 210,
      age: 25,
      race: "WHITE",
      languages: "",
      certifications: [],
      specialSkills: [],
      bio: "",
      archived: true,
    },
    {
      image: "/img/profiles/chalmers-bryce.jpg",
      firstName:"BRYCE",
      lastName: "CHALMERS",
      tier: "I",
      hireDate: "",
      location: "ORANGE COUNTY",
      phoneNumber: "661-713-9411",
      email: "bchalmers661@yahoo.com",
      height: 6.4,
      weight: 230,
      age: 38,
      race: "WHITE",
      languages: "",
      certifications: [],
      specialSkills: [],
      bio: "",
      archived: true,
    },
    {
      image: "/img/profiles/lyons-andrew.jpg",
      firstName:"ANDREW",
      lastName: "LYONS",
      tier: "III",
      hireDate: "",
      location: "RIVERSIDE COUNTY",
      phoneNumber: "310-294-2897",
      email: "andrewlyons510@yahoo.com",
      height: 6.0,
      weight: 270,
      age: 39,
      race: "WHITE",
      languages: "",
      certifications: [],
      specialSkills: [],
      bio: "",
      archived: true,
    },
    {
      image: "/img/profiles/alvarez-nick.jpg",
      firstName:"NICK",
      lastName: "ALVAREZ",
      tier: "III",
      hireDate: "1/1/2022",
      location: "ORANGE COUNTY",
      phoneNumber: "562-686-5789",
      email: "alvareznicholas11@yahoo.com",
      height: 6.4,
      weight: 280,
      age: 32,
      race: "HISPANIC",
      languages: "",
      certifications: ["CPR", "BLS"],
      specialSkills: ["BRAZILIAN JIU JITSU TRAINING", "FIREARMS TRAINING", "EMERGENCY VEHICLE OPERATIONS TRAINING"],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/cadman-chris.jpg",
      firstName:"CHRIS",
      lastName: "CADMAN",
      tier: "I",
      hireDate: "1/1/2022",
      location: "ORANGE COUNTY",
      phoneNumber: "714-833-8215",
      email: "chriscadman17@yahoo.com",
      height: 5.11,
      weight: 205,
      age: 31,
      race: "WHITE",
      languages: "",
      certifications: ["CPR", "EMR"],
      specialSkills: ["LASD CERTIFIED EXPERT SHOOTER", "BOXING KNOWLEDGE", "BRAZILIAN JIU JITSU TRAINING"],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/castaneda-kristos.jpg",
      firstName:"KRISTOS",
      lastName: "CASTANEDA",
      tier: "I",
      hireDate: "1/1/2022",
      location: "ORANGE COUNTY",
      phoneNumber: "909-787-4843",
      email: "kriscastaneda442@gmail.com",
      height: 6.4,
      weight: 260,
      age: 24,
      race: "HISPANIC",
      languages: "SPANISH",
      certifications: ["EMT", "CPR", "BLS", "TCCC"],
      specialSkills: ["MUAY TAI", "KARATE", "GRAPPLING"],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/gagon-mike.jpg",
      firstName:"MIKE",
      lastName: "GAGON",
      tier: "III",
      hireDate: "1/1/2022",
      location: "LOS ANGELES COUNTY",
      phoneNumber: "562-455-6341",
      email: "mikegagon12@gmail.com",
      height: 6.5,
      weight: 225,
      age: 39,
      race: "WHITE",
      languages: "",
      certifications: [],
      specialSkills: [],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/gomez-manny.jpg",
      firstName:"MANNY",
      lastName: "GOMEZ",
      tier: "III",
      hireDate: "1/1/2022",
      location: "LOS ANGELES COUNTY",
      phoneNumber: "562-882-9874",
      email: "manuelgomezjr@hotmail.com",
      height: 5.10,
      weight: 195,
      age: 49,
      race: "HISPANIC",
      languages: "SPANISH",
      certifications: [],
      specialSkills: [],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/goosby-ryan.jpg",
      firstName:"RYAN",
      lastName: "GOOSBY",
      tier: "I",
      hireDate: "1/1/2022",
      location: "ORANGE COUNTY",
      phoneNumber: "909-843-5085",
      email: "goosbyryan@yahoo.com",
      height: 5.9,
      weight: 230,
      age: 42,
      race: "BLACK OR AFRICAN AMERICAN",
      languages: "",
      certifications: [],
      specialSkills: ["SELF-DEFENSE TRAINING", "COMBAT TRAINING"],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/hicks-matt.jpg",
      firstName:"MATT",
      lastName: "HICKS",
      tier: "",
      hireDate: "1/1/2022",
      location: "RIVERSIDE COUNTY",
      phoneNumber: "951-514-7946",
      email: "mattthesculpter@hotmail.com",
      height: null,
      weight: null,
      age: null,
      race: "WHITE",
      languages: "",
      certifications: [],
      specialSkills: [],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/jauch-tyler.jpg",
      firstName:"TYLER",
      lastName: "JAUCH",
      tier: "I",
      hireDate: "1/1/2022",
      location: "VENTURA COUNTY",
      phoneNumber: "805-368-7055",
      email: "tsjauch@gmail.com",
      height: 6.0,
      weight: 180,
      age: 33,
      race: "WHITE",
      languages: "",
      certifications: [],
      specialSkills: [],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/lattuca-shane.jpg",
      firstName:"SHANE",
      lastName: "LATTUCA",
      tier: "I",
      hireDate: "1/1/2022",
      location: "RIVERSIDE COUNTY",
      phoneNumber: "949-350-3773",
      email: "shanelattuca@gmail.com",
      height: 6.0,
      weight: 230,
      age: 34,
      race: "WHITE",
      languages: "",
      certifications: ["EMT", "CPR", "TCCC", "OPERATIONAL HAZMAT", "HIGH/LOW ANGLE RESCUE", "CONFINED SPACE" ],
      specialSkills: ["ADVANCE CARE IN COMBAT SITUATIONS", "INSTRUCTOR AT TAS"],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/leonardi-chris.jpg",
      firstName:"CHRIS",
      lastName: "LEONARDI",
      tier: "I",
      hireDate: "1/1/2022",
      location: "LOS ANGELES COUNTY",
      phoneNumber: "310-702-1875",
      email: "Christopheraleonardi@gmail.com",
      height: 6.3,
      weight: 275,
      age: 35,
      race: "WHITE",
      languages: "",
      certifications: ["CPR"],
      specialSkills: ["LASD TRAINING", "JUDO TRAINING", "JIU JITSU TRAINING", "CROWD CONTROL TRAINING WITH SHERRIFF'S RESPONSE TEAM", "M4 RIFLE TRAINING", "ELECTRONIC WIRETAP TRAINING"],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/martinez-marco.jpg",
      firstName:"MARCO",
      lastName: "MARTINEZ",
      tier: "I",
      hireDate: "1/1/2022",
      location: "LOS ANGELES COUNTY",
      phoneNumber: "626-235-9398",
      email: "marcomartinezjr1990@gmail.com",
      height: 5.10,
      weight: 175,
      age: 33,
      race: "HISPANIC",
      languages: "",
      certifications: ["CPR", "AED", "EXECUTIVE PROTECTION", "TCCC"],
      specialSkills: ["SURVEILLANCE"],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/nandy-ryan.jpg",
      firstName:"RYAN",
      lastName: "NANDY",
      tier: "I",
      hireDate: "1/1/2022",
      location: "ORANGE COUNTY",
      phoneNumber: "562-618-7102",
      email: "ryan.r.nandy@gmail.com",
      height: 6.0,
      weight: 230,
      age: 39,
      race: "WHITE",
      languages: "",
      certifications: ["TCCC", "CPR", "BLS"],
      specialSkills: ["WEAPONS TRAINING"],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/quintero-mike.jpg",
      firstName:"MIKE",
      lastName: "QUINTERO",
      tier: "I",
      hireDate: "1/1/2022",
      location: "LOS ANGELES COUNTY",
      phoneNumber: "562-551-0473",
      email: "mquintero58@yahoo.com",
      height: 6.4,
      weight: 275,
      age: 47,
      race: "HISPANIC",
      languages: "SPANISH",
      certifications: ["CPR"],
      specialSkills: ["BLACK BELT IN JIU JITSU", "BLACK BELT IN JUDO", "PROFESSIONAL MMA CHAMPION OF SEVERAL ORGANIZATIONS"],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/rodriguez-david.jpg",
      firstName:"DAVID",
      lastName: "RODRIGUEZ",
      tier: "I",
      hireDate: "1/1/2022",
      location: "LOS ANGELES COUNTY",
      phoneNumber: "909-938-4055",
      email: "drod1381@yahoo.com",
      height: 6.2,
      weight: 230,
      age: 41,
      race: "HISPANIC",
      languages: "",
      certifications: ["CPR"],
      specialSkills: ["SURVEILLANCE", "HAND TO HAND COMBAT", "ADVANCED DRIVER'S TRAINING"],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/saavedra-chase.jpg",
      firstName:"CHASE",
      lastName: "SAAVEDRA",
      tier: "I",
      hireDate: "1/1/2022",
      location: "SAN BERNARDINO",
      phoneNumber: "909-802-0991",
      email: "chase@confidentialdefense.com",
      height: 6.2,
      weight: null,
      age: null,
      race: "HISPANIC",
      languages: "",
      certifications: [],
      specialSkills: [],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/sharp-james.jpg",
      firstName:"JAMES",
      lastName: "SHARP",
      tier: "I",
      hireDate: "1/1/2022",
      location: "SAN BERNARDINO",
      phoneNumber: "909-241-9116",
      email: "jlsharp007@yahoo.com",
      height: 6.2,
      weight: 220,
      age: 41,
      race: "WHITE",
      languages: "",
      certifications: [],
      specialSkills: ["SURVEILLANCE"],
      bio: "",
      archived: false,
    },
    {
      image: "/img/profiles/vega-miguel.jpg",
      firstName:"MIGUEL",
      lastName: "VEGA",
      tier: "III",
      hireDate: "1/1/2022",
      location: "RIVERSIDE COUNTY",
      phoneNumber: "909-450-9170",
      email: "miguel3vega@gmail.com",
      height: 5.8,
      weight: 205,
      age: 32,
      race: "HISPANIC",
      languages: "SPANISH",
      certifications: ["CPR"],
      specialSkills: [],
      bio: "",
      archived: false,
    },
];

export default profiles;