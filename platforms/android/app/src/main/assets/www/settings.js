document.getElementById("qualityv").innerHTML = "<div style='display: inline-block;' onclick='changeQuality()'>" + localStorage.getItem("quality") + "%</div>";
document.getElementById("editv").value = localStorage.getItem("allowedit");
function changeQuality() {
	var qp = prompt("Enter a number between 1-100", localStorage.getItem("quality"));
	if (!isNaN(qp) && qp >= 1 && qp <= 100) {
		localStorage.setItem("quality", qp);
		document.getElementById("qualityv").innerHTML = "<div style='display: inline-block;' onclick='changeQuality()'>" + localStorage.getItem("quality") + "%</div>";
	}
};
function changeallowEdit() {
	localStorage.setItem("allowedit", document.getElementById("editv").value);
}