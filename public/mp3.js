const { createFFmpeg, fetchFile } = FFmpeg;
const file = document.getElementById("fileUpload");
const preview = document.getElementById("preview");
const progress = document.getElementById("progress");
const downloadButton = document.getElementById("downloadButton");
const ffmpeg = createFFmpeg({ log: false });

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