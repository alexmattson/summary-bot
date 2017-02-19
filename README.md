
# [![logo.png](https://s16.postimg.org/s4n7serhh/logo.png)](https://github.com/amattson21/summary-bot)

[![Build Status](https://travis-ci.org/amattson21/summary-bot.png)](https://travis-ci.org/amattson21/summary-bot)
[![Version](http://img.shields.io/npm/v/summary-bot.svg)]()
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)]()

___________

## Description

Summary Bot is a quick, light weight and extremely simple to use article summary package.

## Install

```bash
npm install --save summary-bot
```

## Use

Three easy steps will get you up and running:

1) Import it into the file
```javascript
// ES6
import SummaryBot from 'summary-bot';
```
2) feed it an article [string] and the number of sentences you would like for the summary
```javascript
SummaryBot(article, 5)
```

3) receive a summary object


| Key        | Type           | Description  |
| ------------- |:-------------| :-----|
| text     | string | summary as a string |
| percentReduction   | integer      |   percent of the original article removed from the summary |
| bestSentences | array     |    this will be an array of the top sentences with metadata as to where they appeared in the article |
| originalLength | integer      |    word count of article |
| summaryLength | integer     |    word count of summary |
| sentenceCount | integer     |    returns sentence count for verification |

---
Developed by [Alex Mattson](http://www.alexmattson.com)
