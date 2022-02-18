const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultOverlay = document.getElementById('result-overlay')

let someShuffledWords, currentWordIndex, usScore, ukScore, mScore, fScore, usTotal, ukTotal, mTotal, fTotal

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentWordIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  totalWordsPerRound = 20
  shuffledWords = words.sort(() => Math.random() - .5)
  someShuffledWords = shuffledWords.slice(0, totalWordsPerRound)
  currentWordIndex = 0
  usScore = 0
  usTotal = 0
  ukScore = 0
  ukTotal = 0
  mScore = 0
  mTotal = 0
  fScore = 0
  fTotal= 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(someShuffledWords[currentWordIndex])
}

function getNewDefIndex(originalArray,arrayOfIndexesToExclude){
   var rand = null;
   while(rand === null || arrayOfIndexesToExclude.includes(rand)){
         rand = Math.round(Math.random() * (originalArray.length - 1));
    }
     return rand;
}

function genDefinitions(word) {
  wrong1 = getNewDefIndex(shuffledWords,[currentWordIndex])
  wrong2 = getNewDefIndex(shuffledWords,[currentWordIndex,wrong1])
  return [
              { text: word.Definition, correct: true },
              { text: shuffledWords[wrong1].Definition, correct: false },
              { text: shuffledWords[wrong2].Definition, correct: false}
  ].sort(() => Math.random() - .5);
}

