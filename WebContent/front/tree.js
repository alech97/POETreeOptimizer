var canvas = $("<canvas id='treeCanvas'></canvas>");


$(document).ready(function() {
	console.log("Document ready");
	$('body').append(canvas);
	$(canvas).prop("width", 10000);
	$(canvas).prop("height", 10000);
	$("#treeCanvas")[0].getContext("2d").scale(.1, .1);
	
	drawCircle(40, 40);
	
	console.log(passiveSkillTreeData["groups"]);
	
	console.log(passiveSkillTreeData);
	
	for (var i = 1; i <= 514; i++) {
		var x = passiveSkillTreeData["groups"]["" + i].x
		var y = passiveSkillTreeData["groups"]["" + i].y
		drawCircle(x, y);
	}
	
	/**
	$(window).on("resize", function() {
		$(canvas).prop("width", window.innerWidth);
		$(canvas).prop("height", window.innerHeight);
		console.log("resized: " + window.innerWidth + ", " + window.innerHeight);
	});
	*/
});

function drawCircle(x, y) {
	var ctx = $("#treeCanvas")[0].getContext("2d");
	ctx.beginPath();
	ctx.arc(x, y, 20, 0, 2*Math.PI);
	ctx.stroke();
	ctx.closePath();
}

function drawNodes() {
	
	//Javascript calculations for positioning ascendancy assets
	var worldPos = passiveSkillTreeData.getNodePositionInfo(passiveSkillTreeData.startNode).position;
	console.log("worldPos: " + worldPos);
	var distanceFromStartNodeCenter = 270;
	var dirX = 0.0;
	var dirY = 1.0;
	var distToCentre = Math.sqrt(worldPos.x * worldPos.x + worldPos.y * worldPos.y);
	var isCentered = Math.abs(worldPos.x) < 10.0 && Math.abs(worldPos.y) < 10.0;
	if(!isCentered){
		dirX = worldPos.x / distToCentre;
		dirY = -worldPos.y / distToCentre;
	}
	var zoom = passiveSkillTreeData.viewPort.zoom;
	var ascButtonRot = Math.atan2(dirX, dirY);
	var img = passiveSkillTreeData.assets[passiveSkillTreeData.ascendancyButton.state][zoom];
	var buttonCX = worldPos.x + distanceFromStartNodeCenter * Math.cos(ascButtonRot + Math.PI/2);
	var buttonCY = worldPos.y + distanceFromStartNodeCenter * Math.sin(ascButtonRot + Math.PI/2);
	var buttonPoint = new Point(buttonCX, buttonCY);

	var classArtImage = passiveSkillTreeData.assets['Classes'+passiveSkillTreeData.ascendancyClassName()][zoom];
	var imageCX = worldPos.x + (distanceFromStartNodeCenter + classArtImage.height/zoom/2) * Math.cos(ascButtonRot + Math.PI/2);
	var imageCY = worldPos.y + (distanceFromStartNodeCenter + classArtImage.height/zoom/2) * Math.sin(ascButtonRot + Math.PI/2);
	var imagePoint = new Point(imageCX, imageCY);

	var ascendancyBounds = new Bounds();
	ascendancyBounds.tl = new Point(imagePoint.x - classArtImage.width/zoom/2, imagePoint.y - classArtImage.height/zoom/2);
	ascendancyBounds.br = new Point(imagePoint.x + classArtImage.width/zoom/2, imagePoint.y + classArtImage.height/zoom/2);

	//Flavour text positioning information and text is included in opts
	//Positioned from the top left of the Class Art Image

	//All ascendancy subgraphs are composed of nodes that have been marked as ascendancy nodes.  These subgraphs have been created around the outside of the normal graph, and are hidden in the normal view of the graph.
	//Each ascendancy subgraph has an ascendancy start node, similar to the regular class start node.  An ascendancy subgraph should be displayed such that this start node is centred in the ascendancy background image.
	//Any connection between an ascendancy node and a non ascendancy node is hidden.

	//Source Art is included in the Classes folder and Juggernaut0-3.png are included as examples of image size at each zoom level.
}