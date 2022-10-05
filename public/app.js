const { createFFmpeg, fetchFile } = FFmpeg;
const file = document.getElementById("fileUpload");
const preview = document.getElementById("preview");
const progress = document.getElementById("progress");
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
	await ffmpeg.load();
	ffmpeg.FS("writeFile", name, await fetchFile(files[0]));
	await ffmpeg.run("-i", name, "output.mp4");
	const data = ffmpeg.FS("readFile", "output.mp4");
	preview.src = URL.createObjectURL(new Blob([data.buffer], {
		type: "video/mp4"
	}));
}
file.addEventListener("change", transcode);