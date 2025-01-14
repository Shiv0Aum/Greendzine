import React, { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    ArcElement,
    DoughnutController,
    LineController,
    Tooltip,
    Legend,
} from 'chart.js';

// Register components for Chart.js
ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    ArcElement,
    DoughnutController,
    LineController,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const inventoryChartRef = useRef(null);
    const batteryChartRef = useRef(null);
    const marginChartRef = useRef(null);

    useEffect(() => {
        // Inventory Line Chart
        const inventoryData = {
            labels: ['12th Oct', '13th Oct', '14th Oct', '15th Oct', '16th Oct', '17th Oct'],
            datasets: [
                {
                    label: 'Inventory',
                    data: [80, 85, 93, 88, 90, 93],
                    borderColor: '#FFFFFF',
                    tension: 0.4,
                },
                {
                    label: 'Orders',
                    data: [50, 60, 65, 70, 68, 65],
                    borderColor: '#FFFF00',
                    tension: 0.4,
                },
            ],
        };

        if (inventoryChartRef.current) {
            inventoryChartRef.current.destroy();
        }
        inventoryChartRef.current = new ChartJS(document.getElementById('inventoryChart'), {
            type: 'line',
            data: inventoryData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#FFFFFF', // Set text color to white
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#FFFFFF', // Set x-axis labels color to white
                        },
                    },
                    y: {
                        ticks: {
                            color: '#FFFFFF', // Set y-axis labels color to white
                        },
                    },
                },
            },
        });

        // Battery Doughnut Chart
        const batteryData = {
            labels: ['Remaining', 'Consumed'],
            datasets: [
                {
                    data: [65, 35],
                    backgroundColor: ['#1E90FF', '#FFD700'],
                },
            ],
        };

        if (batteryChartRef.current) {
            batteryChartRef.current.destroy();
        }
        batteryChartRef.current = new ChartJS(document.getElementById('batteryChart'), {
            type: 'doughnut',
            data: batteryData,
            options: {
                cutout: '80%',
                plugins: {
                    legend: {
                        labels: {
                            color: '#FFFFFF', // Set text color to white
                        },
                    },
                },
            },
        });

        // Margin Line Chart
        const marginData = {
            labels: ['12th Oct', '13th Oct', '14th Oct', '15th Oct', '16th Oct', '17th Oct'],
            datasets: [
                {
                    label: 'Margin %',
                    data: [25, 50, 80, 60, 90, 75],
                    borderColor: '#ADFF2F',
                    tension: 0.4,
                },
            ],
        };

        if (marginChartRef.current) {
            marginChartRef.current.destroy();
        }
        marginChartRef.current = new ChartJS(document.getElementById('marginChart'), {
            type: 'line',
            data: marginData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#FFFFFF', // Set text color to white
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#FFFFFF', // Set x-axis labels color to white
                        },
                    },
                    y: {
                        ticks: {
                            color: '#FFFFFF', // Set y-axis labels color to white
                        },
                    },
                },
            },
        });

        return () => {
            if (inventoryChartRef.current) inventoryChartRef.current.destroy();
            if (batteryChartRef.current) batteryChartRef.current.destroy();
            if (marginChartRef.current) marginChartRef.current.destroy();
        };
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
            {/* Inventory Chart */}
            <div
                style={{
                    flex: 1,
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '10px',
                    padding: '10px',
                    margin: '0 10px',
                }}
            >
                <h4 style={{ color: 'white' }}>Inventory</h4>
                <canvas id="inventoryChart"></canvas>
            </div>

            {/* Battery Chart */}
            <div
                style={{
                    flex: 1,
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '10px',
                    padding: '10px',
                    margin: '0 10px',
                    textAlign: 'center',
                }}
            >
                <h4 style={{ color: 'white' }}>Battery</h4>
                <canvas id="batteryChart"></canvas>
            </div>

            {/* Margin Chart */}
            <div
                style={{
                    flex: 1,
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '10px',
                    padding: '10px',
                    margin: '0 10px',
                }}
            >
                <h4 style={{ color: 'white' }}>Margin %</h4>
                <canvas id="marginChart"></canvas>
            </div>
        </div>
    );
};

export default Dashboard;