function showQuestion(question) {
  console.log(question.Word)
  if (typeof question.Word == "undefined") {question = shuffledWords[getNewDefIndex(shuffledWords.length,currentWordIndex)]}    
  questionElement.innerText = (`${currentWordIndex+1}/${totalWordsPerRound}: ${question.Word}`)
  genDefinitions(question).forEach(definitions => {
    const button = document.createElement('button')
    button.innerText = definitions.text
    button.classList.add('btn')
    if (definitions.correct) {
      button.dataset.correct = definitions.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}


function selectAnswer(e) {
  addToTotals()
  //if eupScores()
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  if (correct) upScores();
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (someShuffledWords.length > currentWordIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    scores = getScores()
    resultOverlay.innerHTML = (`Your vocabulary is ${scores[0]} American, ${scores[1]} British, ${scores[2]} masculine, and ${scores[3]} feminine!`);
    startButton.innerText = 'Try Again'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function getScores() {
    return [parseFloat((usScore/usTotal*100) || 0).toFixed(1)+"%",
            parseFloat((ukScore/ukTotal*100) || 0).toFixed(1)+"%",
            parseFloat((mScore/mTotal*100) || 0).toFixed(1)+"%", 
            parseFloat((fScore/fTotal*100) || 0).toFixed(1)+"%"
  ];
}

function addToTotals() {
  usTotal = usTotal + (parseFloat(someShuffledWords[currentWordIndex].US) || 0)
  ukTotal = ukTotal + (parseFloat(someShuffledWords[currentWordIndex].UK) || 0)
  mTotal = mTotal + (parseFloat(someShuffledWords[currentWordIndex].Male) || 0)
  fTotal = fTotal + (parseFloat(someShuffledWords[currentWordIndex].Female) || 0)
}

function upScores() {
    usScore = usScore + (parseFloat(someShuffledWords[currentWordIndex].US) || 0)
    ukScore = ukScore + (parseFloat(someShuffledWords[currentWordIndex].UK) || 0)
    mScore = mScore + (parseFloat(someShuffledWords[currentWordIndex].Male) || 0)
    fScore = fScore + (parseFloat(someShuffledWords[currentWordIndex].Female) || 0)
}

const words = [
  {
    Word: "manicotti",
    US: "0.9",
    UK: "",
    Male: "",
    Female: "",
    Definition: "large pasta tubes stuffed with chopped meat or mild cheese and baked in tomato sauce"
  },
  {
    Word: "ziti",
    US: "0.81",
    UK: "",
    Male: "",
    Female: "",
    Definition: "pasta in the form of medium-sized tubes resembling large macaroni"
  },
  {
    Word: "tilapia",
    US: "0.93",
    UK: "",
    Male: "",
    Female: "",
    Definition: "an African freshwater cichlid fish that has been widely introduced to many areas for food"
  },
  {
    Word: "garbanzo",
    US: "0.92",
    UK: "",
    Male: "",
    Female: "",
    Definition: "large white roundish Asiatic legume; chickpea"
  },
  {
    Word: "kabob",
    US: "0.98",
    UK: "",
    Male: "",
    Female: "",
    Definition: "cubes of meat marinated and cooked on a skewer usually with vegetables"
  },
  {
    Word: "kwanzaa",
    US: "0.9",
    UK: "",
    Male: "",
    Female: "",
    Definition: "a festival featuring African-American culture; celebrated between Christmas and New Year"
  },
  {
    Word: "crawdad",
    US: "0.86",
    UK: "",
    Male: "",
    Female: "",
    Definition: "small freshwater decapod crustacean that resembles a lobster; tiny lobster-like crustaceans usually boiled briefly"
  },
  {
    Word: "hibachi",
    US: "0.9",
    UK: "",
    Male: "",
    Female: "",
    Definition: "a portable brazier that burns charcoal and has a grill for cooking"
  },
  {
    Word: "sandlot",
    US: "0.95",
    UK: "",
    Male: "",
    Female: "",
    Definition: "a vacant area used by city boys to play games"
  },
  {
    Word: "acetaminophen",
    US: "0.93",
    UK: "",
    Male: "",
    Female: "",
    Definition: "an analgesic for mild pain"
  },
  {
    Word: "tamale",
    US: "0.91",
    UK: "",
    Male: "",
    Female: "",
    Definition: "corn and cornmeal dough stuffed with a meat mixture then wrapped in corn husks and steamed"
  },
  {
    Word: "kielbasa",
    US: "0.84",
    UK: "",
    Male: "",
    Female: "",
    Definition: "a type of highly seasoned Polish sausage, typically containing garlic"
  },
  {
    Word: "conniption",
    US: "0.76",
    UK: "",
    Male: "",
    Female: "",
    Definition: "a display of bad temper"
  },
  {
    Word: "chigger",
    US: "0.8",
    UK: "",
    Male: "",
    Female: "",
    Definition: "larval mite that sucks the blood of vertebrates including human beings causing intense irritation"
  },
  {
    Word: "tomatillo",
    US: "0.8",
    UK: "",
    Male: "",
    Female: "",
    Definition: "small edible yellow to purple tomato-like fruit enclosed in a bladderlike husk"
  },
  {
    Word: "provolone",
    US: "0.97",
    UK: "",
    Male: "",
    Female: "",
    Definition: "an Italian soft smoked cheese made from cow's milk and having a mellow flavor"
  },
  {
    Word: "albuterol",
    US: "0.74",
    UK: "",
    Male: "",
    Female: "",
    Definition: "a bronchodilator used for asthma and emphysema and other lung conditions"
  },
  {
    Word: "staph",
    US: "0.85",
    UK: "",
    Male: "",
    Female: "",
    Definition: "spherical Gram-positive parasitic bacteria that tend to form irregular colonies; some cause boils or septicemia or infections"
  },
  {
    Word: "goober",
    US: "0.97",
    UK: "",
    Male: "",
    Female: "",
    Definition: "pod of the peanut vine containing usually 2 nuts or seeds; `groundnut' and `monkey nut' are British terms"
  },
  {
    Word: "luau",
    US: "0.83",
    UK: "",
    Male: "",
    Female: "",
    Definition: "a Hawaiian party or feast, especially one accompanied by entertainment"
  },
  {
    Word: "tippex",
    US: "",
    UK: "0.91",
    Male: "",
    Female: "",
    Definition: "to cover a mistake in writing"
  },
  {
    Word: "biro",
    US: "",
    UK: "0.99",
    Male: "",
    Female: "",
    Definition: "a pen that has a small metal ball as the point of transfer of ink to paper"
  },
  {
    Word: "tombola",
    US: "",
    UK: "0.97",
    Male: "",
    Female: "",
    Definition: "a lottery in which tickets are drawn from a revolving drum"
  },
  {
    Word: "chipolata",
    US: "",
    UK: "0.94",
    Male: "",
    Female: "",
    Definition: "a small thin sausage"
  },
  {
    Word: "dodgem",
    US: "",
    UK: "0.95",
    Male: "",
    Female: "",
    Definition: "a small low-powered electrically powered vehicle driven on a special platform where there are many others"
  },
  {
    Word: "yob",
    US: "",
    UK: "0.98",
    Male: "",
    Female: "",
    Definition: "a cruel and brutal fellow"
  },
  {
    Word: "gazump",
    US: "",
    UK: "0.82",
    Male: "",
    Female: "",
    Definition: "rip off; ask an unreasonable price"
  },
  {
    Word: "abseil",
    US: "",
    UK: "0.89",
    Male: "",
    Female: "",
    Definition: "a descent down a nearly vertical surface by using a doubled rope that is coiled around the body"
  },
  {
    Word: "naff",
    US: "",
    UK: "0.94",
    Male: "",
    Female: "",
    Definition: "lacking in style or good taste"
  },
  {
    Word: "kerbside",
    US: "",
    UK: "0.98",
    Male: "",
    Female: "",
    Definition: "the side of a road or sidewalk that is nearer to the curb"
  },
  {
    Word: "plaice",
    US: "",
    UK: "0.91",
    Male: "",
    Female: "",
    Definition: "large European food fish"
  },
  {
    Word: "judder",
    US: "",
    UK: "0.94",
    Male: "",
    Female: "",
    Definition: "shake or vibrate rapidly and intensively"
  },
  {
    Word: "chiropody",
    US: "",
    UK: "0.94",
    Male: "",
    Female: "",
    Definition: "the branch of medicine concerned with the feet"
  },
  {
    Word: "korma",
    US: "",
    UK: "0.95",
    Male: "",
    Female: "",
    Definition: "a mildly spiced Indian curry dish"
  },
  {
    Word: "bolshy",
    US: "",
    UK: "0.85",
    Male: "",
    Female: "",
    Definition: "deliberately combative or uncooperative"
  },
  {
    Word: "quango",
    US: "",
    UK: "0.82",
    Male: "",
    Female: "",
    Definition: "a quasi nongovernmental organization"
  },
  {
    Word: "pelmet",
    US: "",
    UK: "0.85",
    Male: "",
    Female: "",
    Definition: "a decorative framework to conceal curtain fixtures at the top of a window casing"
  },
  {
    Word: "brolly",
    US: "",
    UK: "0.96",
    Male: "",
    Female: "",
    Definition: "colloquial terms for an umbrella"
  },
  {
    Word: "chaffinch",
    US: "",
    UK: "0.85",
    Male: "",
    Female: "",
    Definition: "small European bird with a cheerful song"
  },
  {
    Word: "escalope",
    US: "",
    UK: "0.91",
    Male: "",
    Female: "",
    Definition: "a thin slice of meat without any bone"
  },
  {
    Word: "howitzer",
    US: "",
    UK: "",
    Male: "0.84",
    Female: "",
    Definition: "a muzzle-loading high-angle gun with a short barrel that fires shells at high elevations for a short range"
  },
  {
    Word: "thermistor",
    US: "",
    UK: "",
    Male: "0.48",
    Female: "",
    Definition: "a semiconductor device made of materials whose resistance varies as a function of temperature"
  },
  {
    Word: "azimuth",
    US: "",
    UK: "",
    Male: "0.58",
    Female: "",
    Definition: "the angle between the vertical plane containing a celestial body and the plane of the meridian"
  },
  {
    Word: "femtosecond",
    US: "",
    UK: "",
    Male: "0.47",
    Female: "",
    Definition: "an unimaginably tiny unit of time"
  },
  {
    Word: "milliamp",
    US: "",
    UK: "",
    Male: "0.69",
    Female: "",
    Definition: "measurement for small electric currents"
  },
  {
    Word: "aileron",
    US: "",
    UK: "",
    Male: "0.55",
    Female: "",
    Definition: "an airfoil that controls lateral motion"
  },
  {
    Word: "servo",
    US: "",
    UK: "",
    Male: "0.61",
    Female: "",
    Definition: "control system that converts a small mechanical motion into one requiring greater power"
  },
  {
    Word: "degauss",
    US: "",
    UK: "",
    Male: "0.59",
    Female: "",
    Definition: "to make nonmagnetic"
  },
  {
    Word: "boson",
    US: "",
    UK: "",
    Male: "0.76",
    Female: "",
    Definition: "any particle that obeys Bose-Einstein statistics but not the Pauli exclusion principle"
  },
  {
    Word: "checksum",
    US: "",
    UK: "",
    Male: "0.58",
    Female: "",
    Definition: "digital data used to check whether errors have occurred in transmission or storage"
  },
  {
    Word: "piezoelectricity",
    US: "",
    UK: "",
    Male: "0.51",
    Female: "",
    Definition: "energy produced by mechanical pressure on certain crystals"
  },
  {
    Word: "gauss",
    US: "",
    UK: "",
    Male: "0.64",
    Female: "",
    Definition: "a unit of magnetic flux density equal to 1 maxwell per square centimeter"
  },
  {
    Word: "katana",
    US: "",
    UK: "",
    Male: "0.8",
    Female: "",
    Definition: "a long, single-edged sword used by Japanese samurai"
  },
  {
    Word: "shemale",
    US: "",
    UK: "",
    Male: "0.88",
    Female: "",
    Definition: "a transvestite or hermaphrodite"
  },
  {
    Word: "neodymium",
    US: "",
    UK: "",
    Male: "0.56",
    Female: "",
    Definition: "a yellow trivalent metallic element of the rare earth group"
  },
  {
    Word: "yakuza",
    US: "",
    UK: "",
    Male: "0.69",
    Female: "",
    Definition: "organized crime in Japan; a Japanese gangster"
  },
  {
    Word: "teraflop",
    US: "",
    UK: "",
    Male: "0.58",
    Female: "",
    Definition: "a unit for measuring the speed of a computer system"
  },
  {
    Word: "strafe",
    US: "",
    UK: "",
    Male: "0.83",
    Female: "",
    Definition: "an attack of machine-gun fire or cannon fire from a low flying airplane"
  },
  {
    Word: "parsec",
    US: "",
    UK: "",
    Male: "0.83",
    Female: "",
    Definition: "a unit of astronomical length; equivalent to 3.262 light years"
  },
  {
    Word: "bushido",
    US: "",
    UK: "",
    Male: "0.6",
    Female: "",
    Definition: "traditional code of the Japanese samurai which stressed courage, loyalty, self-discipline and simple living"
  },
  {
    Word: "peplum",
    US: "",
    UK: "",
    Male: "",
    Female: "0.64",
    Definition: "a flared ruffle attached to the waistline of a dress or jacket or blouse"
  },
  {
    Word: "tulle",
    US: "",
    UK: "",
    Male: "",
    Female: "0.77",
    Definition: "a fine (often starched) net used for veils or tutus or gowns"
  },
  {
    Word: "chignon",
    US: "",
    UK: "",
    Male: "",
    Female: "0.72",
    Definition: "a roll of hair worn at the nape of the neck"
  },
  {
    Word: "bandeau",
    US: "",
    UK: "",
    Male: "",
    Female: "0.81",
    Definition: "an undergarment worn by women to support their breasts"
  },
  {
    Word: "freesia",
    US: "",
    UK: "",
    Male: "",
    Female: "0.72",
    Definition: "any of several plants valued for their one-sided clusters of usually fragrant yellow or white or pink tubular flowers"
  },
  {
    Word: "chenille",
    US: "",
    UK: "",
    Male: "",
    Female: "0.76",
    Definition: "a soft tufted cord used in embroidery"
  },
  {
    Word: "kohl",
    US: "",
    UK: "",
    Male: "",
    Female: "0.77",
    Definition: "a cosmetic preparation used by women in Egypt and Arabia to darken the edges of their eyelids"
  },
  {
    Word: "verbena",
    US: "",
    UK: "",
    Male: "",
    Female: "0.7",
    Definition: "any of numerous tropical or subtropical plants grown for their showy spikes of variously colored flowers"
  },
  {
    Word: "doula",
    US: "",
    UK: "",
    Male: "",
    Female: "0.59",
    Definition: "a woman employed to provide guidance and support to the mother of a newborn baby"
  },
  {
    Word: "ruche",
    US: "",
    UK: "",
    Male: "",
    Female: "0.55",
    Definition: "a frill or pleat of fabric as decoration on a garment or home furnishing"
  },
  {
    Word: "espadrille",
    US: "",
    UK: "",
    Male: "",
    Female: "0.73",
    Definition: "a sandal with a sole made of rope or rubber and a cloth upper part"
  },
  {
    Word: "damask",
    US: "",
    UK: "",
    Male: "",
    Female: "0.8",
    Definition: "a fabric of linen or cotton or silk or wool with a reversible pattern woven into it"
  },
  {
    Word: "jacquard",
    US: "",
    UK: "",
    Male: "",
    Female: "0.74",
    Definition: "a fabric with an intricate variegated pattern woven on a special loom"
  },
  {
    Word: "whipstitch",
    US: "",
    UK: "",
    Male: "",
    Female: "0.71",
    Definition: "a stitch passing over an edge diagonally"
  },
  {
    Word: "boucle",
    US: "",
    UK: "",
    Male: "",
    Female: "0.5",
    Definition: "a fabric of uneven yarn that has an uneven knobby effect"
  },
  {
    Word: "taffeta",
    US: "",
    UK: "",
    Male: "",
    Female: "0.87",
    Definition: "a crisp smooth lustrous fabric"
  },
  {
    Word: "sateen",
    US: "",
    UK: "",
    Male: "",
    Female: "0.72",
    Definition: "a cotton fabric with a satiny finish"
  },
  {
    Word: "chambray",
    US: "",
    UK: "",
    Male: "",
    Female: "0.77",
    Definition: "a lightweight fabric woven with white threads across a colored warp"
  },
  {
    Word: "pessary",
    US: "",
    UK: "",
    Male: "",
    Female: "0.53",
    Definition: "a contraceptive device consisting of a flexible dome-shaped cup made of rubber or plastic"
  },
  {
    Word: "voile",
    US: "",
    UK: "",
    Male: "",
    Female: "0.68",
    Definition: "a light semitransparent fabric"
  },
]