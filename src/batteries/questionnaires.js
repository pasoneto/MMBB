var questions1 = ["Olen mielestäni henkilö, joka…", "On puhelias", "Löytää usein vikaa muista", "Tekee perusteellista työtä", "On masentunut, alakuloinen", "On omaperäinen, keksii uusia ideoita", "On pidättyväinen/varautunut", "On auttavainen ja epäitsekäs", "Voi olla jokseenkin huolimaton", "On rentoutunut, kestää hyvin stressiä", "On kiinnostunut monista eri asioista", "On täynnä energiaa", "Haastaa riitaa muiden kanssa", "On luotettava työntekijä", "Voi olla kireä", "On nerokas, syvällinen ajattelija", "Innostaa muita", "On luonteeltaan anteeksiantavainen", "On usein epäjärjestelmällinen", "Murehtii paljon", "Omaa vilkkaan mielikuvituksen", "On usein hiljainen", "On yleensä luottavainen", "On usein laiska", "On emotionaalisesti vakaa eikä järkyty helposti", "On kekseliäs", "On itsevarma", "Voi olla kylmä ja etäinen", "Jatkaa sinnikkäästi kunnes tehtävä on suoritettu", "Voi olla ailahtelevainen", "Arvostaa taiteellisia ja esteettisiä elämyksiä", "On joskus ujo, estynyt", "On huomaavainen ja ystävällinen lähes kaikkia kohtaan", "Toimii tehokkaasti", "Pysyy rauhallisena tiukoissa tilanteissa", "Pitää eniten rutiininomaisesta työstä", "On seurallinen, sosiaalinen", "On joskus töykeä muita kohtaan", "Tekee suunnitelmia ja toteuttaa ne", "Hermostuu helposti", "Pohtii ja leikkii ajatuksilla mielellään", "Omaa vain vähän taiteellisia kiinnostuksen kohteita", "Tekee mielellään yhteistyötä muiden kanssa", "Antaa keskittymisensä herpaantua helposti", "On sivistynyt taiteen, musiikin tai kirjallisuuden alalla"]
var questions2 = [{"Kognitiivinen - Positiivinen": ["Tiedän, miksi ystäväni ovat iloisia, vaikka he eivät kerro miksi", "Pystyn ymmärtämään, miltä jännittävän tarinan hahmoista tuntuu", "Kun joku on hyvällä tuulella, tunnistan sen siitä, miltä hän näyttää ja kuinka hän käyttäytyy", "Tiedän, milloin perheenjäseneni ovat tyytyväisiä sen perusteella, kuinka he puhuvat", "Pystyn samaistumaan jonkun toisen asemaan, joka kuvailee olevansa onnellinen"]}, {"Kognitiivinen-negatiivinen": ["Tunnistan, kun joku tuntee syyllisyyttä", "Tiedän, kun joku on onneton jo ennen kuin hän kertoo miksi", "Kun ystävää kiusataan, ymmärrän, miksi hän suuttuu", "Kun joku on pettynyt, tunnistan sen siitä, miltä hän näyttää", "Kun joku on häpeissään, tunnistan sen hänen kasvoistaan ja siitä, kuinka hän käyttäytyy"]}, {"Affektiivinen - Positiivinen": ["Tulen iloiseksi, kun katselen pienten koiranpentujen leikkimistä", "Tunnen itseni iloiseksi, kun näen lasten juoskentelevan ympäriinsä ja pitävän hauskaa", "Urheilujoukon hurrauksen kuuleminen aiheuttaa minulle jännitystä", "Innostun, kun näen elokuvassa ihmisiä, jotka ovat seikkailulla", "Olen iloinen, kun joku kertoo minulle juuri saamiaan hyviä uutisia"]}, {"Affektiivinen - Negatiivinen": ["Jos näkisin, että ystäväni kustannuksella pilaillaan, tuntisin oloni epämukavaksi", "Olisin vihainen, jos näkisin miehen lyövän puolustuskyvytöntä naista", "Ihmisten näkeminen surullisina hautajaisissa saisi minut tuntemaan myös itseni surulliseksi", "Olisin peloissani, jos näen miehen osoittavan aseella aseetonta henkilöä", "Olisin huolissani pienestä lapsesta, jota jahtaa iso koira"]}, {"Somaattinen-Positiivinen": ["Kun näen muiden nauravan, se saa minutkin nauramaan", "Sydämeni hakkaa nopeammin, kun katson toiminta-seikkailuelokuvaa", "Kun näen jonkun nauttivan maukkaasta jälkiruosta, se saa veden kielelle", "Iloisten ihmisten näkeminen saa minut virnuilemaan", "Kun näen lasten hymyilevän, se saa minut hymyilemään"]}, {"Somaattinen - Negatiivinen": ["Hikoilisin, jos näkisin jonkun vetävän heidän hammasta ulos", "Hätkähdän, kun näen jonkun lyövän", "Minulle nousee kyyneleet silmiini, jos näen ystäväni itkevän", "Sävähdän, kun näen jonkun viilletyn tai vuotavan verta", "Sydämeni hakkaa nopeammin, kun näen pelottavan TV-ohjelman"]} ]
var questions3 = ["Nolostumisen pelko saa minut välttelemään asioiden tekemistä ja ihmisille puhumista", "Välttelen aktiviteetteja, joissa olen huomion keskipisteenä", "Pahimmat pelkoni ovat nolostuminen ja se, että vaikutan tyhmältä"]

var questionnaire1 = []
var likertScale = ["1", "2", "3", "4", "5"]
for(k in questions1){
  var a = {prompt: questions1[k], labels: likertScale}
  questionnaire1.push(a)
}
var likert_scale = [
"Strongly Disagree", 
"Disagree", 
"Neutral", 
"Agree", 
"Strongly Agree"
];

var trial = {
type: jsPsychSurveyLikert,
questions: [
  {prompt: "I like vegetables.", name: 'Vegetables', labels: likert_scale},
  {prompt: "I like fruit.", name: 'Fruit', labels: likert_scale},
  {prompt: "I like meat.", name: 'Meat', labels: likert_scale},
],
randomize_question_order: true
};

var questionnaire2 = []
for(k in questions2){
  var typeQuestion = Object.keys(questions2[k])[0]
  var items = questions2[k][typeQuestion]
  for(j in items){
    var a = {prompt: items[j], labels: likertScale}
    questionnaire2.push(a)
  }
}

var questionnaire3 = []
for(k in questions3){
  var a = {prompt: questions3[k], labels: likertScale}
  questionnaire3.push(a)
}

var modelQuestionnaire1 = {
  type: jsPsychSurveyLikert,
  questions: questionnaire1,
  preamble: "Seuraavassa on joitain persoonallisuuteen liittyviä väittämiä. Arvioi miten hyvin nämä väittämät sopivat itseesi, ja vastaa ympyröimällä oikea vastausvaihtoehto.<br><br>1 = vahvasti eri mieltä, 2 = melko eri mieltä, 3 = ei samaa eikä eri mieltä, 4 = melko samaa mieltä, 5 = vahvasti samaa mieltä",
  randomize_question_order: false,
  data: {questionnaireType: "BFI-44"}
};

var modelQuestionnaire2 = {
  type: jsPsychSurveyLikert,
  questions: questionnaire2,
  randomize_question_order: false,
  data: {questionnaireType: "CASE"}
};

var modelQuestionnaire3 = {
  type: jsPsychSurveyLikert,
  questions: questionnaire3,
  randomize_question_order: false,
  data: {questionnaireType: "mini-SPIN"}
};
