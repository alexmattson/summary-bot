// import { should } from 'should';
import SummaryBot from '../lib/summary-bot';
import article from '../utils/article';
import { expect } from 'chai';
import { words } from 'lodash';

describe('summarize-bot', function() {
  let sentenceCount = Math.round(Math.random()*9) + 1;
	let summary = SummaryBot(article, sentenceCount);

	it('should return a summary', function(done) {
    expect(summary.text).to.be.a('string');
    done();
	});

	it('should summarize content', function(done) {
    let originaLength = words(article).length;
		expect(summary.wordCount).to.not.equal(originaLength);
    expect(summary.sentenceCount).to.equal(sentenceCount);
    done();
	});
});
