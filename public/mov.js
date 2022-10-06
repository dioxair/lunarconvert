const { createFFmpeg, fetchFile } = FFmpeg;
const file = document.getElementById("fileUpload");
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
	await ffmpeg.run("-i", name, "output.mov");
	const data = ffmpeg.FS("readFile", "output.mov");
	const vidURL = URL.createObjectURL(new Blob([data.buffer], {
		type: "video/quicktime"
	}));
	console.log(vidURL);
	downloadButton.disabled = false;
	downloadButton.onclick = function() {
    let str = String(vidURL);
    str = str.slice(42) // get's the blob name
    saveAs(vidURL, `${str}.mov`)
	};
	progress.textContent = "Conversion is done!";
}
file.addEventListener("change", transcode);