var questions1 = ["Ulospäinsuuntautunut, innokas", "Kriittinen, vastakkain asettuva", "Luotettava, kurinalainen", "Ahdistuva, helposti hermostuva", "Avoin uusille kokemuksille, monimuotoinen", "Varautunut, hiljainen", "Sympaattinen, lämmin", "Epäjärjestelmällinen, huolimaton", "Rauhallinen, tunne-elämältään vakaa", "Perinteinen, mielikuvitukseton"]
var questions2 = ["Kun luen kiinnostavaa tarinaa tai kirjaa, kuvittelen miltä minusta tuntuisi jos tarinan tapahtumat tapahtuisivat minulle", "Eläydyn lukemani kirjan henkilöhahmojen tunteisiin", "Olen yleensä objektiivinen kun katson elokuvaa tai näytelmää, eikä tarina useinkaan imaise minua mukanaan.", "Nähtyäni elokuvan tai näytelmän, minusta on tuntunut kuin olisin ollut yksi tarinan henkilöistä.", "Unelmoin ja haaveilen melko säännöllisesti asioista jotka voisivat tapahtua minulle", "Hyvään kirjaan tai elokuvaan vahvasti eläytyminen on minulle melko harvinaista", "Ennen kuin kritisoin jotakuta, yritän kuvitella miltä minusta tuntuisi hänen sijassaan.", "Jos olen varma että olen oikeassa jossain asiassa, en tuhlaa paljon aikaa toisten ihmisten perusteluiden kuuntelemiseen.", "Toisinaan yritän ymmärtää ystäviäni paremmin kuvittelemalla miltä asiat näyttävät heidän näkökulmastaan.", "Uskon että asioilla on kaksi puolta, ja yritän aina nähdä molemmat puolet", "Minusta tuntuu joskus vaikealta nähdä asiat toisen näkökulmasta.", "Riitatilanteessa pyrin näkemään asian jokaisen näkökulmasta ennen kuin teen päätökseni", "Kun olen suuttunut jollekulle, pyrin yleensä asettamaan itseni hetkeksi hänen sijaansa.", "Kun näen että jotakuta käytetään hyväksi, tunnen suojelunhalua kyseistä ihmistä kohtaan", "Kun näen että jotakuta kohdellaan epäoikeudenmukaisesti, en välttämättä tunne kovinkaan paljon myötätuntoa kyseistä ihmistä kohtaan", "Tunnen usein voimakasta myötätuntoa itseäni vähemmän onnekkaita ihmisiä kohtaan.", "Voisin kuvailla itseäni melko helläsydämiseksi ihmiseksi", "Toisinaan en ole pahoillani toisten ihmisten puolesta vaikka heillä olisi ongelmia", "Toisten ihmisten vastoinkäymiset eivät yleensä vaivaa minua kovinkaan paljon", "Liikutun usein asioista joita näen tapahtuvan", "Kun näen jonkun joka tarvitsee kipeästi apua hätätilanteessa, luhistun", "Joskus tunnen oloni avuttomaksi ollessani hyvin emotionaalisen tilanteen keskellä.", "Hätätilanteissa tunnen oloni levottomaksi ja epämukavaksi", "Pystyn yleensä toimimaan tehokkaasti hätätilanteissa", "Kireissä, emotionaalisissa tilanteissa oleminen pelottaa minua", "Kun näen jonkun loukkaantuvan, pysyn yleensä rauhallisena", "Menetän usein hallinnan hätätilanteissa"]
var questions3 = ["Nolostumisen pelko saa minut välttelemään asioiden tekemistä ja ihmisille puhumista", "Välttelen aktiviteetteja, joissa olen huomion keskipisteenä", "Pahimmat pelkoni ovat nolostuminen ja se, että vaikutan tyhmältä"]

var questionnaire1 = []
var likert_scale = [ "Vahvasti eri mieltä", "Melko paljon eri mieltä", "Vähän eri mieltä", "Ei samaa eikä eri mieltä", "Vähän samaa mieltä", "Melko paljon samaa mieltä", "Vahvasti samaa mieltä" ];
for(k in questions1){
  var a = {prompt: questions1[k], labels: likert_scale}
  questionnaire1.push(a)
}

var questionnaire2 = []
var likert_scale = ["ei kuvaa minua hyvin", "", "", "", "kuvaa minua erittäin hyvin"];
for(k in questions2){
  var a = {prompt: questions2[k], labels: likert_scale}
  questionnaire2.push(a)
}

var liket_scale = ["ei lainkaan", "hieman", "jonkin verran", "todella paljon", "erittäin paljon"]
var questionnaire3 = []
for(k in questions3){
  var a = {prompt: questions3[k], labels: likert_scale}
  questionnaire3.push(a)
}

var modelQuestionnaire1 = {
  type: jsPsychSurveyLikert,
  questions: questionnaire1,
  preamble: "<p>Tässä on muutamia persoonallisuuspiirteitä, jotka saattavat kuvastaa tai olla kuvastamatta sinua. Kerro missä määrin olet samaa tai eri mieltä kunkin väittämän kanssa. Sinun tulee arvioida missä määrin kukin piirrepari kuvastaa sinua, vaikka toinen piirre sopisikin sinuun paremmin kuin toinen.<br>Olen mielestäni:</p>",
  randomize_question_order: false,
  button_label: "Jatka",
  data: {trialCategory: "questionnaire_TIPI"}
};

var modelQuestionnaire2 = {
  type: jsPsychSurveyLikert,
  questions: questionnaire2,
  preamble: "Seuraavat väittämät liittyvät ajatuksiin ja tuntemuksiin erilaisissa tilanteissa. Arvioi miten hyvin väittämät kuvaavat sinua.",
  button_label: "Jatka",
  randomize_question_order: false,
  data: {trialCategory: "questionnaire_IRI"}
};

var modelQuestionnaire3 = {
  type: jsPsychSurveyLikert,
  questions: questionnaire3,
  preamble: "Alla on 3 väitettä, joista voit olla samaa tai eri mieltä. Kerro asteikon 1-5 avulla, missä määrin olet samaa mieltä kunkin väitteen kohdalla.",
  randomize_question_order: false,
  button_label: "Jatka",
  data: {trialCategory: "questionnaire_mini_SPIN"}
};
