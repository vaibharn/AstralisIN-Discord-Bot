  (function ($, contToken, sessionID, showAlertDialog) {
  let z,rkey;
  function getKey() {
    z = prompt("Please put in your steam API key (https://steamcommunity.com/dev/apikey) because this script will call the API to resolve username to steamIDs, type 'skip' to try and use my key");
    if (!z && z !== "skip") getKey();
    return z;
  }
  function getMode() {
    rkey = prompt("Enter number of pages of data to collect");
    return rkey;
  }
  
  getKey();
  getMode();
  const API_KEY = z === "skip" ? "29B8C37C8C96DA202CE7ACD07610EA48" : z;
  // -----------
  // Download JS
  function download(data, strFileName, strMimeType) {
    /* eslint-disable */
    var self = window, // this script is only for browsers anyway...
      u = "application/octet-stream", // this default mime also triggers iframe downloads
      m = strMimeType || u,
      x = data,
      D = document,
      a = D.createElement("a"),
      z = function (a) {
        return String(a);
      },
      B = self.Blob || self.MozBlob || self.WebKitBlob || z,
      BB = self.MSBlobBuilder || self.WebKitBlobBuilder || self.BlobBuilder,
      fn = strFileName || "download",
      blob,
      b,
      ua,
      fr;

    if (String(this) === "true") {
      //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
      x = [x, m];
      m = x[0];
      x = x[1];
    }

    //go ahead and download dataURLs right away
    if (String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)) {
      return navigator.msSaveBlob // IE10 can't do a[download], only Blobs:
        ? navigator.msSaveBlob(d2b(x), fn)
        : saver(x); // everyone else can save dataURLs un-processed
    } //end if dataURL passed?

    try {
      blob = x instanceof B ? x : new B([x], { type: m });
    } catch (y) {
      if (BB) {
        b = new BB();
        b.append([x]);
        blob = b.getBlob(m); // the blob
      }
    }

    function d2b(u) {
      var p = u.split(/[:;,]/),
        t = p[1],
        dec = p[2] == "base64" ? atob : decodeURIComponent,
        bin = dec(p.pop()),
        mx = bin.length,
        i = 0,
        uia = new Uint8Array(mx);

      for (i; i < mx; ++i) uia[i] = bin.charCodeAt(i);

      return new B([uia], { type: t });
    }

    function saver(url, winMode) {
      if ("download" in a) {
        //html5 A[download]
        a.href = url;
        a.setAttribute("download", fn);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function () {
          a.click();
          D.body.removeChild(a);
          if (winMode === true) {
            setTimeout(function () {
              self.URL.revokeObjectURL(a.href);
            }, 250);
          }
        }, 66);
        return true;
      }

      //do iframe dataURL download (old ch+FF):
      var f = D.createElement("iframe");
      D.body.appendChild(f);
      if (!winMode) {
        // force a mime that will download:
        url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, u);
      }

      f.src = url;
      setTimeout(function () {
        D.body.removeChild(f);
      }, 333);
    } //end saver

    if (navigator.msSaveBlob) {
      // IE10+ : (has Blob, but not a[download] or URL)
      return navigator.msSaveBlob(blob, fn);
    }

    if (self.URL) {
      // simple fast and modern way using Blob and URL:
      saver(self.URL.createObjectURL(blob), true);
    } else {
      // handle non-Blob()+non-URL browsers:
      if (typeof blob === "string" || blob.constructor === z) {
        try {
          return saver("data:" + m + ";base64," + self.btoa(blob));
        } catch (y) {
          return saver("data:" + m + "," + encodeURIComponent(blob));
        }
      }

      // Blob but not URL:
      fr = new FileReader();
      fr.onload = function (e) {
        saver(this.result);
      };
      fr.readAsDataURL(blob);
    }
    return true;
  } /* end download() */
  // -------------
  // HELPER FUNCTIONS
  function _getLink(j) {
    // j should be a jQuery Object
    return j.find("a").prop("href");
  }

  function _getNum(str) {
    let match = String(str).match(/\d/g) || [];
    return Number(match.join(""));
  }

  function _coerceNumber(str) {
    return Number.isNaN(Number(str)) ? str : Number(str);
  }

  function _parseTable(a) {
    return $(a.replace(/src="([^"]+)"/g, ""))
      .children()
      .children()
      .slice(1)
      .map(parseMatch)
      .get();
  }
  // ---------------
  // let endObj = {};
  // let scraped = [];
  const endData = {
    username: "",
    userProfileLink: "",
    userSteamID: "",
    matches: []
  };

  const requestData = {
    continueToken: contToken,
    sessionID: sessionID
  };

  //and make cache for steam ID
  let cache = new Map();

  function parsePlayer(_, player) {
    function getMVPs(data) {
      if (String(data).includes("?")) {
        return _getNum(data) || 1;
      } else {
        return 0;
      }
    }
    // if possible coerce to Number
    const playerInfo = $(player).find("td");
    const playerStats = playerInfo
      .slice(1)
      .map((_, e) => {
        return _coerceNumber($(e).text());
      })
      .get();

    const [ping, kills, assists, deaths, mvpsRaw, hspRaw, score] = playerStats;

    const playerObj = {
      steamProfileLink: _getLink(playerInfo),
      name: playerInfo.find("a").text(),
      ping,
      kills,
      assists,
      deaths,
      mvps: getMVPs(mvpsRaw),
      hsp: _getNum(hspRaw),
      score
    };
    return playerObj;
  }

  function parseMatch(_, match) {
    // 'match' should be a jQuery Object
    const matchInfoRaw = $(match).children()[0];
    const scoreboardRaw = $(match).children()[1];

    //proccess matchInfo
    const matchData = $(matchInfoRaw).find("td");
    const matchDataString = matchData
      .map((_, b) =>
        $(b)
          .text()
          .trim()
      )
      .get();

    const [map, time, waitTimeRaw = "00:00", durationRaw = "00:00", checkFour] = matchDataString;
    console.log("waitTimeTest - is it undefined", waitTimeRaw == undefined);
    console.log("durationTest - is it undefined", durationRaw == undefined);
    // check if they have viewers
    const hasViewers = checkFour ? checkFour.includes("Viewer") : false;

    // process scoreboard
    const scoreBoardRows = $(scoreboardRaw).find("tr");
    const team1Players = scoreBoardRows.slice(1, 6);
    const team2Players = scoreBoardRows.slice(7, 12);
    //score
    console.log("scoreBoardTest - is it undefined", $(scoreBoardRows[6]).text() == undefined);
    const scores2 = $(scoreBoardRows[6]).text();
    const scores = scores2 ? scores2.split(" : ").map(Number) : [0, 0];

    const matchObject = {
      id: Math.random().toString(36).substr(2, 9),
      map,
      time,
      waitTime: waitTimeRaw.split(" ")[2],
      duration: durationRaw.split(" ")[2],
      viewers: hasViewers ? _getNum(checkFour) : 0,
      replayLink: hasViewers
        ? _getLink($(matchData[5]))
        : _getLink($(matchData[4])),
      teams: {
        team1: {
          score: scores[0],
          players: team1Players.map(parsePlayer).get(),
        },
        team2: {
          score: scores[1],
          players: team2Players.map(parsePlayer).get(),
        },
      }
    };

    return matchObject;
  }

  //Remove the first 1 since its just heading
  function parseInitial() {
    showAlertDialog("Data", "Scraping Data, please be patient.", "OK");
    const first8 = $("table.generic_kv_table.csgo_scoreboard_root > tbody > tr")
      .slice(1)
      .map(parseMatch)
      .get();
    endData.username = $(".profile_small_header_name").text();
    endData.userProfileLink = $(
      ".profile_small_header_name > a.whiteLink"
    ).prop("href");
    endData.matches = endData.matches.concat(first8);
  }

  async function getMoreDataRec(token,recInt) {
    try {
      const url = `${location.protocol}//${location.host}${
        location.pathname
        }?ajax=1&tab=matchhistorycompetitive&continue_token=${token}&sessionid=${
        requestData.sessionID
        }`;
      const res = await (await fetch(url, { credentials: "include" })).json();
      // console.log(res);
      endData.matches = endData.matches.concat(_parseTable(res.html));
      // console.log(res.continue_token);
      recInt = recInt-1;
      if (res.continue_token && res.html && res.success &&(recInt>=0)) {
        // console.log(res.continue_token);
        showAlertDialog("Data", `Scraping Data, please be patient. (${res.continue_token})`, "OK");
        getMoreDataRec(res.continue_token,--recInt);
      } else {
        return proccessData();
      }
    } catch (error) {
      console.error(error);
      showAlertDialog("Error", error, "OK");
    }
  }

  function getData() {
    parseInitial();
    getMoreDataRec(requestData.continueToken,rkey);
  }

  // to simplify data analysis, some processing needs to be done
  // most notably, converting the profile link to steam ids
  async function proccessData() {
    showAlertDialog("Data", "Proccessing Data, please be patient.", "OK");
    // cause its gonna be a pain
    //get user steam ID
    endData.userSteamID = await getSteamID(endData.userProfileLink);
    cache.set(endData.steamProfileLink, endData.userSteamID);
    const z = endData.matches.map(async (match) => {
      const winningTeam = getWinningTeam(match.teams);
      if (winningTeam.players) {
        match.result = winningTeam.players.filter((a) => a.steamProfileLink === endData.userProfileLink).length > 0 ? "Win" : "Loss";
      }
      else {
        match.result = "Draw";
      }
      match.teams.team1.players = await Promise.all(match.teams.team1.players.map(proccessPlayer));
      match.teams.team2.players = await Promise.all(match.teams.team2.players.map(proccessPlayer));
      return match;
    });
    endData.matches = await Promise.all(z);
    terminate();
  }

  function getWinningTeam(teams) {
    if (teams.team1.score > teams.team2.score) return teams.team1;
    if (teams.team2.score > teams.team1.score) return teams.team2;
    return "draw";
  }

  async function getSteamID(link) {
    const z = link.split("/");
    console.log("link test - is it undefined", link == undefined);
    const id = z.includes("profiles") ? z[z.length - 1] : (await (await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${API_KEY}&vanityurl=${z[z.length - 1]}`)).json()).response.steamid;
    cache.set(link, id);
    return id;
  }

  async function proccessPlayer(player) {
    const isInCache = cache.get(player.steamProfileLink);
    player.steamID = isInCache ? isInCache : (await getSteamID(player.steamProfileLink));
    return player;
  }

  function terminate() {
    console.log("Data collection done!");
    console.log("||scraped data||");
    console.log(endData.matches);
    download(
      JSON.stringify(endData, null, "\t"),
      `CS${location.pathname.split("/")[2]}.json`,
      "application/json"
    );
    showAlertDialog("Data", "Data downloaded!", "OK");
  }

  getData();
})($J, g_sGcContinueToken, g_sessionID, ShowAlertDialog);
