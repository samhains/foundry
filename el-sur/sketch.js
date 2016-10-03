// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

var poem = ["To have watched from one of your patios",
            "the ancient stars,",
            "from the bench of shadow to have watched",
            "those scattered lights",
            "that my ignorance has learned no names for",
            "nor their places in constellations,",
            "to have heard the note of water",
            "in the cistern,",
            "known the scent of jasmine and honeysuckle,",
            "the silence of the sleeping bird,",
            "the arch of the entrance, the damp",
            "these things perhaps are the poem."];

var results;
var poemP
function setup() {
  noCanvas();
  poemP = createP(poem.join("<br>"));
  poemP.class = "poem";
  button = createButton("reset");
  button.mousePressed(analyse);

}


function analyse() {

  var newPoem = poem.map(parseLines);
  renderPoem(newPoem);
}

function renderPoem(poem) {
  poemP.html(poem.join("<br>"));
}

function parseLines(line) {

  var lineArr = line.split(" ");
  var rs = new RiString(line);
  var features = rs.features();
  var syllablesArr = createSyllablesArr(features.syllables);
  return createNewLine(features.pos, syllablesArr, lineArr);
}

function createSyllablesArr(syllablesStr) {
  return syllablesStr.split(" ").map(function(syllableStr){
    return syllableStr.split(/\//).length;
  });
}

function createNewLine(pos, syllablesArr, lineArr) {
  var posArr = pos.split(" ");
  var lexicon = new RiLexicon();
  var newLineArr = posArr.map(function(pos, index){
    if(pos !== 'to' && pos !== 'in') {
      return lexicon.randomWord(pos, syllablesArr[index]);
    } else {
      return lineArr[index];
    }
  });

  return newLineArr.join(" ");

}
