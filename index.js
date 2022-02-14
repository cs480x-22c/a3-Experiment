const createCsvWriter = require('csv-writer').createObjectCsvWriter;
export default csvWriter = createCsvWriter({
    path: './results.csv',
    header: [
        { id: 'participant_num', title: 'participantNum' },
        { id: 'chart_num', title: 'chartNum' },
        { id: 'correct_answer', title: 'correctAnswer' },
        { id: 'observed_value', title: 'observed_value' },
        { id: 'error_rate', title: 'errorRate' }
    ]
});

