(function($) {
  'use strict';
  $(function() {
    var dataBar = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      datasets: [{
        label: 'Customers',
        data: [5, 10, 15, 12, 10, 8, 6, 4],
        backgroundColor: [
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
          '#fc381d',
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
        ],
        borderColor: [
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
          '#fc381d',
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
        ],
        borderWidth: 1,
        fill: false
      }]
    };
    var optionsBar = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            display: false,
            
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true,
            display: false,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }]
      },
      legend: {
        display: false
      },
      elements: {
        point: {
          radius: 0
        }
      },
      tooltips: {
        enabled: false
      }
  
    };
    if ($("#customers").length) {
      var barChartCanvas = $("#customers").get(0).getContext("2d");
      // This will get the first returned node in the jQuery collection.
      var ctx = document.getElementById("customers");
      ctx.height = 60;
      var barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: dataBar,
        options: optionsBar
      });
    }
    var dataBarOrder = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      datasets: [{
        label: 'Customers',
        data: [5, 5, 5, 5, 10, 5, 5, 5],
        backgroundColor: [
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
          '#51c81c',
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
        ],
        borderColor: [
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
          '#51c81c',
          '#dee5ef',
          '#dee5ef',
          '#dee5ef',
        ],
        borderWidth: 1,
        fill: false
      }]
    };
    var optionsBarOrder = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            display: false,
            
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true,
            display: false,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }]
      },
      legend: {
        display: false
      },
      elements: {
        point: {
          radius: 0
        }
      },
      tooltips: {
        enabled: false
      }
  
    };
    if ($("#orders").length) {
      var barChartCanvas = $("#orders").get(0).getContext("2d");
      // This will get the first returned node in the jQuery collection.
      var ctx = document.getElementById("orders");
      ctx.height = 60;
      var barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: dataBarOrder,
        options: optionsBarOrder
      });
    }
    var webAudienceMetricsSatackedData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      datasets: [
        {
          label: 'Sessions',
          data: [24000,83123,24000,36000,20000,39000,72000,44000,18000],
          backgroundColor: [
            '#3794fc','#3794fc','#3794fc','#3794fc','#3794fc','#3794fc','#3794fc','#3794fc',
          ],
          borderColor: [
            '#3794fc','#3794fc','#3794fc','#3794fc','#3794fc','#3794fc','#3794fc','#3794fc',
          ],
          borderWidth: 1,
          fill: false
        },
        {
        label: 'New Users',
        data: [35000,3333,58000,32000,15000,37000,41000,32000,22000],
        backgroundColor: [
          '#a037fc',
          '#a037fc',
          '#a037fc',
          '#a037fc',
          '#a037fc',
          '#a037fc',
          '#a037fc',
          '#a037fc',
        ],
        borderColor: [
          '#a037fc',
          '#a037fc',
          '#a037fc',
          '#a037fc',
          '#a037fc',
          '#a037fc',
          '#a037fc',
          '#a037fc',
        ],
        borderWidth: 1,
        fill: false
      },
      {
        label: 'Page Views',
        data: [24000,16869,47000,19000,25000,12000,32000,25000,22000],
        backgroundColor: [
          '#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef',
        ],
        borderColor: [
          '#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef',
        ],
        borderWidth: 1,
        fill: false
      },]
    };
    var webAudienceMetricsSatackedOptions = {
      scales: {
        xAxes: [{
          barPercentage: 0.2,
          stacked: true,
          gridLines: {
            display: true, //this will remove only the label
						drawBorder: false,
						color: "#e5e9f2",
          },
        }],
        yAxes: [{
          stacked: true,
					display: false,
					gridLines: {
            display: false, //this will remove only the label
            drawBorder: false
          },
        }]
      },
      legend: {
        display: false,
        position: "bottom"
      },
      legendCallback: function(chart) {	
				var text = [];
        text.push('<div class="row">');
        for (var i = 0; i < chart.data.datasets.length; i++) {
          text.push('<div class="col-lg-4"><div class="row"><div class="col-sm-12"><h5 class="font-weight-bold text-dark mb-1">' + chart.data.datasets[i].data[1].toLocaleString() + '</h5></div></div><div class="row align-items-center"><div class="col-2"><span class="legend-label" style="background-color:' + chart.data.datasets[i].backgroundColor[i] + '"></span></div><div class="col-9 pl-0"><p class="text-muted m-0 ml-1">' + chart.data.datasets[i].label + '</p></div></div>');
          text.push('</div>');
        }
        text.push('</div>');
        return text.join("");
      },
      elements: {
        point: {
          radius: 0
        }
      } 
    };
    if ($("#web-audience-metrics-satacked").length) {
      var barChartCanvas = $("#web-audience-metrics-satacked").get(0).getContext("2d");
      // This will get the first returned node in the jQuery collection.
      var ctx = document.getElementById("web-audience-metrics-satacked");
      ctx.height = 88;
      var barChart = new Chart(barChartCanvas, {
        type: 'bar',
        height: '200',
        data: webAudienceMetricsSatackedData,
        options: webAudienceMetricsSatackedOptions
      });
      document.getElementById('chart-legends').innerHTML = barChart.generateLegend();
		}
		var marketTrendsSatackedData = {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [
        {
          label: 'Total Income',
          data: [86000,83320,36000,80000,92000,58000,76000],
          backgroundColor: [
            '#51c81c','#51c81c','#51c81c','#51c81c','#51c81c','#51c81c','#51c81c','#51c81c',
          ],
          borderColor: [
            '#51c81c','#51c81c','#51c81c','#51c81c','#51c81c','#51c81c','#51c81c','#51c81c',
          ],
          borderWidth: 1,
          fill: false
        },
      	{
        label: 'Total Expenses',
        data: [59000,32370,84000,65000,53000,87000,60900],
        backgroundColor: [
          '#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef',
        ],
        borderColor: [
          '#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef','#dee5ef',
        ],
        borderWidth: 1,
        fill: false
      },]
    };
    var marketTrendsSatackedOptions = {
      scales: {
        xAxes: [{
          barPercentage: 0.35,
          stacked: true,
          gridLines: {
            display: false, //this will remove only the label
						drawBorder: false,
						color: "#e5e9f2",
          },
        }],
        yAxes: [{
          stacked: true,
					display: false,
					gridLines: {
            display: false, //this will remove only the label
            drawBorder: false
          },
        }]
      },
      legend: {
        display: false,
        position: "bottom"
      },
      legendCallback: function(chart) {	
				var text = [];
        text.push('<div class="row">');
        for (var i = 0; i < chart.data.datasets.length; i++) {
          text.push('<div class="col-6 "><div class="row"><div class="col-sm-12 ml-sm-0 mr-sm-0 pr-md-0"><h5 class="font-weight-bold text-dark">$ ' + chart.data.datasets[i].data[1].toLocaleString() + '</h5></div></div><div class="row align-items-center"><div class="col-12"><p class="text-muted m-0">' + chart.data.datasets[i].label + '</p></div></div>');
          text.push('</div>');
        }
        text.push('</div>');
        return text.join("");
      },
      elements: {
        point: {
          radius: 0
        }
      } 
    };
    if ($("#marketTrendssatacked").length) {
      var barChartCanvas = $("#marketTrendssatacked").get(0).getContext("2d");
      // This will get the first returned node in the jQuery collection.
      var barChart = new Chart(barChartCanvas, {
        type: 'bar',
        data: marketTrendsSatackedData,
        options: marketTrendsSatackedOptions
      });
      document.getElementById('chart-legends-market-trend').innerHTML = barChart.generateLegend();
    }
    $('#over-all-rating').barrating({
      theme: 'fontawesome-stars',
      showSelectedRating: false
    });
  });
})(jQuery);