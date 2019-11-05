import React from "react";

export type Aspect = 'M' | 'B' | 'C';
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
    const [data, setData] = React.useState<IPieChartData>({B:[],C:[],M:[]});
    
    React.useEffect(() => {
        (async () => {
            const result = await fetch(`http://localhost:3000/wgs_segments`);
            const jsonified = await result.json();
            setData(jsonified);
        })();
    }, []);

    return data;
}
