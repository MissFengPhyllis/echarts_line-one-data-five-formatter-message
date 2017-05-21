function analysis(data) {
    var end_obj = [];
    for (var i in data) {
        var obj = {name: '', datas: []};
        obj.name = data[i].tablespace_name;
        obj.value = data[i]['used_rate'];
        obj.datas[0] = data[i]['free_space'];
        obj.datas[1] = data[i]['sum_blocks'];
        obj.datas[2] = data[i]['sum_space'];
        obj.datas[3] = data[i]['used_space'];
        end_obj.push(obj);
    }
    return end_obj;

}

$(document).ready(function () {
	//左边的表空间echart..
    var leftEchart = function () {
        var db_chart = echarts.init(document.getElementById('db_chart'));
        var option = {
        	 title: {
                text: '数据图'
            },
                tooltip: {
                   trigger: 'xAxis',
                    axisPointer: {
                        type: 'shadow'
                    },
                 formatter: function(a,b){
                        return ('tablespace_name:'+a['name']
                               +'</br>used_rate(%):'+a['value']
                               +'<br>free_space:'+a['data'].datas[0]
                               +'<br>sum_blocks:'+a['data'].datas[1]
                               +'<br>sum_space:'+a['data'].datas[2]
                               +'<br>used_space:'+a['data'].datas[3]);
                              }
                },
                grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
                },
                xAxis: {
                    type: 'value',
                    data: [],
                    boundaryGap: [0, 0]
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                series: [
                    {
                        name:'',
                        type:'bar',
                        data:[],
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    // build a color map as your need.
                                   var colorList = ['#B5C334','#C1232B'];
                                 
                                    if(params.value <= 50){
                                       return colorList[0];

                                    }else{
                                        return colorList[1];
                                    }
                                   
                                }
                            }
                        }
                    }
                ]
            };
        $.getJSON("index.json").done(function(res){
          var data = res.data;
              var name = [];
              for(i in data){
                name.push(data[i].tablespace_name);
              }
          option.series[0].data = analysis(res.data);
          option.yAxis.data = name;
          db_chart.setOption(option);
        });

    };
    leftEchart();
})