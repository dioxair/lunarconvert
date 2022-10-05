const { createFFmpeg, fetchFile } = FFmpeg;
const file = document.getElementById("fileUpload");
const preview = document.getElementById("preview");
const progress = document.getElementById("progress");
const downloadButton = document.getElementById("downloadButton");
const ffmpeg = createFFmpeg({ log: false });

ffmpeg.setLogger(({ type, message }) => {
	progress.style.display = "block";
	progress.style.color = "crimson";
  progress.textContent = `TYPE: ${type} - OUTPUT: ${message}`;
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
	await ffmpeg.run("-i", name, "output.mp4");
	const data = ffmpeg.FS("readFile", "output.mp4");
	const vidURL = URL.createObjectURL(new Blob([data.buffer], {
		type: "video/mp4"
	}));
	console.log(vidURL);
	preview.src = vidURL;
	downloadButton.disabled = false;
	downloadButton.onclick = function() { saveAs(vidURL, "output.mp4") };
}
file.addEventListener("change", transcode);