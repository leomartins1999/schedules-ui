export const METRIC_FIELD_TO_LABEL = {
    pct_overflowing_lectures: '% Overflowing lectures',
    pct_overqualified_rooms_for_lectures: '% Overqualified rooms for lectures',
    nr_used_rooms: 'Nr used rooms'
}

export const DEFAULT_METRIC = Object.keys(METRIC_FIELD_TO_LABEL)[0]

export const PIVOTED_METRIC_FIELD_TO_LABEL = {
    ...METRIC_FIELD_TO_LABEL,
    nr_lectures: 'Nr lectures'
}

export const PIVOT_TYPE_TO_LABEL = [
    { type: 'weekday', label: 'Weekday' },
    { type: 'week', label: 'Week' }
]

export const DEFAULT_PIVOT_TYPE = PIVOT_TYPE_TO_LABEL[0].type
