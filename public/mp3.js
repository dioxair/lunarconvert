const { createFFmpeg, fetchFile } = FFmpeg;
const file = document.getElementById("fileUpload");
const preview = document.getElementById("preview");
const progress = document.getElementById("progress");
const downloadButton = document.getElementById("downloadButton");
const ffmpeg = createFFmpeg({ log: false });
let formatGridDisplayVideo = document.getElementsByClassName("formatsGrid")[0];
let formatGridDisplayAudio = document.getElementsByClassName("formatsGrid")[1];
let toggleButton = document.getElementById("toggleButton");
let videoCategoryLabel = document.getElementById("videoCategoryLabel");
let audioCategoryLabel = document.getElementById("audioCategoryLabel");
function toggle() {
	switch (formatGridDisplayVideo.style.display && formatGridDisplayAudio.style.display) {
		case "none": {
			formatGridDisplayVideo.style.display = "grid";
			formatGridDisplayAudio.style.display = "grid";
			videoCategoryLabel.style.display = "block";
			audioCategoryLabel.style.display = "block";
			toggleButton.textContent = "Hide formats";
			break;
		}
		case "grid":
			formatGridDisplayVideo.style.display = "none";
			formatGridDisplayAudio.style.display = "none";
			videoCategoryLabel.style.display = "none";
			audioCategoryLabel.style.display = "none";
			toggleButton.textContent = "Show formats";
			break;
		default:
			formatGridDisplayVideo.style.display = "grid";
			formatGridDisplayAudio.style.display = "grid";
			videoCategoryLabel.style.display = "block";
			audioCategoryLabel.style.display = "block";
			toggleButton.textContent = "Hide formats";
			break;
	}
}
ffmpeg.setLogger(({ type, message }) => {
	progress.style.display = "block";
	progress.style.color = "khaki";
  progress.textContent = `OUTPUT: ${message}`;
});

const transcode = async ({
	target: {
		files
	}
}) => {
	const {
		name
	} = files[0];
	if (ffmpeg.isLoaded() === false) {
		await ffmpeg.load();
	}
	ffmpeg.FS("writeFile", name, await fetchFile(files[0]));
	await ffmpeg.run("-i", name, "output.mp3");
	const data = ffmpeg.FS("readFile", "output.mp3");
	const vidURL = URL.createObjectURL(new Blob([data.buffer], {
		type: "audio/mpeg"
	}));
	console.log(vidURL);
	preview.src = vidURL;
	downloadButton.disabled = false;
	downloadButton.onclick = function() {
    let str = String(vidURL);
    str = str.slice(42) // get's the blob name
    saveAs(vidURL, `${str}.mp3`)
	};
	progress.textContent = "Conversion is done!";
}
file.addEventListener("change", transcode);