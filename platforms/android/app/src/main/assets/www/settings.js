document.getElementById("qualityi").value = localStorage.getItem("quality");
document.getElementById("editv").value = localStorage.getItem("allowedit");
function changeQuality() {
	if (document.getElementById('qualityi').validity.valid) {
		localStorage.setItem("quality", document.getElementById('qualityi').value);
	} else {
		document.getElementById('qualityi').value = localStorage.getItem("quality");
	}
};
function changeallowEdit() {
	localStorage.setItem("allowedit", document.getElementById("editv").value);
}