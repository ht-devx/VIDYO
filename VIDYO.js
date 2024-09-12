/*------------------------------------------------------------------------------
                                                        
      VIDYO by @ht-devx
      github.com/ht-devx/VIDYO
      2024 | All Rights Reserved
      
      Icon Credits:
      > volume up: flaticon.com/free-icon/volume-up_6996058
      > volume down: flaticon.com/free-icon/volume-down_6996057
      > play: flaticon.com/free-icon/play-buttton_5577228
      > pause: flaticon.com/free-icon/pause_151859

      Font Credits:
      > Instrument Sans by Rodrigo Fuenzalida & Jordan Egstad

-------------------------------------------------------------------------------*/

window.VIDYO = function(params){
    let VIDYO_init = (params) => {
        let vids = !params.video ? "video" : params.video;
        let vidVol = params.volume;

        let touchDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        let getType = t => ({}).toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        let parsedVids = [];

        /*----- PARAM: VIDEO SELECTOR(S) -----*/
        if(getType(vids) == "string"){
            let selected = document.querySelectorAll(vids);
            selected.length ? parsedVids.push(selected) : ""
        } else if(getType(vids) == "array"){
            vids.forEach(item => {
                if(getType(item) == "string"){
                    let selected = document.querySelectorAll(item);
                    selected.length ? parsedVids.push(selected) : ""
                } else if(item instanceof HTMLElement || (getType(item) == "nodelist" && item.length)){
                    parsedVids.push(item);
                }
            })
        } else if(vids instanceof HTMLElement || getType(vids) == "nodelist"){
            if(vids instanceof HTMLElement || vids.length){
                parsedVids.push(vids);
            }
        }

        /*----- PARAM: VOLUME -----*/
        if(getType(vidVol) == "string"){
            vidVol = vidVol.trim();
            if(vidVol.slice(-1) == "%"){
                vidVol = Number(vidVol.replace(/[^\d\.]*/g,"")) / 100;
            } else {
                vidVol = !isNaN(vidVol) ? Number(vidVol) : 1
            }
        }

        // loop through video selectors
        if(parsedVids.length){
            for(let vid of parsedVids){
                let vidArr = vid instanceof HTMLElement ? [vid] : vid;
                vidArr?.forEach(vid => {
                    if(vid.tagName == "VIDEO" && !vid.closest(".vidyo-video-container")){
                        // set starting video volume
                        vid.volume = vidVol;

                        // mobile
                        if(touchDevice){
                            vid.setAttribute("playsinline","");
                            vid.controls = true;
                        }//end: is mobile
                        
                        // not mobile
                        else {
                            /*----- HOUSEKEEPING -----*/
                            // remove selected attrs if present
                            let vidAttrs = ["controls", "autoplay", "muted"];
                            for(let attr of vidAttrs){
                                vid.matches(`[${attr}]`) && vid.removeAttribute(attr);
                            }

                            // remove "picture in picture" feature
                            // does NOT work in firefox
                            // stackoverflow.com/questions/54458516#comment109923537_54469523
                            vid.disablePictureInPicture = true;

                            /*----- CREATE ELEMENTS -----*/
                            // container
                            let vidcon = document.createElement("div");
                            vidcon.classList.add("vidyo-video-container");
                            vid.before(vidcon);
                            vidcon.append(vid);

                            // controls overlay
                            let ovl = document.createElement("div");
                            ovl.classList.add("vidyo-video-ovl");
                            vidcon.prepend(ovl);

                            // controls (large) wrapper
                            let ctlw = document.createElement("div");
                            ctlw.classList.add("vidyo-video-ctrl");
                            ovl.append(ctlw)

                            // controls (small) wrapper
                            let tctl = document.createElement("div");
                            tctl.classList.add("vidyo-tiny-ctrl");

                            /*----- PLAY BUTTON -----*/
                            // play icon
                            let playstr = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill-rule="evenodd" d="M468.8 235.007 67.441 3.277A24.2 24.2 0 0 0 55.354-.008h-.07A24.247 24.247 0 0 0 43.19 3.279a24 24 0 0 0-12.11 20.992v463.456a24.186 24.186 0 0 0 36.36 20.994L468.8 276.99a24.238 24.238 0 0 0 0-41.983z" fill="var(--VIDYO-buttons-color)"></path></g></svg>';

                            // play btn (large)
                            let zpl = document.createElement("div");
                            zpl.classList.add("vidyo-video-play");			
                            zpl.innerHTML = playstr;
                            ctlw.append(zpl)

                            // play btn (small)
                            let xpl = document.createElement("div");
                            xpl.classList.add("vidyo-tiny-play");
                            xpl.innerHTML = playstr;

                            /*----- PAUSE BUTTON -----*/
                            // pause icon
                            let pausestr = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 47.607 47.607" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M17.991 40.976a6.631 6.631 0 0 1-13.262 0V6.631a6.631 6.631 0 0 1 13.262 0v34.345zM42.877 40.976a6.631 6.631 0 0 1-13.262 0V6.631a6.631 6.631 0 0 1 13.262 0v34.345z" fill="var(--VIDYO-buttons-color)" class=""></path></g></svg>';

                            // pause btn (large)
                            let zpa = document.createElement("div");
                            zpa.classList.add("vidyo-video-pause");			
                            zpa.innerHTML = pausestr;
                            ctlw.append(zpa)

                            // pause btn (small)
                            let xpa = document.createElement("div");
                            xpa.classList.add("vidyo-tiny-pause");
                            xpa.innerHTML = pausestr;

                            /*----- MEDIA EVENTS -----*/
                            // click (large) func
                            let isDragging = false;		
                            let startX, startY;

                            document.addEventListener("mousedown", (e) => {
                                startX = e.clientX;
                                startY = e.clientY;
                                isDragging = false;
                            })

                            document.addEventListener("mousemove", (e) => {
                                let deltaX = Math.abs(e.clientX - startX);
                                let deltaY = Math.abs(e.clientY - startY);
                                deltaX > 5 || deltaY > 5 ? isDragging = true : ""
                            });

                            ovl.addEventListener("click", (e) => {
                                if(isDragging){
                                    e.preventDefault();
                                } else {
                                    vid.paused ? vid.play() : vid.pause()
                                }
                            })

                            // click (small) func
                            tctl.addEventListener("click", () => {
                                vid.paused ? vid.play() : vid.pause()
                            })

                            // event: play
                            vid.addEventListener("play", () => {
                                zpl.style.display = "none";
                                xpl.style.display = "none";
                                zpa.style.display = "block";
                                xpa.style.display = "block";

                                setTimeout(() => {
                                    vidcon.classList.add("vidyo-playing");
                                },200)

                                vidcon.classList.remove("vidyo-paused")
                            })

                            // event: pause
                            vid.addEventListener("pause", () => {
                                zpl.style.display = "block";
                                xpl.style.display = "block";
                                zpa.style.display = "none";
                                xpa.style.display = "none";
                                vidcon.classList.add("vidyo-paused");
                                vidcon.classList.remove("vidyo-playing")
                            })

                            // event: ended
                            vid.addEventListener("ended", () => {
                                zpl.style.display = "block";
                                xpl.style.display = "block";
                                zpa.style.display = "none";
                                xpa.style.display = "none";
                                vidcon.classList += " vidyo-paused vidyo-ended";
                                vid.currentTime = 0;
                            })

                            /*----- MEDIA BAR -----*/
                            // slider container
                            let lizard = document.createElement("div");
                            lizard.classList.add("vidyo-video-slider");	
                            vidcon.append(lizard)

                            // add mini play/pause
                            lizard.prepend(tctl)
                            tctl.append(xpl)
                            tctl.append(xpa)

                            // current time (container)
                            let curTimeContainer = document.createElement("span");
                            curTimeContainer.classList.add("vidyo-current-time");
                            lizard.append(curTimeContainer);

                            // current time (temp: 00:00)
                            let curTimeTemp = document.createElement("span")
                            curTimeTemp.classList.add("pseudo-ct");
                            curTimeTemp.textContent = "00:00";
                            curTimeTemp.ariaHidden = "true";
                            curTimeContainer.append(curTimeTemp)

                            // current time (actual)
                            let curTimeActual = document.createElement("span");
                            curTimeActual.classList.add("actual-ct");
                            curTimeActual.textContent = "00:00"
                            curTimeContainer.append(curTimeActual)

                            // slider (container)
                            let wr = document.createElement("div");
                            wr.classList.add("vidyo-slider-container");
                            lizard.append(wr);

                            // slider (actual)
                            let lyre = document.createElement("input");
                            lyre.type = "range";
                            lyre.min = 0;
                            lyre.value = 0;
                            lyre.step = 0.1;
                            lyre.classList.add("vidyo-slider");
                            wr.append(lyre)

                            // slider (visually present part)
                            let fvp = document.createElement("div");
                            fvp.classList.add("vidyo-bar-piece");
                            wr.append(fvp)

                            // sider (fill part)
                            let fdp = document.createElement("div");
                            fdp.classList.add("vidyo-bar-fill");
                            fvp.append(fdp)

                            /*----- VOLUME STUFF -----*/
                            // volume container [1/2]
                            let volCont = document.createElement("div");
                            volCont.classList += " vidyo-vol vol-on";
                            lizard.append(volCont)

                            // volume container [2/2]
                            let volKont = document.createElement("div");
                            volKont.classList.add("vidyo-vol-ctrl");
                            volCont.append(volKont)

                            // volume: on
                            let volOnStr = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 20 20" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="var(--VIDYO-tiny-buttons-color)" fill-rule="evenodd" d="M9.383 3.076A1 1 0 0 1 10 4v12a1 1 0 0 1-1.707.707L4.586 13H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.586l3.707-3.707a1 1 0 0 1 1.09-.217zm5.274-.147a1 1 0 0 1 1.414 0A9.973 9.973 0 0 1 19 10a9.973 9.973 0 0 1-2.929 7.071 1 1 0 0 1-1.414-1.414A7.971 7.971 0 0 0 17 10a7.97 7.97 0 0 0-2.343-5.657 1 1 0 0 1 0-1.414zm-2.829 2.828a1 1 0 0 1 1.415 0A5.982 5.982 0 0 1 15 10a5.982 5.982 0 0 1-1.757 4.243 1 1 0 1 1-1.415-1.415A3.985 3.985 0 0 0 13 10a3.982 3.982 0 0 0-1.172-2.828 1.001 1.001 0 0 1 0-1.415z" clip-rule="evenodd" class=""></path></g></svg>`;
                            let volOn = document.createElement("div");
                            volOn.classList.add("vidyo-vol-on");
                            volOn.innerHTML = volOnStr;
                            volKont.append(volOn)

                            // volume: off
                            let volOffStr = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 20 20" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="var(--VIDYO-tiny-buttons-color)" fill-rule="evenodd" d="M9.383 3.076A1 1 0 0 1 10 4v12a1 1 0 0 1-1.707.707L4.586 13H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.586l3.707-3.707a1 1 0 0 1 1.09-.217zm2.91 4.217a1 1 0 0 1 1.414 0L15 8.586l1.293-1.293a1 1 0 1 1 1.414 1.414L16.414 10l1.293 1.293a1 1 0 0 1-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 0 1 0-1.414z" clip-rule="evenodd" class=""></path></g></svg>`;
                            let volOff = document.createElement("div");
                            volOff.classList.add("vidyo-vol-off");
                            volOff.innerHTML = volOffStr;
                            volKont.append(volOff)

                            // volume slider (container)
                            let volSDC = document.createElement("div");
                            volSDC.classList.add("vol-slider-cont");
                            volCont.append(volSDC);

                            // volume slider (track)
                            let volMT = document.createElement("div");
                            volMT.classList.add("vol-slider-back");
                            volSDC.append(volMT)

                            // volume slider (fill part)
                            let volFill = document.createElement("div");
                            volFill.classList.add("vol-slider-fill");
                            volMT.append(volFill)

                            // volume slider (backdrop container)
                            let volBD = document.createElement("div");
                            volBD.classList.add("vol-slider-db");
                            volSDC.prepend(volBD);

                            // volume slider (actual)
                            let volSD = document.createElement("input");
                            volSD.type = "range";
                            volSD.min = 0;
                            volSD.max = 1;
                            volSD.step = 0.01;
                            volSD.classList.add("vidyo-vol-slider");
                            volSDC.append(volSD)

                            setTimeout(() => {
                                volSD.value = vidVol;
                                volFill.style.height = (vidVol * 100) + "%"
                            },0)

                            // volume functionality
                            volKont.addEventListener("click", () => {
                                // 1 -> 0
                                if(volCont.matches(".vol-on")){
                                    vid.volume = 0;
                                    volSD.value = 0;
                                    volCont.classList.remove("vol-on");
                                    volCont.classList.add("vol-off");
                                    volOn.style.display = "none";
                                    volOff.style.display = "block";

                                    volFill.style.height = "0%"
                                }
                                
                                // 0 -> 1
                                else {
                                    vid.volume = vidVol;
                                    volSD.value = vidVol;
                                    volCont.classList.remove("vol-off");
                                    volCont.classList.add("vol-on");
                                    volOn.style.display = "block";
                                    volOff.style.display = "none";

                                    volFill.style.height = (vidVol * 100) + "%"
                                }
                            })

                            let isVolDragging = false;

                            volSD.addEventListener("mousedown", () => {
                                isVolDragging = true;
                            })

                            volSD.addEventListener("mouseup", () => {
                                isVolDragging = false;
                            })

                            volSD.addEventListener("input", () => {
                                if(isVolDragging){
                                    let sriracha = parseFloat(volSD.value);

                                    vid.volume = sriracha;
                                    if(sriracha > 0){
                                        volCont.classList.remove("vol-off");
                                        volCont.classList.add("vol-on");
                                        volOn.style.display = "block";
                                        volOff.style.display = "none";
                                    } else {
                                        volCont.classList.remove("vol-on");
                                        volCont.classList.add("vol-off");
                                        volOn.style.display = "none";
                                        volOff.style.display = "block";
                                    }

                                    volFill.style.height = (sriracha * 100) + "%"
                                }//end: if dragging
                            })

                            // only show volume slider if volume icon is hovered
                            volKont.addEventListener("mouseenter", () => {
                                volCont.classList.add("v-hover")

                                volCont.addEventListener("mouseleave", () => {
                                    volCont.classList.remove("v-hover")
                                })
                            })

                            /*----- TOTAL DURATION -----*/
                            let total_dur;

                            function durationStuff(){
                                let dur_og = vid.duration;
                                total_dur = dur_og;
                                let dur = formatTime(dur_og);

                                // slider max val = dur (s)
                                lyre.max = total_dur;

                                if(!lizard.querySelector(".vidyo-duration")){
                                    // total duration (container)
                                    let durContainer = document.createElement("span");
                                    durContainer.classList.add("vidyo-duration");
                                    lizard.append(durContainer)

                                    // total duration (temp: 00:00)
                                    let durTemp = document.createElement("span");
                                    durTemp.classList.add("pseudo-dur");
                                    durTemp.textContent = "00:00";				
                                    durTemp.ariaHidden = "true";
                                    durContainer.append(durTemp)

                                    // total duration (actual)
                                    let actualDuration = document.createElement("span");
                                    actualDuration.classList.add("actual-dur");

                                    if(dur == "NaN:NaN"){
                                        actualDuration.textContent = "00:00"
                                    } else {
                                        actualDuration.textContent = dur;
                                    }

                                    durContainer.append(actualDuration)
                                } else {
                                    let actualDurCont = lizard.querySelector(".actual-dur");
                                    if(actualDurCont){
                                        if(dur == "NaN:NaN"){
                                            actualDurCont.textContent = "00:00"
                                        } else {
                                            actualDurCont.textContent = dur;
                                        }
                                    }
                                }
                            }//end durationStuff()

                            function formatTime(s){
                                let ess = parseFloat(s);
                                let min = Math.floor(ess / 60);
                                let sec = Math.round(ess % 60);

                                if(min < 10){
                                    min = `0${min}`
                                }

                                if(sec < 10){
                                    sec = `0${sec}`
                                }

                                let durStr = `${min}:${sec}`
                                return durStr
                            }//end formatTime()

                            vid.addEventListener("loadeddata", () => {
                                durationStuff();
                            })

                            setTimeout(() => {
                                durationStuff();
                            },2000)

                            /*----- USER JUMP TO WHICHEVER TIME -----*/
                            let isTLDragging = false;

                            lyre.addEventListener("mousedown", () => {
                                isTLDragging = true;
                            })

                            lyre.addEventListener("mouseup", () => {
                                isTLDragging = false;
                            })

                            lyre.addEventListener("input", () => {
                                if(isTLDragging){
                                    let curry = parseFloat(lyre.value);
                                    let rt = curry / total_dur;
                                    vid.currentTime = total_dur * rt;

                                    fdp.style.width = (rt * 100) + "%"
                                }
                            })

                            // when video changes its time,
                            // update the "current time" timestamp
                            vid.addEventListener("timeupdate", () => {
                                let curTimeContainerime = vid.currentTime;
                                let cth = formatTime(curTimeContainerime);

                                curTimeActual.textContent = cth;
                                curTimeTemp.style.visibility = "hidden"

                                let ert = curTimeContainerime/total_dur;
                                lyre.value = curTimeContainerime;

                                fdp.style.width = (ert * 100) + "%"
                            })


                        }//end: is desktop
                    }//end: [1] is <video>, [2] hasn't been VIDYO'ed yet
                })//end: vid forEach
            }//end: for vid of parsedVids[]
        }//end: parsedVids[].length

    }//end VIDYO_init

    document.readyState == "loading" ?
    document.addEventListener("DOMContentLoaded", () => VIDYO_init(params)) :
    VIDYO_init(params);
}