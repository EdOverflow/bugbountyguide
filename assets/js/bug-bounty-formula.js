(function() {
    document.getElementById("button").addEventListener("click", function() {
        var b_max = document.getElementById("b_max").value;
        var C = document.getElementById("C").value;
        var n = document.getElementById("n").value;

        var result = document.createElement("div");

        // Set limits for the variables.
        if (C > 10 || C < 0) {
            result.innerText = "Error: You appear to have found an (Ed)Overflow. C must be an integer between 0 and 10.";
            appendResult(result);
        } else if (C == 0) {
            result.innerText = "Result: Bounty pls ❤";
            appendResult(result);
        } else if (n < 1 || n > 3) {
        	result.innerText = "Error: You appear to have found an (Ed)Overflow. n must range from 1.0 to 3.0.";
            appendResult(result);
        } else {
        	var res = formula(b_max, C, n);
        	if (n == 1) {
            	result.innerText = "Bounty amount: $" + Math.floor(res) + ". n = 1 is usually recommended for mature projects that can afford linear growth in the bounty amount rather than exponential growth.";
            	appendResult(result);
        	} else {
        		result.innerText = "Bounty amount: $" + Math.floor(res);
            	appendResult(result);
        	}
        }
    }); //

    function formula(b_max, CVSS, n) {
        // This is the bounty formula.
        var C_max = 10;
        var N = b_max / Math.pow(C_max, n);
        b = N * Math.pow(CVSS, n);
        return b;
    }

    function appendResult(result) {
        document.getElementById("result").outerHTML = '<p id="result"></p>';
        document.getElementById("result").appendChild(result);
    }

    function getAllResults() {
        var b_max = document.getElementById("b_max").value;
        var n = document.getElementById("n").value;

        // The CVSS scores we want to calculate the bounty for.
        var scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        // A place to store the results.
        var bounties = [];

        for (i = 0; i < scores.length; i++) {
            var score = scores[i];
            var b = formula(b_max, score, n);
            bounties[i] = b;
        }

        Plotly.newPlot(
            document.getElementById('graph'), [{
                x: scores,
                y: bounties
            }], {
                margin: {
                    t: 0
                }
            }
        );

	    // Table data.
        var columnHeaders = ['CVSS Score', 'Bounty Amount'];
        var columns = [scores, bounties];
        
        // Insert the headings.
        bountyTable.innerHTML = "";
        var row = bountyTable.insertRow(0);
        for (var i = 0; i < columnHeaders.length; i++) {
            var headerCell = document.createElement("th");
            headerCell.innerText = columnHeaders[i];
            row.appendChild(headerCell);
        }

        // Insert the values.
        for (var i = 1; i < scores.length; i++) {
            var row = bountyTable.insertRow(i);

            for (var j = 0; j < columns.length; j++){
                row.insertCell(j).innerText = columns[j][i];
            }
        }
    }

    getAllResults();

    document.getElementById("b_max").addEventListener("change", getAllResults);
    document.getElementById("n").addEventListener("change", getAllResults);
})();