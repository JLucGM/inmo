import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const MyChart = ({ propertyCounts, label }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'line', // Tipo de gráfico
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'], // Meses del año
                datasets: [{
                    label: label,
                    data: propertyCounts, // Usar los conteos de propiedades
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            myChart.destroy(); // Limpiar el gráfico al desmontar el componente
        };
    }, [propertyCounts]); // Asegúrate de que se vuelva a renderizar si propertyCounts cambian

    return (
        <div>
            <canvas ref={chartRef} width="auto" height="100%"></canvas>
        </div>
    );
};

export default MyChart;