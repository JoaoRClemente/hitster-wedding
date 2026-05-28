import { useState } from "react";

function spotifyUrl(id) {
  if (id.startsWith("search:")) {
    return "https://open.spotify.com/search/" + encodeURIComponent(id.replace("search:", ""));
  }
  return "https://open.spotify.com/track/" + id;
}

function qrUrl(trackId) {
  const url = spotifyUrl(trackId);
  return `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(url)}&format=png&margin=6&color=000000&bgcolor=ffffff`;
}

const ACOUSTIC = [
  { title: "Fallin'", artist: "Alicia Keys", id: "0KQx6HOpJueiSkztcS0r7D" },
  { title: "Back to Black", artist: "Amy Winehouse", id: "30FURVTCpbKyykjSEQzGkH" },
  { title: "Valerie", artist: "Amy Winehouse", id: "1XFtDOSGHaIL80mlxFJuFj" },
  { title: "Stayin' Alive", artist: "Bee Gees", id: "5ubvP9oKmxLUVq506fgLhk" },
  { title: "Stand by Me", artist: "Ben E. King", id: "6OzAkuRDmEpd52RF1g1WvU" },
  { title: "Bad Guy", artist: "Billie Eilish", id: "2Fxmhks0bxGSBdJ92vM42m" },
  { title: "Rebel Yell", artist: "Billy Idol", id: "4TIJ7zSBNejpoIPaWpWRKc" },
  { title: "Daddy Cool", artist: "Boney M", id: "3WMbD1OyfKuwWDWMNbPQ4g" },
  { title: "Treasure", artist: "Bruno Mars", id: "55h7vJchibLdUkxdlX3fK7" },
  { title: "Yellow", artist: "Coldplay", id: "3AJwUDP919kvQ9QcozQPxg" },
  { title: "Get Lucky", artist: "Daft Punk", id: "2Foc5Q5nqNiosCNqttzHof" },
  { title: "Hotel California", artist: "Eagles", id: "40riOy7x9W7GXjyGp4pjAv" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", id: "34gCuhDGsG4bRPIf9bb02f" },
  { title: "Dream a Little Dream of Me", artist: "Ella Fitzgerald", id: "5dTgE7CNxauvHhttPDCHdo" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley", id: "44AyOl4qVkzS48vBsbNXaC" },
  { title: "Wonderful Tonight", artist: "Eric Clapton", id: "6zC0mpGYwbNTpk9SKwh08f" },
  { title: "Layla (Acoustic)", artist: "Eric Clapton", id: "7w0LoChzdmCDn787IzfXC5" },
  { title: "Sweet Dreams", artist: "Eurythmics", id: "1TfqLAPs4K3s2rJMoCokcS" },
  { title: "I Will Survive", artist: "Gloria Gaynor", id: "7rIovIsXE6kMn629b7kDig" },
  { title: "Crazy", artist: "Gnarls Barkley", id: "0BtXtxmKBm1HwGnM3kO3rY" },
  { title: "Knockin' on Heaven's Door", artist: "Guns N' Roses", id: "4JiEyzf0Md7KEFFGWDDdCr" },
  { title: "Hurt So Good", artist: "John Mellencamp", id: "67eX1ovaHyVPUinMHeUtIM" },
  { title: "Walking on Sunshine", artist: "Katrina & The Waves", id: "05wIrZSwuaVWhcv5FfqeH0" },
  { title: "Die with a Smile", artist: "Lady Gaga", id: "2plbrEY59IikOBgBGLjaoe" },
  { title: "Shallow", artist: "Lady Gaga", id: "2VxeLyX666F8uXCJ0dZF8B" },
  { title: "Whole Lotta Love", artist: "Led Zeppelin", id: "0hCB0YR03f6AmQaHbwWDe8" },
  { title: "Fly Away", artist: "Lenny Kravitz", id: "1OxcIUqVmVYxT6427tbhDW" },
  { title: "Like a Virgin", artist: "Madonna", id: "1ZPlNanZsJSPK5h9YZZFbZ" },
  { title: "Moves Like Jagger", artist: "Maroon 5", id: "1r299qCKBLgUS9XJ9m1kEx" },
  { title: "Nothing Else Matters", artist: "Metallica", id: "6QAsrXPnMSXIbV0yEJHlEX" },
  { title: "Billie Jean", artist: "Michael Jackson", id: "7J1uxwnxfQLu4APicE5Rnj" },
  { title: "Feeling Good", artist: "Nina Simone", id: "4DyQ0JY5CkJHMFRFb9cFUe" },
  { title: "Because the Night", artist: "Patti Smith", id: "0aJuBEnSoXXTpTgVX5ZRFN" },
  { title: "Better Man", artist: "Pearl Jam", id: "6OmDMzGCHt9L6LGXBqJRUj" },
  { title: "I Want to Break Free", artist: "Queen", id: "5eIDxmHNsOBDMDCGLBBfNQ" },
  { title: "Crazy Little Thing Called Love", artist: "Queen", id: "1F9NVicWfNQA5ki8WmEtk8" },
  { title: "We Will Rock You", artist: "Queen", id: "54flyrjcdnQdco7300avMB" },
  { title: "Creep", artist: "Radiohead", id: "70LcF31zb1H0PyJoS1Sx1r" },
  { title: "Hit the Road Jack", artist: "Ray Charles", id: "6PypGyiu0Y2lCDBN1XZEnP" },
  { title: "Start Me Up", artist: "Rolling Stones", id: "2a4ELJFrJb4OSI4w6UiOmU" },
  { title: "Satisfaction", artist: "Rolling Stones", id: "2BTZIqbBs4Mm1zDALd2LKK" },
  { title: "Superstition", artist: "Stevie Wonder", id: "1AWQoqb9bSvzTjaLralEkT" },
  { title: "Master Blaster", artist: "Stevie Wonder", id: "0V5YcgMPzAoVDyHUq7NJAJ" },
  { title: "Hey Jude", artist: "The Beatles", id: "0aym2LBJBk9DAYuHHutrIl" },
  { title: "Come Together", artist: "The Beatles", id: "2EqlS6tkEnglzr7tkKAAYh" },
  { title: "People Are Strange", artist: "The Doors", id: "6lS5Uyf9OFEzqnBzNHLaRR" },
  { title: "Roadhouse Blues", artist: "The Doors", id: "3MBOlK1KJD3SfkSjvPO0KN" },
  { title: "Velha Infância", artist: "Tribalistas", id: "3HWBBBF5rqUl1lG0cqXXuT", pt: true },
  { title: "Blister in the Sun", artist: "Violent Femmes", id: "6VKTSBHnrLEJvJRHxDHOVg" },
  { title: "Wake Me Up Before You Go-Go", artist: "Wham!", id: "3qlkSMXDvqXJ6LJHg4ZJX9" },
  // Portuguesa
  { title: "Povo que Lavas no Rio", artist: "Amália Rodrigues", id: "search:Amália Rodrigues Povo que Lavas no Rio", pt: true },
  { title: "Maribenta", artist: "Amália Rodrigues", id: "search:Amália Rodrigues Maribenta", pt: true },
  { title: "Canção do Mar", artist: "Amália Rodrigues", id: "search:Amália Rodrigues Canção do Mar", pt: true },
  { title: "Barco Negro", artist: "Amália Rodrigues", id: "search:Amália Rodrigues Barco Negro", pt: true },
  { title: "Desfado", artist: "Ana Moura", id: "search:Ana Moura Desfado", pt: true },
  { title: "Andorinhas", artist: "Ana Moura", id: "search:Ana Moura Andorinhas", pt: true },
  { title: "Arraial Triste", artist: "Ana Moura", id: "search:Ana Moura Arraial Triste", pt: true },
  { title: "Desfolhada", artist: "Simone de Oliveira", id: "search:Simone de Oliveira Desfolhada", pt: true },
  { title: "Vaca de Fogo", artist: "Madredeus", id: "search:Madredeus Vaca de Fogo", pt: true },
  { title: "Canção do Engate", artist: "António Variações", id: "search:António Variações Canção do Engate", pt: true },
  { title: "Estou Além", artist: "António Variações", id: "4wuaLybXodnM3oL8ij1Mq1", pt: true },
  { title: "Playback", artist: "Carlos Paião", id: "search:Carlos Paião Playback", pt: true },
  { title: "Frágil", artist: "Jorge Palma", id: "search:Jorge Palma Frágil", pt: true },
  { title: "Casa", artist: "Fernando Daniel", id: "search:Fernando Daniel Casa", pt: true },
  { title: "Jardins Proibidos", artist: "Paulo Gonzo", id: "search:Paulo Gonzo Jardins Proibidos", pt: true },
  { title: "Movimento Perpétuo Associativo", artist: "Deolinda", id: "search:Deolinda Movimento Perpétuo Associativo", pt: true },
  { title: "Canção de Embalar", artist: "Zeca Afonso", id: "search:Zeca Afonso Canção de Embalar", pt: true },
  { title: "Vejam Bem", artist: "Zeca Afonso", id: "search:Zeca Afonso Vejam Bem", pt: true },
  { title: "Rio Grande", artist: "Postal dos Correios", id: "search:Postal dos Correios Rio Grande", pt: true },
  { title: "Solta-se o Beijo", artist: "Ala dos Namorados", id: "search:Ala dos Namorados Solta-se o Beijo", pt: true },
  { title: "Paixão", artist: "Rui Veloso", id: "search:Rui Veloso Paixão", pt: true },
  { title: "Circo de Feras", artist: "Xutos & Pontapés", id: "search:Xutos Pontapés Circo de Feras", pt: true },
  { title: "Homem do Leme", artist: "Xutos & Pontapés", id: "search:Xutos Pontapés Homem do Leme", pt: true },
  { title: "Não Sou o Único", artist: "Xutos & Pontapés", id: "search:Xutos Pontapés Não Sou o Único", pt: true },
  { title: "Chuva Dissolvente", artist: "Xutos & Pontapés", id: "search:Xutos Pontapés Chuva Dissolvente", pt: true },
  { title: "Não Há Estrelas no Céu", artist: "Rui Veloso", id: "search:Rui Veloso Não Há Estrelas no Céu", pt: true },
  { title: "Rosa Sangue", artist: "Amor Electro", id: "search:Amor Electro Rosa Sangue", pt: true },
  { title: "Como Antes", artist: "Matias Damásio", id: "search:Matias Damásio Como Antes", pt: true },
];

const BAND = [
  // Pop e Pop-Rock
  { title: "Gimme! Gimme! Gimme!", artist: "ABBA", id: "3vkQ5DAB1qQMYO4Mr9zJN6" },
  { title: "Dancing Queen", artist: "ABBA", id: "0GjEhVFGZW8afUYGChu3Rr" },
  { title: "Treasure", artist: "Bruno Mars", id: "55h7vJchibLdUkxdlX3fK7" },
  { title: "Karma Chameleon", artist: "Culture Club", id: "3XDeeP9wBZzGhIPZmLfEEx" },
  { title: "Let's Dance", artist: "David Bowie", id: "3ix6K4wZY29bCujrSznwFZ" },
  { title: "(I've Had) The Time of My Life", artist: "Bill Medley & Jennifer Warnes", id: "7tDPPdcjJs1pMf9KfZZ0i0" },
  { title: "I Just Want to Make Love to You", artist: "Etta James", id: "33K1u1kovHtnBt9sZoz2Eb" },
  { title: "Crazy", artist: "Gnarls Barkley", id: "0BtXtxmKBm1HwGnM3kO3rY" },
  { title: "Footloose", artist: "Kenny Loggins", id: "6W2VbtvMrDXm5vYeB7amkO" },
  { title: "Maniac", artist: "Michael Sembello", id: "0QKfiqpEU4h9ycPSzIFwYe" },
  { title: "Another One Bites the Dust", artist: "Queen", id: "2k1yPYf9WGA4LiqcLVwtzn" },
  { title: "Crazy Little Thing Called Love", artist: "Queen", id: "1F9NVicWfNQA5ki8WmEtk8" },
  { title: "We Are the Champions", artist: "Queen", id: "1lCRw5FEZ1gPDNPzy1K4zW" },
  { title: "Moves Like Jagger", artist: "Maroon 5", id: "1r299qCKBLgUS9XJ9m1kEx" },
  { title: "Superstition", artist: "Stevie Wonder", id: "4N0TP4Rmj6QQezWV88ARNJ" },
  { title: "Shake It Off", artist: "Taylor Swift", id: "0cqRj7pUJDkTCEsJkx8snD" },
  { title: "Proud Mary", artist: "Tina Turner", id: "6gJdDnF2TzfA1WPMXuCa3x" },
  { title: "The Best", artist: "Tina Turner", id: "4OeFQtRyT7vsLnRTv7t8YT" },
  { title: "Shut Up and Dance", artist: "Walk the Moon", id: "4kbj5MwxO1bq9wjT5g9HaA" },
  // Rock
  { title: "Highway to Hell", artist: "AC/DC", id: "2zYzyRzz6pRmhPzyfMEC8s" },
  { title: "I Bet You Look Good on the Dancefloor", artist: "Arctic Monkeys", id: "3DQVgcqaP3iSMbaKsd57l5" },
  { title: "Lonely Boy", artist: "The Black Keys", id: "5G1sTBGbZT5o4PNRc75RKI" },
  { title: "All the Small Things", artist: "Blink-182", id: "2m1hi0nfMR9vdGC8UcrnwU" },
  { title: "Song 2", artist: "Blur", id: "3GfOAdcoc3X5GPiiXmpBjK" },
  { title: "What's Up", artist: "4 Non Blondes", id: "0jWgAnTrNZmOGmqgvHhZEm" },
  { title: "Open Your Eyes", artist: "Guano Apes", id: "5oxpT46KeiEuckYnChgFFT" },
  { title: "Lord of the Boards", artist: "Guano Apes", id: "54Kox6D5c5JNW9ujt3hcOW" },
  { title: "Basket Case", artist: "Green Day", id: "6L89mwZXSOwYl76YXfX13s" },
  { title: "When I Come Around", artist: "Green Day", id: "1Dr1fXbc2IxaK1Mu8P8Khz" },
  { title: "The Trooper", artist: "Iron Maiden", id: "4OROzZUy6gOWN4UGQVaZMF" },
  { title: "Sex on Fire", artist: "Kings of Leon", id: "3YfS47QufnLDFA71FUsgCq" },
  { title: "Fly Away", artist: "Lenny Kravitz", id: "1OxcIUqVmVYxT6427tbhDW" },
  { title: "I'm Gonna Go My Way", artist: "Lenny Kravitz", id: "6MWXQV4fFRFAd2ZYK9mfXQ" },
  { title: "Break Stuff", artist: "Limp Bizkit", id: "2vNfPJuJtInMzBEYDFj9tT" },
  { title: "In the End", artist: "Linkin Park", id: "60a0Rd6pjrkxjPbaKzXjfq" },
  { title: "One Step Closer", artist: "Linkin Park", id: "4fzsfWzRhPbux8fDPWpfr5" },
  { title: "Symphony of Destruction", artist: "Megadeth", id: "3HqApEBuDOhI5hEiK9fGCI" },
  { title: "For Whom the Bell Tolls", artist: "Metallica", id: "2TNYSmFGQy3PjSMZgDWBne" },
  { title: "Enter Sandman", artist: "Metallica", id: "1SQkzMOyxqSQ7snpRFsmdy" },
  { title: "Smells Like Teen Spirit", artist: "Nirvana", id: "5ghIJDpPoe3CfHMGu71E6T" },
  { title: "Aerials", artist: "System of a Down", id: "7ry4JqfImfgWFuDuEE2JnW" },
  { title: "Toxicity", artist: "System of a Down", id: "2nLOHgzXzwFFoF5VIKcAOq" },
  { title: "Chop Suey!", artist: "System of a Down", id: "2sGClceOXrFqUNMU2mPuXk" },
  { title: "We Will Rock You", artist: "Queen", id: "54flyrjcdnQdco7300avMB" },
  { title: "Livin' la Vida Loca", artist: "Ricky Martin", id: "3ywJ9Y2QdoMQu5sT3QimDv" },
  { title: "Killing in the Name", artist: "Rage Against the Machine", id: "59WN2psjkt1tyaxjspN8fp" },
  { title: "Otherside", artist: "Red Hot Chili Peppers", id: "3RQQmkQEvNCY4prGKE6vc5" },
  { title: "Should I Stay or Should I Go", artist: "The Clash", id: "5ubSHhSbHcLFLOQxJpOIaA" },
  { title: "Roadhouse Blues", artist: "The Doors", id: "1Q5kgpp4pmyGqPwNBzkSrw" },
  { title: "Mr. Brightside", artist: "The Killers", id: "0eGsygTp906u18L0Oimnem" },
  { title: "Last Nite", artist: "The Strokes", id: "0aHUvj0vRoXUAZ8MLGLxbS" },
  // Portuguesa
  { title: "Rosa Sangue", artist: "Amor Electro", id: "search:Amor Electro Rosa Sangue", pt: true },
  { title: "Criatura da Noite", artist: "Entre Aspas", id: "search:Entre Aspas Criatura da Noite", pt: true },
  { title: "Nasci para a Música", artist: "José Cid", id: "search:José Cid Nasci para a Música", pt: true },
  { title: "Chaga", artist: "Ornatos Violeta", id: "search:Ornatos Violeta Chaga", pt: true },
  { title: "Quando Eu Era Pequenino", artist: "Quinta do Bill", id: "search:Quinta do Bill Quando Eu Era Pequenino", pt: true },
  { title: "Circo de Feras", artist: "Xutos & Pontapés", id: "search:Xutos Pontapés Circo de Feras", pt: true },
  { title: "Casinha", artist: "Xutos & Pontapés", id: "search:Xutos Pontapés Casinha", pt: true },
  { title: "Vira-Vira", artist: "Mamonas Assassinas", id: "search:Mamonas Assassinas Vira-Vira", pt: true },
];

const ACOUSTIC_MEDLEYS = [
  {
    name: "Medley Rock Clássico",
    songs: [
      { title: "La Bamba", artist: "Los Lobos", id: "0uMMLry3hzWGn3q3loqMkm" },
      { title: "Twist and Shout", artist: "The Beatles", id: "5ZBeML7Lf3FMEVviTyvi8l" },
      { title: "Blue Suede Shoes", artist: "Elvis Presley", id: "47gmoUrZV3w20JAnQOZMcO" },
      { title: "Johnny B. Goode", artist: "Chuck Berry", id: "2QfiRTz5Yc8DdShCxG1tB2" },
    ],
  },
  {
    name: "Medley Police / Soft Cell",
    songs: [
      { title: "Englishman in New York", artist: "The Police", id: "search:The Police Englishman in New York" },
      { title: "Tainted Love", artist: "Soft Cell", id: "0cGG2EouYCEEC3xfa0tDFV" },
    ],
  },
  {
    name: "Medley Maroon 5 / U2 / Bob Marley",
    songs: [
      { title: "She Will Be Loved", artist: "Maroon 5", id: "7sapKrjDij2fpDVj0GxP66" },
      { title: "With or Without You", artist: "U2", id: "6ADSaE87h8Y3lccZlBJdXH" },
      { title: "One", artist: "U2", id: "3G69vJMWsX6ZohTykad2AU" },
      { title: "No Woman No Cry", artist: "Bob Marley", id: "3PQLYVskjUeRmRIfECsL0X" },
    ],
  },
  {
    name: "Medley Roy Orbison",
    songs: [
      { title: "Oh, Pretty Woman", artist: "Roy Orbison", id: "52HAHV1j93s5B8GoTNI7DJ" },
      { title: "Oh! Carol", artist: "Neil Sedaka", id: "5zvOXJrzzUlvXwyuwZ0toZ" },
    ],
  },
  {
    name: "Medley Bruno Mars / Pharrell",
    songs: [
      { title: "Locked Out of Heaven", artist: "Bruno Mars", id: "3w3y8KPTfNeOKPiqUTakBh" },
      { title: "Happy", artist: "Pharrell Williams", id: "60nZcImufyMA1MKQY3dcCH" },
    ],
  },
  {
    name: "Medley Bill Withers / Craig David",
    songs: [
      { title: "Ain't No Sunshine", artist: "Bill Withers", id: "1k1Bqnv2R0uJXQN4u6LKYt" },
      { title: "Walking Away", artist: "Craig David", id: "3R7fjB38qajI6JR69y5k4e" },
    ],
  },
  {
    name: "Medley Eric Clapton / The Doors",
    songs: [
      { title: "Cocaine", artist: "Eric Clapton", id: "2udGjDmpK1dH9VGyw7nrei" },
      { title: "Roadhouse Blues", artist: "The Doors", id: "1Q5kgpp4pmyGqPwNBzkSrw" },
    ],
  },
  {
    name: "Medley Disco",
    songs: [
      { title: "Rhythm of the Night", artist: "Corona", id: "5UCPOJs8VJARoIX6acKRuJ" },
      { title: "Coco Jamboo", artist: "Mr. President", id: "1vXB0If9PfpM5mcTShrQQU" },
      { title: "All That She Wants", artist: "Ace of Base", id: "6kWJvPfC4DgUpRsXKNa9z9" },
      { title: "...Baby One More Time", artist: "Britney Spears", id: "3MjUtNVVq3C8Fn0MP3zhXa" },
    ],
  },
  {
    name: "Medley Alanis / Oasis / Skunk Anansie / Cranberries",
    songs: [
      { title: "Ironic", artist: "Alanis Morissette", id: "29YBihzQOmat0U74k4ukdx" },
      { title: "Don't Look Back in Anger", artist: "Oasis", id: "7ppPZa3TRUSGKaks9wH7VT" },
      { title: "Hedonism", artist: "Skunk Anansie", id: "0KPWi8mDRagwxnwaA0di8a" },
      { title: "Zombie", artist: "The Cranberries", id: "49wOjOkS4pBK3PQnPnNYjb" },
    ],
  },
  {
    name: "Medley António Variações / Doce / Da Vinci",
    songs: [
      { title: "É p'ra Amanhã", artist: "António Variações", id: "7sRnGu2NjQ9QhaCol6Se8j", pt: true },
      { title: "Amanhã de Manhã", artist: "Doce", id: "31jrZRwWQiIzyginZuMHs2", pt: true },
      { title: "Conquistador", artist: "Da Vinci", id: "66vHHXFNHimIPhMStKcytG", pt: true },
    ],
  },
  {
    name: "Medley Lunáticos",
    songs: [
      { title: "Estou na Lua", artist: "Os Lunáticos", id: "0LtslQXNgWWNofL06eDUez", pt: true },
      { title: "Maria Albertina", artist: "Os Lunáticos", id: "search:Lunáticos Maria Albertina", pt: true },
      { title: "Amor de Água Fresca", artist: "Os Lunáticos", id: "search:Lunáticos Amor de Água Fresca", pt: true },
      { title: "Patchouly", artist: "Os Lunáticos", id: "search:Lunáticos Patchouly", pt: true },
    ],
  },
];

const BAND_MEDLEYS = [
  {
    name: "Medley Rock Clássico",
    songs: [
      { title: "La Bamba", artist: "Los Lobos", id: "0uMMLry3hzWGn3q3loqMkm" },
      { title: "Twist and Shout", artist: "The Beatles", id: "5ZBeML7Lf3FMEVviTyvi8l" },
      { title: "Blue Suede Shoes", artist: "Elvis Presley", id: "47gmoUrZV3w20JAnQOZMcO" },
      { title: "Johnny B. Goode", artist: "Chuck Berry", id: "2QfiRTz5Yc8DdShCxG1tB2" },
    ],
  },
  {
    name: "Medley Santana / Maroon 5 / Beyoncé",
    songs: [
      { title: "Smooth", artist: "Santana", id: "3H4wK3Mc5hgzcFKw7wFTfu" },
      { title: "This Love", artist: "Maroon 5", id: "6ECp64rv50XVz93WvxXMGF" },
      { title: "Crazy in Love", artist: "Beyoncé", id: "0TwBtDAWpkpM3srywFVOV5" },
    ],
  },
  {
    name: "Medley Boy Band",
    songs: [
      { title: "I Want It That Way", artist: "Backstreet Boys", id: "47BBI51FKFwOMlIiX6m8ya" },
      { title: "Wannabe", artist: "Spice Girls", id: "1Je1IMUlBXcx1Fz0WE7oPT" },
    ],
  },
  {
    name: "Medley António Variações / Quinta do Bill",
    songs: [
      { title: "Estou Além", artist: "António Variações", id: "4wuaLybXodnM3oL8ij1Mq1", pt: true },
      { title: "Voa Voa", artist: "Quinta do Bill", id: "6b9wXhCNWi1xttnvs0cy3g", pt: true },
    ],
  },
  {
    name: "Medley Alanis / Oasis / Skunk Anansie / Cranberries",
    songs: [
      { title: "Ironic", artist: "Alanis Morissette", id: "29YBihzQOmat0U74k4ukdx" },
      { title: "Don't Look Back in Anger", artist: "Oasis", id: "7ppPZa3TRUSGKaks9wH7VT" },
      { title: "Hedonism", artist: "Skunk Anansie", id: "0KPWi8mDRagwxnwaA0di8a" },
      { title: "Zombie", artist: "The Cranberries", id: "49wOjOkS4pBK3PQnPnNYjb" },
    ],
  },
  {
    name: "Medley Lunáticos",
    songs: [
      { title: "Estou na Lua", artist: "Os Lunáticos", id: "0LtslQXNgWWNofL06eDUez", pt: true },
      { title: "Maria Albertina", artist: "Os Lunáticos", id: "search:Lunáticos Maria Albertina", pt: true },
      { title: "Amor de Água Fresca", artist: "Os Lunáticos", id: "search:Lunáticos Amor de Água Fresca", pt: true },
      { title: "Perfume Patchouly", artist: "Os Lunáticos", id: "search:Lunáticos Patchouly", pt: true },
    ],
  },
  {
    name: "Medley Rock Energético",
    songs: [
      { title: "Walking on Sunshine", artist: "Katrina & The Waves", id: "05wIrZSwuaVWhcv5FfqeH0" },
      { title: "Are You Gonna Be My Girl", artist: "Jet", id: "72zZfHPYx43shcP3eKkYi5" },
      { title: "Back in Black", artist: "AC/DC", id: "08mG3Y1vljYA6bvDt4Wqkj" },
      { title: "I Feel Good", artist: "James Brown", id: "4ZZhgq5RtXEu4RUsgV0a7g" },
      { title: "Satisfaction", artist: "Rolling Stones", id: "2BTZIqbBs4Mm1zDALd2LKK" },
    ],
  },
  {
    name: "Medley Disco",
    songs: [
      { title: "Rhythm of the Night", artist: "Corona", id: "5UCPOJs8VJARoIX6acKRuJ" },
      { title: "Freed from Desire", artist: "Gala", id: "3EpbZE2fBvFb1nhaGCCFQS" },
    ],
  },
  {
    name: "Medley Pop",
    songs: [
      { title: "Let's Get It Started", artist: "Black Eyed Peas", id: "28jHD8xBLnN8esbroQ6zz8" },
      { title: "Don't Start Now", artist: "Dua Lipa", id: "3PfIrDoz19wz7qK7tYeu62" },
      { title: "Get Lucky", artist: "Daft Punk", id: "2Foc5Q5nqNiosCNqttzHof" },
      { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", id: "32OlwWuMpZ6b0aN2RZOeMS" },
    ],
  },
  {
    name: "Medley Bruno Mars",
    songs: [
      { title: "Locked Out of Heaven", artist: "Bruno Mars", id: "3w3y8KPTfNeOKPiqUTakBh" },
      { title: "Happy", artist: "Pharrell Williams", id: "60nZcImufyMA1MKQY3dcCH" },
    ],
  },
  {
    name: "Medley Bon Jovi",
    songs: [
      { title: "It's My Life", artist: "Bon Jovi", id: "0v1XpBHnsbkCn7iJ9Ucr1l" },
      { title: "You Give Love a Bad Name", artist: "Bon Jovi", id: "0rmGAIH9LNJewFw7nKzZnc" },
    ],
  },
];

const VIBES = ["💃 Dançar", "💕 Romântica", "⚡ Energética", "🌙 Nostálgica", "⏭ Skip"];

// ─── SongCard ────────────────────────────────────────────────────────────────

function SongCard({ song, index }) {
  const [revealed, setRevealed] = useState(false);
  const [rating, setRating] = useState("");
  const [firstDance, setFirstDance] = useState(false);
  const [vibe, setVibe] = useState("");
  const [notes, setNotes] = useState("");

  const ratingColor = { "❤️": "#ff4d6d", "✓": "#06d6a0", "✗": "#888" };

  return (
    <div style={{
      background: rating === "❤️" ? "linear-gradient(135deg, #1a0a12, #2d0f1f)" :
                  rating === "✓" ? "linear-gradient(135deg, #061a12, #0a2d1e)" :
                  rating === "✗" ? "linear-gradient(135deg, #111, #1a1a1a)" :
                  "linear-gradient(135deg, #181818, #222)",
      border: rating === "❤️" ? "1.5px solid #ff4d6d44" :
              rating === "✓" ? "1.5px solid #06d6a044" :
              "1.5px solid #333",
      borderRadius: 16,
      padding: "16px",
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
      transition: "all 0.3s ease",
    }}>
      {/* Number */}
      <div style={{ color: "#444", fontSize: 11, fontFamily: "monospace", minWidth: 20, paddingTop: 4 }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* QR Code */}
      <a href={spotifyUrl(song.id)} target="_blank" rel="noopener noreferrer"
        style={{ display: "block", minWidth: 72, textDecoration: "none" }}>
        <div style={{
          width: 72, height: 72, background: "#fff", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", flexShrink: 0,
        }}>
          <img src={qrUrl(song.id)} width={72} height={72} alt="QR Spotify"
            style={{ display: "block" }} />
        </div>
        <div style={{ textAlign: "center", fontSize: 9, color: "#555", marginTop: 3 }}>
          ▶ spotify
        </div>
      </a>

      {/* Song info + controls */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Reveal area */}
        <div
          onClick={() => setRevealed(r => !r)}
          style={{ cursor: "pointer", userSelect: "none", marginBottom: 10 }}
        >
          {revealed ? (
            <div>
              <div style={{
                fontSize: 15, fontWeight: 700, color: "#fff",
                fontFamily: "'Georgia', serif",
                lineHeight: 1.2, marginBottom: 3,
              }}>
                {song.title}
                {song.pt && (
                  <span style={{
                    marginLeft: 7, fontSize: 9, background: "#0a3a1a",
                    color: "#06d6a0", borderRadius: 4, padding: "2px 6px",
                    fontFamily: "sans-serif", fontWeight: 600, verticalAlign: "middle",
                  }}>PT</span>
                )}
              </div>
              <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif" }}>
                {song.artist}
              </div>
            </div>
          ) : (
            <div style={{
              background: "linear-gradient(90deg, #ff006e, #8338ec, #3a86ff)",
              borderRadius: 8, padding: "10px 14px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: 16 }}>🎵</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>
                  TOCA E DESCOBRE
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 1 }}>
                  toca aqui para revelar a música
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rating buttons */}
        <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
          {["❤️", "✓", "✗"].map(r => (
            <button key={r}
              onClick={() => setRating(rating === r ? "" : r)}
              style={{
                border: rating === r ? `2px solid ${ratingColor[r]}` : "1.5px solid #333",
                background: rating === r ? ratingColor[r] + "22" : "transparent",
                color: rating === r ? ratingColor[r] : "#555",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: r === "❤️" ? 16 : 14,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s",
                minHeight: 36,
                minWidth: 44,
              }}>
              {r}
            </button>
          ))}

          <button
            onClick={() => setFirstDance(f => !f)}
            style={{
              border: firstDance ? "2px solid #ffd60a" : "1.5px solid #333",
              background: firstDance ? "#ffd60a22" : "transparent",
              color: firstDance ? "#ffd60a" : "#555",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 15,
              cursor: "pointer",
              transition: "all 0.15s",
              minHeight: 36,
            }}>
            💍
          </button>
        </div>

        {/* Vibe selector */}
        <select
          value={vibe}
          onChange={e => setVibe(e.target.value)}
          style={{
            width: "100%",
            background: "#111",
            color: vibe ? "#fff" : "#444",
            border: "1.5px solid #333",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 12,
            marginBottom: 6,
            cursor: "pointer",
          }}>
          <option value="">— ambiente —</option>
          {VIBES.map(v => <option key={v} value={v}>{v}</option>)}
        </select>

        {/* Notes */}
        <input
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="notas..."
          style={{
            width: "100%",
            background: "transparent",
            color: "#aaa",
            border: "1.5px solid #2a2a2a",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 12,
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
}

function SongList({ songs }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {songs.map((song, i) => (
        <SongCard key={`${song.artist}-${song.title}`} song={song} index={i} />
      ))}
    </div>
  );
}

// ─── MedleyCard ───────────────────────────────────────────────────────────────

function MedleyCard({ medley, index }) {
  const [rating, setRating] = useState("");
  const [firstDance, setFirstDance] = useState(false);
  const [notes, setNotes] = useState("");

  const ratingColor = { "❤️": "#ff4d6d", "✓": "#06d6a0", "✗": "#888" };
  const firstSongId = medley.songs[0].id;
  const ptCount = medley.songs.filter(s => s.pt).length;
  const isPT = ptCount >= Math.ceil(medley.songs.length / 2);

  return (
    <div style={{
      background: rating === "❤️" ? "linear-gradient(135deg, #1a0a12, #2d0f1f)" :
                  rating === "✓" ? "linear-gradient(135deg, #061a12, #0a2d1e)" :
                  rating === "✗" ? "linear-gradient(135deg, #111, #1a1a1a)" :
                  "linear-gradient(135deg, #181818, #222)",
      border: rating === "❤️" ? "1.5px solid #ff4d6d44" :
              rating === "✓" ? "1.5px solid #06d6a044" :
              "1.5px solid #8338ec33",
      borderRadius: 16,
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      transition: "all 0.3s ease",
    }}>

      {/* Header row: número + QR + nome + badges */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        {/* Number */}
        <div style={{ color: "#444", fontSize: 11, fontFamily: "monospace", minWidth: 20, paddingTop: 4 }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* QR Code — 1.ª música do medley */}
        <a href={spotifyUrl(firstSongId)} target="_blank" rel="noopener noreferrer"
          style={{ display: "block", minWidth: 72, textDecoration: "none" }}>
          <div style={{
            width: 72, height: 72, background: "#fff", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", flexShrink: 0,
          }}>
            <img src={qrUrl(firstSongId)} width={72} height={72} alt="QR Spotify"
              style={{ display: "block" }} />
          </div>
          <div style={{ textAlign: "center", fontSize: 9, color: "#555", marginTop: 3 }}>
            ▶ 1.ª música
          </div>
        </a>

        {/* Nome do medley + badges */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>🎭</span>
            <div style={{
              fontSize: 15, fontWeight: 700, color: "#fff",
              fontFamily: "'Georgia', serif",
              lineHeight: 1.3,
            }}>
              {medley.name}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{
              fontSize: 10, background: "#1a1028",
              color: "#8338ec", borderRadius: 4, padding: "2px 8px",
              fontFamily: "sans-serif", fontWeight: 600, border: "1px solid #8338ec33",
            }}>
              {medley.songs.length} {medley.songs.length === 1 ? "música" : "músicas"}
            </span>
            {isPT && (
              <span style={{
                fontSize: 9, background: "#0a3a1a",
                color: "#06d6a0", borderRadius: 4, padding: "2px 6px",
                fontFamily: "sans-serif", fontWeight: 600,
              }}>PT</span>
            )}
          </div>
        </div>
      </div>

      {/* Lista de músicas do medley */}
      <div style={{
        background: "#111",
        borderRadius: 10,
        padding: "10px 12px",
        border: "1px solid #252525",
        display: "flex",
        flexDirection: "column",
        gap: 7,
      }}>
        {medley.songs.map((song, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              color: "#8338ec", fontSize: 10, fontFamily: "monospace",
              minWidth: 18, fontWeight: 700,
            }}>
              {i + 1}.
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: 13, color: "#ddd", fontWeight: 600 }}>{song.title}</span>
              <span style={{ fontSize: 11, color: "#555", marginLeft: 6 }}>{song.artist}</span>
            </div>
            {song.pt && (
              <span style={{
                fontSize: 8, background: "#0a3a1a",
                color: "#06d6a0", borderRadius: 3, padding: "1px 4px",
                fontFamily: "sans-serif", fontWeight: 600, flexShrink: 0,
              }}>PT</span>
            )}
          </div>
        ))}
      </div>

      {/* Rating buttons */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["❤️", "✓", "✗"].map(r => (
          <button key={r}
            onClick={() => setRating(rating === r ? "" : r)}
            style={{
              border: rating === r ? `2px solid ${ratingColor[r]}` : "1.5px solid #333",
              background: rating === r ? ratingColor[r] + "22" : "transparent",
              color: rating === r ? ratingColor[r] : "#555",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: r === "❤️" ? 16 : 14,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.15s",
              minHeight: 36,
              minWidth: 44,
            }}>
            {r}
          </button>
        ))}

        <button
          onClick={() => setFirstDance(f => !f)}
          style={{
            border: firstDance ? "2px solid #ffd60a" : "1.5px solid #333",
            background: firstDance ? "#ffd60a22" : "transparent",
            color: firstDance ? "#ffd60a" : "#555",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 15,
            cursor: "pointer",
            transition: "all 0.15s",
            minHeight: 36,
          }}>
          💍
        </button>
      </div>

      {/* Notes */}
      <input
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="notas sobre o medley..."
        style={{
          width: "100%",
          background: "transparent",
          color: "#aaa",
          border: "1.5px solid #2a2a2a",
          borderRadius: 8,
          padding: "6px 10px",
          fontSize: 12,
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function MedleyList({ medleys }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {medleys.map((medley, i) => (
        <MedleyCard key={medley.name} medley={medley} index={i} />
      ))}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("acoustic");
  const [medleyTab, setMedleyTab] = useState("acoustic");
  const [showGuide, setShowGuide] = useState(false);

  const tabs = [
    { id: "acoustic", label: "🎻 Acústico", count: ACOUSTIC.length },
    { id: "band", label: "🎸 Banda", count: BAND.length },
    { id: "medleys", label: "🎭 Medleys", count: ACOUSTIC_MEDLEYS.length + BAND_MEDLEYS.length },
  ];

  const sectionLabel = {
    acoustic: "Cocktail · Primeiras danças · Momentos íntimos",
    band: "Jantar · Festa · Pista de dança",
    medleys: "Blocos temáticos — votar no conjunto",
  };

  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      background: "#0d0d0d",
      minHeight: "100vh",
      color: "#fff",
      paddingBottom: 80,
    }}>
      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 50%, #0d0d0d 100%)",
        borderBottom: "1px solid #222",
        padding: "24px 20px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, left: -40,
          width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, #ff006e22 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: -30, right: -50,
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, #8338ec22 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative" }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(90deg, #ff006e, #8338ec, #3a86ff, #06d6a0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: 38,
            fontWeight: 900,
            letterSpacing: -1,
            lineHeight: 1,
            fontFamily: "'Georgia', serif",
          }}>
            HITSTER!
          </div>
          <div style={{ fontSize: 13, color: "#888", marginTop: 4, letterSpacing: 2, textTransform: "uppercase" }}>
            Wedding Edition
          </div>
          <div style={{
            fontSize: 15, marginTop: 6, color: "#ccc",
            fontStyle: "italic", fontFamily: "'Georgia', serif",
          }}>
            Cláudia & João · 24 Julho 2026
          </div>

          <button
            onClick={() => setShowGuide(g => !g)}
            style={{
              marginTop: 14,
              background: "transparent",
              border: "1.5px solid #333",
              color: "#888",
              borderRadius: 20,
              padding: "6px 16px",
              fontSize: 12,
              cursor: "pointer",
              letterSpacing: 0.5,
            }}>
            {showGuide ? "▲ esconder guia" : "📋 como funciona"}
          </button>
        </div>
      </div>

      {/* ── Guide ── */}
      {showGuide && (
        <div style={{
          background: "#111",
          borderBottom: "1px solid #222",
          padding: "20px",
        }}>
          <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "📱", title: "1. Scaneiam o QR Code", text: "O código abre o Spotify directamente. Ouçam os primeiros 60–90 segundos." },
              { icon: "🎵", title: "2. Revelam a Música", text: "Toquem no bloco colorido para descobrir o nome — só depois de ouvir!" },
              { icon: "🗳️", title: "3. Votam de forma independente", text: "❤️ Quero no casamento · ✓ Pode entrar · ✗ Não é para nós · 💍 Candidata à 1.ª Dança" },
              { icon: "🎭", title: "4. Medleys", text: "Votem no bloco todo — ouçam a 1.ª música pelo QR e imaginam o mix completo." },
              { icon: "🎂", title: "Momento especial", text: "Pensem na entrada na escadaria de Vandelli — algo grandioso que provoque reacção nos convidados." },
            ].map(({ icon, title, text }) => (
              <div key={title} style={{
                display: "flex", gap: 12,
                background: "#181818", borderRadius: 10, padding: "12px 14px",
                border: "1px solid #252525",
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{title}</div>
                  <div style={{ fontSize: 12, color: "#777", lineHeight: 1.5 }}>{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tabs principais ── */}
      <div style={{
        display: "flex",
        background: "#111",
        borderBottom: "1px solid #222",
        padding: "0 8px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        {tabs.map(t => (
          <button key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              borderBottom: tab === t.id ? "3px solid" : "3px solid transparent",
              borderImageSource: tab === t.id ? "linear-gradient(90deg, #ff006e, #8338ec)" : "none",
              borderImageSlice: 1,
              color: tab === t.id ? "#fff" : "#555",
              padding: "13px 4px",
              fontSize: 12,
              fontWeight: tab === t.id ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}>
            {t.label}
            <span style={{
              marginLeft: 5, fontSize: 10,
              background: tab === t.id ? "#ffffff15" : "#ffffff08",
              borderRadius: 10, padding: "2px 6px",
              color: tab === t.id ? "#aaa" : "#444",
            }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* ── Sub-tabs de Medleys ── */}
      {tab === "medleys" && (
        <div style={{
          display: "flex",
          background: "#0f0f0f",
          borderBottom: "1px solid #1a1a1a",
          padding: "0 16px",
        }}>
          {[
            { id: "acoustic", label: "🎻 Acústico", count: ACOUSTIC_MEDLEYS.length },
            { id: "band", label: "🎸 Banda", count: BAND_MEDLEYS.length },
          ].map(st => (
            <button key={st.id}
              onClick={() => setMedleyTab(st.id)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                borderBottom: medleyTab === st.id ? "2px solid #8338ec" : "2px solid transparent",
                color: medleyTab === st.id ? "#ccc" : "#444",
                padding: "10px 8px",
                fontSize: 12,
                fontWeight: medleyTab === st.id ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.2s",
              }}>
              {st.label}
              <span style={{
                marginLeft: 5, fontSize: 10,
                background: medleyTab === st.id ? "#8338ec22" : "#ffffff08",
                borderRadius: 10, padding: "1px 6px",
                color: medleyTab === st.id ? "#8338ec" : "#333",
              }}>{st.count}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Section header ── */}
      <div style={{ padding: "14px 16px 8px" }}>
        <div style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: 2 }}>
          {sectionLabel[tab]}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "0 16px" }}>
        {tab === "acoustic" && <SongList songs={ACOUSTIC} />}
        {tab === "band" && <SongList songs={BAND} />}
        {tab === "medleys" && medleyTab === "acoustic" && <MedleyList medleys={ACOUSTIC_MEDLEYS} />}
        {tab === "medleys" && medleyTab === "band" && <MedleyList medleys={BAND_MEDLEYS} />}
      </div>

      {/* ── Footer legend ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#0d0d0d",
        borderTop: "1px solid #1e1e1e",
        padding: "10px 16px",
        display: "flex", justifyContent: "center", gap: 16,
        fontSize: 11, color: "#555",
      }}>
        <span>❤️ quero</span>
        <span>✓ pode</span>
        <span>✗ não</span>
        <span>💍 1.ª dança</span>
        <span style={{ background: "#0a3a1a", padding: "1px 5px", borderRadius: 3, color: "#06d6a0" }}>PT</span>
      </div>
    </div>
  );
}
