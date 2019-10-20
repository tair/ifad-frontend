export type Aspect = 'MF' | 'BP' | 'CC';
export type AnnotationCategory = 'EXP' | 'Other' | 'Unknown' | 'Unannotated'
export type FilterMode = 'union' | 'intersection';

export interface IPieChartFilter {
    aspect: Aspect,
    category: AnnotationCategory
}

export interface IPieChartSlice {
    name: AnnotationCategory,
    value: number
}

export type IPieChartData = {
    [key in Aspect]: IPieChartSlice[]
}

export const withPieChartData = (filters: IPieChartFilter[] = [], mode: FilterMode = 'union'): IPieChartData => { 
    return {
        'BP': [
            {name: 'EXP', value: 0.2},
            {name: 'Other', value: 0.3},
            {name: 'Unknown', value: 0.2},
            {name: 'Unannotated', value: 0.3}
        ],
        'CC': [
            {name: 'EXP', value: 0.2},
            {name: 'Other', value: 0.3},
            {name: 'Unknown', value: 0.2},
            {name: 'Unannotated', value: 0.3}
        ],
        'MF': [
            {name: 'EXP', value: 0.2},
            {name: 'Other', value: 0.3},
            {name: 'Unknown', value: 0.2},
            {name: 'Unannotated', value: 0.3}
        ]
    };
}
