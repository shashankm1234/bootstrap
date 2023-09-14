google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(ics_bargraph);
google.charts.setOnLoadCallback(ics_piechart);
google.charts.setOnLoadCallback(ics_scatterchart);

function ics_bargraph() {
    var data = google.visualization.arrayToDataTable([
        ["Element", "Density", { role: "style" }],
        ["Copper", 8.94, "#b87333"],
        ["Silver", 10.49, "silver"],
        ["Gold", 19.30, "gold"],
        ["Platinum", 21.45, "color: #e5e4e2"]
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        },
        2]);

    var options = {
        title: "Density of Precious Metals, in g/cm^3",
        width: 300,
        height: 200,
        bar: { groupWidth: "55%" },
        legend: { position: "none" },
    };
    var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
    chart.draw(view, options);
}

function ics_piechart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
    ]);

    var options = {
        title: 'My Daily Activities'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

function ics_scatterchart() {
    var data = new google.visualization.DataTable();
    data.addColumn('number');
    data.addColumn('number');

    var radius = 100;
    for (var i = 0; i < 6.28; i += 0.1) {
        data.addRow([radius * Math.cos(i), radius * Math.sin(i)]);
    }

    // Our central point, which will jiggle.
    data.addRow([0, 0]);

    var options = {
        legend: 'none',
        colors: ['#087037'],
        pointShape: 'star',
        pointSize: 18,
        animation: {
            duration: 200,
            easing: 'inAndOut',
        }
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('animatedshapes_div'));

    // Start the animation by listening to the first 'ready' event.
    google.visualization.events.addOneTimeListener(chart, 'ready', randomWalk);

    // Control all other animations by listening to the 'animationfinish' event.
    google.visualization.events.addListener(chart, 'animationfinish', randomWalk);

    chart.draw(data, options);

    function randomWalk() {
        var x = data.getValue(data.getNumberOfRows() - 1, 0);
        var y = data.getValue(data.getNumberOfRows() - 1, 1);
        x += 5 * (Math.random() - 0.5);
        y += 5 * (Math.random() - 0.5);
        if (x * x + y * y > radius * radius) {
            // Out of bounds. Bump toward center.
            x += Math.random() * ((x < 0) ? 5 : -5);
            y += Math.random() * ((y < 0) ? 5 : -5);
        }
        data.setValue(data.getNumberOfRows() - 1, 0, x);
        data.setValue(data.getNumberOfRows() - 1, 1, y);
        chart.draw(data, options);
    }
}
