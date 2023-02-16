import Chart from 'react-apexcharts';


const CustomChart = ({
    categories,
    color,
    height,
    horizontal,
    series,
}) => {

    const colors = {
        gray: "#283038",
        orange: "#FF8000",
        green: "#10E75F",
        blue: "#40BCF4"
    }

    return (
        <Chart
            type='bar'
            height={height}
            options={{
                chart: {
                    type: 'bar',
                    height: height,
                    foreColor: "#f3f5f7"
                },
                xaxis: {
                    categories: categories,
                    labels: {
                        
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    colors: [colors[color]]
                },
                plotOptions: {
                    bar: {
                        horizontal: horizontal
                    }
                }
            }}
            series={series}
        />
    )
}

export default CustomChart;