import { Component } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedback = option =>
    this.setState(prevState => {
      return {
        [option]: prevState[option] + 1,
      };
    });

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const totalFeedback = this.countTotalFeedback();
    return totalFeedback ? Math.round((good / totalFeedback) * 100) : 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const totalFeedback = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
        <div style={{ padding: '0 20px' }}>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={['good', 'neutral', 'bad']}
              onLeaveFeedback={this.handleFeedback}
            />
          </Section>

          <Section title="Statistics">
            {totalFeedback ? (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={totalFeedback}
                positivePercentage={positivePercentage}
              />
            ) : (
              <Notification message="There is no feedback yet." />
            )}
          </Section>
        </div>
    );
  }
}
