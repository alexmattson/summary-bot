import {split, Syntax} from 'sentence-splitter';
import { words, reduce } from 'lodash';
import { singular } from 'pluralize';

function getWordCount(allWords) {
  let dict = {};
  allWords.forEach(word => {
    let singularWord = singular(word);
    if (dict[singularWord]) {
      dict[singularWord] += 1;
    } else {
      dict[singularWord] = 1;
    }
  });
  return dict;
}

function splitContentToSentences(content) {
  let sentences = split(content);
  return sentences;
}

function getSentencesScores(sentences, dict) {
  sentences.map(sentence => {
    let score = reduce(words(sentence.raw), (sum, word) => {
      return sum + dict[singular(word)];
    }, 0);
    sentence['score'] = score;
    return sentence;
  });
  return sentences;
}

function findTopRanked(sentences, n) {
  let best = [];
  sentences.forEach(sentence => {
    if (sentence.type !== 'Sentence') { return; }
    if (best.length < n) {
      // if there aren't enough start here
      // if there are none push and return
      if (best.length === 0) {return best.push(sentence);}
      // search through to see if it is higher than any and place it in there
      let placed = false;
      for (let i = 0; i < best.length; i++) {
        if (sentence.score > best[i].score) {
          best.splice(i, 0, sentence);
          i = best.length;
          placed = true;
        }
      }
      // if not place at end
      if (!placed) {best.push(sentence);}

    } else if (best[n - 1].score < sentence.score) {
      best.pop();
      for (let i = 0; i < best.length; i++) {
        if (sentence.score > best[i].score) {
          best.splice(i, 0, sentence);
          i = best.length;
        }
      }
    }
  });
  return best;
}

function buildSummary(rankedSentances, wordCount, summarySentanceCount) {
  let summary = "";
  rankedSentances.forEach(sentence => {
    summary += sentence['raw'];
  });
  let finalCount = words(summary).length;
  return {
    text: summary,
    percentReduction: (100 - Math.floor((finalCount / wordCount) * 100)) + '%',
    bestSentences: rankedSentances,
    originalLength: wordCount,
    summaryLength: finalCount,
    sentenceCount: split(summary).length
  };
}

export default function analyze(content, summarySentanceCount) {
  let sentences = splitContentToSentences(content),
      allWords  = words(content),
      dict      = getWordCount(allWords),
      wordCount = allWords.length;

  if (sentences.length < summarySentanceCount) {
    throw 'The content is too short to summarize';
  }

  let scoredSentances = getSentencesScores(sentences, dict),
      rankedSentances = findTopRanked(scoredSentances, summarySentanceCount);

  return buildSummary(rankedSentances, wordCount, summarySentanceCount);
}
