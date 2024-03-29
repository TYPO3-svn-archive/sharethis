/**
 * we use a local copy of the javascript-API, because:
 * 
 * 1. the URL htts://w.sharethis.com/button/buttons.js (if you want to use the plugin on
 *    pages, which uses HTTPS-protocol) returns at this time (26.01.2011) an invalid SSL-certificate!
 *
 * 2. this javascript-code doesn't support HTTPS
 *    We marked the bugfix for this issue in this code with the marker 'bugfix'
 *
 * 3. there's a javascript-bug (in firefox) if we use the sharethis-buttons together with googlemap-API
 *    We marked the bugfix for this issue in this code with the marker 'bugfix'
 *
 * 4. if the sharethis-API will be loaded twice, then the eMail-button will not work correct. So we must
 *    define, that this API will only be loaded ONCE.
 *    We marked the bugfix for this issue in this code with the marker 'bugfix'
 */

/**
 * bugfix: (load the sharethis-API only ONCE a time)
 */
if (typeof(stLight) == "undefined") {
	if (typeof(stLight) == "undefined" && typeof(SHARETHIS) == "undefined") {
	    stLight = new
	    function () {
	        this.publisher = null;
	        this.sessionID_time = (new Date()).getTime().toString();
	        this.sessionID_rand = Number(Math.random().toPrecision(5).toString().substr(2)).toString();
	        this.sessionID = this.sessionID_time + "." + this.sessionID_rand;
	        this.fpc = null;
	        this.counter = 0;
	        this.readyRun = false;
	        this.meta = {
	            hostname: document.location.host,
	            location: document.location.pathname
	        };
	        this.loadedFromBar = false
	    };
	    stLight.onReady = function () {
	        stLight.readyRun = true;
	        if (stLight.publisher == null) {
	            if (typeof(window.console) !== "undefined") {
	                try {
	                    console.log("Please specify a ShareThis Publisher Key \nFor help, contact support@sharethis.com")
	                } catch (a) {}
	            }
	        }
	        var b = "lightLoader";
	        if (stLight.hasButtonOnPage()) {
	            if (stLight.loadedFromBar) {
	                b = "bar_lightLoader"
	            }
	        } else {
	            if (stLight.loadedFromBar) {
	                b = "bar"
	            }
	        }
	        stLight.log("pview", b, "");
	        stWidget.options.sessionID = stLight.sessionID;
	        stWidget.options.fpc = stLight.fpc;
	        stButtons.onReady()
	    };
	    stLight.log = function (d, e, c) {
	        var f = (("https:" == document.location.protocol) ? "https://l." : "http://l.") + "sharethis.com/log?event=";
	        if (d == "pview") {
	            f = (("https:" == document.location.protocol) ? "https://l." : "http://l.") + "sharethis.com/pview?event="
	        }
	        var a = stLight.dbrInfo();
	        if (a == false) {
	            a = ""
	        }
	        f += d;
	        f += "&source=" + e;
	        if (c != "") {
	            f += "&type=" + c
	        }
	        f += "&publisher=" + encodeURIComponent(stLight.publisher) + "&hostname=" + encodeURIComponent(stLight.meta.hostname) + "&location=" + encodeURIComponent(stLight.meta.location) + "&url=" + encodeURIComponent(document.location.href) + "&sessionID=" + stLight.sessionID + "&fpc=" + stLight.fpc + "&ts" + (new Date()).getTime() + "." + stLight.counter+++"&r_sessionID=&hash_flag=&shr=&count=" + a;
	        var b = new Image(1, 1);
	        b.src = f;
	        b.onload = function () {
	            return
	        };
	        if (d == "pview") {
	            stLight.createSegmentFrame()
	        }
	    };
	    stLight._stFpc = function () {
	        if (!document.domain || document.domain.search(/\.gov/) > 0) {
	            return false
	        }
	        var g = stLight._stGetFpc("__unam");
	        if (g == false) {
	            var c = Math.round(Math.random() * 2147483647);
	            c = c.toString(16);
	            var h = (new Date()).getTime();
	            h = h.toString(16);
	            var e = "";
	            var a = stLight._stGetD();
	            a = a.split(/\./)[1];
	            if (!a) {
	                return false
	            }
	            e = stLight._stdHash(a) + "-" + h + "-" + c + "-1";
	            g = e;
	            stLight._stSetFpc(g)
	        } else {
	            var b = g;
	            var f = b.split(/\-/);
	            if (f.length == 4) {
	                var d = Number(f[3]);
	                d++;
	                b = f[0] + "-" + f[1] + "-" + f[2] + "-" + d;
	                g = b;
	                stLight._stSetFpc(g)
	            }
	        }
	        return g
	    };
	    stLight._stSetFpc = function (g) {
	        var a = "__unam";
	        var c = new Date;
	        var i = c.getFullYear();
	        var f = c.getMonth() + 9;
	        var h = c.getDate();
	        var d = a + "=" + escape(g);
	        if (i) {
	            var b = new Date(i, f, h);
	            d += "; expires=" + b.toGMTString()
	        }
	        var e = stLight._stGetD();
	        d += "; domain=" + escape(e) + ";path=/";
	        document.cookie = d
	    };
	    stLight._stGetD = function () {
	        var b = document.domain.split(/\./);
	        var a = "";
	        if (b.length > 1) {
	            a = "." + b[b.length - 2] + "." + b[b.length - 1]
	        }
	        return a
	    };
	    stLight._stGetFpc = function (b) {
	        var a = document.cookie.match("(^|;) ?" + b + "=([^;]*)(;|$)");
	        if (a) {
	            return (unescape(a[2]))
	        } else {
	            return false
	        }
	    };
	    stLight._stdHash = function (a) {
	        var e = 0,
	            d = 0;
	        for (var c = a.length - 1; c >= 0; c--) {
	            var b = parseInt(a.charCodeAt(c));
	            e = ((e << 8) & 268435455) + b + (b << 12);
	            if ((d = e & 161119850) != 0) {
	                e = (e ^ (d >> 20))
	            }
	        }
	        return e.toString(16)
	    };
	    stLight._thisScript = null;
	    stLight.getShareThisLightScript = function () {
	        var d = document.getElementsByTagName("script");
	        var c = null;
	        for (var b = 0; b < d.length; b++) {
	            var a = d[b].src;
	            if (a.search(/.*sharethis.*\/button\/light.*/) >= 0) {
	                c = d[b]
	            }
	        }
	        return c
	    };
	    stLight.dbrInfo = function () {
	        var a = document.referrer;
	        var d = new RegExp(document.domain, "gi");
	        if (d.test(a) == true) {
	            return false
	        }
	        if (a && a.length > 0) {
	            var c = /(http:\/\/)(.*?)\/.*/i;
	            var b = /(^.*\?)(.*)/ig;
	            var g = "";
	            var f = a.replace(c, "$2");
	            if (f.length > 0) {
	                g += "&refDomain=" + f
	            } else {
	                return false
	            }
	            var e = a.replace(b, "$2");
	            if (e.length > 0) {
	                g += "&refQuery=" + encodeURIComponent(e)
	            }
	            return g
	        } else {
	            return false
	        }
	    };
	    stLight.odjs = function (a, b) {
	        this.head = document.getElementsByTagName("head")[0];
	        this.scriptSrc = a;
	        this.script = document.createElement("script");
	        this.script.setAttribute("type", "text/javascript");
	        this.script.setAttribute("src", this.scriptSrc);
	        this.script.onload = b;
	        this.script.onreadystatechange = function () {
	            if (this.readyState == "loaded" || this.readyState == "complete") {
	                b()
	            }
	        };
	        this.head.appendChild(this.script)
	    };
	    if (window.document.readyState == "completed") {
	        stLight.onReady()
	    } else {
	        if (typeof(window.addEventListener) != "undefined") {
	            window.addEventListener("load", stLight.onReady, false)
	        } else {
	            if (typeof(document.addEventListener) != "undefined") {
	                document.addEventListener("load", stLight.onReady, false)
	            } else {
	                if (typeof window.attachEvent != "undefined") {
	                    window.attachEvent("onload", stLight.onReady)
	                }
	            }
	        }
	    }
	    stLight.createSegmentFrame = function () {
	        try {
	            stLight.segmentframe = document.createElement('<iframe name="stframe" allowTransparency="true" style="body{background:transparent;}" ></iframe>')
	        } catch (b) {
	            stLight.segmentframe = document.createElement("iframe")
	        }
	        stLight.segmentframe.id = "stSegmentFrame";
	        stLight.segmentframe.name = "stSegmentFrame";
	        var c = document.body;
	        var a = (("https:" == document.location.protocol) ? "https://seg." : "http://seg.") + "sharethis.com/getSegment.php?purl=" + encodeURIComponent(document.location.href) + "&jsref=" + encodeURIComponent(document.referrer) + "&rnd=" + (new Date()).getTime();
	        stLight.segmentframe.src = a;
	        stLight.segmentframe.frameBorder = "0";
	        stLight.segmentframe.scrolling = "no";
	        stLight.segmentframe.width = "0px";
	        stLight.segmentframe.height = "0px";
	        stLight.segmentframe.setAttribute("style", "display:none;");
	        c.appendChild(stLight.segmentframe)
	    };
	    stLight.fpc = stLight._stFpc();
	    stLight.options = function (a) {
	        if (a && a.publisher) {
	            stLight.publisher = a.publisher
	        }
	        if (a && a.loadedFromBar) {
	            stLight.loadedFromBar = a.loadedFromBar
	        }
	        for (var b in a) {
	            if (stWidget.options.hasOwnProperty(b) && a[b] !== null) {
	                stWidget.options[b] = a[b]
	            }
	        }
	    };
	    stLight.hasButtonOnPage = function () {
	        var d = document.getElementsByTagName("*");
	        var c = new RegExp(/^st_(.*?)$/);
	        var a = d.length;
	        for (var b = 0; b < a; b++) {
	        	/**
	        	 * bugfix: (to get this API working together with googlemap-API)
	        	 */
	        	if(typeof d[b].className.match != 'function') {
	        		continue;
	        	}
	            if (d[b].className.match(c) && d[b].className.match(c).length >= 2 && d[b].className.match(c)[1]) {
	                return true
	            }
	        }
	        return false
	    }
	}
	var stButtons = {};
	stButtons.makeButton = function (d) {
	    var B = d.service;
	    var n = d.text;
	    if (n == null && (d.type == "vcount" || d.type == "hcount")) {
	        n = "Share"
	    }
	    var g = stWidget.ogurl ? stWidget.ogurl : document.location.href;
	    g = d.url ? d.url : g;
	    var A = stWidget.ogtitle ? stWidget.ogtitle : document.title;
	    A = d.title ? d.title : A;
	    if (/(http|https):\/\//.test(g) == false) {
	        g = decodeURIComponent(g);
	        A = decodeURIComponent(A)
	    }
	    if (/(http|https):\/\//.test(g) == false) {
	        g = decodeURIComponent(g);
	        A = decodeURIComponent(A)
	    }
	    var z = document.createElement("span");
	    z.setAttribute("style", "text-decoration:none;color:#000000;display:inline-block;cursor:pointer;");
	    z.className = "stButton";
	    if (d.type == "custom") {
	        d.element.onclick = function () {
	            var C = document.createElement("form");
	            C.setAttribute("method", "GET");
	            /**
	             * bugfix: use HTTP or HTTPS-protocol
	             */
	            C.setAttribute("action", document.location.protocol + "//wd.sharethis.com/api/sharer.php");
	            C.setAttribute("target", "_blank");
	            var D = {
	                url: g,
	                title: A,
	                destination: B,
	                publisher: stLight.publisher,
	                fpc: stLight.fpc,
	                sessionID: stLight.sessionID
	            };
	            if (stWidget.ogimg != null) {
	                D.image = stWidget.ogimg
	            }
	            if (stWidget.ogdesc != null) {
	                D.desc = stWidget.ogdesc
	            }
	            for (var b in D) {
	                var a = document.createElement("input");
	                a.setAttribute("type", "hidden");
	                a.setAttribute("name", b);
	                a.setAttribute("value", D[b]);
	                C.appendChild(a)
	            }
	            document.body.appendChild(C);
	            C.submit()
	        };
	        return false
	    }
	    if (B != "email" && B != "sharethis" && B != "fblike") {
	        z.onclick = function () {
	            var C = document.createElement("form");
	            C.setAttribute("method", "GET");
	            /**
	             * bugfix: use HTTP or HTTPS-protocol
	             */
	            C.setAttribute("action", document.location.protocol + "//wd.sharethis.com/api/sharer.php");
	            C.setAttribute("target", "_blank");
	            var D = {
	                url: g,
	                title: A,
	                destination: B,
	                publisher: stLight.publisher,
	                fpc: stLight.fpc,
	                sessionID: stLight.sessionID
	            };
	            if (stWidget.ogimg != null) {
	                D.image = stWidget.ogimg
	            }
	            if (stWidget.ogdesc != null) {
	                D.desc = stWidget.ogdesc
	            }
	            for (var b in D) {
	                var a = document.createElement("input");
	                a.setAttribute("type", "hidden");
	                a.setAttribute("name", b);
	                a.setAttribute("value", D[b]);
	                C.appendChild(a)
	            }
	            document.body.appendChild(C);
	            C.submit()
	        }
	    }
	    if (B == "fblike") {
	        try {
	            var o = document.createElement('<iframe name="stLframe" scrolling="no" frameBorder="0" allowTransparency="true" style="body{background:transparent;}" ></iframe>')
	        } catch (h) {
	            o = document.createElement("iframe");
	            o.allowTransparency = "true";
	            o.setAttribute("allowTransparency", "true");
	            o.frameBorder = "0";
	            o.setAttribute("frameBorder", "0");
	            o.scrolling = "no";
	            o.setAttribute("scrolling", "no")
	        }
	        /**
	         * bugfix: use HTTP or HTTPS-protocol
	         */
	        var l = document.location.protocol + "//wd.sharethis.com/api/sharer.php?destination=fblike&url=" + encodeURIComponent(g);
	        var w = "button_count";
	        if (d.type == "vcount") {
	            w = "box_count";
	            o.setAttribute("style", "border:none; overflow:hidden; width:55px; height:65px; position:relative; top:12px;");
	            o.width = "55px";
	            o.height = "65px"
	        } else {
	            o.setAttribute("style", "border:none; overflow:hidden; width:90px; height:21px; position:relative; top:7px;");
	            o.width = "90px";
	            o.height = "21px"
	        }
	        
	        /**
	         * bugfix: use HTTP or HTTPS-protocol
	         */
	        o.src = document.location.protocol+"//www.facebook.com/plugins/like.php?href=" + encodeURIComponent(l) + "&layout=" + w + "&show_faces=true&width=90&action=like&colorscheme=light&height=21";
	        return o
	    }
	    if (d.type == "chicklet") {
	        var t = document.createElement("span");
	        t.className = "chicklets " + B;
	        if (n == null) {
	            t.innerHTML = "&nbsp;"
	        } else {
	            t.appendChild(document.createTextNode(n))
	        }
	        z.appendChild(t);
	        return z
	    } else {
	        if (d.type == "large") {
	            var t = document.createElement("span");
	            t.className = "stLarge";
	            var f = ("https:" == document.location.protocol) ? "https://ws.sharethis.com/images/" : "http://w.sharethis.com/images/";
	            t.style.backgroundImage = "url('" + f + B + "_32.png')";
	            z.appendChild(t);
	            return z
	        } else {
	            if (d.type == "pcount" || d.type == "stbar" || d.type == "stsmbar") {
	                var c = document.createElement("span");
	                var t = document.createElement("span");
	                if (d.type == "stsmbar") {
	                    t.className = "stSmBar";
	                    var f = ("https:" == document.location.protocol) ? "https://ws.sharethis.com/images/" : "http://w.sharethis.com/images/";
	                    t.style.backgroundImage = "url('" + f + B + "_16.png')"
	                } else {
	                    t.className = "stLarge";
	                    var f = ("https:" == document.location.protocol) ? "https://ws.sharethis.com/images/" : "http://w.sharethis.com/images/";
	                    t.style.backgroundImage = "url('" + f + B + "_32.png')"
	                }
	                c.appendChild(t);
	                var k = document.createElement("span");
	                var y = document.createElement("div");
	                if (d.type == "stsmbar") {
	                    y.className = "stBubbleSmHoriz"
	                } else {
	                    y.className = "stBubbleSm"
	                }
	                y.setAttribute("id", "stBubble_" + d.count);
	                y.style.visibility = "hidden";
	                var i = document.createElement("div");
	                i.className = "stBubble_count_sm";
	                y.appendChild(i);
	                k.appendChild(y);
	                k.appendChild(c);
	                z.appendChild(k);
	                stButtons.getCount(g, B, i);
	                c.onmouseover = function () {
	                    var a = document.getElementById("stBubble_" + d.count);
	                    a.style.visibility = "visible"
	                };
	                c.onmouseout = function () {
	                    var a = document.getElementById("stBubble_" + d.count);
	                    a.style.visibility = "hidden"
	                };
	                return z
	            } else {
	                if (d.type == "button" || d.type == "vcount" || d.type == "hcount") {
	                    var c = document.createElement("span");
	                    c.className = "stButton_gradient";
	                    var m = document.createElement("span");
	                    m.className = "chicklets " + B;
	                    if (n == null) {
	                        m.innerHTML = "&nbsp;"
	                    } else {
	                        m.appendChild(document.createTextNode(n))
	                    }
	                    c.appendChild(m);
	                    if (B == "twitter") {
	                        var v = document.createElement("span");
	                        v.className = "stTwbutton";
	                        v.innerHTML = "&nbsp;";
	                        c = v
	                    } else {
	                        if (B == "facebook") {
	                            var u = document.createElement("span");
	                            u.className = "stFb";
	                            var r = document.createElement("span");
	                            r.className = "stFb_text";
	                            r.innerHTML = "Share";
	                            u.appendChild(r);
	                            c = u
	                        }
	                    }
	                    if (d.type == "vcount") {
	                        if (B == "twitter") {
	                            var k = document.createElement("span");
	                            var y = document.createElement("div");
	                            y.className = "stTwbubble";
	                            var i = document.createElement("div");
	                            i.className = "stBubble_count";
	                            y.appendChild(i);
	                            k.appendChild(y);
	                            k.appendChild(v);
	                            z.appendChild(k);
	                            stButtons.getCount(g, B, i)
	                        } else {
	                            if (B == "facebook") {
	                                var y = document.createElement("div");
	                                y.className = "stFb_vbubble";
	                                var i = document.createElement("div");
	                                i.className = "stBubble_count";
	                                var q = document.createElement("span");
	                                q.className = "stFb_bottom";
	                                y.appendChild(i);
	                                z.appendChild(y);
	                                z.appendChild(q);
	                                z.appendChild(u);
	                                stButtons.getCount(g, B, i)
	                            } else {
	                                var k = document.createElement("span");
	                                var y = document.createElement("div");
	                                y.className = "stBubble";
	                                var i = document.createElement("div");
	                                i.className = "stBubble_count";
	                                y.appendChild(i);
	                                k.appendChild(y);
	                                k.appendChild(c);
	                                z.appendChild(k);
	                                stButtons.getCount(g, B, i)
	                            }
	                        }
	                    } else {
	                        if (d.type == "hcount") {
	                            if (B == "twitter") {
	                                var k = document.createElement("span");
	                                var u = document.createElement("span");
	                                u.setAttribute("style", "display:inline-block");
	                                var s = document.createElement("span");
	                                s.className = "stTwVbubble_left";
	                                s.innerHTML = "&nbsp;";
	                                var r = document.createElement("span");
	                                r.className = "stTwVbubble";
	                                u.appendChild(s);
	                                u.appendChild(r);
	                                k.appendChild(v);
	                                k.appendChild(u);
	                                z.appendChild(k);
	                                stButtons.getCount(g, B, r)
	                            } else {
	                                if (B == "facebook") {
	                                    var q = document.createElement("span");
	                                    q.className = "stFb_left";
	                                    var p = document.createElement("span");
	                                    p.className = "stFb_hbubble";
	                                    z.appendChild(u);
	                                    z.appendChild(q);
	                                    z.appendChild(p);
	                                    stButtons.getCount(g, B, p)
	                                } else {
	                                    var k = document.createElement("span");
	                                    var x = document.createElement("span");
	                                    x.className = "stButton_gradient stHBubble";
	                                    var j = document.createElement("span");
	                                    j.className = "stButton_left";
	                                    j.innerHTML = "&nbsp;";
	                                    var e = document.createElement("span");
	                                    e.className = "stButton_right";
	                                    e.innerHTML = "&nbsp;";
	                                    var i = document.createElement("span");
	                                    i.className = "stBubble_hcount";
	                                    x.appendChild(i);
	                                    k.appendChild(c);
	                                    k.appendChild(x);
	                                    z.appendChild(k);
	                                    stButtons.getCount(g, B, i)
	                                }
	                            }
	                        } else {
	                            z.appendChild(c)
	                        }
	                    }
	                }
	            }
	        }
	    }
	    return z
	};
	stButtons.getCount = function (c, a, e) {
	    var b = false;
	    if (e && e !== null) {
	        while (e.childNodes.length >= 1) {
	            try {
	                e.removeChild(e.firstChild)
	            } catch (g) {}
	        }
	    }
	    for (var d = 0; d < stButtons.counts.length; d++) {
	        var f = stButtons.counts[d];
	        if (f.ourl == c) {
	            b = true;
	            var h = "";
	            try {
	                if (a == "sharethis") {
	                    h = (f.total > 0) ? stButtons.human(f.total) : "New"
	                } else {
	                    if (a == "facebook" && typeof(f.facebook2) != "undefined") {
	                        h = stButtons.human(f.facebook2)
	                    } else {
	                        if (typeof(f[a]) != "undefined") {
	                            h = (f[a] > 0) ? stButtons.human(f[a]) : "0"
	                        } else {
	                            h = "0"
	                        }
	                    }
	                }
	                e.innerHTML = h
	            } catch (g) {}
	        }
	    }
	    if (b == false) {
	        stButtons.getCountsFromService(c, a, e)
	    }
	};
	stButtons.human = function (a) {
	    if (a >= 10000) {
	        a = a / 100;
	        a = Math.round(a);
	        a = a / 10;
	        a = a + "K"
	    }
	    return a
	};
	stButtons.locateElements = function () {
	    var f = document.getElementsByTagName("*");
	    var h = [];
	    var g = new RegExp(/st_(.*?)_custom/);
	    var e = new RegExp(/st_(.*?)_vcount/);
	    var d = new RegExp(/st_(.*?)_hcount/);
	    var c = new RegExp(/st_(.*?)_button/);
	    var b = new RegExp(/st_(.*?)_large/);
	    var a = new RegExp(/st_(.*?)_pcount/);
	    var n = new RegExp(/st_(.*?)_stbar/);
	    var m = new RegExp(/st_(.*?)_stsmbar/);
	    var l = new RegExp(/^st_(.*?)$/);
	    var k = f.length;
	    for (var j = 0; j < k; j++) {
	    	/**
	    	 * bugfix: (to get this API working together with googlemap-API)
	    	 */
	    	if(typeof f[j].className.match != 'function') {
	    		continue;
	    	}
	        if (f[j].className.match(g) && f[j].className.match(g).length >= 2 && f[j].className.match(g)[1]) {
	            if (stButtons.testElem(f[j]) == false) {
	                stButtons.elemArr.push(f[j]);
	                h.push({
	                    service: f[j].className.match(g)[1],
	                    element: f[j],
	                    url: f[j].getAttribute("st_url"),
	                    title: f[j].getAttribute("st_title"),
	                    text: f[j].getAttribute("displayText"),
	                    type: "custom"
	                })
	            }
	        } else {
	            if (f[j].className.match(e) && f[j].className.match(e).length >= 2 && f[j].className.match(e)[1]) {
	                if (stButtons.testElem(f[j]) == false) {
	                    stButtons.elemArr.push(f[j]);
	                    h.push({
	                        service: f[j].className.match(e)[1],
	                        element: f[j],
	                        url: f[j].getAttribute("st_url"),
	                        title: f[j].getAttribute("st_title"),
	                        text: f[j].getAttribute("displayText"),
	                        type: "vcount"
	                    })
	                }
	            } else {
	                if (f[j].className.match(d) && f[j].className.match(d).length >= 2 && f[j].className.match(d)[1]) {
	                    if (stButtons.testElem(f[j]) == false) {
	                        stButtons.elemArr.push(f[j]);
	                        h.push({
	                            service: f[j].className.match(d)[1],
	                            element: f[j],
	                            url: f[j].getAttribute("st_url"),
	                            title: f[j].getAttribute("st_title"),
	                            text: f[j].getAttribute("displayText"),
	                            type: "hcount"
	                        })
	                    }
	                } else {
	                    if (f[j].className.match(c) && f[j].className.match(c).length >= 2 && f[j].className.match(c)[1]) {
	                        if (stButtons.testElem(f[j]) == false) {
	                            stButtons.elemArr.push(f[j]);
	                            h.push({
	                                service: f[j].className.match(c)[1],
	                                element: f[j],
	                                url: f[j].getAttribute("st_url"),
	                                title: f[j].getAttribute("st_title"),
	                                text: f[j].getAttribute("displayText"),
	                                type: "button"
	                            })
	                        }
	                    } else {
	                        if (f[j].className.match(b) && f[j].className.match(b).length >= 2 && f[j].className.match(b)[1]) {
	                            if (stButtons.testElem(f[j]) == false) {
	                                stButtons.elemArr.push(f[j]);
	                                h.push({
	                                    service: f[j].className.match(b)[1],
	                                    element: f[j],
	                                    url: f[j].getAttribute("st_url"),
	                                    title: f[j].getAttribute("st_title"),
	                                    text: f[j].getAttribute("displayText"),
	                                    type: "large"
	                                })
	                            }
	                        } else {
	                            if (f[j].className.match(a) && f[j].className.match(a).length >= 2 && f[j].className.match(a)[1]) {
	                                if (stButtons.testElem(f[j]) == false) {
	                                    stButtons.elemArr.push(f[j]);
	                                    h.push({
	                                        service: f[j].className.match(a)[1],
	                                        element: f[j],
	                                        url: f[j].getAttribute("st_url"),
	                                        title: f[j].getAttribute("st_title"),
	                                        text: f[j].getAttribute("displayText"),
	                                        type: "pcount",
	                                        count: j
	                                    })
	                                }
	                            } else {
	                                if (f[j].className.match(n) && f[j].className.match(n).length >= 2 && f[j].className.match(n)[1]) {
	                                    if (stButtons.testElem(f[j]) == false) {
	                                        stButtons.elemArr.push(f[j]);
	                                        h.push({
	                                            service: f[j].className.match(n)[1],
	                                            element: f[j],
	                                            url: f[j].getAttribute("st_url"),
	                                            title: f[j].getAttribute("st_title"),
	                                            text: f[j].getAttribute("displayText"),
	                                            type: "stbar",
	                                            count: j
	                                        })
	                                    }
	                                } else {
	                                    if (f[j].className.match(m) && f[j].className.match(m).length >= 2 && f[j].className.match(m)[1]) {
	                                        if (stButtons.testElem(f[j]) == false) {
	                                            stButtons.elemArr.push(f[j]);
	                                            h.push({
	                                                service: f[j].className.match(m)[1],
	                                                element: f[j],
	                                                url: f[j].getAttribute("st_url"),
	                                                title: f[j].getAttribute("st_title"),
	                                                text: f[j].getAttribute("displayText"),
	                                                type: "stsmbar",
	                                                count: j
	                                            })
	                                        }
	                                    } else {
	                                        if (f[j].className.match(l) && f[j].className.match(l).length >= 2 && f[j].className.match(l)[1]) {
	                                            if (stButtons.testElem(f[j]) == false) {
	                                                stButtons.elemArr.push(f[j]);
	                                                h.push({
	                                                    service: f[j].className.match(l)[1],
	                                                    element: f[j],
	                                                    url: f[j].getAttribute("st_url"),
	                                                    title: f[j].getAttribute("st_title"),
	                                                    text: f[j].getAttribute("displayText"),
	                                                    type: "chicklet"
	                                                })
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }
	    for (var j = 0; j < h.length; j++) {
	        stWidget.addEntry(h[j])
	    }
	};
	stButtons.odcss = function (a, b) {
	    this.head = document.getElementsByTagName("head")[0];
	    this.scriptSrc = a;
	    this.css = document.createElement("link");
	    this.css.setAttribute("rel", "stylesheet");
	    this.css.setAttribute("type", "text/css");
	    this.css.setAttribute("href", this.scriptSrc);
	    setTimeout(function () {
	        b()
	    }, 500);
	    this.head.appendChild(this.css)
	};
	stButtons.makeButtons = function () {
	    var a = (("https:" == document.location.protocol) ? "https://ws.sharethis.com/button/css/buttons-secure.css" : "http://w.sharethis.com/button/css/buttons.css");
	    stButtons.odcss(a, function () {});
	    stButtons.locateElements()
	};
	stButtons.addCount = function (a) {
	    stButtons.counts.push(a)
	};
	stButtons.getCountsFromService = function (b, a, c) {
	    if (stButtons.checkQueue(b) == false) {
	        var d = (("https:" == document.location.protocol) ? "https://ws.sharethis.com/api/getCount.php?url=" : "http://wd.sharethis.com/api/getCount.php?url=");
	        /**
	         * bugfix: use HTTP or HTTPS-protocol
	         */
	        stLight.odjs(document.location.protocol + "//wd.sharethis.com/api/getCount.php?url=" + encodeURIComponent(b), function () {
	            if (typeof(__stCount) != "undefined") {
	                __stCount.ourl = b;
	                stButtons.addCount(__stCount);
	                stButtons.getCount(b, a, c)
	            }
	        });
	        stButtons.queue.push(b)
	    } else {
	        setTimeout(function () {
	            stButtons.getCount(b, a, c)
	        }, 300)
	    }
	};
	stButtons.checkQueue = function (a) {
	    for (var b = 0; b < stButtons.queue.length; b++) {
	        if (stButtons.queue[b] == a) {
	            return true
	        }
	    }
	    return false
	};
	stButtons.elemArr = [];
	stButtons.testElem = function (c) {
	    var a = false;
	    for (var b = 0; b < stButtons.elemArr.length; b++) {
	        if (c == stButtons.elemArr[b]) {
	            a = true
	        }
	    }
	    if (a == true) {
	        return true
	    } else {
	        return false
	    }
	};
	
	function Shareable(a) {
	    this.idx = -1;
	    this.url = null;
	    this.title = null;
	    this.image = null;
	    this.element = null;
	    this.service = null;
	    this.screen = "home";
	    this.summary = null;
	    this.content = null;
	    this.buttonText = null;
	    this.frag = null;
	    this.onhover = true;
	    this.attachButton = function (b) {
	        this.element = b;
	        if (this.onhover == true) {
	            b.onmouseover = this.mouseOn;
	            b.onmouseout = function () {
	                clearInterval(stWidget.mouseOnTimer)
	            }
	        } else {
	            b.onclick = this.popup
	        }
	    };
	    this.init = function () {
	        stWidget.merge(this, a);
	        stWidget.shareables.push(this);
	        if (a.element !== null) {
	            this.attachButton(a.element)
	        }
	    };
	    return this
	}
	var stWidget = new
	function () {
	    this.shareables = [];
	    this.entries = 0;
	    this.widgetOpen = false;
	    this.mouseOnTimer = null;
	    this.mouseOutTimer = null;
	    this.frameReady = false;
	    this.frameUrl = (("https:" == document.location.protocol) ? "https://ws.sharethis.com/secure/index.html" : "http://edge.sharethis.com/share4x/index.html");
	    this.secure = false;
	    try {
	        this.mainstframe = document.createElement('<iframe name="stLframe" allowTransparency="true" style="body{background:transparent;}" ></iframe>');
	        this.mainstframe.onreadystatechange = function () {
	            if (stWidget.mainstframe.readyState === "complete") {
	                stWidget.frameReady = true
	            }
	        }
	    } catch (a) {
	        this.mainstframe = document.createElement("iframe");
	        this.mainstframe.allowTransparency = "true";
	        this.mainstframe.setAttribute("allowTransparency", "true");
	        this.mainstframe.onload = function () {
	            stWidget.frameReady = true
	        }
	    }
	    this.mainstframe.id = "stLframe";
	    this.mainstframe.className = "stLframe";
	    this.mainstframe.name = "stLframe";
	    this.mainstframe.frameBorder = "0";
	    this.mainstframe.scrolling = "no";
	    this.mainstframe.width = "345px";
	    this.mainstframe.height = "450px";
	    this.mainstframe.style.top = "0px";
	    this.mainstframe.style.left = "0px";
	    this.mainstframe.src = "";
	    this.wrapper = document.createElement("div");
	    this.wrapper.id = "stwrapper";
	    this.wrapper.className = "stwrapper";
	    this.wrapper.style.visibility = "hidden";
	    this.wrapper.style.top = "-999px";
	    this.wrapper.style.left = "-999px";
	    this.closewrapper = document.createElement("div");
	    this.closewrapper.className = "stclose";
	    this.closewrapper.onclick = function () {
	        stWidget.closeWidget()
	    };
	    this.wrapper.appendChild(this.closewrapper);
	    this.wrapper.appendChild(this.mainstframe);
	    this.ogtitle = null;
	    this.ogdesc = null;
	    this.ogurl = null;
	    this.ogimg = null;
	    this.ogtype = null;
	    this.initFire = false;
	    this.merge = function (d, c) {
	        for (var b in c) {
	            if (d.hasOwnProperty(b) && c[b] !== null) {
	                d[b] = c[b]
	            }
	        }
	    };
	    this.oldScroll = 0;
	    this.init = function () {
	        if (stWidget.initFire == false) {
	            stWidget.initFire = true;
	            window.frames.stLframe.location.replace(stWidget.frameUrl + stWidget.createFrag(null, "init"))
	        }
	    }
	};
	stWidget.options = new
	function () {
	    this.fpc = stLight.fpc;
	    this.sessionID = null;
	    this.publisher = null;
	    this.tracking = null;
	    this.send_services = null;
	    this.exclusive_service = null;
	    this.headerTitle = null;
	    this.headerfg = null;
	    this.headerbg = null;
	    this.offsetLeft = null;
	    this.offsetTop = null;
	    this.onhover = true;
	    this.autoclose = true;
	    this.autoPosition = true;
	    this.embeds = false;
	    this.doneScreen = true
	};
	stWidget.addEntry = function (a) {
	    if (!a.element) {
	        return false
	    }
	    if (a && (a.service != "email" && a.service != "sharethis")) {
	        if (a.type !== "custom") {
	            a.element.appendChild(stButtons.makeButton(a))
	        } else {
	            stButtons.makeButton(a)
	        }
	        return true
	    } else {
	        if (a.type != "custom") {
	            a.element.appendChild(stButtons.makeButton(a))
	        }
	        var b = new Shareable(a);
	        b.idx = stWidget.entries;
	        stWidget.entries++;
	        b.publisher = stLight.publisher;
	        b.sessionID = stLight.sessionID;
	        b.fpc = stLight.fpc;
	        if (stWidget.ogimg != null) {
	            b.image = stWidget.ogimg
	        }
	        if (stWidget.ogdesc != null) {
	            b.summary = stWidget.ogdesc
	        }
	        stWidget.merge(b, stWidget.options);
	        b.mouseOn = function () {
	            stWidget.mouseOnTimer = setTimeout(b.popup, 150)
	        };
	        b.popup = function () {
	            if (stWidget.widgetOpen == false) {
	                var c = "lightLoader";
	                if (a.type == "stbar" || a.type == "stsmbar") {
	                    c = "bar"
	                }
	                stLight.log("widget", c, a.type);
	                window.frames.stLframe.location.replace(stWidget.frameUrl + stWidget.createFrag(b));
	                stWidget.positionWidget(b);
	                if (stWidget.options.embeds == false) {
	                    stWidget.hideEmbeds()
	                }
	                setTimeout(function () {
	                    stWidget.widgetOpen = true;
	                    st_showing = true
	                }, 200)
	            } else {
	                if (stWidget.widgetOpen == true && stWidget.options.onhover == false) {}
	            }
	            return false
	        };
	        b.init();
	        return b
	    }
	};
	stWidget.createFrag = function (c, b) {
	    var f = "#light";
	    if (b == "init") {
	        f = "#init";
	        for (var e in stWidget.options) {
	            if (stWidget.options.hasOwnProperty(e) == true && stWidget.options[e] !== null && typeof(stWidget.options[e]) != "function" && typeof(stWidget.options[e]) != "object") {
	                var a = stWidget.options[e];
	                try {
	                    a = decodeURIComponent(a);
	                    a = decodeURIComponent(a)
	                } catch (d) {}
	                f = f + "/" + e + "=" + encodeURIComponent(a)
	            }
	        }
	        f = f + "/pUrl=" + encodeURIComponent(encodeURIComponent(document.location.href)) + ((document.title != "") ? "/title=" + encodeURIComponent(encodeURIComponent(document.title)) : "") + "/stLight=true"
	    } else {
	        for (var e in c) {
	            if (c.hasOwnProperty(e) == true && c[e] !== null && typeof(c[e]) != "function" && typeof(c[e]) != "object" && e !== "idx") {
	                f = f + "/" + e + "-=-" + encodeURIComponent(encodeURIComponent(c[e]))
	            }
	        }
	        if (c.service == "email") {
	            f = f + "/page-=-send"
	        }
	    }
	    return f
	};
	stWidget.positionWidget = function (o) {
	    if (!o) {
	        return false
	    }
	    shareel = o.element;
	    var curleft = curtop = 0;
	    if (shareel.offsetParent) {
	        curleft = shareel.offsetLeft;
	        curtop = shareel.offsetTop;
	        while (shareel = shareel.offsetParent) {
	            curleft += shareel.offsetLeft;
	            curtop += shareel.offsetTop
	        }
	    }
	    shareel = o.element;
	    var eltop = 0;
	    var elleft = 0;
	    var topVal = 0;
	    var leftVal = 0;
	    var elemH = 0;
	    var elemW = 0;
	    eltop = curtop + shareel.offsetHeight + 5;
	    elleft = curleft + 5;
	    topVal = (eltop + (stWidget.options.offsetTop ? stWidget.options.offsetTop : 0));
	    topVal = eval(topVal);
	    elemH = topVal;
	    topVal += "px";
	    leftVal = (elleft + (stWidget.options.offsetLeft ? stWidget.options.offsetLeft : 0));
	    leftVal = eval(leftVal);
	    elemW = leftVal;
	    leftVal += "px";
	    stWidget.wrapper.style.top = topVal;
	    stWidget.wrapper.style.left = leftVal;
	    if (stWidget.options.autoPosition == true) {
	        stWidget.oldScroll = document.body.scrollTop;
	        var pginfo = stWidget.pageSize();
	        var effectiveH = pginfo.height + pginfo.scrY;
	        var effectiveW = pginfo.width + pginfo.scrX;
	        var widgetH = 180;
	        var widgetW = 355;
	        var needH = widgetH + elemH;
	        var needW = widgetW + elemW;
	        var diffH = needH - effectiveH;
	        var diffW = needW - effectiveW;
	        var newH = elemH - diffH;
	        var newW = elemW - diffW;
	
	        function getHW(elem) {
	            var retH = 0;
	            var retW = 0;
	            while (elem != null) {
	                retH += elem.offsetTop;
	                retW += elem.offsetLeft;
	                elem = elem.offsetParent
	            }
	            return {
	                height: retH,
	                width: retW
	            }
	        }
	        var buttonPos = getHW(shareel);
	        var leftA, rightA, topA, bottomA = false;
	        if (diffH > 0) {
	            bottomA = false;
	            topA = true;
	            if ((buttonPos.height - widgetH) > 0) {
	                newH = buttonPos.height - widgetH
	            }
	            stWidget.wrapper.style.top = newH + "px"
	        }
	        if (diffW > 0) {
	            leftA = false;
	            rightA = true;
	            if ((buttonPos.width - widgetW) > 0) {
	                newW = buttonPos.width - widgetW
	            }
	            stWidget.wrapper.style.left = newW + "px"
	        }
	    }
	    if (stWidget.options.autoPosition == "center") {
	        stWidget.wrapper.style.top = "15%";
	        stWidget.wrapper.style.left = "35%";
	        stWidget.wrapper.style.position = "fixed"
	    }
	    stWidget.wrapper.style.visibility = "visible";
	    stWidget.mainstframe.style.visibility = "visible"
	}, stWidget.hideWidget = function () {
	    if (stWidget.wrapper.style.visibility !== "hidden") {
	        stWidget.wrapper.style.visibility = "hidden"
	    }
	    if (stWidget.mainstframe.style.visibility !== "hidden") {
	        stWidget.mainstframe.style.visibility = "hidden"
	    }
	};
	stWidget.pageSize = function () {
	    var e = [0, 0, 0, 0];
	    var b = 0;
	    var a = 0;
	    var d = 0;
	    var c = 0;
	    if (typeof(window.pageYOffset) == "number") {
	        b = window.pageXOffset;
	        a = window.pageYOffset
	    } else {
	        if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
	            b = document.body.scrollLeft;
	            a = document.body.scrollTop
	        } else {
	            if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
	                b = document.documentElement.scrollLeft;
	                a = document.documentElement.scrollTop
	            }
	        }
	    }
	    if (window.innerWidth) {
	        d = window.innerWidth;
	        c = window.innerHeight
	    } else {
	        if (document.documentElement.offsetWidth) {
	            d = document.documentElement.offsetWidth;
	            c = document.documentElement.offsetHeight
	        }
	    }
	    e = {
	        scrX: b,
	        scrY: a,
	        width: d,
	        height: c
	    };
	    return e
	};
	stWidget.closeWidget = function () {
	    if (st_showing == false) {
	        return false
	    }
	    st_showing = false;
	    stWidget.widgetOpen = false;
	    stWidget.wrapper.style.visibility = "hidden";
	    stWidget.mainstframe.style.visibility = "hidden";
	    stWidget.wrapper.style.top = "-999px";
	    stWidget.wrapper.style.left = "-999px";
	    stWidget.showEmbeds();
	    stWidget.sendEvent("screen", "home")
	};
	stWidget.hideEmbeds = function () {
	    var b = document.getElementsByTagName("embed");
	    for (var a = 0; a < b.length; a++) {
	        b[a].style.visibility = "hidden"
	    }
	};
	stWidget.showEmbeds = function () {
	    if (stWidget.options.embeds == true) {
	        return true
	    }
	    var b = document.getElementsByTagName("embed");
	    for (var a = 0; a < b.length; a++) {
	        b[a].style.visibility = "visible"
	    }
	};
	stWidget.sendEvent = function (a, d) {
	    var c = "#widget/" + a + "=" + d;
	    try {
	        window.frames.stLframe.location.replace(stWidget.frameUrl + c)
	    } catch (b) {}
	};
	stWidget.getOGTags = function () {
	    var b = document.getElementsByTagName("meta");
	    for (var a = 0; a < b.length; a++) {
	        if (b[a].getAttribute("property") == "og:title") {
	            stWidget.ogtitle = b[a].getAttribute("content")
	        } else {
	            if (b[a].getAttribute("property") == "og:type") {
	                stWidget.ogtype = b[a].getAttribute("content")
	            } else {
	                if (b[a].getAttribute("property") == "og:url") {
	                    stWidget.ogurl = b[a].getAttribute("content")
	                } else {
	                    if (b[a].getAttribute("property") == "og:image") {
	                        stWidget.ogimg = b[a].getAttribute("content")
	                    } else {
	                        if (b[a].getAttribute("property") == "og:description") {
	                            stWidget.ogdesc = b[a].getAttribute("content")
	                        }
	                    }
	                }
	            }
	        }
	    }
	};
	stButtons.onReady = function () {
	    stWidget.getOGTags();
	    document.body.appendChild(stWidget.wrapper);
	    stButtons.makeButtons();
	    stWidget.init()
	};
	if (document.readyState == "complete" && stLight.readyRun == false) {
	    stLight.onReady()
	}
	stButtons.widget = false;
	stButtons.widgetArray = [];
	stButtons.queue = [];
	stButtons.queuePos = 0;
	stButtons.counts = [];
	st_showing = false;
	if (typeof(window.addEventListener) != "undefined") {
	    window.addEventListener("click", function () {
	        stWidget.closeWidget()
	    }, false)
	} else {
	    if (typeof(document.addEventListener) != "undefined") {
	        document.addEventListener("click", function () {
	            stWidget.closeWidget()
	        }, false)
	    } else {
	        if (typeof window.attachEvent != "undefined") {
	            document.attachEvent("onclick", function () {
	                stWidget.closeWidget()
	            })
	        }
	    }
	};
}