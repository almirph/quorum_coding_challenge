type AnswerColumns = {
    legislator: string[];
    bill: string[];
}

export const ANSWER_COLUMNS: AnswerColumns = {
    legislator: ['id', 'name', 'num_supported_bills', 'num_opposed_bills'],
    bill: ['id', 'title', 'supporter_count', 'opposer_count', 'primary_sponsor']
}