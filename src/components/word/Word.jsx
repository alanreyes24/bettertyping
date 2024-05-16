import React, { useState, useEffect, createElement } from "react";

function Word() {

    let common_words = [
        "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
        "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
        "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
        "an", "will", "my", "one", "all", "would", "there", "their", "what", "so",
        "up", "out", "if", "about", "who", "get", "which", "go", "me", "when",
        "make", "can", "like", "time", "no", "just", "him", "know", "take", "people",
        "into", "year", "your", "good", "some", "could", "them", "see", "other", "than",
        "then", "now", "look", "only", "come", "its", "over", "think", "also", "back",
        "after", "use", "two", "how", "our", "work", "first", "well", "way", "even",
        "new", "want", "because", "any", "these", "give", "day", "most", "us", "is",
        "are", "was", "were", "has", "been", "being", "had", "do", "does", "did",
        "here", "than", "much", "such", "very", "should", "those", "own", "don't", "can't",
        "cannot", "aren't", "isn't", "wasn't", "weren't", "hasn't", "haven't", "doesn't", "didn't", "won't",
        "wouldn't", "shan't", "shouldn't", "ought", "hadn't", "couldn't",
        "will", "shall", "would", "should", "must", "might", "may", "ought", "need",
        "dare", "used", "going", "going", "goes", "gone", "come", "comes", "coming", "try",
        "tries", "trying", "tried", "think", "thinks", "thinking", "thought", "make", "makes", "making",
        "made", "see", "sees", "seeing", "saw", "put", "puts", "putting", "say", "says",
        "saying", "said", "tell", "tells", "telling", "told", "ask", "asks", "asking", "asked",
        "work", "works", "working", "worked", "seem", "seems", "seeming", "seemed", "feel", "feels",
        "feeling", "felt", "look", "looks", "looking", "looked", "appear", "appears", "appearing", "appeared",
        "become", "becomes", "remaining", "remained", "turn", "turns",
        "turning", "turned", "grow", "grows", "growing", "grew", "prove", "proves", "proving", "proved",
        "keep", "keeps", "keeping", "kept", "let", "lets", "letting", "allowed", "let", "hear",
        "hears", "hearing", "heard", "need", "needs", "needing", "needed", "mean", "means", "meaning",
        "meant", "understand", "understands", "understanding", "understood", "begin", "begins", "beginning", "began",
        "end", "ends", "ending", "ended", "bring", "brings", "bringing", "brought", "set", "sets",
        "setting", "sets", "put", "puts", "putting", "begin", "begins", "beginning", "began", "begun",
        "like", "likes", "liking", "liked", "love", "loves", "loving", "loved", "hate", "hates",
        "hating", "hated", "may", "might", "must", "will", "would", "shall",
        "should", "ought", "dare", "need", "use", "used", "using", "put", "puts", "putting",
        "choose", "chooses", "choosing", "chose", "chosen", "feel", "feels", "feeling", "felt", "believe",
        "believes", "believing", "believed", "know", "knows", "knowing", "knew", "known", "try", "tries",
        "trying", "tried", "appear", "appears", "appearing", "appeared", "remain", "remains", "remaining", "remained",
        "seem", "seems", "seeming", "seemed", "sound", "sounds", "sounding", "sounded", "look", "looks",
        "looking", "looked", "smell", "smells", "smelling", "smelled", "taste", "tastes", "tasting", "tasted",
        "feel", "feels", "feeling", "felt", "grow", "grows", "growing", "grew", "grown", "fall",
        "falls", "falling", "fell", "fallen", "turn", "turns", "turning", "turned", "run", "runs",
        "running", "ran", "run", "leave", "leaves", "leaving", "left", "leave", "put", "puts",
        "putting", "let", "lets", "letting", "hear", "hears", "hearing", "heard", "get", "gets",
        "getting", "got", "gotten", "keep", "keeps", "keeping", "kept", "come", "comes", "coming",
        "came", "come", "become", "becomes", "becoming", "became", "become", "set", "sets", "setting",
        "setting", "begin", "begins", "beginning", "began", "begun", "like", "likes", "liking", "liked",
        "love", "loves", "loving", "loved", "hate", "hates", "hating", "hated"
    ];
    
    
    const [randomWord, setRandomWord] = useState('');

    useEffect(() => {
        
        let randomIndex = Math.floor(Math.random() * common_words.length);
        let randomWordFromArray = common_words[randomIndex]
        setRandomWord(randomWordFromArray)

    }, []);

    let map = randomWord.split('').map((item, index) => createElement("div", { key: index, className: "letter" }, item));
    map.push(createElement("div", { key: 'space', className: "letter space" }, " "));

    return map;
}

export default Word;
