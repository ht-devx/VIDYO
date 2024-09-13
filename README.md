### :clapper: VIDYO

#### Table of Contents:
- [About](#about)
- [Usage](#usage)
- [Attribution](#attribution)
- [Troubleshooting](#troubleshooting)

---

#### About:

A plugin that targets videos (of specified selectors) and replaces the browser's default controls with custom controls.

**:eyes: Demo:** [ht-devx.github.io/VIDYO/demo](https://ht-devx.github.io/VIDYO/demo)  
**:hammer_and_wrench: Code playground:** [jsfiddle.net/ht_dev/vdL8061q](https://jsfiddle.net/ht_dev/vdL8061q)  
**:construction_worker: Author:** HT (@ ht-devx)

**Preview:**

<img width="538" alt="image" src="https://github.com/user-attachments/assets/782919b0-4ace-4d5b-ac4c-164d5335c0be" alt="Screenshot of a video depicting a bear standing on its rear paws, scratching its back against a tree. The browser's default controls have been replaced with a custom set.">

\
**Credits:**  
- [play icon](https://www.flaticon.com/free-icon/play-buttton_5577228) by IYAHICON
- [pause icon](https://www.flaticon.com/free-icon/pause_151859) by Chanut
- [volume icon](https://www.flaticon.com/free-icon/volume-up_6996058) and [mute icon](https://www.flaticon.com/free-icon/volume-down_6996057) by Bharat Icons
- font: [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans)

<details>
  <summary>Demo credits:</summary>
  <br/>

  - [bear video](https://www.youtube.com/watch?v=8AxV3y6W-Uk)
  - [bear favicon](https://www.flaticon.com/free-icon/teddy-bear_3734704) by Sebastian Belalcazar
  - font: [Figtree](https://fonts.google.com/specimen/Figtree)
</details>

---

### Usage:

Paste the following after `<head>`:
```html
<!--✻✻✻✻✻✻  VIDYO (video plugin) by @ht-devx  ✻✻✻✻✻✻-->
<link href="https://cdn.jsdelivr.net/gh/ht-devx/VIDYO/VIDYO.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/gh/ht-devx/VIDYO/VIDYO.min.js"></script>
```

Call VIDYO like so:
```html
<script>
VIDYO({
    video: "video",
    volume: "75%"
})
</script>
```

| Option name | Type | Details |
| ------ | ------ | ------ |
| `video` | `string` or `array` | Your video's selector(s).<br>Examples:<br> ◍ `"video"`<br> ◍ `document.querySelector("video")`<br> ◍ `["video"]`<br> ◍ `document.querySelectorAll("video")`<br> ◍ `[".video-with-class", document.querySelectorAll(".video-with-another-class")]` |
| `volume` | `string` or `number` | Examples (`string`):<br> ◍ `"0%"` (silent)<br> ◍ `"50%"`<br> ◍ `"100%"` (full volume)<br><br>Examples (`number`):<br> ◍ `0` (silent)<br> ◍ `0.5` (half volume)<br> ◍ `1` (full volume)|

In terms of styling, feel free to edit or override VIDYO's CSS variables.  
An exhaustive list of all CSS variables:
```css
:root, :host {
	--VIDYO-buttons-color:#fff;
	--VIDYO-buttons-size:2rem;
	--VIDYO-buttons-shadow-strength:10%;
	--VIDYO-hover-speed:0.25s;
	
	--VIDYO-slider-area-height:40px;
	--VIDYO-slider-area-background:#000;
	--VIDYO-slider-area-transparency:75%;
	--VIDYO-slider-area-blur:0px;
	--VIDYO-slider-area-side-padding:12px;
	
	--VIDYO-slider-bar-width:69%;
	--VIDYO-slider-bar-height:5px;
	--VIDYO-slider-bar-color:#232323;
	--VIDYO-slider-bar-roundness:5px;
	--VIDYO-slider-bar-fill-color:#eee;
	--VIDYO-slider-gaps:15px;
	
	--VIDYO-knob-width:12px;
	--VIDYO-knob-height:12px;
	--VIDYO-knob-color:#fafafa;
	--VIDYO-knob-roundness:100%;
	
	--VIDYO-tiny-buttons-size:0.8rem;
	--VIDYO-tiny-buttons-color:#efefef;
	
	--VIDYO-time-color:#efefef;
	--VIDYO-time-font-family:"Instrument Sans";
	--VIDYO-time-font-size:0.8rem;
	
	--VIDYO-volume-slider-bar-width:5px;
	--VIDYO-volume-slider-bar-height:80px; /* % not allowed */
	--VIDYO-volume-slider-bar-color:#232323;
	--VIDYO-volume-slider-bar-roundness:5px;
	--VIDYO-volume-slider-bar-fill-color:#8e8e8e;
	--VIDYO-volume-slider-touch-padding:15px;
	--VIDYO-volume-slider-fade-speed:0.3s;
	--VIDYO-volume-slider-padding:12px;
	--VIDYO-volume-knob-width:12px;
	--VIDYO-volume-knob-height:12px;
	--VIDYO-volume-knob-roundness:100%;
	--VIDYO-volume-knob-color:#efefef;
}
```

---

### Attribution:
Please do not remove the credits, and link back to this repository page!

---

### Troubleshooting:

If you encounter any issues or have any questions, please contact me through either:
- :love_letter: hello.ht.dev@gmail.com
- :computer: [discord.gg](https://discord.gg/RcMKnwz)
