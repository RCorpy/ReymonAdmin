import React, {useState} from "react";
import Card from "./contentComponents/Card"
import {Line, Bar, Bubble, Doughnut, Pie} from 'react-chartjs-2'

export default function Charts({title}) {

    const chartPieData= {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    }

    const chartDoughnutData = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    }

    const chartBubbleData= {
        labels: ['January'],
        datasets: [
          {
            label: 'Bubble',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
                {x:10,y:20,r:5},
                {x:5,y:15,r:5},
                {x:7,y:7,r:5},
                {x:9,y:16,r:5},
                {x:11,y:8,r:5},
                {x:13,y:9,r:5},
                {x:15,y:13,r:5},
                {x:17,y:16,r:5},
                {x:19,y:12,r:5},
                {x:3,y:11,r:5},
                {x:1,y:5,r:5},
                {x:14,y:14,r:5},
                {x:8,y:20,r:5},
            ]
          }
        ]
      }
    const [chartDataLine, setChartDataLine] = useState({
        labels:["a", "b", "c","d", "e","f"], 
        datasets:[
            {
                label:"things1", 
                backgroundColor: "rgba(0,255,0,0.5)", 
                data:[3,5,2,5,5,5]
            },
            {
                label:"things2", 
                backgroundColor: "rgba(0,255,0,0.5)", 
                data:[4,6,3,4,4,4]
            }
        ]
    })

    const [chartDataBar, setChartDataBar] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'stuff',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      })

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">{title}</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Card title="Big card">
                <div class="position-relative mb-4" style={{ position: "relative", width: "auto", height: 300}}>
                        <Line options={{responsive: true, maintainAspectRatio: false,}} data={chartDataLine}/>
                </div>
              </Card>
            </div>
            <div className="col-lg-6">
              <Card 
                title="Online Store Visitors" 
                headerButtons={[{text: "View MA report"}, {icon:"fas fa-download", href: "##"}, {icon:"fas fa-bars"}]}
                >
                  <Bar data={chartDataBar} />
              </Card>
              {/* /.card */}
              <Card 
                title="Products" 
                headerButtons={[{icon:"fas fa-download", href: "##"}, {icon:"fas fa-bars"}]}
                >
                    <Bubble data={chartBubbleData} />
              </Card>
              {/* /.card */}
            </div>
            {/* /.col-md-6 */}
            <div className="col-lg-6">
              <Card 
                title="Sales" 
                headerButtons={[{text:"View Report"}]}
                >
                    <Doughnut data={chartDoughnutData} />
              </Card>
              {/* /.card */}
              <Card 
                title="Online Store Overview" 
                headerButtons={[{icon:"fas fa-download", href: "##"}, {icon:"fas fa-bars"}]}
                >
                    <Pie data={chartPieData} />
              </Card>
            </div>
            {/* /.col-md-6 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content */}
    </div>
  );
}
