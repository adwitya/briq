import React, {useRef} from 'react'
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const BRIQChart = () => {
    const options: Highcharts.Options = {
        chart: {
            height:240
        },
        title: {
            text: 'My chart'
        },
        series: [{
            type: 'bar',
            data: [1, 2, 3]
        }]
    }
    
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return (
        <HighchartsReact
            highcharts={Highcharts} 
            options={options}
            ref={chartComponentRef}
        />
    )
}

