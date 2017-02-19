
# <img src="/misc/logo.png">

[![Build Status](https://travis-ci.org/amattson21/summary-bot.png)](https://travis-ci.org/amattson21/summary-bot)
[![Version](http://img.shields.io/npm/v/summary-bot.svg)]()
___________

## Description

Summary Bot is a quick, light weight and extremely simple to use article summary package.

## Install

```bash
npm install --save summary-bot
```

## Use

import it into the file
```javascript
// ES6
import SummaryBot from 'summary-bot';
```
feed it an article (as a string) and the number of sentences you would like the summary to be
```javascript
SummaryBot(article, 5)
```
it will out put a summary object
```javascript
{
  text: // summary as a string
  percentReduction: // percent of the original article used in the summary
  bestSentences: // this will be an array of the top sentences with metadata as to where they appeared in the article
  originalLength: // word count of article
  summaryLength: // word count of summary
  sentenceCount: // returns sentence count for verification
};
```
