var links = [
    {
        link: "http://www.pmichaud.com/toast/",
        id: "strawberry"
    },
    {
        link: "http://hyperphysics.phy-astr.gsu.edu/hbase/electric/gaulaw.html",
        id: "gauss"
    },
    {
        link: "http://enricoshaircuttingformen.com/",
        id: "enricos"
    },
    {
        link: "http://classics.mit.edu/Aristotle/physics.1.i.html",
        id: "aristotle"
    }
]

function loadHTML(website) {
    website = getID(website);
    console.log(website);
    $.get("/origin/" + website + "/" + website + ".htm", function (html) {
        var site = $.parseHTML(updateHTML(html, website));
        for (var i = 0; i < site.length; i++) {
            returnNodes(site[i], i);
        }
    });
}

function getID(website) {
    for (var i = 0; i < links.length; i++) {
        if (links[i].link == website) {
            return links[i].id;
        }
    }
}

function updateHTML(html, website) {
    var newHTML = html
        //Replace image origins
        .split("./" + website + "_files").join("/origin/" + website + "/" + website + "_files")
        //Replace outdated <center> tags
        .replace(/<center>/gi, '<div class="centered">')
        .split('</center>').join('</div>')
        //Replace outdated <font> tags
        .replace(/<font/gi, '<p')
        .split('</font>').join('</p>')
    ;
    return newHTML;
}

function returnNodes(arr, i) {
    if (arr.hasChildNodes && arr.hasChildNodes > 0) {
        returnNodes(arr.childNodes);
    } else {
        console.log(arr);
        $(arr).appendTo("body").hide().delay(100 * i).fadeIn(2000);
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}
